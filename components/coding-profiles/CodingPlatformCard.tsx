"use client";

import {
  Code2,
  LoaderCircle,
  Pencil,
  RefreshCw,
  Save,
  UserRound,
  X,
} from "lucide-react";

import type {
  CodingPlatform,
  CodingProfile,
} from "@/types/codingProfile";

import type {
  PlatformConfig,
} from "@/constants/codingPlatforms";

import {
  profileInputClass,
} from "@/components/profile/profileStyles";

import VerificationBadge from "@/components/coding-profiles/VerificationBadge";
import CodingProfileStats from "@/components/coding-profiles/CodingProfileStats";

interface CodingPlatformCardProps {
  config: PlatformConfig;

  profile:
    | CodingProfile
    | undefined;

  username: string;

  editing: boolean;
  working: boolean;

  onUsernameChange: (
    platform: CodingPlatform,
    value: string
  ) => void;

  onConnect: (
    platform: CodingPlatform
  ) => void;

  onEdit: (
    profile: CodingProfile
  ) => void;

  onCancel: (
    profile: CodingProfile
  ) => void;

  onUpdate: (
    profile: CodingProfile
  ) => void;

  onRefresh: (
    platform: CodingPlatform
  ) => void;
}

export default function CodingPlatformCard({
  config,
  profile,
  username,

  editing,
  working,

  onUsernameChange,

  onConnect,
  onEdit,
  onCancel,
  onUpdate,
  onRefresh,
}: CodingPlatformCardProps) {
  const connected =
    Boolean(profile);

  return (
    <article
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        transition-all
        duration-200

        hover:border-slate-300
        hover:shadow-[0_12px_32px_rgba(15,23,42,0.055)]
      "
    >
      {/* =====================================================
          MAIN
      ===================================================== */}

      <div
        className="
          p-5

          sm:p-6
        "
      >
        <div
          className="
            grid
            gap-6

            lg:grid-cols-[minmax(0,1fr)_minmax(300px,380px)]
            lg:items-start
          "
        >
          {/* =================================================
              PLATFORM INFORMATION
          ================================================= */}

          <div>
            <div
              className="
                flex
                items-start
                gap-4
              "
            >
              {/* ICON */}

              <div
                className={`
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl

                  ${
                    connected
                      ? "bg-[#1256AF]/[0.07] text-[#1256AF]"
                      : "bg-slate-100 text-slate-400"
                  }
                `}
              >
                <Code2 size={18} />
              </div>

              {/* DETAILS */}

              <div className="min-w-0">
                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-2
                  "
                >
                  <h2
                    className="
                      text-xl
                      font-bold
                      tracking-[-0.03em]
                      text-slate-950
                    "
                  >
                    {config.name}
                  </h2>

                  {profile && (
                    <VerificationBadge
                      status={
                        profile.verificationStatus
                      }
                    />
                  )}
                </div>

                <p
                  className="
                    mt-2
                    max-w-xl
                    text-sm
                    leading-6
                    text-slate-500
                  "
                >
                  {config.description}
                </p>
              </div>
            </div>

            {/* ===============================================
                CONNECTION STATE
            =============================================== */}

            {profile ? (
              <div
                className="
                  mt-5
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-slate-200
                  bg-[#F8FAFC]
                  px-4
                  py-3
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
                    rounded-lg
                    bg-white
                    text-[#1256AF]
                    shadow-sm
                  "
                >
                  <UserRound size={15} />
                </div>

                <div className="min-w-0">
                  <p
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-slate-400
                    "
                  >
                    Connected account
                  </p>

                  <p
                    className="
                      mt-0.5
                      truncate
                      text-sm
                      font-bold
                      text-slate-700
                    "
                  >
                    {profile.username}
                  </p>
                </div>

                <div
                  className="
                    ml-auto
                    hidden
                    items-center
                    gap-2
                    rounded-full
                    bg-emerald-50
                    px-2.5
                    py-1

                    sm:flex
                  "
                >
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-emerald-500
                    "
                  />

                  <span
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.08em]
                      text-emerald-700
                    "
                  >
                    Connected
                  </span>
                </div>
              </div>
            ) : (
              <div
                className="
                  mt-5
                  rounded-xl
                  border
                  border-dashed
                  border-slate-300
                  bg-[#F8FAFC]
                  px-4
                  py-3.5
                "
              >
                <div
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >
                  <span
                    className="
                      mt-1.5
                      h-2
                      w-2
                      shrink-0
                      rounded-full
                      bg-slate-300
                    "
                  />

                  <div>
                    <p
                      className="
                        text-xs
                        font-bold
                        text-slate-700
                      "
                    >
                      Not connected
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        leading-5
                        text-slate-500
                      "
                    >
                      Enter your username to connect
                      this account to your Trailbliz
                      profile.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* =================================================
              USERNAME + ACTIONS
          ================================================= */}

          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-[#F8FAFC]
              p-4
            "
          >
            <label
              className="
                mb-2
                block
                text-[10px]
                font-bold
                uppercase
                tracking-[0.1em]
                text-slate-500
              "
            >
              Username
            </label>

            <input
              type="text"
              value={username}
              disabled={
                Boolean(profile) &&
                !editing
              }
              onChange={(event) =>
                onUsernameChange(
                  config.platform,
                  event.target.value
                )
              }
              placeholder={
                config.placeholder
              }
              className={
                profileInputClass
              }
            />

            {/* ===============================================
                ACTIONS
            =============================================== */}

            <div
              className="
                mt-4
                flex
                flex-wrap
                gap-2
              "
            >
              {/* NOT CONNECTED */}

              {!profile && (
                <button
                  type="button"
                  disabled={working}
                  onClick={() =>
                    onConnect(
                      config.platform
                    )
                  }
                  className="
                    inline-flex
                    min-h-[40px]
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-[#1256AF]
                    px-4
                    py-2
                    text-sm
                    font-bold
                    text-white
                    transition

                    hover:bg-[#0F4B99]

                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {working ? (
                    <>
                      <LoaderCircle
                        size={14}
                        className="animate-spin"
                      />

                      Connecting...
                    </>
                  ) : (
                    <>
                      <Code2 size={14} />

                      Connect Account
                    </>
                  )}
                </button>
              )}

              {/* CONNECTED + NOT EDITING */}

              {profile &&
                !editing && (
                  <>
                    <button
                      type="button"
                      disabled={working}
                      onClick={() =>
                        onEdit(
                          profile
                        )
                      }
                      className="
                        inline-flex
                        min-h-[40px]
                        items-center
                        justify-center
                        gap-2
                        rounded-lg
                        border
                        border-slate-200
                        bg-white
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-slate-600
                        transition

                        hover:border-slate-300
                        hover:text-slate-900

                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      <Pencil size={13} />

                      Edit Username
                    </button>

                    <button
                      type="button"
                      disabled={working}
                      onClick={() =>
                        onRefresh(
                          config.platform
                        )
                      }
                      className="
                        inline-flex
                        min-h-[40px]
                        items-center
                        justify-center
                        gap-2
                        rounded-lg
                        bg-[#1256AF]
                        px-4
                        py-2
                        text-sm
                        font-bold
                        text-white
                        transition

                        hover:bg-[#0F4B99]

                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    >
                      {working ? (
                        <>
                          <LoaderCircle
                            size={14}
                            className="animate-spin"
                          />

                          Refreshing...
                        </>
                      ) : (
                        <>
                          <RefreshCw
                            size={13}
                          />

                          Refresh Stats
                        </>
                      )}
                    </button>
                  </>
                )}

              {/* CONNECTED + EDITING */}

              {profile &&
                editing && (
                  <>
                    <button
                      type="button"
                      disabled={working}
                      onClick={() =>
                        onUpdate(
                          profile
                        )
                      }
                      className="
                        inline-flex
                        min-h-[40px]
                        items-center
                        justify-center
                        gap-2
                        rounded-lg
                        bg-[#1256AF]
                        px-4
                        py-2
                        text-sm
                        font-bold
                        text-white
                        transition

                        hover:bg-[#0F4B99]

                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    >
                      {working ? (
                        <>
                          <LoaderCircle
                            size={14}
                            className="animate-spin"
                          />

                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={13} />

                          Save Username
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      disabled={working}
                      onClick={() =>
                        onCancel(
                          profile
                        )
                      }
                      className="
                        inline-flex
                        min-h-[40px]
                        items-center
                        justify-center
                        gap-2
                        rounded-lg
                        border
                        border-slate-200
                        bg-white
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-slate-600
                        transition

                        hover:border-slate-300
                        hover:text-slate-900

                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      <X size={13} />

                      Cancel
                    </button>
                  </>
                )}
            </div>
          </div>
        </div>

        {/* =====================================================
            STATS
        ===================================================== */}

        {profile && (
          <div
            className="
              mt-6
              border-t
              border-slate-200
              pt-6
            "
          >
            <CodingProfileStats
              profile={profile}
            />
          </div>
        )}
      </div>
    </article>
  );
}