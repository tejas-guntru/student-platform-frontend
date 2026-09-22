import {
  BadgeCheck,
  CircleAlert,
} from "lucide-react";

interface VerificationBadgeProps {
  status:
    | "VERIFIED"
    | "UNVERIFIED";
}

export default function VerificationBadge({
  status,
}: VerificationBadgeProps) {
  const verified =
    status === "VERIFIED";

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        px-2.5
        py-1.5
        text-[9px]
        font-bold
        uppercase
        tracking-[0.09em]

        ${
          verified
            ? `
              border-emerald-200
              bg-emerald-50
              text-emerald-700
            `
            : `
              border-amber-200
              bg-amber-50
              text-amber-700
            `
        }
      `}
    >
      {verified ? (
        <BadgeCheck
          size={12}
          strokeWidth={2.3}
        />
      ) : (
        <CircleAlert
          size={12}
          strokeWidth={2.3}
        />
      )}

      {verified
        ? "Verified"
        : "Unverified"}
    </span>
  );
}