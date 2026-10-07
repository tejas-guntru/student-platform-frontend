"use client";

import {
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  LoaderCircle,
  Save,
  Sparkles,
  UserRound,
} from "lucide-react";

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
      className="
        min-w-0
        scroll-mt-24
      "
      aria-labelledby="basic-profile-form-title"
    >
      {/* =====================================================
          SECTION HEADER
      ===================================================== */}

      <div className="min-w-0">
        <div
          className="
            inline-flex
            max-w-full
            items-center
            gap-2
            rounded-full
            border
            border-[#CBE5F8]
            bg-[#EFF8FF]
            px-3
            py-1.5
          "
        >
          <UserRound
            size={13}
            className="
              shrink-0
              text-[#0877E8]
            "
            aria-hidden="true"
          />

          <p
            className="
              truncate
              text-[9px]
              font-bold
              uppercase
              tracking-[0.15em]
              text-[#0877E8]
            "
          >
            Basic Information
          </p>
        </div>

        <h2
          id="basic-profile-form-title"
          className="
            mt-4
            break-words
            text-xl
            font-bold
            tracking-[-0.035em]
            text-[#173B63]

            [overflow-wrap:anywhere]

            sm:text-2xl
          "
        >
          Personal &amp; Academic Details
        </h2>

        <p
          className="
            mt-2
            max-w-2xl
            break-words
            text-sm
            leading-6
            text-[#71899D]

            [overflow-wrap:anywhere]
          "
        >
          Keep your personal, academic and career
          information accurate so your Trailbliz profile
          is ready for opportunities.
        </p>
      </div>

      {/* =====================================================
          FORM CARD
      ===================================================== */}

      <div
        className="
          relative
          mt-5
          min-w-0
          overflow-visible
          rounded-2xl
          border
          border-[#DCEAF5]
          bg-white
          shadow-[0_14px_42px_rgba(8,119,232,0.055)]

          sm:rounded-[28px]
        "
      >
        {/* TOP ACCENT */}

        <div
          className="
            pointer-events-none
            absolute
            left-0
            right-0
            top-0
            h-[3px]
            overflow-hidden
            rounded-t-2xl
            bg-gradient-to-r
            from-[#0877E8]
            via-[#1294F2]
            to-[#38BDF8]

            sm:rounded-t-[28px]
          "
          aria-hidden="true"
        />

        {/* SOFT GLOW */}

        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-48
            w-48
            rounded-full
            bg-[#38BDF8]/8
            blur-[70px]

            sm:-right-24
            sm:-top-24
            sm:h-64
            sm:w-64
            sm:blur-[90px]
          "
          aria-hidden="true"
        />

        <div
          className="
            relative
            min-w-0
            p-4

            sm:p-7

            lg:p-8
          "
        >
          {/* =================================================
              PERSONAL DETAILS
          ================================================= */}

          <FormGroupHeader
            icon={UserRound}
            title="Personal details"
            description="The basic information employers use to identify and contact you."
          />

          <div
            className="
              mt-5
              grid
              min-w-0
              grid-cols-1
              gap-5

              md:grid-cols-2
            "
          >
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
                autoComplete="name"
                disabled={saving}
                className={
                  profileInputClass
                }
              />
            </ProfileField>

            <ProfileField label="Phone">
              <input
                type="tel"
                value={phone}
                onChange={(event) =>
                  setPhone(
                    event.target.value
                  )
                }
                placeholder="+91..."
                maxLength={20}
                autoComplete="tel"
                inputMode="tel"
                disabled={saving}
                className={
                  profileInputClass
                }
              />
            </ProfileField>

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
                autoComplete="address-level2"
                disabled={saving}
                className={
                  profileInputClass
                }
              />
            </ProfileField>
          </div>

          {/* =================================================
              ACADEMIC DETAILS
          ================================================= */}

          <div
            className="
              mt-7
              min-w-0
              border-t
              border-[#E7F0F7]
              pt-6

              sm:mt-8
              sm:pt-7
            "
          >
            <FormGroupHeader
              icon={GraduationCap}
              title="Academic details"
              description="Add your degree, specialization, graduation year and college."
            />

            <div
              className="
                mt-5
                grid
                min-w-0
                grid-cols-1
                gap-5

                md:grid-cols-2
              "
            >
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
                  disabled={saving}
                  className={
                    profileInputClass
                  }
                />
              </ProfileField>

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
                  disabled={saving}
                  className={
                    profileInputClass
                  }
                />
              </ProfileField>

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
                  inputMode="numeric"
                  disabled={saving}
                  className={
                    profileInputClass
                  }
                />
              </ProfileField>

              <div
                className="
                  min-w-0

                  md:col-span-2
                "
              >
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
            </div>
          </div>

          {/* =================================================
              CAREER DETAILS
          ================================================= */}

          <div
            className="
              mt-7
              min-w-0
              border-t
              border-[#E7F0F7]
              pt-6

              sm:mt-8
              sm:pt-7
            "
          >
            <FormGroupHeader
              icon={BriefcaseBusiness}
              title="Career details"
              description="Tell employers what kind of role you are preparing for."
            />

            <div
              className="
                mt-5
                grid
                min-w-0
                grid-cols-1
                gap-5
              "
            >
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
                  disabled={saving}
                  className={
                    profileInputClass
                  }
                />
              </ProfileField>

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
                  disabled={saving}
                  className={`
                    ${profileInputClass}
                    min-h-32
                    resize-y
                  `}
                />
              </ProfileField>
            </div>
          </div>

          {/* =================================================
              SAVE AREA
          ================================================= */}

          <div
            className="
              mt-7
              flex
              min-w-0
              flex-col
              gap-4
              border-t
              border-[#E7F0F7]
              pt-6

              sm:mt-8
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div className="min-w-0">
              <div
                className="
                  flex
                  min-w-0
                  items-center
                  gap-2
                "
              >
                <Sparkles
                  size={14}
                  className="
                    shrink-0
                    text-[#38A9EE]
                  "
                  aria-hidden="true"
                />

                <p
                  className="
                    break-words
                    text-xs
                    font-semibold
                    text-[#698399]
                  "
                >
                  Keep your profile current
                </p>
              </div>

              <p
                className="
                  mt-1
                  break-words
                  text-xs
                  leading-5
                  text-[#94A6B5]
                "
              >
                Save your changes before leaving this page.
              </p>
            </div>

            <div
              className="
                flex
                min-w-0
                flex-col
                gap-3

                sm:flex-row
                sm:items-center
                sm:justify-end
              "
            >
              {saving && (
                <div
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-[#71899D]
                  "
                  role="status"
                  aria-live="polite"
                >
                  <LoaderCircle
                    size={16}
                    className="
                      shrink-0
                      animate-spin
                      text-[#0877E8]
                    "
                    aria-hidden="true"
                  />

                  <span className="break-words">
                    Saving profile...
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={saveProfile}
                disabled={saving}
                className="
                  group
                  inline-flex
                  min-h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-[#0877E8]
                  to-[#1294F2]
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_10px_24px_rgba(8,119,232,0.22)]
                  transition-all
                  duration-200

                  hover:shadow-[0_14px_30px_rgba(8,119,232,0.28)]

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#0877E8]/30
                  focus-visible:ring-offset-2

                  disabled:cursor-not-allowed
                  disabled:opacity-60

                  sm:w-auto

                  lg:hover:-translate-y-0.5
                  lg:disabled:hover:translate-y-0
                "
              >
                {saving ? (
                  <>
                    <LoaderCircle
                      size={16}
                      className="
                        shrink-0
                        animate-spin
                      "
                      aria-hidden="true"
                    />

                    Saving...
                  </>
                ) : (
                  <>
                    <Save
                      size={15}
                      className="shrink-0"
                      aria-hidden="true"
                    />

                    Save Profile

                    <ArrowRight
                      size={15}
                      className="
                        shrink-0
                        transition-transform
                        duration-200

                        group-hover:translate-x-0.5
                      "
                      aria-hidden="true"
                    />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormGroupHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof UserRound;
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        flex
        min-w-0
        items-start
        gap-3
      "
    >
      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-[#EAF6FF]
          text-[#0877E8]
        "
      >
        <Icon
          size={17}
          aria-hidden="true"
        />
      </div>

      <div className="min-w-0">
        <h3
          className="
            break-words
            text-sm
            font-bold
            text-[#173B63]

            [overflow-wrap:anywhere]
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-1
            break-words
            text-xs
            leading-5
            text-[#8198AA]

            [overflow-wrap:anywhere]
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}