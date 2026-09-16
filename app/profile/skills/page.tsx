"use client";

import axios from "axios";
import Link from "next/link";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  createSkill,
  deleteSkill,
  getMySkills,
  updateSkill,
} from "@/services/studentSkillService";

import type {
  SkillProficiency,
  StudentSkill,
} from "@/types/studentSkill";


export default function SkillsPage() {

  const [
    skills,
    setSkills,
  ] = useState<StudentSkill[]>([]);

  const [
    skillName,
    setSkillName,
  ] = useState("");

  const [
    proficiency,
    setProficiency,
  ] =
    useState<SkillProficiency>(
      "INTERMEDIATE"
    );

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
          role !== "STUDENT"
        ) {

          window.location.href =
            "/login";

          return;
        }


        await loadSkills();
      };


    loadPage();

  }, []);


  // =========================================================
  // LOAD
  // =========================================================

  const loadSkills =
    async () => {

      setError("");


      try {

        const data =
          await getMySkills();


        setSkills(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (
        error: unknown
      ) {

        handleError(
          error,
          "Unable to load skills."
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
  // SUBMIT
  // =========================================================

  const handleSubmit =
    async (
      event:
        FormEvent<HTMLFormElement>
    ) => {

      event.preventDefault();

      setError("");
      setSuccess("");


      const normalizedName =
        skillName.trim();


      if (!normalizedName) {

        setError(
          "Enter a skill name."
        );

        return;
      }


      setSaving(
        true
      );


      try {

        if (editingId) {

          const updated =
            await updateSkill(
              editingId,
              {
                skillName:
                  normalizedName,

                proficiency,
              }
            );


          setSkills(
            (current) =>
              current
                .map(
                  (skill) =>
                    skill.skillId ===
                    editingId
                      ? updated
                      : skill
                )
                .sort(
                  (a, b) =>
                    a.skillName.localeCompare(
                      b.skillName
                    )
                )
          );


          setSuccess(
            `${updated.skillName} updated successfully.`
          );

        } else {

          const created =
            await createSkill(
              {
                skillName:
                  normalizedName,

                proficiency,
              }
            );


          setSkills(
            (current) =>
              [
                ...current,
                created,
              ].sort(
                (a, b) =>
                  a.skillName.localeCompare(
                    b.skillName
                  )
              )
          );


          setSuccess(
            `${created.skillName} added successfully.`
          );
        }


        resetForm();

      } catch (
        error: unknown
      ) {

        if (
          axios.isAxiosError(
            error
          ) &&
          error.response?.status === 409
        ) {

          setError(
            error.response?.data?.message ||
              "This skill already exists."
          );

          return;
        }


        handleError(
          error,
          editingId
            ? "Unable to update skill."
            : "Unable to add skill."
        );

      } finally {

        setSaving(
          false
        );
      }
    };


  // =========================================================
  // EDIT
  // =========================================================

  const startEdit = (
    skill: StudentSkill
  ) => {

    setError("");
    setSuccess("");

    setEditingId(
      skill.skillId
    );

    setSkillName(
      skill.skillName
    );

    setProficiency(
      skill.proficiency
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
      skill: StudentSkill
    ) => {

      const confirmed =
        window.confirm(
          `Delete "${skill.skillName}" from your skills?`
        );


      if (!confirmed) {

        return;
      }


      setError("");
      setSuccess("");

      setDeletingId(
        skill.skillId
      );


      try {

        await deleteSkill(
          skill.skillId
        );


        setSkills(
          (current) =>
            current.filter(
              (item) =>
                item.skillId !==
                skill.skillId
            )
        );


        if (
          editingId ===
          skill.skillId
        ) {

          resetForm();
        }


        setSuccess(
          `${skill.skillName} deleted successfully.`
        );

      } catch (
        error: unknown
      ) {

        handleError(
          error,
          "Unable to delete skill."
        );

      } finally {

        setDeletingId(
          null
        );
      }
    };


  // =========================================================
  // RESET
  // =========================================================

  const resetForm = () => {

    setEditingId(
      null
    );

    setSkillName("");

    setProficiency(
      "INTERMEDIATE"
    );
  };


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">

        <p className="text-zinc-400">
          Loading skills...
        </p>

      </main>
    );
  }


  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <div className="mx-auto max-w-5xl px-6 py-8">


        {/* HEADER */}

        <header className="flex flex-col gap-5 border-b border-zinc-800 pb-6 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
              STUDENT PROFILE
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Skills
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Add the technical skills
              you want employers to see.
            </p>

          </div>


          <div className="flex flex-wrap gap-3">

            <Link
              href="/profile"
              className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium transition hover:bg-zinc-900"
            >
              ← Profile
            </Link>


            <Link
              href="/dashboard"
              className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium transition hover:bg-zinc-900"
            >
              Dashboard
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


        {/* FORM */}

        <form
          onSubmit={
            handleSubmit
          }
          className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8"
        >

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-xl font-semibold">

                {editingId
                  ? "Edit Skill"
                  : "Add Skill"}

              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Example: Java,
                Spring Boot, PostgreSQL,
                React or AWS.
              </p>

            </div>


            {editingId && (

              <button
                type="button"
                onClick={
                  resetForm
                }
                className="rounded-lg border border-zinc-700 px-4 py-2 text-sm transition hover:bg-zinc-800"
              >
                Cancel Edit
              </button>

            )}

          </div>


          <div className="mt-6 grid gap-5 md:grid-cols-[1fr_220px_auto] md:items-end">


            {/* SKILL */}

            <div>

              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Skill
              </label>

              <input
                type="text"
                value={
                  skillName
                }
                onChange={(
                  event
                ) =>
                  setSkillName(
                    event.target.value
                  )
                }
                maxLength={100}
                placeholder="Java"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-zinc-500"
              />

            </div>


            {/* PROFICIENCY */}

            <div>

              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Proficiency
              </label>

              <select
                value={
                  proficiency
                }
                onChange={(
                  event
                ) =>
                  setProficiency(
                    event.target.value as
                      SkillProficiency
                  )
                }
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
              >

                <option value="BEGINNER">
                  Beginner
                </option>

                <option value="INTERMEDIATE">
                  Intermediate
                </option>

                <option value="ADVANCED">
                  Advanced
                </option>

              </select>

            </div>


            {/* SAVE */}

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
                : "Add Skill"}

            </button>

          </div>

        </form>


        {/* SUMMARY */}

        <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <p className="text-sm text-zinc-500">
            Profile Skills
          </p>

          <p className="mt-2 text-3xl font-bold">
            {skills.length}
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            {skills.length === 1
              ? "skill added"
              : "skills added"}
          </p>

        </section>


        {/* LIST */}

        <section className="mt-8">

          <div className="mb-5">

            <h2 className="text-xl font-semibold">
              My Skills
            </h2>

          </div>


          {skills.length === 0 ? (

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">

              <h3 className="text-lg font-semibold">
                No skills added yet
              </h3>

              <p className="mt-2 text-sm text-zinc-500">
                Add your first technical
                skill using the form above.
              </p>

            </div>

          ) : (

            <div className="grid gap-4 sm:grid-cols-2">

              {skills.map(
                (skill) => (

                  <article
                    key={
                      skill.skillId
                    }
                    className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <h3 className="text-lg font-semibold">
                          {
                            skill.skillName
                          }
                        </h3>


                        <div className="mt-3">

                          <ProficiencyBadge
                            proficiency={
                              skill.proficiency
                            }
                          />

                        </div>

                      </div>


                      <div className="flex gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            startEdit(
                              skill
                            )
                          }
                          className="rounded-lg border border-zinc-700 px-3 py-2 text-xs font-semibold transition hover:bg-zinc-800"
                        >
                          Edit
                        </button>


                        <button
                          type="button"
                          disabled={
                            deletingId ===
                            skill.skillId
                          }
                          onClick={() =>
                            handleDelete(
                              skill
                            )
                          }
                          className="rounded-lg border border-red-900 bg-red-950/20 px-3 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-950/50 disabled:opacity-50"
                        >

                          {deletingId ===
                          skill.skillId
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


// =========================================================
// PROFICIENCY BADGE
// =========================================================

function ProficiencyBadge({
  proficiency,
}: {
  proficiency:
    SkillProficiency;
}) {

  let style =
    "border-zinc-700 bg-zinc-950 text-zinc-300";


  if (
    proficiency ===
    "ADVANCED"
  ) {

    style =
      "border-emerald-900 bg-emerald-950/40 text-emerald-400";

  } else if (
    proficiency ===
    "INTERMEDIATE"
  ) {

    style =
      "border-blue-900 bg-blue-950/40 text-blue-400";

  } else {

    style =
      "border-amber-900 bg-amber-950/40 text-amber-400";
  }


  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${style}`}
    >
      {
        formatProficiency(
          proficiency
        )
      }
    </span>
  );
}


// =========================================================
// FORMAT
// =========================================================

function formatProficiency(
  value:
    SkillProficiency
) {

  return (
    value.charAt(0) +
    value
      .slice(1)
      .toLowerCase()
  );
}