"use client";

import type {
  FormEvent,
} from "react";

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
  return (
    <form
      id="experience-form"
      onSubmit={onSubmit}
      className="mt-8 rounded-[24px] border border-[#D8D5CC] bg-white p-6 shadow-[0_16px_45px_rgba(20,33,61,0.06)] sm:p-8"
    >
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#C9A227]" />

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A227]">
              {editingId
                ? "Editing Experience"
                : "New Experience"}
            </p>
          </div>

          <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-[#14213D]">
            {editingId
              ? "Edit Experience"
              : "Add Experience"}
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#6B707B]">
            Add internships, jobs,
            freelance work or other
            professional experience.
          </p>
        </div>

        {editingId && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="
              rounded-xl
              border
              border-[#D8D5CC]
              bg-[#F8F7F3]
              px-4
              py-2.5
              text-sm
              font-bold
              text-[#14213D]
              transition-all
              hover:border-[#C9A227]
              hover:bg-white
              hover:text-[#A98616]
            "
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* FIELDS */}
      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <ProfileField label="Company">
          <input
            value={companyName}
            onChange={(event) =>
              setCompanyName(
                event.target.value
              )
            }
            placeholder="OpenAI"
            maxLength={200}
            className={
              profileInputClass
            }
          />
        </ProfileField>

        <ProfileField label="Role">
          <input
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
            className={
              profileInputClass
            }
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
          <input
            value={location}
            onChange={(event) =>
              setLocation(
                event.target.value
              )
            }
            placeholder="Hyderabad / Remote"
            maxLength={150}
            className={
              profileInputClass
            }
          />
        </ProfileField>

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
            className={`${profileInputClass} disabled:cursor-not-allowed disabled:bg-[#EEECE6] disabled:opacity-60`}
          />
        </ProfileField>

        {/* CURRENT POSITION */}
        <div className="md:col-span-2">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#D8D5CC] bg-[#F8F7F3] p-4 transition-all hover:border-[#C9A227]">
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
              className="h-4 w-4 accent-[#C9A227]"
            />

            <div>
              <p className="font-semibold text-[#14213D]">
                I currently work here
              </p>

              <p className="mt-1 text-xs text-[#6B707B]">
                End date will be shown
                as Present.
              </p>
            </div>
          </label>
        </div>

        {/* DESCRIPTION */}
        <div className="md:col-span-2">
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

      {/* SAVE */}
      <div className="mt-7 flex flex-col gap-3 border-t border-[#EEECE6] pt-6 sm:flex-row sm:items-center sm:justify-end">
        {saving && (
          <div className="flex items-center gap-2 text-sm text-[#6B707B]">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#D8D5CC] border-t-[#C9A227]" />

            Saving experience...
          </div>
        )}

        <button
          type="submit"
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
            : editingId
              ? "Save Changes"
              : "Add Experience"}

          {!saving && (
            <span>
              →
            </span>
          )}
        </button>
      </div>
    </form>
  );
}