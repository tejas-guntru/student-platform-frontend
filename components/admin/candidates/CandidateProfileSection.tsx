import type {
  AdminCandidate,
} from "@/types/adminCandidate";

import SectionHeader from "./shared/SectionHeader";
import InfoCard from "./shared/InfoCard";

interface CandidateProfileSectionProps {
  candidate: AdminCandidate;
}

export default function CandidateProfileSection({
  candidate,
}: CandidateProfileSectionProps) {
  return (
    <section className="mt-8">
      <SectionHeader
        title="Candidate Profile"
        subtitle="Personal and academic information"
      />

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InfoCard
          label="College"
          value={candidate.collegeName}
        />

        <InfoCard
          label="Degree"
          value={candidate.degree}
        />

        <InfoCard
          label="Branch"
          value={candidate.branch}
        />

        <InfoCard
          label="Graduation"
          value={candidate.graduationYear}
        />

        <InfoCard
          label="City"
          value={candidate.city}
        />

        <InfoCard
          label="Phone"
          value={candidate.phone}
        />

        <InfoCard
          label="Preferred Role"
          value={candidate.preferredRole}
        />

        <InfoCard
          label="Email"
          value={candidate.email}
        />
      </div>

      {candidate.bio && (
        <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-xs uppercase tracking-wider text-zinc-500">
            Bio
          </p>

          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-zinc-300">
            {candidate.bio}
          </p>
        </div>
      )}
    </section>
  );
}