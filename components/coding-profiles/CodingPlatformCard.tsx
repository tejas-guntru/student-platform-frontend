"use client";

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
  return (
    <article className="rounded-[24px] border border-[#D8D5CC] bg-white p-6 shadow-[0_16px_45px_rgba(20,33,61,0.05)] sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
        {/* DETAILS */}
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold tracking-[-0.03em] text-[#14213D]">
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

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#6B707B]">
            {config.description}
          </p>

          {profile && (
            <div className="mt-5">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#858994]">
                Connected account
              </p>

              <p className="mt-1 font-bold text-[#14213D]">
                {profile.username}
              </p>
            </div>
          )}
        </div>

        {/* FORM */}
        <div className="w-full lg:max-w-md">
          <label className="mb-2 block text-sm font-semibold text-[#14213D]">
            Username
          </label>

          <input
            type="text"
            value={
              username
            }
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
            className={`${profileInputClass} disabled:cursor-not-allowed disabled:bg-[#EEECE6] disabled:text-[#858994] disabled:opacity-70`}
          />

          <div className="mt-3 flex flex-wrap gap-3">
            {!profile && (
              <button
                type="button"
                disabled={
                  working
                }
                onClick={() =>
                  onConnect(
                    config.platform
                  )
                }
                className="rounded-xl bg-[#C9A227] px-4 py-2.5 text-sm font-bold text-[#14213D] transition hover:bg-[#E0C766] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {working
                  ? "Connecting..."
                  : "Connect"}
              </button>
            )}

            {profile &&
              !editing && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      onEdit(
                        profile
                      )
                    }
                    className="rounded-xl border border-[#D8D5CC] bg-[#F8F7F3] px-4 py-2.5 text-sm font-bold text-[#14213D] transition hover:border-[#C9A227] hover:bg-white hover:text-[#A98616]"
                  >
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
                    className="rounded-xl bg-[#C9A227] px-4 py-2.5 text-sm font-bold text-[#14213D] transition hover:bg-[#E0C766] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {working
                      ? "Refreshing..."
                      : "Refresh Stats"}
                  </button>
                </>
              )}

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
                    className="rounded-xl bg-[#C9A227] px-4 py-2.5 text-sm font-bold text-[#14213D] transition hover:bg-[#E0C766] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {working
                      ? "Saving..."
                      : "Save Username"}
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
                    className="rounded-xl border border-[#D8D5CC] bg-[#F8F7F3] px-4 py-2.5 text-sm font-bold text-[#14213D] transition hover:border-[#C9A227] hover:bg-white disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </>
              )}
          </div>
        </div>
      </div>

      {profile && (
        <CodingProfileStats
          profile={
            profile
          }
        />
      )}
    </article>
  );
}