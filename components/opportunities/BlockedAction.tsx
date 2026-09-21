import Link from "next/link";

interface BlockedActionProps {
  membershipEligible:
    boolean;

  profileEligible:
    boolean;

  graduationEligible:
    boolean;

  deadlineOpen:
    boolean;

  opportunityActive:
    boolean;
}

export default function BlockedAction({
  membershipEligible,
  profileEligible,
  graduationEligible,
  deadlineOpen,
  opportunityActive,
}: BlockedActionProps) {
  if (
    !membershipEligible
  ) {
    return (
      <Link
        href="/membership"
        className="mt-6 block w-full rounded-xl bg-[#C9A227] px-5 py-3 text-center font-bold text-[#14213D] transition hover:bg-[#E0C766]"
      >
        Get Membership
      </Link>
    );
  }

  if (
    !profileEligible
  ) {
    return (
      <Link
        href="/profile"
        className="mt-6 block w-full rounded-xl bg-[#C9A227] px-5 py-3 text-center font-bold text-[#14213D] transition hover:bg-[#E0C766]"
      >
        Complete Profile
      </Link>
    );
  }

  if (
    !graduationEligible
  ) {
    return (
      <Link
        href="/profile"
        className="mt-6 block w-full rounded-xl border border-[#E4C7C7] bg-[#FBF1F1] px-5 py-3 text-center font-bold text-[#A43F3F] transition hover:bg-[#F7E7E7]"
      >
        Check Graduation Year
      </Link>
    );
  }

  if (
    !deadlineOpen
  ) {
    return (
      <button
        type="button"
        disabled
        className="mt-6 w-full cursor-not-allowed rounded-xl bg-[#EEECE6] px-5 py-3 font-bold text-[#858994]"
      >
        Applications Closed
      </button>
    );
  }

  if (
    !opportunityActive
  ) {
    return (
      <button
        type="button"
        disabled
        className="mt-6 w-full cursor-not-allowed rounded-xl bg-[#EEECE6] px-5 py-3 font-bold text-[#858994]"
      >
        Opportunity Closed
      </button>
    );
  }

  return null;
}