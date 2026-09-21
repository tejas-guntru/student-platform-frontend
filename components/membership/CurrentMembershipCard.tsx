import type {
  MembershipResponse,
} from "@/types/membership";

import {
  formatDate,
} from "@/utils/membershipFormatters";

interface CurrentMembershipCardProps {
  membership:
    MembershipResponse | null;
}

export default function CurrentMembershipCard({
  membership,
}: CurrentMembershipCardProps) {
  const isActive =
    membership?.active === true ||
    membership?.status === "ACTIVE";

  return (
    <div className="rounded-[24px] border border-[#D8D5CC] bg-white p-7 shadow-[0_16px_45px_rgba(20,33,61,0.05)]">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-[#C9A227]" />

        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#C9A227]">
          Current Membership
        </p>
      </div>

      {isActive ? (
        <>
          <div className="mt-5">
            <span className="inline-flex rounded-full border border-[#BFD7C3] bg-[#F1F8F2] px-4 py-2 text-sm font-bold text-[#347A3A]">
              ACTIVE
            </span>
          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <Detail
              label="Starts"
              value={formatDate(
                membership?.startsAt
              )}
            />

            <Detail
              label="Valid Until"
              value={formatDate(
                membership?.endsAt
              )}
            />
          </div>

          <p className="mt-7 text-sm leading-6 text-[#6B707B]">
            Your membership is active.
            You can apply to available
            jobs and internships.
          </p>
        </>
      ) : (
        <>
          <div className="mt-5">
            <span className="inline-flex rounded-full border border-[#E8DCA9] bg-[#FBF7E8] px-4 py-2 text-sm font-bold text-[#806E30]">
              INACTIVE
            </span>
          </div>

          <p className="mt-6 text-sm leading-6 text-[#6B707B]">
            Activate membership to
            start applying for
            opportunities.
          </p>
        </>
      )}
    </div>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-[#E3DFD5] bg-[#F8F7F3] p-4">
      <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#858994]">
        {label}
      </p>

      <p className="mt-2 font-bold text-[#14213D]">
        {value}
      </p>
    </div>
  );
}