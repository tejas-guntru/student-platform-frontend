import type {
  AdminCodingProfile,
} from "@/types/adminCodingProfile";

import {
  getCodingProfileId,
} from "@/utils/adminCodingProfileUtils";

import CodingProfileCard from "./CodingProfileCard";

interface CodingProfilesListProps {
  profiles:
    AdminCodingProfile[];

  workingId:
    string | null;

  onVerify: (
    profile: AdminCodingProfile
  ) => void;

  onUnverify: (
    profile: AdminCodingProfile
  ) => void;
}

export default function CodingProfilesList({
  profiles,
  workingId,
  onVerify,
  onUnverify,
}: CodingProfilesListProps) {
  if (profiles.length === 0) {
    return (
      <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">
        <p className="text-zinc-400">
          No coding profiles found.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-8 space-y-5">
      {profiles.map(
        (profile, index) => {
          const id =
            getCodingProfileId(
              profile
            ) ||
            String(index);

          return (
            <CodingProfileCard
              key={id}
              profile={profile}
              working={
                workingId === id
              }
              onVerify={onVerify}
              onUnverify={
                onUnverify
              }
            />
          );
        }
      )}
    </section>
  );
}