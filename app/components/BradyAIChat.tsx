"use client";

// BradyAI — the interactive chat that replaces the About bio. Visitors ask
// questions and get streamed answers about Brady. Talks to the streaming
// /api/chat route handler; matches the site's warm-dark + sunset-orange tokens.

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Msg = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "Tell me about HouseSwipe",
  "What did you do at Brookfield?",
  "What's your background?",
  "How can I contact you?",
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
    <div className="flex h-[460px] flex-col rounded-2xl border border-border bg-surface p-5">
      {/* Header */}
      <div className="mb-1 flex items-center gap-2">
        <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wide text-muted-2">
          BradyAI
        </span>
        <span
          aria-hidden
          className={`h-1.5 w-1.5 rounded-full bg-accent ${reduced ? "" : "animate-pulse"}`}
        />
      </div>
      <p className="mb-4 text-sm text-muted">
        Ask me anything to learn more about Brady.
      </p>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1"
        aria-live="polite"
      >
        {messages.map((m, i) =>
          m.role === "user" ? (
            <div
              key={i}
              className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-surface-2 px-3.5 py-2.5 text-sm text-foreground"
            >
              {m.content}
            </div>
          ) : (
            <div
              key={i}
              className="mr-auto max-w-[92%] whitespace-pre-wrap text-sm leading-[1.7] text-foreground"
            >
              {m.content}
              {isStreaming && i === messages.length - 1 && !reduced && (
                <span className="ml-0.5 inline-block h-3.5 w-[2px] animate-pulse bg-accent align-middle" />
              )}
            </div>
          ),
        )}
        {error && <p className="text-sm text-accent-strong">{error}</p>}
      </div>

      {/* Starter chips — only before the first message */}
      {!started && (
        <div className="mt-4 flex flex-wrap gap-2">
          {STARTERS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => send(q)}
              disabled={isStreaming}
              className="rounded-full border border-border bg-background px-3 py-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wide text-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="mt-4 flex items-center gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={MAX_CHARS}
          placeholder="Ask about Brady…"
          disabled={isStreaming}
          aria-label="Ask BradyAI a question"
          className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-2 focus:border-accent disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isStreaming || !input.trim()}
          aria-label="Send"
          className="shrink-0 rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent-strong disabled:opacity-50"
        >
          →
        </button>
      </form>
    </div>
  );
}
