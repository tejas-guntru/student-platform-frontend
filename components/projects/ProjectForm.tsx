"use client";

import type {
  FormEvent,
} from "react";

import {
  CalendarDays,
  Code2,
  ExternalLink,
  FolderGit2,
  Link2,
  LoaderCircle,
  Plus,
  Save,
  X,
} from "lucide-react";

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
  const isEditing =
    editingId !== null;

  return (
    <form
      id="project-form"
      onSubmit={onSubmit}
      className="
        relative
        min-w-0
        overflow-hidden
        rounded-2xl
        border
        border-[#DCEAF5]
        bg-white
        shadow-[0_14px_42px_rgba(8,119,232,0.055)]

        sm:rounded-[28px]
      "
      aria-labelledby="project-form-title"
    >
      {/* TOP ACCENT */}

      <div
        className={`
          pointer-events-none
          absolute
          left-0
          right-0
          top-0
          h-[3px]
          bg-gradient-to-r

          ${
            isEditing
              ? "from-violet-500 via-[#0877E8] to-[#38BDF8]"
              : "from-[#0877E8] via-[#1294F2] to-[#38BDF8]"
          }
        `}
        aria-hidden="true"
      />

      {/* BACKGROUND GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-52
          w-52
          rounded-full
          bg-violet-500/7
          blur-[80px]

          sm:-right-28
          sm:-top-28
          sm:h-72
          sm:w-72
          sm:blur-[100px]
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
        {/* ===================================================
            HEADER
        =================================================== */}

        <div
          className="
            flex
            min-w-0
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
              min-w-0
              items-start
              gap-3

              sm:gap-4
            "
          >
            <div
              className={`
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl

                sm:h-11
                sm:w-11
                sm:rounded-2xl

                ${
                  isEditing
                    ? "bg-violet-50 text-violet-600"
                    : "bg-[#EAF6FF] text-[#0877E8]"
                }
              `}
            >
              <FolderGit2
                size={19}
                aria-hidden="true"
              />
            </div>

            <div className="min-w-0">
              <div
                className={`
                  inline-flex
                  max-w-full
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
                          border-violet-200
                          bg-violet-50
                          text-violet-600
                        `
                      : `
                          border-[#CBE5F8]
                          bg-[#EFF8FF]
                          text-[#0877E8]
                        `
                  }
                `}
              >
                <span className="truncate">
                  {isEditing
                    ? "Editing Project"
                    : "New Project"}
                </span>
              </div>

              <h2
                id="project-form-title"
                className="
                  mt-3
                  break-words
                  text-xl
                  font-bold
                  tracking-[-0.035em]
                  text-[#173B63]

                  [overflow-wrap:anywhere]

                  sm:text-2xl
                "
              >
                {isEditing
                  ? "Edit Project"
                  : "Add a Project"}
              </h2>

              <p
                className="
                  mt-2
                  max-w-xl
                  break-words
                  text-sm
                  leading-6
                  text-[#71899D]

                  [overflow-wrap:anywhere]
                "
              >
                Showcase what you built, the technologies
                you used and the impact of your work.
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
                min-h-10
                w-full
                shrink-0
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
                transition-colors
                duration-200

                hover:border-[#BBDCED]
                hover:bg-white
                hover:text-[#0877E8]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#0877E8]/25
                focus-visible:ring-offset-2

                disabled:cursor-not-allowed
                disabled:opacity-50

                sm:w-fit
              "
            >
              <X
                size={14}
                className="shrink-0"
                aria-hidden="true"
              />

              Cancel Edit
            </button>
          )}
        </div>

        {/* ===================================================
            PROJECT DETAILS
        =================================================== */}

        <div
          className="
            mt-7
            flex
            min-w-0
            items-start
            gap-3

            sm:mt-8
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
            <FolderGit2
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
              "
            >
              Project details
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
              Add the project name, technologies and a
              clear description of your contribution.
            </p>
          </div>
        </div>

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
          <ProfileField label="Project Title">
            <input
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(
                  event.target.value
                )
              }
              placeholder="Student Internship Platform"
              maxLength={150}
              disabled={saving}
              autoComplete="off"
              className={
                profileInputClass
              }
            />
          </ProfileField>

          <ProfileField label="Tech Stack">
            <input
              type="text"
              value={techStack}
              onChange={(event) =>
                setTechStack(
                  event.target.value
                )
              }
              placeholder="Java, Spring Boot, PostgreSQL, Next.js"
              maxLength={500}
              disabled={saving}
              autoComplete="off"
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
            <ProfileField label="Description">
              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(
                    event.target.value
                  )
                }
                rows={5}
                placeholder="Describe what you built, your contribution and the key features..."
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

        {/* ===================================================
            PROJECT LINKS
        =================================================== */}

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
                bg-violet-50
                text-violet-600
              "
            >
              <Link2
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
                "
              >
                Project links
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
                Add source code and a live project link
                when available.
              </p>
            </div>
          </div>

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
            <ProfileField label="GitHub URL">
              <div
                className="
                  relative
                  min-w-0
                "
              >
                <Code2
                  size={15}
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    top-1/2
                    z-10
                    -translate-y-1/2
                    text-[#8AA8BC]
                  "
                  aria-hidden="true"
                />

                <input
                  type="url"
                  value={githubUrl}
                  onChange={(event) =>
                    setGithubUrl(
                      event.target.value
                    )
                  }
                  placeholder="https://github.com/username/project"
                  disabled={saving}
                  autoComplete="url"
                  inputMode="url"
                  className={`
                    ${profileInputClass}
                    pl-11
                  `}
                />
              </div>
            </ProfileField>

            <ProfileField label="Live / Project URL">
              <div
                className="
                  relative
                  min-w-0
                "
              >
                <ExternalLink
                  size={15}
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    top-1/2
                    z-10
                    -translate-y-1/2
                    text-[#8AA8BC]
                  "
                  aria-hidden="true"
                />

                <input
                  type="url"
                  value={projectUrl}
                  onChange={(event) =>
                    setProjectUrl(
                      event.target.value
                    )
                  }
                  placeholder="https://your-project.com"
                  disabled={saving}
                  autoComplete="url"
                  inputMode="url"
                  className={`
                    ${profileInputClass}
                    pl-11
                  `}
                />
              </div>
            </ProfileField>
          </div>
        </div>

        {/* ===================================================
            TIMELINE
        =================================================== */}

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
                bg-cyan-50
                text-cyan-600
              "
            >
              <CalendarDays
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
                "
              >
                Project timeline
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
                Add when you started and completed the project.
              </p>
            </div>
          </div>

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
            <ProfileField label="Start Date">
              <input
                type="date"
                value={startDate}
                onChange={(event) =>
                  setStartDate(
                    event.target.value
                  )
                }
                disabled={saving}
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
                min={
                  startDate || undefined
                }
                disabled={saving}
                className={
                  profileInputClass
                }
              />
            </ProfileField>
          </div>
        </div>

        {/* ===================================================
            SUBMIT
        =================================================== */}

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
            <p
              className="
                break-words
                text-xs
                font-semibold
                text-[#688399]
              "
            >
              {isEditing
                ? "Update your portfolio project"
                : "Build your portfolio"}
            </p>

            <p
              className="
                mt-1
                max-w-xl
                break-words
                text-xs
                leading-5
                text-[#94A6B5]

                [overflow-wrap:anywhere]
              "
            >
              Focus on projects that clearly demonstrate
              your technical ability and contribution.
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
                  size={15}
                  className="
                    shrink-0
                    animate-spin
                    text-[#0877E8]
                  "
                  aria-hidden="true"
                />

                <span>
                  Saving project...
                </span>
              </div>
            )}

            <button
              type="submit"
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
                    size={15}
                    className="
                      shrink-0
                      animate-spin
                    "
                    aria-hidden="true"
                  />

                  Saving...
                </>
              ) : isEditing ? (
                <>
                  <Save
                    size={15}
                    className="shrink-0"
                    aria-hidden="true"
                  />

                  Save Changes
                </>
              ) : (
                <>
                  <Plus
                    size={16}
                    className="shrink-0"
                    aria-hidden="true"
                  />

                  Add Project
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}