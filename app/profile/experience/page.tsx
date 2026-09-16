"use client";

import axios from "axios";
import Link from "next/link";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  createExperience,
  deleteExperience,
  getMyExperiences,
  updateExperience,
} from "@/services/studentExperienceService";

import type {
  EmploymentType,
  StudentExperience,
  StudentExperienceRequest,
} from "@/types/studentExperience";


export default function ExperiencePage() {

  const [
    experiences,
    setExperiences,
  ] = useState<StudentExperience[]>([]);

  const [
    companyName,
    setCompanyName,
  ] = useState("");

  const [
    roleTitle,
    setRoleTitle,
  ] = useState("");

  const [
    employmentType,
    setEmploymentType,
  ] =
    useState<EmploymentType>(
      "INTERNSHIP"
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
    startDate,
    setStartDate,
  ] = useState("");

  const [
    endDate,
    setEndDate,
  ] = useState("");

  const [
    currentlyWorking,
    setCurrentlyWorking,
  ] = useState(false);

  const [
    editingId,
    setEditingId,
  ] = useState<string | null>(
    null
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    deletingId,
    setDeletingId,
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
          role !== "STUDENT"
        ) {

          window.location.href =
            "/login";

          return;
        }


        try {

          const data =
            await getMyExperiences();


          setExperiences(
            Array.isArray(data)
              ? data
              : []
          );

        } catch (
          error: unknown
        ) {

          handleError(
            error,
            "Unable to load experience."
          );

        } finally {

          setLoading(false);
        }
      };


    load();

  }, []);


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


    setError(fallback);
  };


  // =========================================================
  // SAVE
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
        !companyName.trim()
      ) {

        setError(
          "Company name is required."
        );

        return;
      }


      if (
        !roleTitle.trim()
      ) {

        setError(
          "Role title is required."
        );

        return;
      }


      if (!startDate) {

        setError(
          "Start date is required."
        );

        return;
      }


      if (
        !currentlyWorking &&
        !endDate
      ) {

        setError(
          "End date is required unless this is your current position."
        );

        return;
      }


      if (
        !currentlyWorking &&
        endDate &&
        endDate < startDate
      ) {

        setError(
          "End date cannot be before start date."
        );

        return;
      }


      const request:
        StudentExperienceRequest = {

        companyName:
          companyName.trim(),

        roleTitle:
          roleTitle.trim(),

        employmentType,

        location:
          location.trim() ||
          null,

        description:
          description.trim() ||
          null,

        startDate,

        endDate:
          currentlyWorking
            ? null
            : endDate,

        currentlyWorking,
      };


      setSaving(true);


      try {

        if (editingId) {

          const updated =
            await updateExperience(
              editingId,
              request
            );


          setExperiences(
            (current) =>
              current
                .map(
                  (experience) =>
                    experience.experienceId ===
                    editingId
                      ? updated
                      : experience
                )
                .sort(
                  (a, b) =>
                    b.startDate.localeCompare(
                      a.startDate
                    )
                )
          );


          setSuccess(
            "Experience updated successfully."
          );

        } else {

          const created =
            await createExperience(
              request
            );


          setExperiences(
            (current) =>
              [
                created,
                ...current,
              ].sort(
                (a, b) =>
                  b.startDate.localeCompare(
                    a.startDate
                  )
              )
          );


          setSuccess(
            "Experience added successfully."
          );
        }


        resetForm();

      } catch (
        error: unknown
      ) {

        handleError(
          error,
          editingId
            ? "Unable to update experience."
            : "Unable to add experience."
        );

      } finally {

        setSaving(false);
      }
    };


  // =========================================================
  // EDIT
  // =========================================================

  const startEdit = (
    experience:
      StudentExperience
  ) => {

    setError("");
    setSuccess("");

    setEditingId(
      experience.experienceId
    );

    setCompanyName(
      experience.companyName
    );

    setRoleTitle(
      experience.roleTitle
    );

    setEmploymentType(
      experience.employmentType
    );

    setLocation(
      experience.location ||
      ""
    );

    setDescription(
      experience.description ||
      ""
    );

    setStartDate(
      experience.startDate
    );

    setEndDate(
      experience.endDate ||
      ""
    );

    setCurrentlyWorking(
      experience.currentlyWorking
    );


    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete =
    async (
      experience:
        StudentExperience
    ) => {

      const confirmed =
        window.confirm(
          `Delete "${experience.roleTitle}" at "${experience.companyName}"?`
        );


      if (!confirmed) {
        return;
      }


      setError("");
      setSuccess("");

      setDeletingId(
        experience.experienceId
      );


      try {

        await deleteExperience(
          experience.experienceId
        );


        setExperiences(
          (current) =>
            current.filter(
              (item) =>
                item.experienceId !==
                experience.experienceId
            )
        );


        if (
          editingId ===
          experience.experienceId
        ) {

          resetForm();
        }


        setSuccess(
          "Experience deleted successfully."
        );

      } catch (
        error: unknown
      ) {

        handleError(
          error,
          "Unable to delete experience."
        );

      } finally {

        setDeletingId(null);
      }
    };


  // =========================================================
  // RESET
  // =========================================================

  const resetForm = () => {

    setEditingId(null);

    setCompanyName("");

    setRoleTitle("");

    setEmploymentType(
      "INTERNSHIP"
    );

    setLocation("");

    setDescription("");

    setStartDate("");

    setEndDate("");

    setCurrentlyWorking(
      false
    );
  };


  // =========================================================
  // CURRENT WORK
  // =========================================================

  const handleCurrentChange = (
    checked: boolean
  ) => {

    setCurrentlyWorking(
      checked
    );


    if (checked) {

      setEndDate("");
    }
  };


  if (loading) {

    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">

        <p className="text-zinc-400">
          Loading experience...
        </p>

      </main>
    );
  }


  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <div className="mx-auto max-w-6xl px-6 py-8">


        {/* HEADER */}

        <header className="flex flex-col gap-5 border-b border-zinc-800 pb-6 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
              STUDENT PROFILE
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Experience
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Add internships, jobs,
              freelance work and other
              professional experience.
            </p>

          </div>


          <div className="flex flex-wrap gap-3">

            <Link
              href="/profile"
              className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm hover:bg-zinc-900"
            >
              ← Profile
            </Link>

            <Link
              href="/dashboard"
              className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm hover:bg-zinc-900"
            >
              Dashboard
            </Link>

          </div>

        </header>


        {error && (

          <div className="mt-6 rounded-xl border border-red-900 bg-red-950/30 p-4 text-sm text-red-300">
            {error}
          </div>

        )}


        {success && (

          <div className="mt-6 rounded-xl border border-emerald-900 bg-emerald-950/30 p-4 text-sm text-emerald-300">
            {success}
          </div>

        )}


        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8"
        >

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-xl font-semibold">

                {editingId
                  ? "Edit Experience"
                  : "Add Experience"}

              </h2>

            </div>


            {editingId && (

              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800"
              >
                Cancel Edit
              </button>

            )}

          </div>


          <div className="mt-6 grid gap-5 md:grid-cols-2">


            <Field label="Company">

              <input
                value={companyName}
                onChange={(event) =>
                  setCompanyName(
                    event.target.value
                  )
                }
                placeholder="OpenAI"
                maxLength={200}
                className={inputClass}
              />

            </Field>


            <Field label="Role">

              <input
                value={roleTitle}
                onChange={(event) =>
                  setRoleTitle(
                    event.target.value
                  )
                }
                placeholder="Software Engineering Intern"
                maxLength={200}
                className={inputClass}
              />

            </Field>


            <Field label="Employment Type">

              <select
                value={employmentType}
                onChange={(event) =>
                  setEmploymentType(
                    event.target.value as
                      EmploymentType
                  )
                }
                className={inputClass}
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

            </Field>


            <Field label="Location">

              <input
                value={location}
                onChange={(event) =>
                  setLocation(
                    event.target.value
                  )
                }
                placeholder="Hyderabad / Remote"
                maxLength={150}
                className={inputClass}
              />

            </Field>


            <Field label="Start Date">

              <input
                type="date"
                value={startDate}
                onChange={(event) =>
                  setStartDate(
                    event.target.value
                  )
                }
                className={inputClass}
              />

            </Field>


            <Field label="End Date">

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
                className={`${inputClass} disabled:cursor-not-allowed disabled:opacity-50`}
              />

            </Field>


            <div className="md:col-span-2">

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950 p-4">

                <input
                  type="checkbox"
                  checked={
                    currentlyWorking
                  }
                  onChange={(event) =>
                    handleCurrentChange(
                      event.target.checked
                    )
                  }
                  className="h-4 w-4"
                />

                <div>

                  <p className="font-medium">
                    I currently work here
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    End date will be shown
                    as Present.
                  </p>

                </div>

              </label>

            </div>


            <div className="md:col-span-2">

              <Field label="Description">

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value
                    )
                  }
                  rows={5}
                  placeholder="Describe your work, responsibilities, technologies and achievements..."
                  className={`${inputClass} resize-none`}
                />

              </Field>

            </div>

          </div>


          <div className="mt-7 flex justify-end">

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-white px-6 py-3 font-semibold text-black hover:bg-zinc-200 disabled:opacity-50"
            >

              {saving
                ? "Saving..."
                : editingId
                ? "Save Changes"
                : "Add Experience"}

            </button>

          </div>

        </form>


        {/* LIST */}

        <section className="mt-8">

          <div className="mb-5 flex items-center justify-between">

            <h2 className="text-xl font-semibold">
              My Experience
            </h2>

            <span className="text-sm text-zinc-500">
              {experiences.length}
            </span>

          </div>


          {experiences.length === 0 ? (

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">

              <h3 className="text-lg font-semibold">
                No experience added yet
              </h3>

              <p className="mt-2 text-sm text-zinc-500">
                Internships count too.
                Add your first experience
                above.
              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {experiences.map(
                (experience) => (

                  <article
                    key={
                      experience.experienceId
                    }
                    className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
                  >

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">


                      <div>

                        <h3 className="text-xl font-bold">
                          {
                            experience.roleTitle
                          }
                        </h3>

                        <p className="mt-1 font-medium text-zinc-300">
                          {
                            experience.companyName
                          }
                        </p>


                        <div className="mt-3 flex flex-wrap gap-2">

                          <Badge>
                            {
                              formatEmploymentType(
                                experience.employmentType
                              )
                            }
                          </Badge>


                          {experience.location && (

                            <Badge>
                              {
                                experience.location
                              }
                            </Badge>

                          )}


                          {experience.currentlyWorking && (

                            <span className="rounded-full border border-emerald-900 bg-emerald-950/30 px-3 py-1 text-xs font-semibold text-emerald-400">
                              Current
                            </span>

                          )}

                        </div>


                        <p className="mt-4 text-sm text-zinc-500">

                          {
                            formatMonth(
                              experience.startDate
                            )
                          }

                          {" → "}

                          {experience.currentlyWorking
                            ? "Present"
                            : experience.endDate
                            ? formatMonth(
                                experience.endDate
                              )
                            : "-"}

                        </p>


                        {experience.description && (

                          <p className="mt-5 whitespace-pre-line text-sm leading-6 text-zinc-400">
                            {
                              experience.description
                            }
                          </p>

                        )}

                      </div>


                      <div className="flex gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            startEdit(
                              experience
                            )
                          }
                          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800"
                        >
                          Edit
                        </button>


                        <button
                          type="button"
                          disabled={
                            deletingId ===
                            experience.experienceId
                          }
                          onClick={() =>
                            handleDelete(
                              experience
                            )
                          }
                          className="rounded-lg border border-red-900 bg-red-950/20 px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-950/50 disabled:opacity-50"
                        >

                          {deletingId ===
                          experience.experienceId
                            ? "Deleting..."
                            : "Delete"}

                        </button>

                      </div>

                    </div>

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


const inputClass =
  "w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500";


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


function formatEmploymentType(
  value: EmploymentType
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


function formatMonth(
  value: string
) {

  const date =
    new Date(
      `${value}T00:00:00`
    );


  return date.toLocaleDateString(
    "en-IN",
    {
      month: "short",
      year: "numeric",
    }
  );
}