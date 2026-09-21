"use client";

import type { College } from "@/types/college";

import ProfileField from "@/components/profile/ProfileField";
import CollegeSearch from "@/components/profile/CollegeSearch";

import {
  profileInputClass,
} from "@/components/profile/profileStyles";

interface BasicProfileFormProps {
  fullName: string;
  phone: string;
  degree: string;
  branch: string;
  graduationYear: string;
  city: string;
  preferredRole: string;
  bio: string;

  collegeId: string | null;
  collegeName: string;
  collegeSearch: string;

  colleges: College[];

  searchingColleges: boolean;
  showCollegeResults: boolean;

  saving: boolean;

  setFullName: (value: string) => void;
  setPhone: (value: string) => void;
  setDegree: (value: string) => void;
  setBranch: (value: string) => void;
  setGraduationYear: (value: string) => void;
  setCity: (value: string) => void;
  setPreferredRole: (value: string) => void;
  setBio: (value: string) => void;

  setShowCollegeResults: (
    value: boolean
  ) => void;

  updateCollegeSearch: (
    value: string
  ) => void;

  selectCollege: (
    college: College
  ) => void;

  clearCollege: () => void;

  saveProfile: () => void;
}

export default function BasicProfileForm({
  fullName,
  phone,
  degree,
  branch,
  graduationYear,
  city,
  preferredRole,
  bio,

  collegeId,
  collegeName,
  collegeSearch,

  colleges,

  searchingColleges,
  showCollegeResults,

  saving,

  setFullName,
  setPhone,
  setDegree,
  setBranch,
  setGraduationYear,
  setCity,
  setPreferredRole,
  setBio,

  setShowCollegeResults,
  updateCollegeSearch,
  selectCollege,
  clearCollege,

  saveProfile,
}: BasicProfileFormProps) {
  return (
    <section
      id="basic-profile"
      className="mt-10 scroll-mt-6"
    >
      {/* SECTION HEADER */}
      <div>
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#C9A227]" />

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A227]">
            Basic Information
          </p>
        </div>

        <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-[#14213D]">
          Personal & Academic Details
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#6B707B]">
          Keep your personal, academic and
          career information up to date.
        </p>
      </div>

      {/* FORM CARD */}
      <div className="mt-5 rounded-[24px] border border-[#D8D5CC] bg-white p-6 shadow-[0_16px_45px_rgba(20,33,61,0.06)] sm:p-8">
        <div className="grid gap-6 md:grid-cols-2">

          {/* FULL NAME */}
          <ProfileField label="Full Name">
            <input
              type="text"
              value={fullName}
              onChange={(event) =>
                setFullName(
                  event.target.value
                )
              }
              placeholder="Your full name"
              maxLength={150}
              className={
                profileInputClass
              }
            />
          </ProfileField>

          {/* PHONE */}
          <ProfileField label="Phone">
            <input
              type="text"
              value={phone}
              onChange={(event) =>
                setPhone(
                  event.target.value
                )
              }
              placeholder="+91..."
              maxLength={20}
              className={
                profileInputClass
              }
            />
          </ProfileField>

          {/* DEGREE */}
          <ProfileField label="Degree">
            <input
              type="text"
              value={degree}
              onChange={(event) =>
                setDegree(
                  event.target.value
                )
              }
              placeholder="B.Tech"
              maxLength={100}
              className={
                profileInputClass
              }
            />
          </ProfileField>

          {/* BRANCH */}
          <ProfileField label="Branch">
            <input
              type="text"
              value={branch}
              onChange={(event) =>
                setBranch(
                  event.target.value
                )
              }
              placeholder="Computer Science"
              maxLength={100}
              className={
                profileInputClass
              }
            />
          </ProfileField>

          {/* GRADUATION YEAR */}
          <ProfileField label="Graduation Year">
            <input
              type="number"
              value={graduationYear}
              onChange={(event) =>
                setGraduationYear(
                  event.target.value
                )
              }
              placeholder="2027"
              min={2000}
              max={2100}
              className={
                profileInputClass
              }
            />
          </ProfileField>

          {/* CITY */}
          <ProfileField label="City">
            <input
              type="text"
              value={city}
              onChange={(event) =>
                setCity(
                  event.target.value
                )
              }
              placeholder="Hyderabad"
              maxLength={100}
              className={
                profileInputClass
              }
            />
          </ProfileField>

          {/* PREFERRED ROLE */}
          <div className="md:col-span-2">
            <ProfileField label="Preferred Role">
              <input
                type="text"
                value={preferredRole}
                onChange={(event) =>
                  setPreferredRole(
                    event.target.value
                  )
                }
                placeholder="Java Backend Developer"
                maxLength={150}
                className={
                  profileInputClass
                }
              />
            </ProfileField>
          </div>

          {/* COLLEGE */}
          <div className="md:col-span-2">
            <CollegeSearch
              collegeId={collegeId}
              collegeName={
                collegeName
              }
              collegeSearch={
                collegeSearch
              }
              colleges={colleges}
              searching={
                searchingColleges
              }
              showResults={
                showCollegeResults
              }
              onFocus={() =>
                setShowCollegeResults(
                  true
                )
              }
              onSearchChange={
                updateCollegeSearch
              }
              onSelect={
                selectCollege
              }
              onClear={
                clearCollege
              }
            />
          </div>

          {/* BIO */}
          <div className="md:col-span-2">
            <ProfileField label="Bio">
              <textarea
                value={bio}
                onChange={(event) =>
                  setBio(
                    event.target.value
                  )
                }
                rows={5}
                placeholder="Tell employers about yourself..."
                className={`${profileInputClass} resize-none`}
              />
            </ProfileField>
          </div>
        </div>

        {/* SAVE AREA */}
        <div className="mt-8 flex flex-col gap-3 border-t border-[#E8E5DD] pt-6 sm:flex-row sm:items-center sm:justify-end">
          {saving && (
            <div className="flex items-center gap-2 text-sm text-[#6B707B]">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#D8D5CC] border-t-[#C9A227]" />

              Saving profile...
            </div>
          )}

          <button
            type="button"
            onClick={saveProfile}
            disabled={saving}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#C9A227]
              px-6
              py-3
              text-sm
              font-bold
              text-[#14213D]
              transition-all
              duration-200
              hover:bg-[#E0C766]
              hover:shadow-md
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {saving
              ? "Saving..."
              : "Save Profile"}

            {!saving && (
              <span>
                →
              </span>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}