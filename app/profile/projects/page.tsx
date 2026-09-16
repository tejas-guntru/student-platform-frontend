"use client";

import axios from "axios";
import Link from "next/link";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  createProject,
  deleteProject,
  getMyProjects,
  updateProject,
} from "@/services/studentProjectService";

import type {
  StudentProject,
  StudentProjectRequest,
} from "@/types/studentProject";


export default function ProjectsPage() {

  const [
    projects,
    setProjects,
  ] = useState<StudentProject[]>([]);

  const [
    title,
    setTitle,
  ] = useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    techStack,
    setTechStack,
  ] = useState("");

  const [
    githubUrl,
    setGithubUrl,
  ] = useState("");

  const [
    projectUrl,
    setProjectUrl,
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
    editingId,
    setEditingId,
  ] = useState<string | null>(null);

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
  ] = useState<string | null>(null);

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");


  useEffect(() => {

    const load = async () => {

      const token =
        localStorage.getItem("token");

      const role =
        localStorage.getItem("role");


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
          await getMyProjects();

        setProjects(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (
        error: unknown
      ) {

        handleError(
          error,
          "Unable to load projects."
        );

      } finally {

        setLoading(false);
      }
    };


    load();

  }, []);


  const handleError = (
    error: unknown,
    fallback: string
  ) => {

    console.error(error);


    if (
      axios.isAxiosError(error)
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
        error.response?.data?.message ||
        fallback
      );

      return;
    }


    setError(fallback);
  };


  const handleSubmit =
    async (
      event: FormEvent<HTMLFormElement>
    ) => {

      event.preventDefault();

      setError("");
      setSuccess("");


      if (!title.trim()) {

        setError(
          "Project title is required."
        );

        return;
      }


      if (
        startDate &&
        endDate &&
        endDate < startDate
      ) {

        setError(
          "End date cannot be before start date."
        );

        return;
      }


      const request:
        StudentProjectRequest = {

        title:
          title.trim(),

        description:
          description.trim() ||
          null,

        techStack:
          techStack.trim() ||
          null,

        githubUrl:
          githubUrl.trim() ||
          null,

        projectUrl:
          projectUrl.trim() ||
          null,

        startDate:
          startDate || null,

        endDate:
          endDate || null,
      };


      setSaving(true);


      try {

        if (editingId) {

          const updated =
            await updateProject(
              editingId,
              request
            );


          setProjects(
            (current) =>
              current.map(
                (project) =>
                  project.projectId ===
                  editingId
                    ? updated
                    : project
              )
          );


          setSuccess(
            `${updated.title} updated successfully.`
          );

        } else {

          const created =
            await createProject(
              request
            );


          setProjects(
            (current) => [
              created,
              ...current,
            ]
          );


          setSuccess(
            `${created.title} added successfully.`
          );
        }


        resetForm();

      } catch (
        error: unknown
      ) {

        handleError(
          error,
          editingId
            ? "Unable to update project."
            : "Unable to add project."
        );

      } finally {

        setSaving(false);
      }
    };


  const startEdit = (
    project: StudentProject
  ) => {

    setError("");
    setSuccess("");

    setEditingId(
      project.projectId
    );

    setTitle(
      project.title
    );

    setDescription(
      project.description || ""
    );

    setTechStack(
      project.techStack || ""
    );

    setGithubUrl(
      project.githubUrl || ""
    );

    setProjectUrl(
      project.projectUrl || ""
    );

    setStartDate(
      project.startDate || ""
    );

    setEndDate(
      project.endDate || ""
    );


    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  const handleDelete =
    async (
      project: StudentProject
    ) => {

      const confirmed =
        window.confirm(
          `Delete "${project.title}"?`
        );


      if (!confirmed) {
        return;
      }


      setDeletingId(
        project.projectId
      );

      setError("");
      setSuccess("");


      try {

        await deleteProject(
          project.projectId
        );


        setProjects(
          (current) =>
            current.filter(
              (item) =>
                item.projectId !==
                project.projectId
            )
        );


        if (
          editingId ===
          project.projectId
        ) {

          resetForm();
        }


        setSuccess(
          `${project.title} deleted successfully.`
        );

      } catch (
        error: unknown
      ) {

        handleError(
          error,
          "Unable to delete project."
        );

      } finally {

        setDeletingId(null);
      }
    };


  const resetForm = () => {

    setEditingId(null);

    setTitle("");
    setDescription("");
    setTechStack("");
    setGithubUrl("");
    setProjectUrl("");
    setStartDate("");
    setEndDate("");
  };


  if (loading) {

    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">

        <p className="text-zinc-400">
          Loading projects...
        </p>

      </main>
    );
  }


  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <div className="mx-auto max-w-6xl px-6 py-8">


        <header className="flex flex-col gap-5 border-b border-zinc-800 pb-6 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
              STUDENT PROFILE
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Projects
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Showcase the projects you
              have built.
            </p>

          </div>


          <div className="flex gap-3">

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


        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8"
        >

          <div className="flex justify-between gap-4">

            <div>

              <h2 className="text-xl font-semibold">
                {editingId
                  ? "Edit Project"
                  : "Add Project"}
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Add your best academic
                or personal projects.
              </p>

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


            <Field label="Project Title">

              <input
                value={title}
                onChange={(event) =>
                  setTitle(
                    event.target.value
                  )
                }
                placeholder="Student Internship Platform"
                maxLength={150}
                className={inputClass}
              />

            </Field>


            <Field label="Tech Stack">

              <input
                value={techStack}
                onChange={(event) =>
                  setTechStack(
                    event.target.value
                  )
                }
                placeholder="Java, Spring Boot, PostgreSQL, Next.js"
                maxLength={500}
                className={inputClass}
              />

            </Field>


            <Field label="GitHub URL">

              <input
                type="url"
                value={githubUrl}
                onChange={(event) =>
                  setGithubUrl(
                    event.target.value
                  )
                }
                placeholder="https://github.com/..."
                className={inputClass}
              />

            </Field>


            <Field label="Live / Project URL">

              <input
                type="url"
                value={projectUrl}
                onChange={(event) =>
                  setProjectUrl(
                    event.target.value
                  )
                }
                placeholder="https://..."
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
                onChange={(event) =>
                  setEndDate(
                    event.target.value
                  )
                }
                className={inputClass}
              />

            </Field>


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
                  placeholder="Describe what you built, your contribution and key features..."
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
                : "Add Project"}

            </button>

          </div>

        </form>


        <section className="mt-8">

          <div className="mb-5 flex items-center justify-between">

            <h2 className="text-xl font-semibold">
              My Projects
            </h2>

            <span className="text-sm text-zinc-500">
              {projects.length} projects
            </span>

          </div>


          {projects.length === 0 ? (

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-500">
              No projects added yet.
            </div>

          ) : (

            <div className="grid gap-5">

              {projects.map(
                (project) => (

                  <article
                    key={project.projectId}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
                  >

                    <div className="flex flex-col gap-5 sm:flex-row sm:justify-between">

                      <div>

                        <h3 className="text-xl font-bold">
                          {project.title}
                        </h3>


                        {project.techStack && (

                          <p className="mt-2 text-sm text-zinc-400">
                            {project.techStack}
                          </p>

                        )}


                        {project.description && (

                          <p className="mt-4 whitespace-pre-line text-sm leading-6 text-zinc-400">
                            {project.description}
                          </p>

                        )}


                        <div className="mt-4 flex flex-wrap gap-4 text-sm">

                          {project.githubUrl && (

                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="font-medium underline"
                            >
                              GitHub
                            </a>

                          )}


                          {project.projectUrl && (

                            <a
                              href={project.projectUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="font-medium underline"
                            >
                              Live Project
                            </a>

                          )}

                        </div>

                      </div>


                      <div className="flex gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            startEdit(project)
                          }
                          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800"
                        >
                          Edit
                        </button>


                        <button
                          type="button"
                          disabled={
                            deletingId ===
                            project.projectId
                          }
                          onClick={() =>
                            handleDelete(
                              project
                            )
                          }
                          className="rounded-lg border border-red-900 bg-red-950/20 px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-950/50 disabled:opacity-50"
                        >
                          {deletingId ===
                          project.projectId
                            ? "Deleting..."
                            : "Delete"}
                        </button>

                      </div>

                    </div>


                    {(project.startDate ||
                      project.endDate) && (

                      <p className="mt-5 border-t border-zinc-800 pt-4 text-xs text-zinc-500">

                        {project.startDate ||
                          "Unknown"}

                        {" → "}

                        {project.endDate ||
                          "Present"}

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


const inputClass =
  "w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500";


function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
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