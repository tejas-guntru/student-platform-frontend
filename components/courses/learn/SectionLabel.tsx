import { cn } from "./utils";

export function SectionLabel({
  index,
  label,
  tone = "light",
}: {
  index: string;
  label: string;
  tone?: "light" | "dark";
}) {
  return (
    <div>
      <p
        className={cn(
          "text-xs font-semibold tracking-[0.14em] uppercase",
          tone === "dark" ? "text-white/60" : "text-[#6b7f96]"
        )}
      >
        {index} — {label}
      </p>
      <span
        className="mt-3 block h-0.5 w-7 rounded-full bg-[#ff6b35]"
        aria-hidden="true"
      />
    </div>
  );
}
