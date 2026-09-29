"use client";

import {
  ArrowLeft,
  CheckCircle2,
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

  onBack: () => void;
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
  onBack,
}: CodingPlatformCardProps) {
  const connected =
    Boolean(profile);

  return (
    <section>
      {/* BACK */}

      <button
        type="button"
        onClick={onBack}
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          font-semibold
          text-slate-500
          transition-colors

          hover:text-slate-950
        "
      >
        <ArrowLeft size={16} />

        Back to coding profiles
      </button>

      {/* DETAIL CARD */}

      <article
        className="
          mt-5
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
        "
      >
        {/* HEADER */}

        <div
          className="
            border-b
            border-slate-200
            p-5

            sm:p-7
          "
        >
          <div
            className="
              flex
              flex-col
              gap-5

              sm:flex-row
              sm:items-start
              sm:justify-between
            "
          >
            <div
              className="
                flex
                min-w-0
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
                  rounded-xl

                  ${
                    connected
                      ? "bg-[#EAF2FF] text-[#1256AF]"
                      : "bg-slate-100 text-slate-400"
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
                    gap-2
                  "
                >
                  <h1
                    className="
                      text-2xl
                      font-bold
                      tracking-[-0.04em]
                      text-slate-950

                      sm:text-3xl
                    "
                  >
                    {config.name}
                  </h1>

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
                    max-w-2xl
                    text-sm
                    leading-6
                    text-slate-500
                  "
                >
                  {config.description}
                </p>
              </div>
            </div>

            <div
              className={`
                inline-flex
                w-fit
                items-center
                gap-2
                rounded-full
                px-3
                py-1.5
                text-[10px]
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
                  size={12}
                />
              )}

              {connected
                ? "Connected"
                : "Not connected"}
            </div>
          </div>
        </div>

        {/* BODY */}

        <div
          className="
            p-5

            sm:p-7
          "
        >
          {/* CURRENT ACCOUNT */}

          {profile && (
            <div
              className="
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-slate-200
                bg-[#F8FAFC]
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
                  rounded-lg
                  bg-white
                  text-[#1256AF]
                  shadow-sm
                "
              >
                <UserRound
                  size={15}
                />
              </div>

              <div className="min-w-0">
                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.1em]
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
                    text-slate-800
                  "
                >
                  @{profile.username}
                </p>
              </div>
            </div>
          )}

          {/* MANAGEMENT */}

          <section className="mt-6">
            <div>
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-[#1256AF]
                "
              >
                Account settings
              </p>

              <h2
                className="
                  mt-1
                  text-lg
                  font-bold
                  text-slate-900
                "
              >
                {connected
                  ? "Manage account"
                  : "Connect account"}
              </h2>

              <p
                className="
                  mt-1
                  max-w-xl
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                {connected
                  ? "Update your username or refresh your latest coding statistics."
                  : `Enter your ${config.name} username to connect this account.`}
              </p>
            </div>

            <div
              className="
                mt-5
                max-w-xl
                rounded-xl
                border
                border-slate-200
                bg-[#F8FAFC]
                p-4
              "
            >
              <label
                htmlFor={`username-${config.platform}`}
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
                id={`username-${config.platform}`}
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
                  gap-2
                "
              >
                {/* CONNECT */}

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
                        <Code2
                          size={14}
                        />

                        Connect Account
                      </>
                    )}
                  </button>
                )}

                {/* CONNECTED */}

                {profile &&
                  !editing && (
                    <>
                      <button
                        type="button"
                        disabled={
                          working
                        }
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
                        <Pencil
                          size={13}
                        />

                        Edit Username
                      </button>

                      <button
                        type="button"
                        disabled={
                          working
                        }
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

                {/* EDITING */}

                {profile &&
                  editing && (
                    <>
                      <button
                        type="button"
                        disabled={
                          working
                        }
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
                            <Save
                              size={13}
                            />

                            Save Username
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        disabled={
                          working
                        }
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
          </section>

          {/* STATS */}

          {profile && (
            <section
              className="
                mt-7
                border-t
                border-slate-100
                pt-7
              "
            >
              <div className="mb-5">
                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-[#1256AF]
                  "
                >
                  Performance
                </p>

                <h2
                  className="
                    mt-1
                    text-lg
                    font-bold
                    text-slate-900
                  "
                >
                  Coding Statistics
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  Your latest available
                  statistics from{" "}
                  {config.name}.
                </p>
              </div>

              <CodingProfileStats
                profile={profile}
              />
            </section>
          )}
        </div>
      </article>
    </section>
  );
}