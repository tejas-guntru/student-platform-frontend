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
              ? "from-violet-500 via-[#0877E8] to-[#38BDF8]"
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
          bg-violet-500/7
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
                    ? "bg-violet-50 text-violet-600"
                    : "bg-[#EAF6FF] text-[#0877E8]"
                }
              `}
            >
              <FolderGit2 size={19} />
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
                {isEditing
                  ? "Editing Project"
                  : "New Project"}
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
                  ? "Edit Project"
                  : "Add a Project"}
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
            PROJECT DETAILS
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
              bg-[#EAF6FF]
              text-[#0877E8]
            "
          >
            <FolderGit2 size={17} />
          </div>

          <div>
            <h3
              className="
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
                text-xs
                leading-5
                text-[#8198AA]
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
                placeholder="Describe what you built, your contribution and the key features..."
                className={`${profileInputClass} resize-none`}
              />
            </ProfileField>
          </div>
        </div>

        {/* ===================================================
            PROJECT LINKS
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
                bg-violet-50
                text-violet-600
              "
            >
              <Link2 size={17} />
            </div>

            <div>
              <h3
                className="
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
                  text-xs
                  leading-5
                  text-[#8198AA]
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
              gap-5

              md:grid-cols-2
            "
          >
            <ProfileField label="GitHub URL">
              <div className="relative">
                <Code2
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
                  type="url"
                  value={githubUrl}
                  onChange={(event) =>
                    setGithubUrl(
                      event.target.value
                    )
                  }
                  placeholder="https://github.com/username/project"
                  className={`${profileInputClass} pl-11`}
                />
              </div>
            </ProfileField>

            <ProfileField label="Live / Project URL">
              <div className="relative">
                <ExternalLink
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
                  type="url"
                  value={projectUrl}
                  onChange={(event) =>
                    setProjectUrl(
                      event.target.value
                    )
                  }
                  placeholder="https://your-project.com"
                  className={`${profileInputClass} pl-11`}
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
                Project timeline
              </h3>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-[#8198AA]
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
        </div>

        {/* ===================================================
            SUBMIT
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
              Build your portfolio
            </p>

            <p
              className="
                mt-1
                text-xs
                leading-5
                text-[#94A6B5]
              "
            >
              Focus on projects that clearly demonstrate
              your technical ability and contribution.
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

                Saving project...
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="
                group
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