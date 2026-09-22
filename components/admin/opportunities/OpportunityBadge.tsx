import type {
  ReactNode,
} from "react";

interface OpportunityBadgeProps {
  children: ReactNode;
}

export default function OpportunityBadge({
  children,
}: OpportunityBadgeProps) {
  return (
    <span className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs font-semibold text-zinc-300">
      {children}
    </span>
  );
}