import type {
  AdminCodingProfile,
} from "@/types/adminCodingProfile";

import {
  formatCodingPlatform,
  getCodingStudentName,
} from "@/utils/adminCodingProfileUtils";

import VerificationBadge from "./VerificationBadge";
import CodingStatCard from "./CodingStatCard";

interface CodingProfileCardProps {
  profile: AdminCodingProfile;
  working: boolean;

  onVerify: (
    profile: AdminCodingProfile
  ) => void;

  onUnverify: (
    profile: AdminCodingProfile
  ) => void;
}

export default function CodingProfileCard({
  profile,
  working,
  onVerify,
  onUnverify,
}: CodingProfileCardProps) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        {/* STUDENT */}

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-bold">
              {getCodingStudentName(
                profile
              )}
            </h2>

            <VerificationBadge
              status={
                profile.verificationStatus
              }
            />
          </div>

          <p className="mt-2 text-sm text-zinc-500">
            {profile.studentEmail ||
              profile.email ||
              ""}
          </p>

          <div className="mt-5 flex flex-wrap gap-4 text-sm">
            <div>
              <p className="text-xs text-zinc-500">
                Platform
              </p>

              <p className="mt-1 font-semibold">
                {formatCodingPlatform(
                  profile.platform
                )}
              </p>
            </div>

            <div>
              <p className="text-xs text-zinc-500">
                Username
              </p>

              <p className="mt-1 font-semibold">
                {profile.username}
              </p>
            </div>

            {profile.graduationYear && (
              <div>
                <p className="text-xs text-zinc-500">
                  Graduation
                </p>

                <p className="mt-1 font-semibold">
                  {
                    profile.graduationYear
                  }
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ACTIONS */}

        <div className="flex flex-wrap gap-3">
          {profile.profileUrl && (
            <a
              href={profile.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-semibold transition hover:bg-zinc-800"
            >
              Open Profile
            </a>
          )}

          {profile.verificationStatus ===
          "UNVERIFIED" ? (
            <button
              type="button"
              disabled={working}
              onClick={() =>
                onVerify(profile)
              }
              className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-50"
            >
              {working
                ? "Verifying..."
                : "Verify"}
            </button>
          ) : (
            <button
              type="button"
              disabled={working}
              onClick={() =>
                onUnverify(profile)
              }
              className="rounded-lg border border-red-900 bg-red-950/30 px-5 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-950/60 disabled:opacity-50"
            >
              {working
                ? "Updating..."
                : "Unverify"}
            </button>
          )}
        </div>
      </div>

      {/* STATS */}

      <div className="mt-6 grid gap-4 border-t border-zinc-800 pt-6 sm:grid-cols-2 lg:grid-cols-5">
        <CodingStatCard
          label="Current Rating"
          value={
            profile.currentRating
          }
        />

        <CodingStatCard
          label="Max Rating"
          value={profile.maxRating}
        />

        <CodingStatCard
          label="Problems"
          value={
            profile.problemsSolved
          }
        />

        <CodingStatCard
          label="Contests"
          value={profile.contestCount}
        />

        <CodingStatCard
          label="Sync"
          value={
            profile.syncStatus ||
            "-"
          }
        />
      </div>
    </article>
  );
}