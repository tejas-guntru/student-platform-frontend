import {
  Code2,
  SearchX,
} from "lucide-react";

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
  // =========================================================
  // EMPTY STATE
  // =========================================================

  if (profiles.length === 0) {
    return (
      <section
        className="
          flex
          flex-col
          items-center
          justify-center
          rounded-[26px]
          border
          border-dashed
          border-[#C9DFEF]
          bg-white/80
          px-6
          py-14
          text-center
          shadow-[0_8px_28px_rgba(8,119,232,0.035)]
        "
      >
        <div
          className="
            relative
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-[22px]
            bg-[#EAF6FF]
            text-[#0877E8]
          "
        >
          <Code2 size={27} />

          <div
            className="
              absolute
              -bottom-1
              -right-1
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              border-2
              border-white
              bg-[#F8FCFF]
              text-[#6B879D]
            "
          >
            <SearchX size={13} />
          </div>
        </div>

        <h2
          className="
            mt-5
            text-lg
            font-bold
            tracking-[-0.025em]
            text-[#173B63]
          "
        >
          No coding profiles found
        </h2>

        <p
          className="
            mt-2
            max-w-md
            text-sm
            leading-6
            text-[#8196A8]
          "
        >
          No student coding accounts match the current
          search, platform or verification filters.
        </p>

        <div
          className="
            mt-5
            rounded-full
            border
            border-[#D8E8F4]
            bg-[#F8FCFF]
            px-3.5
            py-1.5
            text-[10px]
            font-bold
            uppercase
            tracking-[0.13em]
            text-[#7891A4]
          "
        >
          Try changing your filters
        </div>
      </section>
    );
  }

  // =========================================================
  // LIST
  // =========================================================

  return (
    <section className="space-y-5">
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
              onVerify={
                onVerify
              }
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