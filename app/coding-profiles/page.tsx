"use client";

import {
  Code2,
  LoaderCircle,
  Sparkles,
} from "lucide-react";

import CodingProfilesHeader from "@/components/coding-profiles/CodingProfilesHeader";
import CodingProfilesList from "@/components/coding-profiles/CodingProfilesList";

import ProfileAlerts from "@/components/profile/ProfileAlerts";

import {
  useCodingProfiles,
} from "@/hooks/useCodingProfiles";

// =========================================================
// LOADING
// =========================================================

function CodingProfilesLoading() {
  return (
    <main
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-[#F4F9FF]
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          -left-32
          top-10
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#38BDF8]/15
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          bottom-10
          h-[460px]
          w-[460px]
          rounded-full
          bg-violet-500/10
          blur-[130px]
        "
      />

      <div
        className="
          relative
          flex
          flex-col
          items-center
          text-center
        "
      >
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-[#0877E8]
            to-[#38BDF8]
            text-white
            shadow-[0_14px_35px_rgba(8,119,232,0.25)]
          "
        >
          <LoaderCircle
            size={25}
            className="animate-spin"
          />
        </div>

        <p
          role="status"
          className="
            mt-5
            font-semibold
            text-[#173B63]
          "
        >
          Loading coding profiles
        </p>

        <p
          className="
            mt-1
            text-sm
            text-[#8095A8]
          "
        >
          Preparing your coding accounts...
        </p>
      </div>
    </main>
  );
}

// =========================================================
// BACKGROUND
// =========================================================

function CodingProfilesBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-52
          top-20
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#38BDF8]/10
          blur-[150px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-52
          top-[580px]
          h-[580px]
          w-[580px]
          rounded-full
          bg-violet-500/6
          blur-[160px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.18]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(8,119,232,0.04) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(8,119,232,0.04) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "56px 56px",
        }}
      />
    </>
  );
}

// =========================================================
// FOOTER
// =========================================================

function CodingProfilesFooter() {
  return (
    <footer
      className="
        mt-12
        border-t
        border-[#DCEAF5]
        py-6
        text-center
      "
    >
      <div
        className="
          inline-flex
          items-center
          gap-2
          text-xs
          text-[#8298AB]
        "
      >
        <Code2
          size={13}
          className="text-[#0877E8]"
        />

        <span>
          Keep your coding profiles connected so your
          progress stays visible.
        </span>

        <Sparkles
          size={12}
          className="text-[#38A9EE]"
        />
      </div>
    </footer>
  );
}

// =========================================================
// PAGE
// =========================================================

export default function CodingProfilesPage() {
  const coding =
    useCodingProfiles();

  if (coding.loading) {
    return <CodingProfilesLoading />;
  }

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#F4F9FF]
        text-[#173B63]
      "
    >
      <CodingProfilesBackground />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-6xl
          px-4
          py-6

          sm:px-6
          sm:py-8

          lg:px-8
          lg:py-10
        "
      >
        {/* HEADER */}

        <CodingProfilesHeader />

        {/* ALERTS */}

        <div className="mt-6">
          <ProfileAlerts
            error={
              coding.error
            }
            success={
              coding.success
            }
          />
        </div>

        {/* CODING PROFILES */}

        <div className="mt-8">
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

        <CodingProfilesFooter />
      </div>
    </main>
  );
}