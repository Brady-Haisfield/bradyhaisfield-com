"use client";

// BradyAI — the interactive chat that replaces the About bio. Visitors ask
// questions and get streamed answers about Brady. Talks to the streaming
// /api/chat route handler; matches the site's warm-dark + sunset-orange tokens.

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Msg = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "Who is Brady?",
  "Where did Brady go to school?",
  "What is HouseSwipe?",
  "What are Brady's hobbies?",
];

const MAX_CHARS = 1000;

export default function BradyAIChat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Auto-scroll the message area to the newest content as it streams in.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [messages, reduced]);

  async function send(text: string) {
    const content = text.trim().slice(0, MAX_CHARS);
    if (!content || isStreaming) return;

    setError(null);
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content }];
    // Append an empty assistant message that streamed text fills in place.
    setMessages([...next, { role: "assistant", content: "" }]);
    setIsStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) {
        const msg =
          res.status === 429
            ? "BradyAI is getting a lot of questions right now — please try again in a moment."
            : "Something went wrong. Please try again.";
        setError(msg);
        setMessages(next); // drop the empty assistant placeholder
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          const lastIdx = copy.length - 1;
          copy[lastIdx] = {
            ...copy[lastIdx],
            content: copy[lastIdx].content + chunk,
          };
          return copy;
        });
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setMessages(next);
    } finally {
      setIsStreaming(false);
    }
  }

  const started = messages.length > 0;

  return (
    <div className="glow-card h-[480px] w-full">
      <div
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
        }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface p-6 sm:p-7"
      >
        {/* Cursor spotlight */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(440px circle at var(--mx, 50%) var(--my, 50%), rgba(255,122,69,0.09), transparent 45%)",
          }}
        />

        {/* Greeting */}
        <p className="mb-6 text-[15px] leading-snug text-muted">
          Ask me anything to learn more about Brady.
        </p>

      {/* Body — suggestions before the first message, conversation after */}
      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto pr-1"
        aria-live="polite"
      >
        {!started ? (
          <div>
            <span className="mb-3 block font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-muted-2">
              Try asking
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {STARTERS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  disabled={isStreaming}
                  className="rounded-xl border border-border bg-background px-4 py-3 text-left text-sm leading-snug text-muted transition-colors hover:border-accent/60 hover:text-foreground disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m, i) =>
              m.role === "user" ? (
                <div
                  key={i}
                  className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-surface-2 px-4 py-2.5 text-[15px] text-foreground"
                >
                  {m.content}
                </div>
              ) : (
                <div
                  key={i}
                  className="mr-auto max-w-[94%] whitespace-pre-wrap text-[15px] leading-[1.7] text-foreground"
                >
                  {m.content}
                  {isStreaming && i === messages.length - 1 && !reduced && (
                    <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-accent align-middle" />
                  )}
                </div>
              ),
            )}
            {error && <p className="text-[15px] text-accent-strong">{error}</p>}
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="mt-5 flex items-center gap-2.5"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={MAX_CHARS}
          placeholder="Ask about Brady…"
          disabled={isStreaming}
          aria-label="Ask BradyAI a question"
          className="min-w-0 flex-1 rounded-full border border-border bg-background px-5 py-3 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-2 focus:border-accent disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isStreaming || !input.trim()}
          aria-label="Send"
          className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-accent text-lg text-background transition-colors hover:bg-accent-strong disabled:opacity-40"
        >
          →
        </button>
      </form>
      </div>
    </div>
  );
}
