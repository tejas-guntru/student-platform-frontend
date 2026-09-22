import {
  BadgeCheck,
  ShieldAlert,
} from "lucide-react";

interface VerificationBadgeProps {
  status:
    | "VERIFIED"
    | "UNVERIFIED";
}

export default function VerificationBadge({
  status,
}: VerificationBadgeProps) {
  if (status === "VERIFIED") {
    return (
      <span
        className="
          inline-flex
          items-center
          gap-1.5
          rounded-full
          border
          border-emerald-200
          bg-emerald-50
          px-3
          py-1.5
          text-[10px]
          font-bold
          uppercase
          tracking-[0.1em]
          text-emerald-700
        "
      >
        <BadgeCheck
          size={13}
          strokeWidth={2.4}
        />

        Verified
      </span>
    );
  }

  return (
    <span
      className="
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        border-amber-200
        bg-amber-50
        px-3
        py-1.5
        text-[10px]
        font-bold
        uppercase
        tracking-[0.1em]
        text-amber-700
      "
    >
      <ShieldAlert
        size={13}
        strokeWidth={2.3}
      />

      Unverified
    </span>
  );
}