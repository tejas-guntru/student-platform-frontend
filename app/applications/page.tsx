"use client";

import {
  FileText,
  LoaderCircle,
  Sparkles,
} from "lucide-react";

import ApplicationsHeader from "@/components/applications/ApplicationsHeader";
import ApplicationsList from "@/components/applications/ApplicationsList";

import ProfileAlerts from "@/components/profile/ProfileAlerts";

import {
  useApplications,
} from "@/hooks/useApplications";

// =========================================================
// LOADING
// =========================================================

function ApplicationsLoading() {
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
          Loading applications
        </p>

        <p
          className="
            mt-1
            text-sm
            text-[#8095A8]
          "
        >
          Preparing your application progress...
        </p>
      </div>
    </main>
  );
}

// =========================================================
// BACKGROUND
// =========================================================

function ApplicationsBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-52
          top-20
          h-[520px]
          w-[520px]
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
          top-[560px]
          h-[580px]
          w-[580px]
          rounded-full
          bg-violet-500/7
          blur-[160px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/3
          top-[1200px]
          h-[460px]
          w-[460px]
          rounded-full
          bg-cyan-400/7
          blur-[150px]
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

function ApplicationsFooter() {
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
        <FileText
          size={13}
          className="text-[#0877E8]"
        />

        <span>
          Track every application and keep requested
          documents ready.
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

export default function ApplicationsPage() {
  const applications =
    useApplications();

  if (
    applications.loading
  ) {
    return <ApplicationsLoading />;
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
      <ApplicationsBackground />

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

        <ApplicationsHeader />

        {/* ALERTS */}

        <div className="mt-6">
          <ProfileAlerts
            error={
              applications.error
            }
            success={
              applications.success
            }
          />
        </div>

        {/* APPLICATIONS */}

        <div className="mt-8">
          <ApplicationsList
            applications={
              applications.applications
            }
            selectedFiles={
              applications.selectedFiles
            }
            uploadingId={
              applications.uploadingId
            }
            onFileChange={
              applications.handleFileChange
            }
            onUpload={
              applications.handleResumeUpload
            }
          />
        </div>

        <ApplicationsFooter />
      </div>
    </main>
  );
}