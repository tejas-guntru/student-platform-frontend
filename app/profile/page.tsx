"use client";

import {
  LoaderCircle,
  Sparkles,
} from "lucide-react";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileAlerts from "@/components/profile/ProfileAlerts";
import ProfileSummary from "@/components/profile/ProfileSummary";
import ProfileCompletionSection from "@/components/profile/ProfileCompletionSection";
import ProfileSectionsGrid from "@/components/profile/ProfileSectionsGrid";
import BasicProfileForm from "@/components/profile/BasicProfileForm";
import ProfileNextStep from "@/components/profile/ProfileNextStep";

import {
  useStudentProfile,
} from "@/hooks/useStudentProfile";

// =========================================================
// LOADING
// =========================================================

function ProfileLoading() {
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
          bg-[#0877E8]/12
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
          Loading your profile
        </p>

        <p
          className="
            mt-1
            text-sm
            text-[#8095A8]
          "
        >
          Preparing your Trailbliz profile...
        </p>
      </div>
    </main>
  );
}

// =========================================================
// BACKGROUND
// =========================================================

function ProfilePageBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-52
          top-24
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
          -right-56
          top-[760px]
          h-[580px]
          w-[580px]
          rounded-full
          bg-[#0877E8]/8
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

function ProfileFooter() {
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
        <Sparkles
          size={13}
          className="text-[#38A9EE]"
        />

        <span>
          Keep your profile updated so your
          progress stays ready for opportunities.
        </span>
      </div>
    </footer>
  );
}

// =========================================================
// PAGE
// =========================================================

export default function ProfilePage() {
  const profile =
    useStudentProfile();

  if (profile.loading) {
    return <ProfileLoading />;
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
      <ProfilePageBackground />

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
        {/* ===================================================
            HEADER
        =================================================== */}

        <ProfileHeader />

        {/* ===================================================
            ALERTS
        =================================================== */}

        <div className="mt-6">
          <ProfileAlerts
            error={profile.error}
            success={profile.success}
          />
        </div>

        {/* ===================================================
            PROFILE SUMMARY
        =================================================== */}

        <div className="mt-6">
          <ProfileSummary
            fullName={
              profile.fullName
            }
            preferredRole={
              profile.preferredRole
            }
            collegeName={
              profile.collegeName
            }
            degree={
              profile.degree
            }
            branch={
              profile.branch
            }
            graduationYear={
              profile.graduationYear
            }
            city={
              profile.city
            }
          />
        </div>

        {/* ===================================================
            COMPLETION
        =================================================== */}

        <div className="mt-8">
          <ProfileCompletionSection
            completion={
              profile.completion
            }
          />
        </div>

        {/* ===================================================
            PROFILE SECTIONS
        =================================================== */}

        <div className="mt-8">
          <ProfileSectionsGrid />
        </div>

        {/* ===================================================
            BASIC PROFILE
        =================================================== */}

        <div className="mt-8">
          <BasicProfileForm
            fullName={
              profile.fullName
            }
            phone={
              profile.phone
            }
            degree={
              profile.degree
            }
            branch={
              profile.branch
            }
            graduationYear={
              profile.graduationYear
            }
            city={
              profile.city
            }
            preferredRole={
              profile.preferredRole
            }
            bio={
              profile.bio
            }

            collegeId={
              profile.collegeId
            }
            collegeName={
              profile.collegeName
            }
            collegeSearch={
              profile.collegeSearch
            }

            colleges={
              profile.colleges
            }

            searchingColleges={
              profile.searchingColleges
            }

            showCollegeResults={
              profile.showCollegeResults
            }

            saving={
              profile.saving
            }

            setFullName={
              profile.setFullName
            }

            setPhone={
              profile.setPhone
            }

            setDegree={
              profile.setDegree
            }

            setBranch={
              profile.setBranch
            }

            setGraduationYear={
              profile.setGraduationYear
            }

            setCity={
              profile.setCity
            }

            setPreferredRole={
              profile.setPreferredRole
            }

            setBio={
              profile.setBio
            }

            setShowCollegeResults={
              profile.setShowCollegeResults
            }

            updateCollegeSearch={
              profile.updateCollegeSearch
            }

            selectCollege={
              profile.selectCollege
            }

            clearCollege={
              profile.clearCollege
            }

            saveProfile={
              profile.saveProfile
            }
          />
        </div>

        {/* ===================================================
            NEXT STEP
        =================================================== */}

        <div className="mt-8">
          <ProfileNextStep
            percentage={
              profile.completion
                ?.percentage
            }
          />
        </div>

        <ProfileFooter />
      </div>
    </main>
  );
}