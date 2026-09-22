import type {
  AdminCodingProfile,
} from "@/types/adminCodingProfile";

import CodingSummaryCard from "./CodingSummaryCard";

interface CodingVerificationSummaryProps {
  profiles: AdminCodingProfile[];
}

export default function CodingVerificationSummary({
  profiles,
}: CodingVerificationSummaryProps) {
  const verifiedCount =
    profiles.filter(
      (profile) =>
        profile.verificationStatus ===
        "VERIFIED"
    ).length;

  const unverifiedCount =
    profiles.filter(
      (profile) =>
        profile.verificationStatus ===
        "UNVERIFIED"
    ).length;

  return (
    <section className="mt-8 grid gap-4 sm:grid-cols-3">
      <CodingSummaryCard
        label="Total Profiles"
        value={profiles.length}
      />

      <CodingSummaryCard
        label="Verified"
        value={verifiedCount}
      />

      <CodingSummaryCard
        label="Pending Verification"
        value={unverifiedCount}
      />
    </section>
  );
}