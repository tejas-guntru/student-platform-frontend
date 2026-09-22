import type {
  AdminCandidateCodingProfile,
} from "@/types/adminCandidate";

import {
  formatCandidateText,
} from "@/utils/adminCandidateUtils";

import MiniStat from "./shared/MiniStat";

interface CandidateCodingProfileCardProps {
  profile:
    AdminCandidateCodingProfile;
}

export default function CandidateCodingProfileCard({
  profile,
}: CandidateCodingProfileCardProps) {
  const verified =
    profile.verificationStatus ===
    "VERIFIED";

  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-zinc-500">
            {formatCandidateText(
              profile.platform
            )}
          </p>

          <h3 className="mt-1 text-lg font-semibold">
            {profile.username}
          </h3>
        </div>

        <span
          className={
            verified
              ? "rounded-full border border-emerald-900 bg-emerald-950/30 px-2.5 py-1 text-[10px] font-semibold text-emerald-400"
              : "rounded-full border border-amber-900 bg-amber-950/30 px-2.5 py-1 text-[10px] font-semibold text-amber-400"
          }
        >
          {profile.verificationStatus}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <MiniStat
          label="Rating"
          value={profile.currentRating}
        />

        <MiniStat
          label="Max Rating"
          value={profile.maxRating}
        />

        <MiniStat
          label="Problems"
          value={profile.problemsSolved}
        />

        <MiniStat
          label="Contests"
          value={profile.contestCount}
        />
      </div>

      {profile.profileUrl && (
        <a
          href={profile.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-block text-sm font-semibold text-zinc-300 underline hover:text-white"
        >
          Open Profile →
        </a>
      )}
    </article>
  );
}