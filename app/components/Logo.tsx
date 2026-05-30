export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-[family-name:var(--font-display)] font-semibold tracking-tight ${className}`}
    >
      B<span className="text-accent">H</span>
    </span>
  );
}
