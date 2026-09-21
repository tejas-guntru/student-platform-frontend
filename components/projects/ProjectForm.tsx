"use client";

import type {
  FormEvent,
} from "react";

import ProfileField from "@/components/profile/ProfileField";

import {
  profileInputClass,
} from "@/components/profile/profileStyles";

interface ProjectFormProps {
  title: string;
  description: string;
  techStack: string;
  githubUrl: string;
  projectUrl: string;
  startDate: string;
  endDate: string;

  editingId: string | null;
  saving: boolean;

  setTitle:
    (value: string) => void;

  setDescription:
    (value: string) => void;

  setTechStack:
    (value: string) => void;

  setGithubUrl:
    (value: string) => void;

  setProjectUrl:
    (value: string) => void;

  setStartDate:
    (value: string) => void;

  setEndDate:
    (value: string) => void;

  onSubmit:
    (
      event:
        FormEvent<HTMLFormElement>
    ) => void;

  onCancelEdit:
    () => void;
}

export default function ProjectForm({
  title,
  description,
  techStack,
  githubUrl,
  projectUrl,
  startDate,
  endDate,

  editingId,
  saving,

  setTitle,
  setDescription,
  setTechStack,
  setGithubUrl,
  setProjectUrl,
  setStartDate,
  setEndDate,

  onSubmit,
  onCancelEdit,
}: ProjectFormProps) {
  return (
    <form
      id="project-form"
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
                ? "Editing Project"
                : "New Project"}
            </p>
          </div>

          <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-[#14213D]">
            {editingId
              ? "Edit Project"
              : "Add Project"}
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#6B707B]">
            Add your best academic or
            personal projects.
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
        <ProfileField label="Project Title">
          <input
            value={title}
            onChange={(event) =>
              setTitle(
                event.target.value
              )
            }
            placeholder="Student Internship Platform"
            maxLength={150}
            className={
              profileInputClass
            }
          />
        </ProfileField>

        <ProfileField label="Tech Stack">
          <input
            value={techStack}
            onChange={(event) =>
              setTechStack(
                event.target.value
              )
            }
            placeholder="Java, Spring Boot, PostgreSQL, Next.js"
            maxLength={500}
            className={
              profileInputClass
            }
          />
        </ProfileField>

        <ProfileField label="GitHub URL">
          <input
            type="url"
            value={githubUrl}
            onChange={(event) =>
              setGithubUrl(
                event.target.value
              )
            }
            placeholder="https://github.com/..."
            className={
              profileInputClass
            }
          />
        </ProfileField>

        <ProfileField label="Live / Project URL">
          <input
            type="url"
            value={projectUrl}
            onChange={(event) =>
              setProjectUrl(
                event.target.value
              )
            }
            placeholder="https://..."
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
              placeholder="Describe what you built, your contribution and key features..."
              className={`${profileInputClass} resize-none`}
            />
          </ProfileField>
        </div>
      </div>

      {/* SUBMIT */}
      <div className="mt-7 flex flex-col gap-3 border-t border-[#EEECE6] pt-6 sm:flex-row sm:items-center sm:justify-end">
        {saving && (
          <div className="flex items-center gap-2 text-sm text-[#6B707B]">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#D8D5CC] border-t-[#C9A227]" />

            Saving project...
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
              : "Add Project"}

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