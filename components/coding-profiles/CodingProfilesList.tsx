"use client";

import {
  Code2,
  Sparkles,
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
      platform:
        CodingPlatform
    ) =>
      | CodingProfile
      | undefined;

  onUsernameChange:
    (
      platform:
        CodingPlatform,
      value: string
    ) => void;

  onConnect:
    (
      platform:
        CodingPlatform
    ) => void;

  onEdit:
    (
      profile:
        CodingProfile
    ) => void;

  onCancel:
    (
      profile:
        CodingProfile
    ) => void;

  onUpdate:
    (
      profile:
        CodingProfile
    ) => void;

  onRefresh:
    (
      platform:
        CodingPlatform
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
  const connectedCount =
    codingPlatforms.filter(
      (config) =>
        Boolean(
          getProfile(
            config.platform
          )
        )
    ).length;

  return (
    <section>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          flex
          flex-col
          gap-4

          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div>
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#0877E8]
              "
            >
              Coding Platforms
            </p>

            <Sparkles
              size={12}
              className="text-violet-500"
            />
          </div>

          <h2
            className="
              mt-2
              text-2xl
              font-bold
              tracking-[-0.035em]
              text-[#173B63]
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
              text-[#71899D]
            "
          >
            Connect your competitive programming
            accounts, keep usernames current and refresh
            your latest coding statistics.
          </p>
        </div>

        {/* CONNECTION COUNT */}

        <div
          className="
            inline-flex
            w-fit
            items-center
            gap-3
            rounded-[16px]
            border
            border-[#D6E7F3]
            bg-white
            px-4
            py-3
            shadow-[0_8px_22px_rgba(8,119,232,0.04)]
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-[#EAF6FF]
              text-[#0877E8]
            "
          >
            <Code2 size={16} />
          </div>

          <div>
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-[#8A9FAF]
              "
            >
              Connected
            </p>

            <p
              className="
                mt-0.5
                text-sm
                font-bold
                text-[#173B63]
              "
            >
              {connectedCount} /{" "}
              {codingPlatforms.length}
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          PLATFORM CARDS
      ===================================================== */}

      <div
        className="
          mt-5
          space-y-5
        "
      >
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