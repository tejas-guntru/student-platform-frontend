import type {
  AdminCandidate,
} from "@/types/adminCandidate";

import SectionHeader from "./shared/SectionHeader";
import EmptyCard from "./shared/EmptyCard";
import CandidateCodingProfileCard from "./CandidateCodingProfileCard";

interface CandidateCodingProfilesSectionProps {
  candidate: AdminCandidate;
}

export default function CandidateCodingProfilesSection({
  candidate,
}: CandidateCodingProfilesSectionProps) {
  return (
    <section className="mt-10">
      <SectionHeader
        title="Coding Profiles"
        subtitle="Connected competitive programming accounts"
      />

      {candidate.codingProfiles.length ===
      0 ? (
        <EmptyCard>
          No coding profiles connected.
        </EmptyCard>
      ) : (
        <div className="mt-4 grid gap-5 lg:grid-cols-3">
          {candidate.codingProfiles.map(
            (profile) => (
              <CandidateCodingProfileCard
                key={profile.profileId}
                profile={profile}
              />
            )
          )}
        </div>
      )}
    </section>
  );
}