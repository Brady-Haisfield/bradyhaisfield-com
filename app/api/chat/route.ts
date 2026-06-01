import Anthropic from "@anthropic-ai/sdk";
import {
  SYSTEM_PROMPT,
  MODEL,
  MAX_USER_CHARS,
  MAX_MESSAGES,
  MAX_TOKENS,
} from "./brady-context";

// BradyAI chat endpoint. Streams Claude's response back as plain UTF-8 text.
// POST is dynamic and uncached by default in Next.js 16, so no `dynamic` export
// is needed; the Anthropic Node SDK requires the Node runtime (the default).
export const runtime = "nodejs";

type ClientMessage = { role: "user" | "assistant"; content: string };

// --- Baseline per-IP rate limit -------------------------------------------
// In-memory counter: a speed bump, not a hard guarantee. Vercel runs multiple
// stateless instances and recycles them on cold start, so the effective limit
// is (MAX_REQ_PER_WINDOW x live instances) and resets occasionally. That's an
// acceptable trade for a low-traffic portfolio. If real abuse appears, swap this
// for a distributed limiter (e.g. @upstash/ratelimit) — isolated change.
const WINDOW_MS = 60_000;
const MAX_REQ_PER_WINDOW = 10;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQ_PER_WINDOW) return false;
  entry.count += 1;
  return true;
}

function isValidMessage(m: unknown): m is ClientMessage {
  if (typeof m !== "object" || m === null) return false;
  const { role, content } = m as Record<string, unknown>;
  return (
    (role === "user" || role === "assistant") &&
    typeof content === "string" &&
    content.trim().length > 0
  );
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response("BradyAI is not configured right now.", { status: 500 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateLimit(ip)) {
    return new Response("Rate limit exceeded. Please try again shortly.", {
      status: 429,
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response("Bad request.", { status: 400 });
  }

  const messages = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response("No messages provided.", { status: 400 });
  }
  if (messages.length > MAX_MESSAGES) {
    return new Response("Conversation too long.", { status: 400 });
  }
  if (!messages.every(isValidMessage)) {
    return new Response("Invalid message format.", { status: 400 });
  }

  const valid = messages as ClientMessage[];
  const last = valid[valid.length - 1];
  if (last.role !== "user") {
    return new Response("Last message must be from the user.", { status: 400 });
  }
  if (last.content.length > MAX_USER_CHARS) {
    return new Response("Message too long.", { status: 400 });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const ms = client.messages.stream({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system: SYSTEM_PROMPT,
          messages: valid.map((m) => ({ role: m.role, content: m.content })),
        });
        for await (const event of ms) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch {
        // Status is already 200 once streaming begins, so surface the error
        // inline as a short sentinel the client renders as-is.
        controller.enqueue(
          encoder.encode("\n[BradyAI hit an error. Please try again.]"),
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
