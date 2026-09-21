"use client";

import axios from "axios";
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

export function useStudentSkills() {
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
  ] = useState<SkillProficiency>(
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
  // RESET
  // =========================================================

  const resetForm = () => {
    setEditingId(null);

    setSkillName("");

    setProficiency(
      "INTERMEDIATE"
    );
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
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

    setSaving(true);

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
          await createSkill({
            skillName:
              normalizedName,

            proficiency,
          });

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
          error.response
            ?.data?.message ||
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
      setSaving(false);
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

  const handleDelete = async (
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
      setDeletingId(null);
    }
  };

  return {
    skills,

    skillName,
    setSkillName,

    proficiency,
    setProficiency,

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