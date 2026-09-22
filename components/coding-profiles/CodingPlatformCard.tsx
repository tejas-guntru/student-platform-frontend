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
  config:
    PlatformConfig;

  profile:
    CodingProfile | undefined;

  username: string;

  editing: boolean;
  working: boolean;

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
        group
        relative
        overflow-hidden
        rounded-[26px]
        border
        border-[#DCEAF5]
        bg-white
        shadow-[0_12px_36px_rgba(8,119,232,0.045)]
        transition-all
        duration-300

        hover:border-[#B8DCF3]
        hover:shadow-[0_18px_45px_rgba(8,119,232,0.08)]
      "
    >
      {/* TOP ACCENT */}

      <div
        className={`
          absolute
          left-0
          right-0
          top-0
          h-[3px]
          bg-gradient-to-r

          ${
            connected
              ? "from-[#0877E8] via-violet-500 to-[#38BDF8]"
              : "from-[#B7DAF0] via-[#7CC8F5] to-[#38BDF8]"
          }
        `}
      />

      {/* BACKGROUND GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-28
          -top-28
          h-72
          w-72
          rounded-full
          bg-violet-500/0
          blur-[100px]
          transition-all
          duration-300

          group-hover:bg-violet-500/7
        "
      />

      <div
        className="
          relative
          p-5

          sm:p-7
        "
      >
        {/* ===================================================
            TOP SECTION
        =================================================== */}

        <div
          className="
            grid
            gap-7

            lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]
            lg:items-start
          "
        >
          {/* =================================================
              PLATFORM DETAILS
          ================================================= */}

          <div>
            <div
              className="
                flex
                items-start
                gap-4
              "
            >
              <div
                className={`
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl

                  ${
                    connected
                      ? "bg-[#EAF6FF] text-[#0877E8]"
                      : "bg-[#F2F7FA] text-[#7B96A9]"
                  }
                `}
              >
                <Code2 size={20} />
              </div>

              <div className="min-w-0">
                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-2.5
                  "
                >
                  <h2
                    className="
                      text-2xl
                      font-bold
                      tracking-[-0.035em]
                      text-[#173B63]
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
                    text-[#71899D]
                  "
                >
                  {config.description}
                </p>
              </div>
            </div>

            {/* CONNECTED USER */}

            {profile ? (
              <div
                className="
                  mt-5
                  flex
                  items-center
                  gap-3
                  rounded-[18px]
                  border
                  border-[#DCEAF5]
                  bg-[#F8FCFF]
                  px-4
                  py-3.5
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
                    bg-[#EAF6FF]
                    text-[#0877E8]
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
                      text-[#8A9FAF]
                    "
                  >
                    Connected Account
                  </p>

                  <p
                    className="
                      mt-0.5
                      truncate
                      text-sm
                      font-bold
                      text-[#355E7A]
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
                    gap-1.5
                    rounded-full
                    border
                    border-emerald-200
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
                  flex
                  items-start
                  gap-3
                  rounded-[18px]
                  border
                  border-dashed
                  border-[#C9DFED]
                  bg-[#F8FCFF]
                  px-4
                  py-3.5
                "
              >
                <div
                  className="
                    mt-0.5
                    h-2
                    w-2
                    shrink-0
                    rounded-full
                    bg-[#8CBAD6]
                  "
                />

                <div>
                  <p
                    className="
                      text-xs
                      font-bold
                      text-[#58748B]
                    "
                  >
                    Not connected yet
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      leading-5
                      text-[#8198AA]
                    "
                  >
                    Enter your username to connect this
                    coding profile to Trailbliz.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* =================================================
              USERNAME + ACTIONS
          ================================================= */}

          <div
            className="
              rounded-[20px]
              border
              border-[#E0ECF5]
              bg-[#F8FCFF]
              p-4

              sm:p-5
            "
          >
            <label
              className="
                mb-2
                block
                text-xs
                font-bold
                uppercase
                tracking-[0.08em]
                text-[#5F7C92]
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

            {/* ACTIONS */}

            <div
              className="
                mt-4
                flex
                flex-wrap
                gap-2.5
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
                    min-h-[42px]
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-[#0877E8]
                    to-[#1294F2]
                    px-4
                    py-2.5
                    text-sm
                    font-bold
                    text-white
                    shadow-[0_8px_20px_rgba(8,119,232,0.18)]
                    transition-all
                    duration-200

                    hover:-translate-y-0.5
                    hover:shadow-[0_11px_24px_rgba(8,119,232,0.24)]

                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    disabled:hover:translate-y-0
                  "
                >
                  {working ? (
                    <>
                      <LoaderCircle
                        size={15}
                        className="animate-spin"
                      />

                      Connecting...
                    </>
                  ) : (
                    <>
                      <Code2 size={15} />

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
                        min-h-[42px]
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-[#D5E7F3]
                        bg-white
                        px-4
                        py-2.5
                        text-sm
                        font-bold
                        text-[#58748B]
                        transition-all
                        duration-200

                        hover:border-[#B9DCF2]
                        hover:bg-[#F4FAFF]
                        hover:text-[#0877E8]

                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      <Pencil size={14} />

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
                        min-h-[42px]
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-gradient-to-r
                        from-[#0877E8]
                        to-[#1294F2]
                        px-4
                        py-2.5
                        text-sm
                        font-bold
                        text-white
                        shadow-[0_8px_20px_rgba(8,119,232,0.16)]
                        transition-all
                        duration-200

                        hover:-translate-y-0.5
                        hover:shadow-[0_11px_24px_rgba(8,119,232,0.22)]

                        disabled:cursor-not-allowed
                        disabled:opacity-60
                        disabled:hover:translate-y-0
                      "
                    >
                      {working ? (
                        <>
                          <LoaderCircle
                            size={15}
                            className="animate-spin"
                          />

                          Refreshing...
                        </>
                      ) : (
                        <>
                          <RefreshCw
                            size={14}
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
                        min-h-[42px]
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-gradient-to-r
                        from-[#0877E8]
                        to-[#1294F2]
                        px-4
                        py-2.5
                        text-sm
                        font-bold
                        text-white
                        shadow-[0_8px_20px_rgba(8,119,232,0.18)]
                        transition-all
                        duration-200

                        hover:-translate-y-0.5
                        hover:shadow-[0_11px_24px_rgba(8,119,232,0.24)]

                        disabled:cursor-not-allowed
                        disabled:opacity-60
                        disabled:hover:translate-y-0
                      "
                    >
                      {working ? (
                        <>
                          <LoaderCircle
                            size={15}
                            className="animate-spin"
                          />

                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={14} />

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
                        min-h-[42px]
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-[#D5E7F3]
                        bg-white
                        px-4
                        py-2.5
                        text-sm
                        font-bold
                        text-[#607D92]
                        transition-all
                        duration-200

                        hover:border-[#B9DCF2]
                        hover:bg-[#F4FAFF]
                        hover:text-[#0877E8]

                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      <X size={14} />

                      Cancel
                    </button>
                  </>
                )}
            </div>
          </div>
        </div>

        {/* ===================================================
            PROFILE STATS
        =================================================== */}

        {profile && (
          <div
            className="
              mt-7
              border-t
              border-[#E7F0F7]
              pt-6
            "
          >
            <CodingProfileStats
              profile={
                profile
              }
            />
          </div>
        )}
      </div>
    </article>
  );
}