"use client";

import axios from "axios";
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

export function useStudentProjects() {
  const [projects, setProjects] =
    useState<StudentProject[]>([]);

  // =========================================================
  // FORM
  // =========================================================

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [techStack, setTechStack] =
    useState("");

  const [githubUrl, setGithubUrl] =
    useState("");

  const [projectUrl, setProjectUrl] =
    useState("");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [editingId, setEditingId] =
    useState<string | null>(null);

  // =========================================================
  // PAGE STATE
  // =========================================================

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // =========================================================
  // ERROR
  // =========================================================

  const handleError = (
    error: unknown,
    fallback: string
  ) => {
    console.error(error);

    if (axios.isAxiosError(error)) {
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

  // =========================================================
  // LOAD PROJECTS
  // =========================================================

  useEffect(() => {
    const loadProjects = async () => {
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
      } catch (error: unknown) {
        handleError(
          error,
          "Unable to load projects."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // =========================================================
  // RESET
  // =========================================================

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

  // =========================================================
  // CREATE / UPDATE
  // =========================================================

  const handleSubmit = async (
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
        title: title.trim(),

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
    } catch (error: unknown) {
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

  // =========================================================
  // EDIT
  // =========================================================

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

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (
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
    } catch (error: unknown) {
      handleError(
        error,
        "Unable to delete project."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return {
    projects,

    title,
    setTitle,

    description,
    setDescription,

    techStack,
    setTechStack,

    githubUrl,
    setGithubUrl,

    projectUrl,
    setProjectUrl,

    startDate,
    setStartDate,

    endDate,
    setEndDate,

    editingId,

    loading,
    saving,
    deletingId,

    error,
    success,

    handleSubmit,
    startEdit,
    handleDelete,
    resetForm,
  };
}