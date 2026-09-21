"use client";

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

function ProfileLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8F7F3] text-[#14213D]">
      <p role="status">Loading profile...</p>
    </main>
  );
}

function ProfilePageBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(244,162,97,0.16),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(42,157,143,0.12),_transparent_30%)]"
    />
  );
}

function ProfileFooter() {
  return (
    <footer className="mt-12 border-t border-[#14213D]/10 pt-6 text-center text-sm text-[#14213D]/60">
      Keep your profile up to date for better opportunities.
    </footer>
  );
}

export default function ProfilePage() {
  const profile =
    useStudentProfile();

  if (profile.loading) {
    return <ProfileLoading />;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8F7F3] text-[#14213D]">
      <ProfilePageBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-8 sm:py-10 lg:py-12">
        <ProfileHeader />

        <ProfileAlerts
          error={profile.error}
          success={profile.success}
        />

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

        <ProfileCompletionSection
          completion={
            profile.completion
          }
        />

        <ProfileSectionsGrid />

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

        <ProfileNextStep
          percentage={
            profile.completion
              ?.percentage
          }
        />

        <ProfileFooter />
      </div>
    </main>
  );
}