"use client";

import {
  Code2,
} from "lucide-react";

import {
  codingPlatforms,
} from "@/constants/codingPlatforms";

import type {
  CodingPlatform,
  CodingProfile,
} from "@/types/codingProfile";

import CodingPlatformCard from "@/components/coding-profiles/CodingPlatformCard";

interface CodingProfilesListProps {
  usernames:
    Record<CodingPlatform, string>;

  editingPlatform:
    CodingPlatform | null;

  workingPlatform:
    CodingPlatform | null;

  getProfile:
    (
      platform: CodingPlatform
    ) =>
      | CodingProfile
      | undefined;

  onUsernameChange:
    (
      platform: CodingPlatform,
      value: string
    ) => void;

  onConnect:
    (
      platform: CodingPlatform
    ) => void;

  onEdit:
    (
      profile: CodingProfile
    ) => void;

  onCancel:
    (
      profile: CodingProfile
    ) => void;

  onUpdate:
    (
      profile: CodingProfile
    ) => void;

  onRefresh:
    (
      platform: CodingPlatform
    ) => void;
}

export default function CodingProfilesList({
  usernames,

  editingPlatform,
  workingPlatform,

  getProfile,

  onUsernameChange,

  onConnect,
  onEdit,
  onCancel,
  onUpdate,
  onRefresh,
}: CodingProfilesListProps) {
  return (
    <section>
      {/* SECTION HEADER */}

      <div>
        <p
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.17em]
            text-[#1256AF]
          "
        >
          Coding platforms
        </p>

        <h2
          className="
            mt-2
            text-2xl
            font-bold
            tracking-[-0.035em]
            text-slate-950
          "
        >
          Connected Accounts
        </h2>

        <p
          className="
            mt-2
            max-w-2xl
            text-sm
            leading-6
            text-slate-500
          "
        >
          Connect your accounts, update usernames
          and refresh your latest competitive
          programming statistics.
        </p>
      </div>

      {/* INFO */}

      <div
        className="
          mt-6
          flex
          items-start
          gap-3
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-4
          py-4
        "
      >
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#1256AF]/[0.07]
            text-[#1256AF]
          "
        >
          <Code2 size={15} />
        </div>

        <div>
          <p
            className="
              text-sm
              font-bold
              text-slate-800
            "
          >
            Keep your usernames current
          </p>

          <p
            className="
              mt-1
              text-xs
              leading-5
              text-slate-500
            "
          >
            Trailbliz uses your connected accounts
            to keep your coding profile and available
            statistics up to date.
          </p>
        </div>
      </div>

      {/* PLATFORM CARDS */}

      <div className="mt-6 space-y-5">
        {codingPlatforms.map(
          (config) => {
            const profile =
              getProfile(
                config.platform
              );

            const editing =
              editingPlatform ===
              config.platform;

            const working =
              workingPlatform ===
              config.platform;

            return (
              <CodingPlatformCard
                key={
                  config.platform
                }
                config={
                  config
                }
                profile={
                  profile
                }
                username={
                  usernames[
                    config.platform
                  ]
                }
                editing={
                  editing
                }
                working={
                  working
                }
                onUsernameChange={
                  onUsernameChange
                }
                onConnect={
                  onConnect
                }
                onEdit={
                  onEdit
                }
                onCancel={
                  onCancel
                }
                onUpdate={
                  onUpdate
                }
                onRefresh={
                  onRefresh
                }
              />
            );
          }
        )}
      </div>
    </section>
  );
}