"use client";

import axios from "axios";
import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import {
  getAdminCandidate,
} from "@/services/adminCandidateService";

import type {
  AdminCandidate,
  AdminCandidateCodingProfile,
} from "@/types/adminCandidate";


export default function AdminCandidatePage() {

  const params =
    useParams<{
      studentId: string;
    }>();


  const studentId =
    params.studentId;


  const [
    candidate,
    setCandidate,
  ] =
    useState<AdminCandidate | null>(
      null
    );


  const [
    loading,
    setLoading,
  ] =
    useState(true);


  const [
    error,
    setError,
  ] =
    useState("");


  // =========================================================
  // LOAD
  // =========================================================

  useEffect(() => {

    const load =
      async () => {

        const token =
          localStorage.getItem(
            "token"
          );

        const role =
          localStorage.getItem(
            "role"
          );


        if (
          !token ||
          role !== "ADMIN"
        ) {

          window.location.href =
            "/login";

          return;
        }


        if (!studentId) {

          setError(
            "Student ID is missing."
          );

          setLoading(
            false
          );

          return;
        }


        try {

          const data =
            await getAdminCandidate(
              studentId
            );


          setCandidate(
            data
          );

        } catch (
          error: unknown
        ) {

          console.error(
            "CANDIDATE LOAD ERROR:",
            error
          );


          if (
            axios.isAxiosError(
              error
            )
          ) {

            if (
              error.response?.status === 401 ||
              error.response?.status === 403
            ) {

              localStorage.clear();

              window.location.href =
                "/login";

              return;
            }


            setError(
              error.response
                ?.data?.message ||
                "Unable to load candidate."
            );

          } else {

            setError(
              "Something went wrong while loading candidate."
            );
          }

        } finally {

          setLoading(
            false
          );
        }
      };


    load();

  }, [
    studentId,
  ]);


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">

        <p className="text-zinc-400">
          Loading candidate...
        </p>

      </main>
    );
  }


  // =========================================================
  // ERROR
  // =========================================================

  if (
    error ||
    !candidate
  ) {

    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">

        <div className="mx-auto max-w-5xl">

          <Link
            href="/admin/applications"
            className="text-sm text-zinc-400 hover:text-white"
          >
            ← Applications
          </Link>


          <div className="mt-8 rounded-2xl border border-red-900 bg-red-950/30 p-6 text-red-300">

            {error ||
              "Candidate not found."}

          </div>

        </div>

      </main>
    );
  }


  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <div className="mx-auto max-w-7xl px-6 py-8">


        {/* ===================================================
            HEADER
        =================================================== */}

        <header className="flex flex-col gap-5 border-b border-zinc-800 pb-6 lg:flex-row lg:items-start lg:justify-between">

          <div>

            <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
              ADMIN • CANDIDATE
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              {candidate.fullName}
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              {candidate.email}
            </p>


            {candidate.preferredRole && (

              <p className="mt-3 text-sm font-medium text-zinc-300">
                {candidate.preferredRole}
              </p>

            )}

          </div>


          <div className="flex flex-wrap gap-3">

            <Link
              href="/admin/applications"
              className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm hover:bg-zinc-900"
            >
              ← Applications
            </Link>


            <Link
              href="/admin/dashboard"
              className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm hover:bg-zinc-900"
            >
              Dashboard
            </Link>

          </div>

        </header>


        {/* ===================================================
            BASIC INFORMATION
        =================================================== */}

        <section className="mt-8">

          <SectionHeader
            title="Candidate Profile"
            subtitle="Personal and academic information"
          />


          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <InfoCard
              label="College"
              value={
                candidate.collegeName
              }
            />

            <InfoCard
              label="Degree"
              value={
                candidate.degree
              }
            />

            <InfoCard
              label="Branch"
              value={
                candidate.branch
              }
            />

            <InfoCard
              label="Graduation"
              value={
                candidate.graduationYear
              }
            />

            <InfoCard
              label="City"
              value={
                candidate.city
              }
            />

            <InfoCard
              label="Phone"
              value={
                candidate.phone
              }
            />

            <InfoCard
              label="Preferred Role"
              value={
                candidate.preferredRole
              }
            />

            <InfoCard
              label="Email"
              value={
                candidate.email
              }
            />

          </div>


          {candidate.bio && (

            <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

              <p className="text-xs uppercase tracking-wider text-zinc-500">
                Bio
              </p>

              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-zinc-300">
                {candidate.bio}
              </p>

            </div>

          )}

        </section>


        {/* ===================================================
            RANKING
        =================================================== */}

        <section className="mt-10">

          <SectionHeader
            title="Coding Ranking"
            subtitle="Leaderboard performance from verified profiles"
          />


          {!candidate.ranking ? (

            <EmptyCard>
              Candidate is not currently ranked.
            </EmptyCard>

          ) : (

            <>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <RankCard
                  label="Global Rank"
                  value={
                    formatRank(
                      candidate.ranking
                        .globalRank
                    )
                  }
                />

                <RankCard
                  label="College Rank"
                  value={
                    formatRank(
                      candidate.ranking
                        .collegeRank
                    )
                  }
                />

                <RankCard
                  label="Batch Rank"
                  value={
                    formatRank(
                      candidate.ranking
                        .graduationYearRank
                    )
                  }
                />

                <RankCard
                  label="Overall Score"
                  value={
                    formatScore(
                      candidate.ranking
                        .overallScore
                    )
                  }
                />

              </div>


              <div className="mt-4 grid gap-4 sm:grid-cols-3">

                <InfoCard
                  label="Codeforces Score"
                  value={
                    formatScore(
                      candidate.ranking
                        .codeforcesScore
                    )
                  }
                />

                <InfoCard
                  label="LeetCode Score"
                  value={
                    formatScore(
                      candidate.ranking
                        .leetcodeScore
                    )
                  }
                />

                <InfoCard
                  label="CodeChef Score"
                  value={
                    formatScore(
                      candidate.ranking
                        .codechefScore
                    )
                  }
                />

              </div>

            </>

          )}

        </section>


        {/* ===================================================
            SKILLS
        =================================================== */}

        <section className="mt-10">

          <SectionHeader
            title="Skills"
            subtitle={`${candidate.skills.length} skills added`}
          />


          {candidate.skills.length ===
          0 ? (

            <EmptyCard>
              Candidate has not added skills.
            </EmptyCard>

          ) : (

            <div className="mt-4 flex flex-wrap gap-3">

              {candidate.skills.map(
                (skill) => (

                  <div
                    key={
                      skill.skillId
                    }
                    className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3"
                  >

                    <p className="font-semibold">
                      {skill.skillName}
                    </p>

                    <p className="mt-1 text-xs text-zinc-500">
                      {
                        formatText(
                          skill.proficiency
                        )
                      }
                    </p>

                  </div>

                )
              )}

            </div>

          )}

        </section>


        {/* ===================================================
            CODING PROFILES
        =================================================== */}

        <section className="mt-10">

          <SectionHeader
            title="Coding Profiles"
            subtitle="Connected competitive programming accounts"
          />


          {candidate
            .codingProfiles
            .length ===
          0 ? (

            <EmptyCard>
              No coding profiles connected.
            </EmptyCard>

          ) : (

            <div className="mt-4 grid gap-5 lg:grid-cols-3">

              {candidate
                .codingProfiles
                .map(
                  (profile) => (

                    <CodingProfileCard
                      key={
                        profile.profileId
                      }
                      profile={
                        profile
                      }
                    />

                  )
                )}

            </div>

          )}

        </section>


        {/* ===================================================
            PROJECTS
        =================================================== */}

        <section className="mt-10">

          <SectionHeader
            title="Projects"
            subtitle={`${candidate.projects.length} projects`}
          />


          {candidate.projects.length ===
          0 ? (

            <EmptyCard>
              Candidate has not added projects.
            </EmptyCard>

          ) : (

            <div className="mt-4 space-y-5">

              {candidate.projects.map(
                (project) => (

                  <article
                    key={
                      project.projectId
                    }
                    className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
                  >

                    <h3 className="text-xl font-semibold">
                      {project.title}
                    </h3>


                    {project.techStack && (

                      <p className="mt-2 text-sm font-medium text-zinc-400">
                        {project.techStack}
                      </p>

                    )}


                    {project.description && (

                      <p className="mt-4 whitespace-pre-line text-sm leading-7 text-zinc-400">
                        {project.description}
                      </p>

                    )}


                    <div className="mt-5 flex flex-wrap gap-4 text-sm">

                      {project.githubUrl && (

                        <a
                          href={
                            project.githubUrl
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-zinc-200 underline"
                        >
                          GitHub
                        </a>

                      )}


                      {project.projectUrl && (

                        <a
                          href={
                            project.projectUrl
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-zinc-200 underline"
                        >
                          Live Project
                        </a>

                      )}

                    </div>


                    {(project.startDate ||
                      project.endDate) && (

                      <p className="mt-5 border-t border-zinc-800 pt-4 text-xs text-zinc-500">

                        {project.startDate
                          ? formatDate(
                              project.startDate
                            )
                          : "-"}

                        {" → "}

                        {project.endDate
                          ? formatDate(
                              project.endDate
                            )
                          : "Present"}

                      </p>

                    )}

                  </article>

                )
              )}

            </div>

          )}

        </section>


        {/* ===================================================
            EXPERIENCE
        =================================================== */}

        <section className="mt-10 pb-12">

          <SectionHeader
            title="Experience"
            subtitle={`${candidate.experiences.length} entries`}
          />


          {candidate.experiences.length ===
          0 ? (

            <EmptyCard>
              Candidate has not added experience.
            </EmptyCard>

          ) : (

            <div className="mt-4 space-y-5">

              {candidate.experiences.map(
                (experience) => (

                  <article
                    key={
                      experience.experienceId
                    }
                    className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
                  >

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                      <div>

                        <h3 className="text-xl font-semibold">
                          {
                            experience.roleTitle
                          }
                        </h3>

                        <p className="mt-1 font-medium text-zinc-300">
                          {
                            experience.companyName
                          }
                        </p>

                      </div>


                      {experience.currentlyWorking && (

                        <span className="w-fit rounded-full border border-emerald-900 bg-emerald-950/30 px-3 py-1 text-xs font-semibold text-emerald-400">
                          Current
                        </span>

                      )}

                    </div>


                    <div className="mt-4 flex flex-wrap gap-2">

                      <Tag>
                        {
                          formatText(
                            experience.employmentType
                          )
                        }
                      </Tag>


                      {experience.location && (

                        <Tag>
                          {
                            experience.location
                          }
                        </Tag>

                      )}

                    </div>


                    <p className="mt-4 text-sm text-zinc-500">

                      {
                        formatDate(
                          experience.startDate
                        )
                      }

                      {" → "}

                      {experience.currentlyWorking
                        ? "Present"
                        : experience.endDate
                        ? formatDate(
                            experience.endDate
                          )
                        : "-"}

                    </p>


                    {experience.description && (

                      <p className="mt-5 whitespace-pre-line text-sm leading-7 text-zinc-400">
                        {
                          experience.description
                        }
                      </p>

                    )}

                  </article>

                )
              )}

            </div>

          )}

        </section>

      </div>

    </main>
  );
}


// =========================================================
// CODING PROFILE
// =========================================================

function CodingProfileCard({
  profile,
}: {
  profile:
    AdminCandidateCodingProfile;
}) {

  const verified =
    profile.verificationStatus ===
    "VERIFIED";


  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="flex items-start justify-between gap-3">

        <div>

          <p className="text-sm text-zinc-500">
            {formatText(
              profile.platform
            )}
          </p>

          <h3 className="mt-1 text-lg font-semibold">
            {profile.username}
          </h3>

        </div>


        <span
          className={
            verified
              ? "rounded-full border border-emerald-900 bg-emerald-950/30 px-2.5 py-1 text-[10px] font-semibold text-emerald-400"
              : "rounded-full border border-amber-900 bg-amber-950/30 px-2.5 py-1 text-[10px] font-semibold text-amber-400"
          }
        >
          {
            profile.verificationStatus
          }
        </span>

      </div>


      <div className="mt-5 grid grid-cols-2 gap-3">

        <MiniStat
          label="Rating"
          value={
            profile.currentRating
          }
        />

        <MiniStat
          label="Max Rating"
          value={
            profile.maxRating
          }
        />

        <MiniStat
          label="Problems"
          value={
            profile.problemsSolved
          }
        />

        <MiniStat
          label="Contests"
          value={
            profile.contestCount
          }
        />

      </div>


      {profile.profileUrl && (

        <a
          href={
            profile.profileUrl
          }
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-block text-sm font-semibold text-zinc-300 underline hover:text-white"
        >
          Open Profile →
        </a>

      )}

    </article>
  );
}


// =========================================================
// SECTION HEADER
// =========================================================

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {

  return (
    <div>

      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      <p className="mt-1 text-sm text-zinc-500">
        {subtitle}
      </p>

    </div>
  );
}


// =========================================================
// INFO CARD
// =========================================================

function InfoCard({
  label,
  value,
}: {
  label: string;

  value:
    | string
    | number
    | null
    | undefined;
}) {

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">

      <p className="text-xs text-zinc-500">
        {label}
      </p>

      <p className="mt-2 break-words font-semibold">
        {value ??
          "-"}
      </p>

    </div>
  );
}


// =========================================================
// RANK CARD
// =========================================================

function RankCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">

      <p className="text-sm text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold">
        {value}
      </p>

    </div>
  );
}


// =========================================================
// MINI STAT
// =========================================================

function MiniStat({
  label,
  value,
}: {
  label: string;

  value:
    | string
    | number
    | null
    | undefined;
}) {

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3">

      <p className="text-[10px] text-zinc-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold">
        {value ??
          "-"}
      </p>

    </div>
  );
}


// =========================================================
// EMPTY
// =========================================================

function EmptyCard({
  children,
}: {
  children:
    React.ReactNode;
}) {

  return (
    <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center text-sm text-zinc-500">
      {children}
    </div>
  );
}


// =========================================================
// TAG
// =========================================================

function Tag({
  children,
}: {
  children:
    React.ReactNode;
}) {

  return (
    <span className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs text-zinc-300">
      {children}
    </span>
  );
}


// =========================================================
// FORMAT
// =========================================================

function formatRank(
  value:
    | number
    | null
) {

  if (
    value === null ||
    value === undefined ||
    value <= 0
  ) {

    return "-";
  }


  return `#${value}`;
}


function formatScore(
  value:
    | number
    | null
) {

  if (
    value === null ||
    value === undefined
  ) {

    return "-";
  }


  return value.toFixed(
    2
  );
}


function formatText(
  value: string
) {

  return value
    .split("_")
    .map(
      (word) =>
        word.charAt(0) +
        word
          .slice(1)
          .toLowerCase()
    )
    .join(" ");
}


function formatDate(
  value: string
) {

  return new Date(
    `${value}T00:00:00`
  ).toLocaleDateString(
    "en-IN",
    {
      month: "short",
      year: "numeric",
    }
  );
}