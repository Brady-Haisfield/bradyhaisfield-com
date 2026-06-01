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
    <div className="flex h-[480px] flex-col rounded-2xl border border-border bg-surface p-6 sm:p-7">
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
          <div className="flex flex-col gap-2.5">
            <span className="mb-0.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-muted-2">
              Try asking
            </span>
            {STARTERS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => send(q)}
                disabled={isStreaming}
                className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3 text-left text-[15px] text-muted transition-colors hover:border-accent/60 hover:text-foreground disabled:opacity-50"
              >
                <span>{q}</span>
                <span
                  aria-hidden
                  className="text-muted-2 transition-colors group-hover:text-accent"
                >
                  →
                </span>
              </button>
            ))}
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
  );
}
