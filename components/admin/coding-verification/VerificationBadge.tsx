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
      <span className="rounded-full border border-emerald-900 bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-400">
        VERIFIED
      </span>
    );
  }

  return (
    <span className="rounded-full border border-amber-900 bg-amber-950/40 px-3 py-1 text-xs font-semibold text-amber-400">
      UNVERIFIED
    </span>
  );
}