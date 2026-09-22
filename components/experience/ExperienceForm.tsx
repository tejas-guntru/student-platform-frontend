"use client";

import type {
  FormEvent,
} from "react";

import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  LoaderCircle,
  MapPin,
  Plus,
  Save,
  X,
} from "lucide-react";

import type {
  EmploymentType,
} from "@/types/studentExperience";

import ProfileField from "@/components/profile/ProfileField";

import {
  profileInputClass,
} from "@/components/profile/profileStyles";

interface ExperienceFormProps {
  companyName: string;
  roleTitle: string;

  employmentType:
    EmploymentType;

  location: string;
  description: string;
  startDate: string;
  endDate: string;

  currentlyWorking: boolean;

  editingId:
    string | null;

  saving: boolean;

  setCompanyName:
    (value: string) => void;

  setRoleTitle:
    (value: string) => void;

  setEmploymentType:
    (value: EmploymentType) => void;

  setLocation:
    (value: string) => void;

  setDescription:
    (value: string) => void;

  setStartDate:
    (value: string) => void;

  setEndDate:
    (value: string) => void;

  onCurrentChange:
    (checked: boolean) => void;

  onSubmit:
    (
      event:
        FormEvent<HTMLFormElement>
    ) => void;

  onCancelEdit:
    () => void;
}

export default function ExperienceForm({
  companyName,
  roleTitle,
  employmentType,
  location,
  description,
  startDate,
  endDate,

  currentlyWorking,

  editingId,
  saving,

  setCompanyName,
  setRoleTitle,
  setEmploymentType,
  setLocation,
  setDescription,
  setStartDate,
  setEndDate,

  onCurrentChange,
  onSubmit,
  onCancelEdit,
}: ExperienceFormProps) {
  const isEditing =
    editingId !== null;

  return (
    <form
      id="experience-form"
      onSubmit={onSubmit}
      className="
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-[#DCEAF5]
        bg-white
        shadow-[0_14px_42px_rgba(8,119,232,0.055)]
      "
    >
      {/* TOP ACCENT */}

      <div
        className={`
          absolute
          left-0
          right-0
          top-0
          h-[3px]
          bg-gradient-to-r

          ${
            isEditing
              ? "from-emerald-500 via-[#0877E8] to-[#38BDF8]"
              : "from-[#0877E8] via-[#1294F2] to-[#38BDF8]"
          }
        `}
      />

      {/* BACKGROUND GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-28
          -top-28
          h-72
          w-72
          rounded-full
          bg-emerald-500/7
          blur-[100px]
        "
      />

      <div
        className="
          relative
          p-5

          sm:p-7
          lg:p-8
        "
      >
        {/* ===================================================
            HEADER
        =================================================== */}

        <div
          className="
            flex
            flex-col
            gap-5

            sm:flex-row
            sm:items-start
            sm:justify-between
          "
        >
          <div
            className="
              flex
              items-start
              gap-4
            "
          >
            <div
              className={`
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl

                ${
                  isEditing
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-[#EAF6FF] text-[#0877E8]"
                }
              `}
            >
              <BriefcaseBusiness size={19} />
            </div>

            <div>
              <div
                className={`
                  inline-flex
                  items-center
                  rounded-full
                  border
                  px-2.5
                  py-1
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.14em]

                  ${
                    isEditing
                      ? `
                        border-emerald-200
                        bg-emerald-50
                        text-emerald-600
                      `
                      : `
                        border-[#CBE5F8]
                        bg-[#EFF8FF]
                        text-[#0877E8]
                      `
                  }
                `}
              >
                {isEditing
                  ? "Editing Experience"
                  : "New Experience"}
              </div>

              <h2
                className="
                  mt-3
                  text-2xl
                  font-bold
                  tracking-[-0.035em]
                  text-[#173B63]
                "
              >
                {isEditing
                  ? "Edit Experience"
                  : "Add Experience"}
              </h2>

              <p
                className="
                  mt-2
                  max-w-xl
                  text-sm
                  leading-6
                  text-[#71899D]
                "
              >
                Add internships, jobs, freelance work
                or other professional experience that
                demonstrates your contribution.
              </p>
            </div>
          </div>

          {isEditing && (
            <button
              type="button"
              onClick={onCancelEdit}
              disabled={saving}
              className="
                inline-flex
                w-fit
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-[#D7E7F2]
                bg-[#F8FCFF]
                px-4
                py-2.5
                text-sm
                font-semibold
                text-[#607D92]
                transition-all
                duration-200

                hover:border-[#BBDCED]
                hover:bg-white
                hover:text-[#0877E8]

                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <X size={14} />

              Cancel Edit
            </button>
          )}
        </div>

        {/* ===================================================
            ROLE DETAILS
        =================================================== */}

        <div
          className="
            mt-8
            flex
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
              bg-emerald-50
              text-emerald-600
            "
          >
            <Building2 size={17} />
          </div>

          <div>
            <h3
              className="
                text-sm
                font-bold
                text-[#173B63]
              "
            >
              Role details
            </h3>

            <p
              className="
                mt-1
                text-xs
                leading-5
                text-[#8198AA]
              "
            >
              Add the company, role and type of work
              experience.
            </p>
          </div>
        </div>

        <div
          className="
            mt-5
            grid
            gap-5

            md:grid-cols-2
          "
        >
          <ProfileField label="Company">
            <input
              type="text"
              value={companyName}
              onChange={(event) =>
                setCompanyName(
                  event.target.value
                )
              }
              placeholder="Company name"
              maxLength={200}
              className={
                profileInputClass
              }
            />
          </ProfileField>

          <ProfileField label="Role">
            <input
              type="text"
              value={roleTitle}
              onChange={(event) =>
                setRoleTitle(
                  event.target.value
                )
              }
              placeholder="Software Engineering Intern"
              maxLength={200}
              className={
                profileInputClass
              }
            />
          </ProfileField>

          <ProfileField label="Employment Type">
            <select
              value={employmentType}
              onChange={(event) =>
                setEmploymentType(
                  event.target
                    .value as EmploymentType
                )
              }
              className={`${profileInputClass} cursor-pointer`}
            >
              <option value="INTERNSHIP">
                Internship
              </option>

              <option value="FULL_TIME">
                Full Time
              </option>

              <option value="PART_TIME">
                Part Time
              </option>

              <option value="CONTRACT">
                Contract
              </option>

              <option value="FREELANCE">
                Freelance
              </option>
            </select>
          </ProfileField>

          <ProfileField label="Location">
            <div className="relative">
              <MapPin
                size={15}
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-[#8AA8BC]
                "
              />

              <input
                type="text"
                value={location}
                onChange={(event) =>
                  setLocation(
                    event.target.value
                  )
                }
                placeholder="Hyderabad / Remote"
                maxLength={150}
                className={`${profileInputClass} pl-11`}
              />
            </div>
          </ProfileField>
        </div>

        {/* ===================================================
            TIMELINE
        =================================================== */}

        <div
          className="
            mt-8
            border-t
            border-[#E7F0F7]
            pt-7
          "
        >
          <div
            className="
              flex
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
                bg-cyan-50
                text-cyan-600
              "
            >
              <CalendarDays size={17} />
            </div>

            <div>
              <h3
                className="
                  text-sm
                  font-bold
                  text-[#173B63]
                "
              >
                Experience timeline
              </h3>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-[#8198AA]
                "
              >
                Add the duration of this experience.
              </p>
            </div>
          </div>

          <div
            className="
              mt-5
              grid
              gap-5

              md:grid-cols-2
            "
          >
            <ProfileField label="Start Date">
              <input
                type="date"
                value={startDate}
                onChange={(event) =>
                  setStartDate(
                    event.target.value
                  )
                }
                className={
                  profileInputClass
                }
              />
            </ProfileField>

            <ProfileField label="End Date">
              <input
                type="date"
                value={endDate}
                disabled={
                  currentlyWorking
                }
                onChange={(event) =>
                  setEndDate(
                    event.target.value
                  )
                }
                className={
                  profileInputClass
                }
              />
            </ProfileField>
          </div>

          {/* CURRENT POSITION */}

          <label
            className={`
              mt-4
              flex
              cursor-pointer
              items-start
              gap-3
              rounded-[16px]
              border
              p-4
              transition-all
              duration-200

              ${
                currentlyWorking
                  ? `
                    border-emerald-200
                    bg-emerald-50/70
                  `
                  : `
                    border-[#DCEAF5]
                    bg-[#F8FCFF]

                    hover:border-[#BFDDF0]
                    hover:bg-white
                  `
              }
            `}
          >
            <span
              className={`
                mt-0.5
                flex
                h-5
                w-5
                shrink-0
                items-center
                justify-center
                rounded-md
                border
                transition-all

                ${
                  currentlyWorking
                    ? `
                      border-emerald-500
                      bg-emerald-500
                      text-white
                    `
                    : `
                      border-[#BFD5E4]
                      bg-white
                      text-transparent
                    `
                }
              `}
            >
              <Check size={13} strokeWidth={3} />
            </span>

            <input
              type="checkbox"
              checked={
                currentlyWorking
              }
              onChange={(event) =>
                onCurrentChange(
                  event.target.checked
                )
              }
              className="sr-only"
            />

            <div>
              <p
                className={`
                  text-sm
                  font-bold

                  ${
                    currentlyWorking
                      ? "text-emerald-700"
                      : "text-[#456982]"
                  }
                `}
              >
                I currently work here
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-[#8198AA]
                "
              >
                The end date will be shown as Present.
              </p>
            </div>
          </label>
        </div>

        {/* ===================================================
            DESCRIPTION
        =================================================== */}

        <div
          className="
            mt-8
            border-t
            border-[#E7F0F7]
            pt-7
          "
        >
          <div
            className="
              flex
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
              <BriefcaseBusiness size={17} />
            </div>

            <div>
              <h3
                className="
                  text-sm
                  font-bold
                  text-[#173B63]
                "
              >
                Responsibilities & impact
              </h3>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-[#8198AA]
                "
              >
                Describe what you worked on, the
                technologies you used and what you achieved.
              </p>
            </div>
          </div>

          <div className="mt-5">
            <ProfileField label="Description">
              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(
                    event.target.value
                  )
                }
                rows={5}
                placeholder="Describe your work, responsibilities, technologies and achievements..."
                className={`${profileInputClass} resize-none`}
              />
            </ProfileField>
          </div>
        </div>

        {/* ===================================================
            SAVE
        =================================================== */}

        <div
          className="
            mt-8
            flex
            flex-col
            gap-4
            border-t
            border-[#E7F0F7]
            pt-6

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <p
              className="
                text-xs
                font-semibold
                text-[#688399]
              "
            >
              Build your professional story
            </p>

            <p
              className="
                mt-1
                text-xs
                leading-5
                text-[#94A6B5]
              "
            >
              Focus on meaningful responsibilities,
              technologies and measurable contributions.
            </p>
          </div>

          <div
            className="
              flex
              flex-col
              gap-3

              sm:flex-row
              sm:items-center
            "
          >
            {saving && (
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  text-[#71899D]
                "
              >
                <LoaderCircle
                  size={15}
                  className="
                    animate-spin
                    text-[#0877E8]
                  "
                />

                Saving experience...
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="
                inline-flex
                min-h-[46px]
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

                hover:-translate-y-0.5
                hover:shadow-[0_14px_30px_rgba(8,119,232,0.28)]

                disabled:cursor-not-allowed
                disabled:opacity-60
                disabled:hover:translate-y-0
              "
            >
              {saving ? (
                <>
                  <LoaderCircle
                    size={15}
                    className="animate-spin"
                  />

                  Saving...
                </>
              ) : isEditing ? (
                <>
                  <Save size={15} />

                  Save Changes
                </>
              ) : (
                <>
                  <Plus size={16} />

                  Add Experience
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}