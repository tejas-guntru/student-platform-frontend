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

/* =========================================================
   LOADING
========================================================= */

function CodingProfilesLoading() {
  return (
    <div
      className="
        flex
        min-h-[70vh]
        items-center
        justify-center
        bg-[#F7F9FC]
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
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-sm
          "
        >
          <LoaderCircle
            size={20}
            className="
              animate-spin
              text-[#1256AF]
            "
          />
        </div>

        <p
          role="status"
          className="
            mt-4
            text-sm
            font-semibold
            text-slate-600
          "
        >
          Loading coding profiles...
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function CodingProfilesPage() {
  const coding =
    useCodingProfiles();

  if (coding.loading) {
    return <CodingProfilesLoading />;
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
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* HEADER */}

      <CodingProfilesHeader
        connectedCount={
          connectedCount
        }
        totalCount={
          codingPlatforms.length
        }
      />

      {/* CONTENT */}

      <div
        className="
          mx-auto
          max-w-6xl
          px-4
          py-8

          sm:px-6

          lg:px-8
          lg:py-10
        "
      >
        {/* ALERTS */}

        <ProfileAlerts
          error={
            coding.error
          }
          success={
            coding.success
          }
        />

        {/* CODING PROFILES */}

        <section className="mt-6">
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
        </section>
      </div>
    </div>
  );
}