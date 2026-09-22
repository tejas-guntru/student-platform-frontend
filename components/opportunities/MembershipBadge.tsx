import {
  BadgeCheck,
  CircleAlert,
} from "lucide-react";

import type {
  MembershipResponse,
} from "@/types/membership";

interface MembershipBadgeProps {
  membership:
    MembershipResponse | null;
}

export default function MembershipBadge({
  membership,
}: MembershipBadgeProps) {
  const active =
    membership?.active === true ||
    membership?.status === "ACTIVE";

  if (active) {
    return (
      <span
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-emerald-200
          bg-emerald-50
          px-3
          py-2
          text-[10px]
          font-bold
          uppercase
          tracking-[0.08em]
          text-emerald-700
        "
      >
        <BadgeCheck
          size={13}
          strokeWidth={2.3}
        />

        Membership Active
      </span>
    );
  }

  return (
    <span
      className="
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-[#CBE5F8]
        bg-[#EFF8FF]
        px-3
        py-2
        text-[10px]
        font-bold
        uppercase
        tracking-[0.08em]
        text-[#0877E8]
      "
    >
      <CircleAlert
        size={13}
        strokeWidth={2.3}
      />

      Membership Inactive
    </span>
  );
}