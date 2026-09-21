interface VerificationBadgeProps {
  status:
    | "VERIFIED"
    | "UNVERIFIED";
}

export default function VerificationBadge({
  status,
}: VerificationBadgeProps) {
  if (
    status === "VERIFIED"
  ) {
    return (
      <span className="rounded-full border border-[#BFD7C3] bg-[#F1F8F2] px-3 py-1 text-xs font-bold text-[#347A3A]">
        VERIFIED
      </span>
    );
  }

  return (
    <span className="rounded-full border border-[#E8DCA9] bg-[#FBF7E8] px-3 py-1 text-xs font-bold text-[#806E30]">
      UNVERIFIED
    </span>
  );
}