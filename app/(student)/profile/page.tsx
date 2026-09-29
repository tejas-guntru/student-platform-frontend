"use client";

import { LoaderCircle } from "lucide-react";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileAlerts from "@/components/profile/ProfileAlerts";
import ProfileCompletionSection from "@/components/profile/ProfileCompletionSection";
import ProfileSectionsGrid from "@/components/profile/ProfileSectionsGrid";
import ProfileCareer from "@/components/profile/ProfileCareer";
import BasicProfileForm from "@/components/profile/BasicProfileForm";

import { useStudentProfile } from "@/hooks/useStudentProfile";

export default function ProfilePage() {
  const profile = useStudentProfile();

  if (profile.loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#F7F9FC]">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
            <LoaderCircle
              size={20}
              className="animate-spin text-[#1256af]"
            />
          </div>

          <p className="mt-4 text-sm font-semibold text-slate-600">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="space-y-8">
          <ProfileHeader
            fullName={profile.fullName}
            preferredRole={profile.preferredRole}
            collegeName={profile.collegeName}
            degree={profile.degree}
            branch={profile.branch}
            graduationYear={profile.graduationYear}
            city={profile.city}
            percentage={profile.completion?.percentage}
          />

          <ProfileAlerts
            error={profile.error}
            success={profile.success}
          />

          <ProfileCompletionSection
            completion={profile.completion}
          />

          <ProfileSectionsGrid />

          <ProfileCareer />

          <BasicProfileForm
            fullName={profile.fullName}
            phone={profile.phone}
            degree={profile.degree}
            branch={profile.branch}
            graduationYear={profile.graduationYear}
            city={profile.city}
            preferredRole={profile.preferredRole}
            bio={profile.bio}
            collegeId={profile.collegeId}
            collegeName={profile.collegeName}
            collegeSearch={profile.collegeSearch}
            colleges={profile.colleges}
            searchingColleges={
              profile.searchingColleges
            }
            showCollegeResults={
              profile.showCollegeResults
            }
            saving={profile.saving}
            setFullName={profile.setFullName}
            setPhone={profile.setPhone}
            setDegree={profile.setDegree}
            setBranch={profile.setBranch}
            setGraduationYear={
              profile.setGraduationYear
            }
            setCity={profile.setCity}
            setPreferredRole={
              profile.setPreferredRole
            }
            setBio={profile.setBio}
            setShowCollegeResults={
              profile.setShowCollegeResults
            }
            updateCollegeSearch={
              profile.updateCollegeSearch
            }
            selectCollege={profile.selectCollege}
            clearCollege={profile.clearCollege}
            saveProfile={profile.saveProfile}
          />
        </div>
      </main>
    </div>
  );
}