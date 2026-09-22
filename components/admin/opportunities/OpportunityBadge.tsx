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
    <span
      className="
        inline-flex
        items-center
        rounded-full
        border
        border-[#D6E8F4]
        bg-[#F5FAFF]
        px-3
        py-1.5
        text-[10px]
        font-bold
        uppercase
        tracking-[0.1em]
        text-[#52718A]
      "
    >
      {children}
    </span>
  );
}