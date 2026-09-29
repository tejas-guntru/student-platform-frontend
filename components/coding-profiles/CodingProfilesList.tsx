"use client";

import {
  useState,
} from "react";

import {
  ArrowUpRight,
  CheckCircle2,
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
  const [
    selectedPlatform,
    setSelectedPlatform,
  ] =
    useState<CodingPlatform | null>(
      null
    );

  const selectedConfig =
    selectedPlatform
      ? codingPlatforms.find(
          (config) =>
            config.platform ===
            selectedPlatform
        )
      : undefined;

  /*
   * DETAIL MODE
   */
  if (
    selectedPlatform &&
    selectedConfig
  ) {
    const profile =
      getProfile(
        selectedPlatform
      );

    return (
      <CodingPlatformCard
        config={
          selectedConfig
        }
        profile={
          profile
        }
        username={
          usernames[
            selectedPlatform
          ]
        }
        editing={
          editingPlatform ===
          selectedPlatform
        }
        working={
          workingPlatform ===
          selectedPlatform
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
        onBack={() => {
          setSelectedPlatform(
            null
          );

          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      />
    );
  }

  /*
   * LIST MODE
   */
  return (
    <section>
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
          Connect and manage your
          competitive programming
          profiles.
        </p>
      </div>

      <div
        className="
          mt-6
          grid
          gap-4

          sm:grid-cols-2
        "
      >
        {codingPlatforms.map(
          (config) => {
            const profile =
              getProfile(
                config.platform
              );

            const connected =
              Boolean(profile);

            return (
              <button
                key={
                  config.platform
                }
                type="button"
                onClick={() => {
                  setSelectedPlatform(
                    config.platform
                  );

                  window.scrollTo({
                    top: 0,
                    behavior:
                      "smooth",
                  });
                }}
                className="
                  group
                  flex
                  min-h-[210px]
                  w-full
                  flex-col
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-5
                  text-left
                  transition-all
                  duration-200

                  hover:-translate-y-0.5
                  hover:border-slate-300
                  hover:shadow-[0_14px_35px_rgba(15,23,42,0.07)]

                  focus:outline-none
                  focus:ring-4
                  focus:ring-[#1256AF]/10

                  sm:p-6
                "
              >
                {/* TOP */}

                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-4
                  "
                >
                  <div
                    className={`
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl

                      ${
                        connected
                          ? "bg-[#EAF2FF] text-[#1256AF]"
                          : "bg-slate-100 text-slate-400"
                      }
                    `}
                  >
                    <Code2
                      size={18}
                    />
                  </div>

                  <div
                    className={`
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      px-2.5
                      py-1
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.08em]

                      ${
                        connected
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }
                    `}
                  >
                    {connected && (
                      <CheckCircle2
                        size={11}
                      />
                    )}

                    {connected
                      ? "Connected"
                      : "Not connected"}
                  </div>
                </div>

                {/* PLATFORM */}

                <div className="mt-5">
                  <h3
                    className="
                      text-xl
                      font-bold
                      tracking-[-0.03em]
                      text-slate-950
                    "
                  >
                    {config.name}
                  </h3>

                  <p
                    className="
                      mt-2
                      line-clamp-2
                      text-sm
                      leading-6
                      text-slate-500
                    "
                  >
                    {config.description}
                  </p>
                </div>

                {/* ACCOUNT */}

                {profile && (
                  <div
                    className="
                      mt-4
                      inline-flex
                      w-fit
                      max-w-full
                      items-center
                      rounded-lg
                      bg-slate-50
                      px-3
                      py-2
                    "
                  >
                    <span
                      className="
                        truncate
                        text-xs
                        font-semibold
                        text-slate-600
                      "
                    >
                      @{profile.username}
                    </span>
                  </div>
                )}

                {/* BOTTOM */}

                <div
                  className="
                    mt-auto
                    flex
                    items-center
                    justify-between
                    pt-5
                  "
                >
                  <span
                    className="
                      text-xs
                      font-semibold
                      text-slate-400
                      transition-colors

                      group-hover:text-[#1256AF]
                    "
                  >
                    {connected
                      ? "Manage profile"
                      : "Connect profile"}
                  </span>

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-slate-200
                      text-slate-500
                      transition-all

                      group-hover:border-[#1256AF]
                      group-hover:bg-[#1256AF]
                      group-hover:text-white
                    "
                  >
                    <ArrowUpRight
                      size={15}
                    />
                  </div>
                </div>
              </button>
            );
          }
        )}
      </div>
    </section>
  );
}