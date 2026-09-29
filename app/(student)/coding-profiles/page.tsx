"use client";

import {
  LoaderCircle,
} from "lucide-react";

import CodingProfilesHeader from "@/components/coding-profiles/CodingProfilesHeader";
import CodingProfilesList from "@/components/coding-profiles/CodingProfilesList";

import ProfileAlerts from "@/components/profile/ProfileAlerts";

import {
  codingPlatforms,
} from "@/constants/codingPlatforms";

import {
  useCodingProfiles,
} from "@/hooks/useCodingProfiles";

function CodingProfilesLoading() {
  return (
    <main
      className="
        flex
        min-h-[65vh]
        items-center
        justify-center
        bg-[#F7F9FC]
        px-4
      "
    >
      <div className="text-center">
        <div
          className="
            mx-auto
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            text-[#1256AF]
            shadow-sm
          "
        >
          <LoaderCircle
            size={20}
            className="animate-spin"
          />
        </div>

        <p
          role="status"
          className="
            mt-4
            text-sm
            font-semibold
            text-slate-700
          "
        >
          Loading coding profiles
        </p>

        <p
          className="
            mt-1
            text-xs
            text-slate-500
          "
        >
          Preparing your connected
          accounts...
        </p>
      </div>
    </main>
  );
}

export default function CodingProfilesPage() {
  const coding =
    useCodingProfiles();

  if (coding.loading) {
    return (
      <CodingProfilesLoading />
    );
  }

  const connectedCount =
    codingPlatforms.filter(
      (config) =>
        Boolean(
          coding.getProfile(
            config.platform
          )
        )
    ).length;

  return (
    <main
      className="
        min-h-screen
        bg-[#F7F9FC]
        text-slate-900
      "
    >
      <CodingProfilesHeader
        connectedCount={
          connectedCount
        }
        totalCount={
          codingPlatforms.length
        }
      />

      <div
        className="
          mx-auto
          max-w-6xl
          px-4
          py-8

          sm:px-6
          sm:py-10

          lg:px-8
        "
      >
        {(coding.error ||
          coding.success) && (
          <ProfileAlerts
            error={
              coding.error
            }
            success={
              coding.success
            }
          />
        )}

        <div
          className={
            coding.error ||
            coding.success
              ? "mt-6"
              : ""
          }
        >
          <CodingProfilesList
            usernames={
              coding.usernames
            }
            editingPlatform={
              coding.editingPlatform
            }
            workingPlatform={
              coding.workingPlatform
            }
            getProfile={
              coding.getProfile
            }
            onUsernameChange={
              coding.updateUsername
            }
            onConnect={
              coding.handleConnect
            }
            onEdit={
              coding.startEdit
            }
            onCancel={
              coding.cancelEdit
            }
            onUpdate={
              coding.handleUpdate
            }
            onRefresh={
              coding.handleRefresh
            }
          />
        </div>
      </div>
    </main>
  );
}