"use client";

import CodingProfilesHeader from "@/components/coding-profiles/CodingProfilesHeader";
import CodingProfilesList from "@/components/coding-profiles/CodingProfilesList";

import ProfileAlerts from "@/components/profile/ProfileAlerts";

import {
  useCodingProfiles,
} from "@/hooks/useCodingProfiles";

export default function CodingProfilesPage() {
  const coding =
    useCodingProfiles();

  if (coding.loading) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F7F3] text-[#14213D]">
        <div className="flex flex-col items-center">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#E3E1DA] border-t-[#C9A227]" />

          <p className="mt-4 text-sm font-medium text-[#6B707B]">
            Loading coding profiles...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8F7F3] text-[#14213D]">
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-8 sm:py-10 lg:py-12">
        <CodingProfilesHeader />

        <ProfileAlerts
          error={
            coding.error
          }
          success={
            coding.success
          }
        />

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
    </main>
  );
}