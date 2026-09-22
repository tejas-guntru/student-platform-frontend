import {
  Code2,
  Link2,
} from "lucide-react";

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
    <section
      className="
        overflow-hidden
        rounded-[28px]
        border
        border-[#DCEAF5]
        bg-white
        shadow-[0_10px_34px_rgba(8,119,232,0.045)]
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-[#E5EFF7]
          bg-[#FBFDFF]
          px-5
          py-5

          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-6
        "
      >
        <div
          className="
            flex
            items-start
            gap-3
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-[#EAF6FF]
              text-[#0877E8]
            "
          >
            <Code2 size={18} />
          </div>

          <SectionHeader
            title="Coding Profiles"
            subtitle="Connected competitive programming accounts"
          />
        </div>

        {candidate.codingProfiles.length > 0 && (
          <div
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-[#D7E8F4]
              bg-white
              px-3
              py-1.5
              text-[10px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-[#67839A]
            "
          >
            <Link2
              size={13}
              className="text-[#0877E8]"
            />

            {candidate.codingProfiles.length}{" "}
            {candidate.codingProfiles.length === 1
              ? "profile"
              : "profiles"}
          </div>
        )}
      </div>

      {/* CONTENT */}

      <div
        className="
          p-5

          sm:p-6
        "
      >
        {candidate.codingProfiles.length === 0 ? (
          <EmptyCard>
            No coding profiles connected.
          </EmptyCard>
        ) : (
          <div
            className="
              grid
              gap-5

              lg:grid-cols-3
            "
          >
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
      </div>
    </section>
  );
}