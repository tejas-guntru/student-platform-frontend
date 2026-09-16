"use client";

import axios from "axios";
import Link from "next/link";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  closeAdminOpportunity,
  createAdminOpportunity,
  getAdminOpportunities,
  updateAdminOpportunity,
} from "@/services/adminService";

import type {
  CreateOpportunityRequest,
  Opportunity,
  OpportunityStatus,
  OpportunityType,
  UpdateOpportunityRequest,
  WorkMode,
} from "@/types/opportunity";


export default function AdminOpportunitiesPage() {

  const [
    opportunities,
    setOpportunities,
  ] = useState<Opportunity[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    closingId,
    setClosingId,
  ] = useState<string | null>(
    null
  );

  const [
    showForm,
    setShowForm,
  ] = useState(false);

  const [
    editingId,
    setEditingId,
  ] = useState<string | null>(
    null
  );

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");


  // =========================================================
  // FORM STATE
  // =========================================================

  const [
    title,
    setTitle,
  ] = useState("");

  const [
    companyName,
    setCompanyName,
  ] = useState("");

  const [
    opportunityType,
    setOpportunityType,
  ] =
    useState<OpportunityType>(
      "INTERNSHIP"
    );

  const [
    workMode,
    setWorkMode,
  ] =
    useState<WorkMode>(
      "HYBRID"
    );

  const [
    location,
    setLocation,
  ] = useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    eligibility,
    setEligibility,
  ] = useState("");

  const [
    minGraduationYear,
    setMinGraduationYear,
  ] = useState("");

  const [
    maxGraduationYear,
    setMaxGraduationYear,
  ] = useState("");

  const [
    deadline,
    setDeadline,
  ] = useState("");

  const [
    status,
    setStatus,
  ] =
    useState<OpportunityStatus>(
      "ACTIVE"
    );


  // =========================================================
  // INITIAL LOAD
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
          role !== "ADMIN"
        ) {

          window.location.href =
            "/login";

          return;
        }


        await loadOpportunities();
      };


    loadPage();

  }, []);


  // =========================================================
  // LOAD
  // =========================================================

  const loadOpportunities =
    async () => {

      try {

        const response =
          await getAdminOpportunities();


        setOpportunities(
          Array.isArray(response)
            ? response
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

        setLoading(false);
      }
    };


  // =========================================================
  // ERROR
  // =========================================================

  const handleError = (
    error: unknown,
    fallback: string
  ) => {

    console.error(error);


    if (
      axios.isAxiosError(
        error
      )
    ) {

      if (
        error.response?.status ===
          401 ||
        error.response?.status ===
          403
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
  // CREATE BUTTON
  // =========================================================

  const openCreateForm = () => {

    setError("");
    setSuccess("");

    resetForm();

    setEditingId(
      null
    );

    setShowForm(
      true
    );


    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // =========================================================
  // EDIT BUTTON
  // =========================================================

  const openEditForm = (
    opportunity: Opportunity
  ) => {

    const id =
      getOpportunityId(
        opportunity
      );


    if (!id) {

      setError(
        "Opportunity ID is missing."
      );

      return;
    }


    setError("");
    setSuccess("");

    setEditingId(
      id
    );

    setTitle(
      opportunity.title
    );

    setCompanyName(
      opportunity.companyName
    );

    setOpportunityType(
      opportunity.opportunityType
    );

    setWorkMode(
      opportunity.workMode
    );

    setLocation(
      opportunity.location ||
        ""
    );

    setDescription(
      opportunity.description
    );

    setEligibility(
      opportunity.eligibility ||
        ""
    );

    setMinGraduationYear(
      opportunity.minGraduationYear
        ? String(
            opportunity.minGraduationYear
          )
        : ""
    );

    setMaxGraduationYear(
      opportunity.maxGraduationYear
        ? String(
            opportunity.maxGraduationYear
          )
        : ""
    );

    setDeadline(
      toDateTimeLocal(
        opportunity.applicationDeadline
      )
    );

    setStatus(
      opportunity.status
    );

    setShowForm(
      true
    );


    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // =========================================================
  // CANCEL
  // =========================================================

  const closeForm = () => {

    resetForm();

    setEditingId(
      null
    );

    setShowForm(
      false
    );

    setError("");
  };


  // =========================================================
  // SUBMIT CREATE / UPDATE
  // =========================================================

  const handleSubmit =
    async (
      event:
        FormEvent<HTMLFormElement>
    ) => {

      event.preventDefault();

      setError("");
      setSuccess("");


      if (
        !title.trim() ||
        !companyName.trim() ||
        !description.trim()
      ) {

        setError(
          "Title, company and description are required."
        );

        return;
      }


      if (
        minGraduationYear &&
        maxGraduationYear &&
        Number(
          minGraduationYear
        ) >
          Number(
            maxGraduationYear
          )
      ) {

        setError(
          "Minimum graduation year cannot be greater than maximum graduation year."
        );

        return;
      }


      setSaving(
        true
      );


      try {

        const request = {

          title:
            title.trim(),

          companyName:
            companyName.trim(),

          opportunityType,

          workMode,

          location:
            location.trim() ||
            null,

          description:
            description.trim(),

          eligibility:
            eligibility.trim() ||
            null,

          minGraduationYear:
            minGraduationYear
              ? Number(
                  minGraduationYear
                )
              : null,

          maxGraduationYear:
            maxGraduationYear
              ? Number(
                  maxGraduationYear
                )
              : null,

          applicationDeadline:
            deadline
              ? new Date(
                  deadline
                ).toISOString()
              : null,

          status,

        };


        // =========================================
        // UPDATE
        // =========================================

        if (
          editingId
        ) {

          const updated =
            await updateAdminOpportunity(
              editingId,
              request as
                UpdateOpportunityRequest
            );


          setOpportunities(
            (current) =>
              current.map(
                (
                  opportunity
                ) => {

                  const id =
                    getOpportunityId(
                      opportunity
                    );


                  return id ===
                    editingId
                    ? updated
                    : opportunity;
                }
              )
          );


          setSuccess(
            `${updated.title} updated successfully.`
          );

        }

        // =========================================
        // CREATE
        // =========================================

        else {

          const created =
            await createAdminOpportunity(
              request as
                CreateOpportunityRequest
            );


          setOpportunities(
            (current) => [
              created,
              ...current,
            ]
          );


          setSuccess(
            `${created.title} created successfully.`
          );
        }


        resetForm();

        setEditingId(
          null
        );

        setShowForm(
          false
        );


        await loadOpportunities();

      } catch (
        error: unknown
      ) {

        handleError(
          error,
          editingId
            ? "Unable to update opportunity."
            : "Unable to create opportunity."
        );

      } finally {

        setSaving(
          false
        );
      }
    };


  // =========================================================
  // CLOSE OPPORTUNITY
  // =========================================================

  const handleCloseOpportunity =
    async (
      opportunity:
        Opportunity
    ) => {

      const id =
        getOpportunityId(
          opportunity
        );


      if (!id) {

        setError(
          "Opportunity ID is missing."
        );

        return;
      }


      if (
        opportunity.status ===
        "CLOSED"
      ) {

        return;
      }


      const confirmed =
        window.confirm(
          `Close "${opportunity.title}"?\n\nStudents will no longer be able to apply.`
        );


      if (!confirmed) {

        return;
      }


      setError("");
      setSuccess("");

      setClosingId(
        id
      );


      try {

        const closed =
          await closeAdminOpportunity(
            id
          );


        setOpportunities(
          (current) =>
            current.map(
              (
                item
              ) => {

                const itemId =
                  getOpportunityId(
                    item
                  );


                return itemId ===
                  id
                  ? closed
                  : item;
              }
            )
        );


        setSuccess(
          `${opportunity.title} closed successfully.`
        );


        await loadOpportunities();

      } catch (
        error: unknown
      ) {

        handleError(
          error,
          "Unable to close opportunity."
        );

      } finally {

        setClosingId(
          null
        );
      }
    };


  // =========================================================
  // RESET
  // =========================================================

  const resetForm = () => {

    setTitle("");

    setCompanyName("");

    setOpportunityType(
      "INTERNSHIP"
    );

    setWorkMode(
      "HYBRID"
    );

    setLocation("");

    setDescription("");

    setEligibility("");

    setMinGraduationYear(
      ""
    );

    setMaxGraduationYear(
      ""
    );

    setDeadline("");

    setStatus(
      "ACTIVE"
    );
  };


  // =========================================================
  // LOADING
  // =========================================================

  if (
    loading
  ) {

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

        <header className="flex flex-col gap-5 border-b border-zinc-800 pb-6 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
              ADMIN
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Opportunities
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Create, edit and close
              jobs and internships.
            </p>

          </div>


          <div className="flex flex-wrap gap-3">

            <button
              type="button"
              onClick={
                openCreateForm
              }
              className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              + Create Opportunity
            </button>


            <Link
              href="/admin/dashboard"
              className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium transition hover:bg-zinc-900"
            >
              ← Dashboard
            </Link>

          </div>

        </header>


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

          </div>
        )}


        {/* CREATE / EDIT FORM */}

        {showForm && (

          <form
            onSubmit={
              handleSubmit
            }
            className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8"
          >

            <div className="flex flex-col gap-4 border-b border-zinc-800 pb-6 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h2 className="text-xl font-semibold">

                  {editingId
                    ? "Edit Opportunity"
                    : "Create Opportunity"}

                </h2>

                <p className="mt-1 text-sm text-zinc-500">

                  {editingId
                    ? "Update the opportunity details below."
                    : "Add a new job or internship."}

                </p>

              </div>


              <button
                type="button"
                onClick={
                  closeForm
                }
                className="rounded-lg border border-zinc-700 px-4 py-2 text-sm transition hover:bg-zinc-800"
              >
                Cancel
              </button>

            </div>


            <div className="mt-7 grid gap-6 md:grid-cols-2">


              <Field label="Job Title">

                <input
                  type="text"
                  value={
                    title
                  }
                  onChange={(
                    event
                  ) =>
                    setTitle(
                      event.target.value
                    )
                  }
                  placeholder="Java Backend Developer Intern"
                  className={
                    inputClass
                  }
                />

              </Field>


              <Field label="Company">

                <input
                  type="text"
                  value={
                    companyName
                  }
                  onChange={(
                    event
                  ) =>
                    setCompanyName(
                      event.target.value
                    )
                  }
                  placeholder="Demo Technologies"
                  className={
                    inputClass
                  }
                />

              </Field>


              <Field label="Opportunity Type">

                <select
                  value={
                    opportunityType
                  }
                  onChange={(
                    event
                  ) =>
                    setOpportunityType(
                      event.target.value as
                        OpportunityType
                    )
                  }
                  className={
                    inputClass
                  }
                >

                  <option value="INTERNSHIP">
                    Internship
                  </option>

                  <option value="JOB">
                    Job
                  </option>

                </select>

              </Field>


              <Field label="Work Mode">

                <select
                  value={
                    workMode
                  }
                  onChange={(
                    event
                  ) =>
                    setWorkMode(
                      event.target.value as
                        WorkMode
                    )
                  }
                  className={
                    inputClass
                  }
                >

                  <option value="ONSITE">
                    Onsite
                  </option>

                  <option value="HYBRID">
                    Hybrid
                  </option>

                  <option value="REMOTE">
                    Remote
                  </option>

                </select>

              </Field>


              <Field label="Location">

                <input
                  type="text"
                  value={
                    location
                  }
                  onChange={(
                    event
                  ) =>
                    setLocation(
                      event.target.value
                    )
                  }
                  placeholder="Hyderabad"
                  className={
                    inputClass
                  }
                />

              </Field>


              <Field label="Status">

                <select
                  value={
                    status
                  }
                  onChange={(
                    event
                  ) =>
                    setStatus(
                      event.target.value as
                        OpportunityStatus
                    )
                  }
                  className={
                    inputClass
                  }
                >

                  <option value="ACTIVE">
                    Active
                  </option>

                  <option value="DRAFT">
                    Draft
                  </option>

                  {editingId &&
                    status ===
                      "CLOSED" && (

                    <option value="CLOSED">
                      Closed
                    </option>
                  )}

                </select>

              </Field>


              <Field label="Minimum Graduation Year">

                <input
                  type="number"
                  min="2020"
                  max="2040"
                  value={
                    minGraduationYear
                  }
                  onChange={(
                    event
                  ) =>
                    setMinGraduationYear(
                      event.target.value
                    )
                  }
                  placeholder="2027"
                  className={
                    inputClass
                  }
                />

              </Field>


              <Field label="Maximum Graduation Year">

                <input
                  type="number"
                  min="2020"
                  max="2040"
                  value={
                    maxGraduationYear
                  }
                  onChange={(
                    event
                  ) =>
                    setMaxGraduationYear(
                      event.target.value
                    )
                  }
                  placeholder="2027"
                  className={
                    inputClass
                  }
                />

              </Field>


              <Field label="Application Deadline">

                <input
                  type="datetime-local"
                  value={
                    deadline
                  }
                  onChange={(
                    event
                  ) =>
                    setDeadline(
                      event.target.value
                    )
                  }
                  className={
                    inputClass
                  }
                />

              </Field>


              <div className="md:col-span-2">

                <Field label="Description">

                  <textarea
                    value={
                      description
                    }
                    onChange={(
                      event
                    ) =>
                      setDescription(
                        event.target.value
                      )
                    }
                    rows={6}
                    placeholder="Describe the role..."
                    className={`${inputClass} resize-none`}
                  />

                </Field>

              </div>


              <div className="md:col-span-2">

                <Field label="Eligibility">

                  <textarea
                    value={
                      eligibility
                    }
                    onChange={(
                      event
                    ) =>
                      setEligibility(
                        event.target.value
                      )
                    }
                    rows={4}
                    placeholder="B.Tech students graduating in 2027"
                    className={`${inputClass} resize-none`}
                  />

                </Field>

              </div>

            </div>


            <div className="mt-8 flex justify-end">

              <button
                type="submit"
                disabled={
                  saving
                }
                className="rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
              >

                {saving
                  ? "Saving..."
                  : editingId
                  ? "Save Changes"
                  : "Create Opportunity"}

              </button>

            </div>

          </form>
        )}


        {/* SUMMARY */}

        <section className="mt-8 grid gap-4 sm:grid-cols-3">

          <SummaryCard
            label="Total"
            value={
              opportunities.length
            }
          />

          <SummaryCard
            label="Active"
            value={
              opportunities.filter(
                (
                  opportunity
                ) =>
                  opportunity.status ===
                  "ACTIVE"
              ).length
            }
          />

          <SummaryCard
            label="Closed"
            value={
              opportunities.filter(
                (
                  opportunity
                ) =>
                  opportunity.status ===
                  "CLOSED"
              ).length
            }
          />

        </section>


        {/* LIST */}

        <section className="mt-8">

          <h2 className="mb-5 text-xl font-semibold">
            All Opportunities
          </h2>


          {opportunities.length ===
          0 ? (

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-500">
              No opportunities yet.
            </div>

          ) : (

            <div className="space-y-5">

              {opportunities.map(
                (
                  opportunity,
                  index
                ) => {

                  const id =
                    getOpportunityId(
                      opportunity
                    ) ||
                    String(index);


                  const closing =
                    closingId ===
                    id;


                  return (

                    <article
                      key={
                        id
                      }
                      className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
                    >

                      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">


                        <div className="max-w-3xl">

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

                            <StatusBadge
                              status={
                                opportunity.status
                              }
                            />

                          </div>


                          <h3 className="mt-4 text-xl font-bold">

                            {
                              opportunity.title
                            }

                          </h3>


                          <p className="mt-1 text-zinc-400">

                            {
                              opportunity.companyName
                            }

                          </p>


                          <p className="mt-3 text-sm text-zinc-500">

                            {
                              opportunity.location ||
                              "Location not specified"
                            }

                          </p>


                          <p className="mt-5 whitespace-pre-line text-sm leading-6 text-zinc-400">

                            {
                              opportunity.description
                            }

                          </p>

                        </div>


                        <div className="w-full lg:max-w-xs">

                          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">

                            <p className="text-xs text-zinc-500">
                              Graduation Years
                            </p>

                            <p className="mt-1 font-semibold">

                              {
                                formatYears(
                                  opportunity
                                )
                              }

                            </p>


                            <p className="mt-4 text-xs text-zinc-500">
                              Deadline
                            </p>

                            <p className="mt-1 text-sm font-medium">

                              {
                                formatDate(
                                  opportunity.applicationDeadline
                                )
                              }

                            </p>

                          </div>


                          <div className="mt-4 grid grid-cols-2 gap-3">

                            <button
                              type="button"
                              onClick={() =>
                                openEditForm(
                                  opportunity
                                )
                              }
                              className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-semibold transition hover:bg-zinc-800"
                            >
                              Edit
                            </button>


                            <button
                              type="button"
                              disabled={
                                opportunity.status ===
                                  "CLOSED" ||
                                closing
                              }
                              onClick={() =>
                                handleCloseOpportunity(
                                  opportunity
                                )
                              }
                              className="rounded-lg border border-red-900 bg-red-950/30 px-4 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-950/60 disabled:cursor-not-allowed disabled:opacity-40"
                            >

                              {opportunity.status ===
                                "CLOSED"
                                ? "Closed"
                                : closing
                                ? "Closing..."
                                : "Close"}

                            </button>

                          </div>

                        </div>

                      </div>

                    </article>
                  );
                }
              )}

            </div>
          )}

        </section>

      </div>

    </main>
  );
}


// =========================================================
// INPUT STYLE
// =========================================================

const inputClass =
  "w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500";


// =========================================================
// GET ID
// =========================================================

function getOpportunityId(
  opportunity: Opportunity
) {

  return (
    opportunity.id ||
    opportunity.opportunityId ||
    null
  );
}


// =========================================================
// DATETIME LOCAL
// =========================================================

function toDateTimeLocal(
  value:
    | string
    | null
) {

  if (!value) {

    return "";
  }


  const date =
    new Date(value);


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return "";
  }


  const offset =
    date.getTimezoneOffset();


  const localDate =
    new Date(
      date.getTime() -
        offset * 60 * 1000
    );


  return localDate
    .toISOString()
    .slice(
      0,
      16
    );
}


// =========================================================
// FIELD
// =========================================================

function Field({
  label,
  children,
}: {
  label: string;
  children:
    React.ReactNode;
}) {

  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-zinc-300">
        {label}
      </label>

      {children}

    </div>
  );
}


// =========================================================
// SUMMARY CARD
// =========================================================

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: number;
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
// BADGE
// =========================================================

function Badge({
  children,
}: {
  children:
    React.ReactNode;
}) {

  return (
    <span className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs font-semibold text-zinc-300">

      {children}

    </span>
  );
}


// =========================================================
// STATUS BADGE
// =========================================================

function StatusBadge({
  status,
}: {
  status:
    OpportunityStatus;
}) {

  if (
    status === "ACTIVE"
  ) {

    return (
      <span className="rounded-full border border-emerald-900 bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-400">
        ACTIVE
      </span>
    );
  }


  if (
    status === "CLOSED"
  ) {

    return (
      <span className="rounded-full border border-red-900 bg-red-950/40 px-3 py-1 text-xs font-semibold text-red-400">
        CLOSED
      </span>
    );
  }


  return (
    <span className="rounded-full border border-amber-900 bg-amber-950/40 px-3 py-1 text-xs font-semibold text-amber-400">
      DRAFT
    </span>
  );
}


// =========================================================
// YEARS
// =========================================================

function formatYears(
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


  return new Date(
    value
  ).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}