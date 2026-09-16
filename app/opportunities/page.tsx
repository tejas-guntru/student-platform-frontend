"use client";

import axios from "axios";
import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  applyToOpportunity,
  getOpportunities,
} from "@/services/opportunityService";

import {
  getMyMembership,
} from "@/services/membershipService";

import {
  getMyProfile,
} from "@/services/studentService";

import {
  getProfileCompletion,
} from "@/services/profileCompletionService";

import {
  getMyApplications,
} from "@/services/applicationService";

import type {
  ProfileCompletion,
} from "@/services/profileCompletionService";

import type {
  Opportunity,
} from "@/types/opportunity";

import type {
  MembershipResponse,
} from "@/types/membership";

import type {
  ApplicationResponse,
} from "@/types/application";


export default function OpportunitiesPage() {

  const [
    opportunities,
    setOpportunities,
  ] =
    useState<Opportunity[]>([]);


  const [
    applications,
    setApplications,
  ] =
    useState<ApplicationResponse[]>([]);


  const [
    membership,
    setMembership,
  ] =
    useState<MembershipResponse | null>(
      null
    );


  const [
    completion,
    setCompletion,
  ] =
    useState<ProfileCompletion | null>(
      null
    );


  const [
    studentGraduationYear,
    setStudentGraduationYear,
  ] =
    useState<number | null>(
      null
    );


  const [
    loading,
    setLoading,
  ] =
    useState(true);


  const [
    applyingId,
    setApplyingId,
  ] =
    useState<string | null>(
      null
    );


  const [
    error,
    setError,
  ] =
    useState("");


  const [
    success,
    setSuccess,
  ] =
    useState("");


  // =========================================================
  // LOAD PAGE
  // =========================================================

  useEffect(() => {

    const loadPage =
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
          role !== "STUDENT"
        ) {

          window.location.href =
            "/login";

          return;
        }


        try {

          const [
            opportunitiesData,
            membershipData,
            completionData,
            profileData,
            applicationsData,
          ] =
            await Promise.all([

              getOpportunities(),

              getMyMembership(),

              getProfileCompletion(),

              getMyProfile(),

              getMyApplications(),
            ]);


          setOpportunities(
            Array.isArray(
              opportunitiesData
            )
              ? opportunitiesData
              : []
          );


          setMembership(
            membershipData
          );


          setCompletion(
            completionData
          );


          setStudentGraduationYear(
            profileData.graduationYear ||
            null
          );


          setApplications(
            Array.isArray(
              applicationsData
            )
              ? applicationsData
              : []
          );

        } catch (
          error: unknown
        ) {

          handleError(
            error,
            "Unable to load opportunities."
          );

        } finally {

          setLoading(
            false
          );
        }
      };


    loadPage();

  }, []);


  // =========================================================
  // ERROR
  // =========================================================

  const handleError = (
    error: unknown,
    fallback: string
  ) => {

    console.error(
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
          fallback
      );

      return;
    }


    setError(
      fallback
    );
  };


  // =========================================================
  // FIND EXISTING APPLICATION
  // =========================================================

  const findApplication =
    (
      opportunityId:
        string | undefined
    ) => {

      if (!opportunityId) {
        return null;
      }


      return (
        applications.find(
          (application) =>
            application.opportunityId ===
            opportunityId
        ) ||
        null
      );
    };


  // =========================================================
  // APPLY
  // =========================================================

  const handleApply =
    async (
      opportunity: Opportunity
    ) => {

      setError("");
      setSuccess("");


      const opportunityId =
        opportunity.id ||
        opportunity.opportunityId;


      if (!opportunityId) {

        setError(
          "Opportunity ID is missing."
        );

        return;
      }


      // =====================================================
      // ALREADY APPLIED
      // =====================================================

      const existingApplication =
        findApplication(
          opportunityId
        );


      if (existingApplication) {

        setError(
          "You have already applied to this opportunity."
        );

        return;
      }


      // =====================================================
      // MEMBERSHIP
      // =====================================================

      if (
        !membership?.active
      ) {

        setError(
          "Active membership is required to apply."
        );

        return;
      }


      // =====================================================
      // PROFILE
      // =====================================================

      if (
        !completion ||
        completion.percentage < 100
      ) {

        setError(
          `Complete your profile before applying. Current completion: ${
            completion?.percentage ?? 0
          }%.`
        );

        return;
      }


      // =====================================================
      // GRADUATION YEAR
      // =====================================================

      if (
        !isGraduationYearEligible(
          opportunity,
          studentGraduationYear
        )
      ) {

        setError(
          studentGraduationYear
            ? `Your graduation year (${studentGraduationYear}) is not eligible for this opportunity.`
            : "Add your graduation year before applying."
        );

        return;
      }


      // =====================================================
      // DEADLINE
      // =====================================================

      if (
        !isDeadlineOpen(
          opportunity.applicationDeadline
        )
      ) {

        setError(
          "Application deadline has passed."
        );

        return;
      }


      // =====================================================
      // STATUS
      // =====================================================

      if (
        opportunity.status !== "ACTIVE"
      ) {

        setError(
          "This opportunity is not accepting applications."
        );

        return;
      }


      // =====================================================
      // CONFIRM
      // =====================================================

      const confirmed =
        window.confirm(
          `Apply for ${opportunity.title} at ${opportunity.companyName}?`
        );


      if (!confirmed) {
        return;
      }


      setApplyingId(
        opportunityId
      );


      try {

        const application =
          await applyToOpportunity(
            opportunityId
          );


        // Immediately add new application locally
        // so Apply Now becomes View Application.

        setApplications(
          (current) => [
            application,
            ...current,
          ]
        );


        setSuccess(
          `Application submitted successfully for ${application.opportunityTitle}.`
        );


        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

      } catch (
        error: unknown
      ) {

        if (
          axios.isAxiosError(
            error
          )
        ) {

          if (
            error.response?.status === 409
          ) {

            setError(
              "You have already applied to this opportunity."
            );

            // Refresh applications
            // in case another request created it.

            try {

              const latest =
                await getMyApplications();


              setApplications(
                Array.isArray(latest)
                  ? latest
                  : []
              );

            } catch (
              refreshError
            ) {

              console.error(
                refreshError
              );
            }

            return;
          }


          if (
            error.response?.status === 400 ||
            error.response?.status === 403
          ) {

            setError(
              error.response
                ?.data?.message ||
                "You are not eligible to apply."
            );

            return;
          }
        }


        handleError(
          error,
          "Unable to submit application."
        );

      } finally {

        setApplyingId(
          null
        );
      }
    };


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">

        <p className="text-zinc-400">
          Loading opportunities...
        </p>

      </main>
    );
  }


  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <div className="mx-auto max-w-7xl px-6 py-8">


        {/* HEADER */}

        <header className="flex flex-col gap-5 border-b border-zinc-800 pb-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
              OPPORTUNITIES
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Jobs & Internships
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Discover opportunities and
              check your eligibility before
              applying.
            </p>

          </div>


          <div className="flex flex-wrap items-center gap-3">

            <MembershipBadge
              membership={
                membership
              }
            />


            <Link
              href="/applications"
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium transition hover:bg-zinc-900"
            >
              My Applications
            </Link>


            <Link
              href="/dashboard"
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium transition hover:bg-zinc-900"
            >
              ← Dashboard
            </Link>

          </div>

        </header>


        {/* ACCOUNT SUMMARY */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2">

          <div
            className={
              membership?.active
                ? "rounded-xl border border-emerald-900/50 bg-emerald-950/20 p-5"
                : "rounded-xl border border-amber-900/50 bg-amber-950/20 p-5"
            }
          >

            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Membership
            </p>

            <p
              className={
                membership?.active
                  ? "mt-2 font-semibold text-emerald-300"
                  : "mt-2 font-semibold text-amber-300"
              }
            >

              {membership?.active
                ? "✓ Active"
                : "✗ Membership required"}

            </p>


            {!membership?.active && (

              <Link
                href="/membership"
                className="mt-3 inline-block text-sm font-semibold text-amber-300 underline"
              >
                Get Membership →
              </Link>

            )}

          </div>


          <div
            className={
              completion?.percentage === 100
                ? "rounded-xl border border-emerald-900/50 bg-emerald-950/20 p-5"
                : "rounded-xl border border-amber-900/50 bg-amber-950/20 p-5"
            }
          >

            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Profile
            </p>

            <p
              className={
                completion?.percentage === 100
                  ? "mt-2 font-semibold text-emerald-300"
                  : "mt-2 font-semibold text-amber-300"
              }
            >

              {completion?.percentage === 100
                ? "✓ 100% Complete"
                : `✗ ${
                    completion?.percentage ?? 0
                  }% Complete`}

            </p>


            {completion?.percentage !== 100 && (

              <Link
                href="/profile"
                className="mt-3 inline-block text-sm font-semibold text-amber-300 underline"
              >
                Complete Profile →
              </Link>

            )}

          </div>

        </section>


        {/* ERROR */}

        {error && (

          <div className="mt-6 rounded-xl border border-red-900/60 bg-red-950/30 px-5 py-4 text-sm text-red-300">
            {error}
          </div>

        )}


        {/* SUCCESS */}

        {success && (

          <div className="mt-6 rounded-xl border border-emerald-900/60 bg-emerald-950/30 px-5 py-4 text-sm text-emerald-300">

            {success}

            <div className="mt-3">

              <Link
                href="/applications"
                className="font-semibold underline"
              >
                View My Applications
              </Link>

            </div>

          </div>

        )}


        {/* EMPTY */}

        {opportunities.length === 0 ? (

          <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">

            <h2 className="text-xl font-semibold">
              No active opportunities
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              New opportunities will appear
              here when they are published.
            </p>

          </section>

        ) : (

          <section className="mt-8 grid gap-6">

            {opportunities.map(
              (
                opportunity,
                index
              ) => {

                const id =
                  opportunity.id ||
                  opportunity.opportunityId ||
                  String(index);


                const actualOpportunityId =
                  opportunity.id ||
                  opportunity.opportunityId;


                const existingApplication =
                  findApplication(
                    actualOpportunityId
                  );


                const membershipEligible =
                  Boolean(
                    membership?.active
                  );


                const profileEligible =
                  completion?.percentage === 100;


                const graduationEligible =
                  isGraduationYearEligible(
                    opportunity,
                    studentGraduationYear
                  );


                const deadlineOpen =
                  isDeadlineOpen(
                    opportunity.applicationDeadline
                  );


                const opportunityActive =
                  opportunity.status === "ACTIVE";


                const canApply =
                  !existingApplication &&
                  membershipEligible &&
                  profileEligible &&
                  graduationEligible &&
                  deadlineOpen &&
                  opportunityActive;


                return (

                  <article
                    key={id}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-zinc-700 sm:p-8"
                  >

                    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">


                      {/* MAIN */}

                      <div>

                        <div className="flex flex-wrap gap-2">

                          <Badge>
                            {
                              opportunity.opportunityType
                            }
                          </Badge>


                          <Badge>
                            {
                              opportunity.workMode
                            }
                          </Badge>


                          {opportunity.location && (

                            <Badge>
                              {
                                opportunity.location
                              }
                            </Badge>

                          )}


                          {existingApplication && (

                            <span className="rounded-full border border-blue-900 bg-blue-950/30 px-3 py-1 text-xs font-semibold text-blue-300">
                              APPLIED
                            </span>

                          )}

                        </div>


                        <h2 className="mt-5 text-2xl font-bold">
                          {opportunity.title}
                        </h2>


                        <p className="mt-1 text-lg text-zinc-400">
                          {opportunity.companyName}
                        </p>


                        <p className="mt-5 whitespace-pre-line text-sm leading-7 text-zinc-300">
                          {opportunity.description}
                        </p>


                        {opportunity.eligibility && (

                          <div className="mt-6">

                            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                              Company Eligibility
                            </p>

                            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-zinc-300">
                              {opportunity.eligibility}
                            </p>

                          </div>

                        )}

                      </div>


                      {/* SIDE */}

                      <div>

                        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">

                          <OpportunityDetail
                            label="Graduation Year"
                            value={
                              formatGraduationYears(
                                opportunity
                              )
                            }
                          />


                          <OpportunityDetail
                            label="Your Graduation Year"
                            value={
                              studentGraduationYear
                                ? String(
                                    studentGraduationYear
                                  )
                                : "Not added"
                            }
                          />


                          <OpportunityDetail
                            label="Deadline"
                            value={
                              formatDate(
                                opportunity.applicationDeadline
                              )
                            }
                          />


                          <OpportunityDetail
                            label="Status"
                            value={
                              opportunity.status
                            }
                          />

                        </div>


                        {/* ELIGIBILITY */}

                        <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-5">

                          <p className="text-sm font-semibold">
                            Your Eligibility
                          </p>


                          <div className="mt-4 space-y-3">

                            <EligibilityCheck
                              passed={
                                membershipEligible
                              }
                              label={
                                membershipEligible
                                  ? "Active membership"
                                  : "Membership required"
                              }
                            />


                            <EligibilityCheck
                              passed={
                                profileEligible
                              }
                              label={
                                profileEligible
                                  ? "Profile 100% complete"
                                  : `Profile ${
                                      completion?.percentage ?? 0
                                    }% complete`
                              }
                            />


                            <EligibilityCheck
                              passed={
                                graduationEligible
                              }
                              label={
                                getGraduationEligibilityLabel(
                                  opportunity,
                                  studentGraduationYear
                                )
                              }
                            />


                            <EligibilityCheck
                              passed={
                                deadlineOpen
                              }
                              label={
                                deadlineOpen
                                  ? "Application deadline open"
                                  : "Application deadline passed"
                              }
                            />


                            <EligibilityCheck
                              passed={
                                opportunityActive
                              }
                              label={
                                opportunityActive
                                  ? "Opportunity accepting applications"
                                  : "Opportunity not accepting applications"
                              }
                            />


                            {existingApplication && (

                              <EligibilityCheck
                                passed={true}
                                label={`Already applied • ${formatStatus(
                                  existingApplication.status
                                )}`}
                              />

                            )}

                          </div>


                          {/* ===================================
                              ALREADY APPLIED
                          =================================== */}

                          {existingApplication ? (

                            <div className="mt-6">

                              <div className="rounded-lg border border-blue-900/50 bg-blue-950/20 p-3">

                                <p className="text-xs text-blue-400">
                                  Application Status
                                </p>

                                <p className="mt-1 font-semibold text-blue-300">
                                  {
                                    formatStatus(
                                      existingApplication.status
                                    )
                                  }
                                </p>

                              </div>


                              <Link
                                href="/applications"
                                className="mt-3 block w-full rounded-lg border border-blue-800 bg-blue-950/30 px-5 py-3 text-center font-semibold text-blue-300 transition hover:bg-blue-950/60"
                              >
                                View Application
                              </Link>

                            </div>

                          ) : canApply ? (

                            <button
                              type="button"
                              disabled={
                                applyingId === id
                              }
                              onClick={() =>
                                handleApply(
                                  opportunity
                                )
                              }
                              className="mt-6 w-full rounded-lg bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
                            >

                              {applyingId === id
                                ? "Applying..."
                                : "Apply Now"}

                            </button>

                          ) : (

                            <BlockedAction
                              membershipEligible={
                                membershipEligible
                              }
                              profileEligible={
                                profileEligible
                              }
                              graduationEligible={
                                graduationEligible
                              }
                              deadlineOpen={
                                deadlineOpen
                              }
                              opportunityActive={
                                opportunityActive
                              }
                            />

                          )}

                        </div>

                      </div>

                    </div>

                  </article>

                );
              }
            )}

          </section>
        )}

      </div>

    </main>
  );
}


// =========================================================
// BLOCKED ACTION
// =========================================================

function BlockedAction({
  membershipEligible,
  profileEligible,
  graduationEligible,
  deadlineOpen,
  opportunityActive,
}: {
  membershipEligible: boolean;

  profileEligible: boolean;

  graduationEligible: boolean;

  deadlineOpen: boolean;

  opportunityActive: boolean;
}) {

  if (!membershipEligible) {

    return (
      <Link
        href="/membership"
        className="mt-6 block w-full rounded-lg bg-amber-500 px-5 py-3 text-center font-semibold text-black transition hover:bg-amber-400"
      >
        Get Membership
      </Link>
    );
  }


  if (!profileEligible) {

    return (
      <Link
        href="/profile"
        className="mt-6 block w-full rounded-lg bg-amber-500 px-5 py-3 text-center font-semibold text-black transition hover:bg-amber-400"
      >
        Complete Profile
      </Link>
    );
  }


  if (!graduationEligible) {

    return (
      <Link
        href="/profile"
        className="mt-6 block w-full rounded-lg border border-red-900 bg-red-950/30 px-5 py-3 text-center font-semibold text-red-300 transition hover:bg-red-950/50"
      >
        Check Graduation Year
      </Link>
    );
  }


  if (!deadlineOpen) {

    return (
      <button
        type="button"
        disabled
        className="mt-6 w-full cursor-not-allowed rounded-lg bg-zinc-800 px-5 py-3 font-semibold text-zinc-500"
      >
        Applications Closed
      </button>
    );
  }


  if (!opportunityActive) {

    return (
      <button
        type="button"
        disabled
        className="mt-6 w-full cursor-not-allowed rounded-lg bg-zinc-800 px-5 py-3 font-semibold text-zinc-500"
      >
        Opportunity Closed
      </button>
    );
  }


  return null;
}


// =========================================================
// ELIGIBILITY CHECK
// =========================================================

function EligibilityCheck({
  passed,
  label,
}: {
  passed: boolean;

  label: string;
}) {

  return (
    <div className="flex items-start gap-3">

      <span
        className={
          passed
            ? "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-950 text-xs font-bold text-emerald-400"
            : "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-950 text-xs font-bold text-red-400"
        }
      >
        {passed
          ? "✓"
          : "✕"}
      </span>


      <p
        className={
          passed
            ? "pt-0.5 text-sm text-emerald-300"
            : "pt-0.5 text-sm text-red-300"
        }
      >
        {label}
      </p>

    </div>
  );
}


// =========================================================
// MEMBERSHIP BADGE
// =========================================================

function MembershipBadge({
  membership,
}: {
  membership:
    | MembershipResponse
    | null;
}) {

  if (
    membership?.active
  ) {

    return (
      <span className="rounded-full border border-emerald-900 bg-emerald-950/40 px-4 py-2 text-sm font-medium text-emerald-400">

        Membership Active

      </span>
    );
  }


  return (
    <span className="rounded-full border border-amber-900 bg-amber-950/40 px-4 py-2 text-sm font-medium text-amber-400">

      Membership Inactive

    </span>
  );
}


// =========================================================
// BADGE
// =========================================================

function Badge({
  children,
}: {
  children:
    React.ReactNode;
}) {

  return (
    <span className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs font-medium text-zinc-300">
      {children}
    </span>
  );
}


// =========================================================
// DETAIL
// =========================================================

function OpportunityDetail({
  label,
  value,
}: {
  label: string;

  value: string;
}) {

  return (
    <div className="mb-4 last:mb-0">

      <p className="text-xs text-zinc-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium">
        {value}
      </p>

    </div>
  );
}


// =========================================================
// GRADUATION ELIGIBILITY
// =========================================================

function isGraduationYearEligible(
  opportunity: Opportunity,
  studentYear: number | null
) {

  const min =
    opportunity.minGraduationYear;

  const max =
    opportunity.maxGraduationYear;


  if (
    min == null &&
    max == null
  ) {

    return true;
  }


  if (
    studentYear == null
  ) {

    return false;
  }


  if (
    min != null &&
    studentYear < min
  ) {

    return false;
  }


  if (
    max != null &&
    studentYear > max
  ) {

    return false;
  }


  return true;
}


// =========================================================
// GRADUATION LABEL
// =========================================================

function getGraduationEligibilityLabel(
  opportunity: Opportunity,
  studentYear: number | null
) {

  const eligible =
    isGraduationYearEligible(
      opportunity,
      studentYear
    );


  if (eligible) {

    return "Graduation year eligible";
  }


  if (
    studentYear == null
  ) {

    return "Graduation year not added";
  }


  return `Graduation year ${studentYear} not eligible`;
}


// =========================================================
// DEADLINE
// =========================================================

function isDeadlineOpen(
  value:
    | string
    | null
) {

  if (!value) {

    return true;
  }


  const deadline =
    new Date(
      value
    );


  if (
    Number.isNaN(
      deadline.getTime()
    )
  ) {

    return false;
  }


  return deadline.getTime() >
    Date.now();
}


// =========================================================
// GRADUATION YEARS
// =========================================================

function formatGraduationYears(
  opportunity: Opportunity
) {

  const min =
    opportunity.minGraduationYear;

  const max =
    opportunity.maxGraduationYear;


  if (
    min &&
    max &&
    min === max
  ) {

    return String(
      min
    );
  }


  if (
    min &&
    max
  ) {

    return `${min} - ${max}`;
  }


  if (min) {

    return `${min}+`;
  }


  if (max) {

    return `Up to ${max}`;
  }


  return "All years";
}


// =========================================================
// STATUS
// =========================================================

function formatStatus(
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


// =========================================================
// DATE
// =========================================================

function formatDate(
  value:
    | string
    | null
) {

  if (!value) {

    return "No deadline";
  }


  const date =
    new Date(
      value
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return "Invalid date";
  }


  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}