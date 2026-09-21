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
    membership?.status ===
      "ACTIVE";

  if (active) {
    return (
      <span className="rounded-full border border-[#BFD7C3] bg-[#F1F8F2] px-4 py-2 text-sm font-bold text-[#347A3A]">
        Membership Active
      </span>
    );
  }

  return (
    <span className="rounded-full border border-[#E8DCA9] bg-[#FBF7E8] px-4 py-2 text-sm font-bold text-[#806E30]">
      Membership Inactive
    </span>
  );
}