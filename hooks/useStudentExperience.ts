"use client";

import axios from "axios";
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

export function useStudentExperience() {
  const [
    experiences,
    setExperiences,
  ] = useState<StudentExperience[]>([]);

  // =========================================================
  // FORM
  // =========================================================

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
  ] = useState<EmploymentType>(
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

  // =========================================================
  // PAGE STATE
  // =========================================================

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
        error.response
          ?.data?.message ||
          fallback
      );

      return;
    }

    setError(fallback);
  };

  // =========================================================
  // LOAD
  // =========================================================

  useEffect(() => {
    const loadExperiences =
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

    loadExperiences();
  }, []);

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

    setCurrentlyWorking(false);
  };

  // =========================================================
  // CURRENT POSITION
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

  // =========================================================
  // SAVE
  // =========================================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!companyName.trim()) {
      setError(
        "Company name is required."
      );

      return;
    }

    if (!roleTitle.trim()) {
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
    experience: StudentExperience
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
      experience.location || ""
    );

    setDescription(
      experience.description || ""
    );

    setStartDate(
      experience.startDate
    );

    setEndDate(
      experience.endDate || ""
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

  const handleDelete = async (
    experience: StudentExperience
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

  return {
    experiences,

    companyName,
    setCompanyName,

    roleTitle,
    setRoleTitle,

    employmentType,
    setEmploymentType,

    location,
    setLocation,

    description,
    setDescription,

    startDate,
    setStartDate,

    endDate,
    setEndDate,

    currentlyWorking,

    editingId,

    loading,
    saving,
    deletingId,

    error,
    success,

    handleCurrentChange,
    handleSubmit,
    startEdit,
    handleDelete,
    resetForm,
  };
}