"use client";

import {
  useState,
} from "react";

import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  GraduationCap,
  LoaderCircle,
  MapPin,
  Pencil,
  Phone,
  UserRound,
  X,
} from "lucide-react";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileAlerts from "@/components/profile/ProfileAlerts";
import ProfileCompletionSection from "@/components/profile/ProfileCompletionSection";
import ProfileSectionsGrid from "@/components/profile/ProfileSectionsGrid";
import ProfileCareer from "@/components/profile/ProfileCareer";
import BasicProfileForm from "@/components/profile/BasicProfileForm";

import {
  useStudentProfile,
} from "@/hooks/useStudentProfile";

/* =========================================================
   TYPES
========================================================= */

type BasicProfileMode =
  | "CARD"
  | "VIEW"
  | "EDIT";

/* =========================================================
   PAGE
========================================================= */

export default function ProfilePage() {
  const profile =
    useStudentProfile();

  const [
    basicProfileMode,
    setBasicProfileMode,
  ] =
    useState<BasicProfileMode>(
      "CARD"
    );

  const [
    showEditConfirmation,
    setShowEditConfirmation,
  ] =
    useState(false);

  if (profile.loading) {
    return <ProfileLoading />;
  }

  return (
    <>
      <main
        className="
          min-h-screen
          bg-[#F7F9FC]
        "
      >
        <div
          className="
            mx-auto
            max-w-7xl
            px-4
            py-8

            sm:px-6

            lg:px-8
            lg:py-10
          "
        >
          <div className="space-y-7">
            {/* PROFILE HEADER */}

            

            {/* ALERTS */}

            {(profile.error ||
              profile.success) && (
              <ProfileAlerts
                error={
                  profile.error
                }
                success={
                  profile.success
                }
              />
            )}

            {/* PROFILE COMPLETION */}

            <ProfileCompletionSection
              completion={
                profile.completion
              }
            />

            {/* PROFILE SECTIONS */}

            <ProfileSectionsGrid />

            {/* CAREER */}

            <ProfileCareer />

            {/* BASIC INFORMATION */}

            <section
              id="basic-profile"
            >
              {basicProfileMode ===
                "CARD" && (
                <BasicInformationCard
                  fullName={
                    profile.fullName
                  }
                  onOpen={() =>
                    setBasicProfileMode(
                      "VIEW"
                    )
                  }
                />
              )}

              {basicProfileMode ===
                "VIEW" && (
                <BasicInformationView
                  fullName={
                    profile.fullName
                  }
                  phone={
                    profile.phone
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
                  preferredRole={
                    profile.preferredRole
                  }
                  bio={
                    profile.bio
                  }
                  onBack={() =>
                    setBasicProfileMode(
                      "CARD"
                    )
                  }
                  onEdit={() =>
                    setShowEditConfirmation(
                      true
                    )
                  }
                />
              )}

              {basicProfileMode ===
                "EDIT" && (
                <div>
                  <button
                    type="button"
                    disabled={
                      profile.saving
                    }
                    onClick={() =>
                      setBasicProfileMode(
                        "VIEW"
                      )
                    }
                    className="
                      mb-4
                      inline-flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-slate-500
                      transition-colors

                      hover:text-slate-900

                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    <ArrowLeft
                      size={15}
                    />

                    Back
                  </button>

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
              )}
            </section>
          </div>
        </div>
      </main>

      {/* EDIT CONFIRMATION */}

      {showEditConfirmation && (
        <EditConfirmation
          onCancel={() =>
            setShowEditConfirmation(
              false
            )
          }
          onConfirm={() => {
            setShowEditConfirmation(
              false
            );

            setBasicProfileMode(
              "EDIT"
            );
          }}
        />
      )}
    </>
  );
}

/* =========================================================
   LOADING
========================================================= */

function ProfileLoading() {
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
            h-11
            w-11
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
            size={19}
            className="animate-spin"
          />
        </div>

        <p
          className="
            mt-3
            text-sm
            font-semibold
            text-slate-600
          "
        >
          Loading profile...
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   BASIC INFORMATION CARD
========================================================= */

function BasicInformationCard({
  fullName,
  onOpen,
}: {
  fullName: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="
        group
        flex
        w-full
        items-center
        gap-4
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        text-left
        transition-all

        hover:border-[#1256AF]/30
        hover:shadow-[0_10px_30px_rgba(15,23,42,0.05)]

        sm:p-6
      "
    >
      {/* ICON */}

      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-[#1256AF]/[0.07]
          text-[#1256AF]
        "
      >
        <UserRound
          size={18}
        />
      </div>

      {/* TEXT */}

      <div
        className="
          min-w-0
          flex-1
        "
      >
        <h2
          className="
            text-sm
            font-bold
            text-slate-900
          "
        >
          Basic Information
        </h2>

        <p
          className="
            mt-1
            truncate
            text-xs
            text-slate-500
          "
        >
          {fullName?.trim()
            ? `${fullName} · Personal & academic details`
            : "Personal & academic details"}
        </p>
      </div>

      {/* ARROW */}

      <div
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          border
          border-slate-200
          text-slate-400
          transition-all

          group-hover:border-[#1256AF]
          group-hover:bg-[#1256AF]
          group-hover:text-white
        "
      >
        <ArrowRight
          size={14}
        />
      </div>
    </button>
  );
}

/* =========================================================
   BASIC INFORMATION VIEW
========================================================= */

interface BasicInformationViewProps {
  fullName: string;
  phone: string;
  collegeName: string;
  degree: string;
  branch: string;
  graduationYear: string;
  city: string;
  preferredRole: string;
  bio: string;

  onBack: () => void;
  onEdit: () => void;
}

function BasicInformationView({
  fullName,
  phone,
  collegeName,
  degree,
  branch,
  graduationYear,
  city,
  preferredRole,
  bio,
  onBack,
  onEdit,
}: BasicInformationViewProps) {
  return (
    <div>
      {/* BACK */}

      <button
        type="button"
        onClick={onBack}
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          font-semibold
          text-slate-500
          transition-colors

          hover:text-slate-900
        "
      >
        <ArrowLeft
          size={15}
        />

        Back
      </button>

      {/* CARD */}

      <article
        className="
          mt-4
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
            flex-col
            gap-4
            border-b
            border-slate-100
            p-5

            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:p-6
          "
        >
          <div
            className="
              flex
              items-center
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
                bg-[#1256AF]/[0.07]
                text-[#1256AF]
              "
            >
              <UserRound
                size={17}
              />
            </div>

            <div>
              <h2
                className="
                  text-lg
                  font-bold
                  text-slate-900
                "
              >
                Basic Information
              </h2>

              <p
                className="
                  mt-0.5
                  text-xs
                  text-slate-500
                "
              >
                Your profile details
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onEdit}
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-lg
              border
              border-slate-200
              bg-white
              px-3.5
              py-2
              text-sm
              font-semibold
              text-slate-700
              transition

              hover:border-[#1256AF]/30
              hover:bg-[#1256AF]/[0.04]
              hover:text-[#1256AF]
            "
          >
            <Pencil
              size={13}
            />

            Edit
          </button>
        </div>

        {/* MAIN DETAILS */}

        <div
          className="
            grid
            gap-4
            p-5

            sm:grid-cols-2
            sm:p-6

            lg:grid-cols-3
          "
        >
          <InfoItem
            icon={UserRound}
            label="Name"
            value={fullName}
          />

          <InfoItem
            icon={Building2}
            label="College"
            value={collegeName}
          />

          <InfoItem
            icon={GraduationCap}
            label="Education"
            value={
              buildEducation(
                degree,
                branch
              )
            }
          />

          <InfoItem
            icon={CalendarDays}
            label="Graduation"
            value={graduationYear}
          />

          <InfoItem
            icon={BriefcaseBusiness}
            label="Preferred role"
            value={preferredRole}
          />

          <InfoItem
            icon={MapPin}
            label="Location"
            value={city}
          />
        </div>

        {/* SECONDARY INFORMATION */}

        {(phone?.trim() ||
          bio?.trim()) && (
          <div
            className="
              grid
              gap-5
              border-t
              border-slate-100
              px-5
              py-5

              sm:px-6

              md:grid-cols-2
            "
          >
            {phone?.trim() && (
              <div>
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-slate-400
                  "
                >
                  <Phone
                    size={13}
                  />

                  <span
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.08em]
                    "
                  >
                    Phone
                  </span>
                </div>

                <p
                  className="
                    mt-2
                    text-sm
                    font-medium
                    text-slate-700
                  "
                >
                  {phone}
                </p>
              </div>
            )}

            {bio?.trim() && (
              <div>
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.08em]
                    text-slate-400
                  "
                >
                  About
                </p>

                <p
                  className="
                    mt-2
                    line-clamp-3
                    text-sm
                    leading-6
                    text-slate-600
                  "
                >
                  {bio}
                </p>
              </div>
            )}
          </div>
        )}
      </article>
    </div>
  );
}

/* =========================================================
   INFO ITEM
========================================================= */

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof UserRound;

  label: string;

  value:
    | string
    | null
    | undefined;
}) {
  const displayValue =
    value?.trim() ||
    "Not added";

  return (
    <div
      className="
        flex
        min-w-0
        items-start
        gap-3
        rounded-xl
        bg-slate-50/70
        p-3.5
      "
    >
      <div
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-white
          text-[#1256AF]
          shadow-sm
        "
      >
        <Icon size={13} />
      </div>

      <div className="min-w-0">
        <p
          className="
            text-[9px]
            font-bold
            uppercase
            tracking-[0.09em]
            text-slate-400
          "
        >
          {label}
        </p>

        <p
          className={`
            mt-1
            break-words
            text-sm
            font-semibold

            ${
              displayValue ===
              "Not added"
                ? "text-slate-400"
                : "text-slate-800"
            }
          `}
        >
          {displayValue}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   EDIT CONFIRMATION
========================================================= */

function EditConfirmation({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-slate-950/30
        px-4
        backdrop-blur-[2px]
      "
      role="dialog"
      aria-modal="true"
    >
      <div
        className="
          w-full
          max-w-sm
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-[0_24px_70px_rgba(15,23,42,0.18)]
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-[#1256AF]/[0.07]
            text-[#1256AF]
          "
        >
          <Pencil size={16} />
        </div>

        <h2
          className="
            mt-4
            text-lg
            font-bold
            tracking-[-0.02em]
            text-slate-900
          "
        >
          Edit your information?
        </h2>

        <p
          className="
            mt-2
            text-sm
            leading-6
            text-slate-500
          "
        >
          Your profile fields will
          become editable.
        </p>

        <div
          className="
            mt-6
            flex
            justify-end
            gap-2
          "
        >
          <button
            type="button"
            onClick={onCancel}
            className="
              inline-flex
              items-center
              gap-1.5
              rounded-lg
              border
              border-slate-200
              px-3.5
              py-2
              text-sm
              font-semibold
              text-slate-600
              transition

              hover:bg-slate-50
            "
          >
            <X size={13} />

            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="
              inline-flex
              items-center
              gap-1.5
              rounded-lg
              bg-[#1256AF]
              px-3.5
              py-2
              text-sm
              font-bold
              text-white
              transition

              hover:bg-[#0F4B99]
            "
          >
            <Pencil size={13} />

            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function buildEducation(
  degree: string,
  branch: string
) {
  const parts = [
    degree?.trim(),
    branch?.trim(),
  ].filter(Boolean);

  return parts.length > 0
    ? parts.join(" · ")
    : "";
}