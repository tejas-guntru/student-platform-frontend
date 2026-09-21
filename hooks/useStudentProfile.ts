"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import {
  getMyProfile,
  updateMyProfile,
} from "@/services/studentService";

import {
  getColleges,
} from "@/services/collegeService";

import {
  getProfileCompletion,
} from "@/services/profileCompletionService";

import type {
  ProfileCompletion,
} from "@/services/profileCompletionService";

import type {
  College,
} from "@/types/college";

export function useStudentProfile() {
  // =========================================================
  // BASIC PROFILE
  // =========================================================

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [degree, setDegree] = useState("");
  const [branch, setBranch] = useState("");
  const [graduationYear, setGraduationYear] =
    useState("");
  const [city, setCity] = useState("");
  const [preferredRole, setPreferredRole] =
    useState("");
  const [bio, setBio] = useState("");

  // =========================================================
  // COLLEGE
  // =========================================================

  const [collegeName, setCollegeName] =
    useState("");

  const [collegeId, setCollegeId] =
    useState<string | null>(null);

  const [collegeSearch, setCollegeSearch] =
    useState("");

  const [colleges, setColleges] =
    useState<College[]>([]);

  const [
    searchingColleges,
    setSearchingColleges,
  ] = useState(false);

  const [
    showCollegeResults,
    setShowCollegeResults,
  ] = useState(false);

  // =========================================================
  // PROFILE COMPLETION
  // =========================================================

  const [completion, setCompletion] =
    useState<ProfileCompletion | null>(null);

  // =========================================================
  // PAGE STATE
  // =========================================================

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // =========================================================
  // LOAD PROFILE
  // =========================================================

  useEffect(() => {
    const loadProfile = async () => {
      const token =
        localStorage.getItem("token");

      const role =
        localStorage.getItem("role");

      if (
        !token ||
        role !== "STUDENT"
      ) {
        window.location.href = "/login";
        return;
      }

      try {
        const [
          profile,
          completionData,
        ] = await Promise.all([
          getMyProfile(),
          getProfileCompletion(),
        ]);

        setFullName(
          profile.fullName || ""
        );

        setPhone(
          profile.phone || ""
        );

        setDegree(
          profile.degree || ""
        );

        setBranch(
          profile.branch || ""
        );

        setGraduationYear(
          profile.graduationYear
            ? String(profile.graduationYear)
            : ""
        );

        setCity(
          profile.city || ""
        );

        setPreferredRole(
          profile.preferredRole || ""
        );

        setBio(
          profile.bio || ""
        );

        setCollegeName(
          profile.collegeName || ""
        );

        setCollegeSearch(
          profile.collegeName || ""
        );

        setCollegeId(
          profile.collegeId || null
        );

        setCompletion(
          completionData
        );
      } catch (error: unknown) {
        console.error(
          "PROFILE LOAD ERROR:",
          error
        );

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
              "Unable to load profile."
          );
        } else {
          setError(
            "Something went wrong while loading profile."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // =========================================================
  // COLLEGE SEARCH
  // =========================================================

  useEffect(() => {
    if (!showCollegeResults) {
      return;
    }

    const timer =
      window.setTimeout(
        async () => {
          setSearchingColleges(true);

          try {
            const data =
              await getColleges(
                collegeSearch
              );

            setColleges(
              Array.isArray(data)
                ? data
                : []
            );
          } catch (error: unknown) {
            console.error(
              "COLLEGE SEARCH ERROR:",
              error
            );
          } finally {
            setSearchingColleges(false);
          }
        },
        300
      );

    return () =>
      window.clearTimeout(timer);
  }, [
    collegeSearch,
    showCollegeResults,
  ]);

  // =========================================================
  // COLLEGE HELPERS
  // =========================================================

  const getCollegeId = (
    college: College
  ) => {
    return (
      college.id ||
      college.collegeId ||
      null
    );
  };

  const getCollegeName = (
    college: College
  ) => {
    return (
      college.name ||
      college.collegeName ||
      "Unnamed College"
    );
  };

  const selectCollege = (
    college: College
  ) => {
    const id =
      getCollegeId(college);

    const name =
      getCollegeName(college);

    if (!id) {
      setError(
        "College ID is missing."
      );

      return;
    }

    setCollegeId(id);
    setCollegeName(name);
    setCollegeSearch(name);

    setShowCollegeResults(false);

    setError("");
    setSuccess("");
  };

  const clearCollege = () => {
    setCollegeId(null);
    setCollegeName("");
    setCollegeSearch("");
    setColleges([]);

    setShowCollegeResults(false);
    setSuccess("");
  };

  const updateCollegeSearch = (
    value: string
  ) => {
    setCollegeSearch(value);

    setCollegeId(null);
    setCollegeName("");

    setShowCollegeResults(true);
  };

  // =========================================================
  // COMPLETION
  // =========================================================

  const refreshCompletion =
    async () => {
      try {
        const data =
          await getProfileCompletion();

        setCompletion(data);
      } catch (error) {
        console.error(
          "PROFILE COMPLETION ERROR:",
          error
        );
      }
    };

  // =========================================================
  // SAVE PROFILE
  // =========================================================

  const saveProfile = async () => {
    setError("");
    setSuccess("");

    if (!fullName.trim()) {
      setError(
        "Full name is required."
      );

      return;
    }

    if (
      graduationYear &&
      Number.isNaN(
        Number(graduationYear)
      )
    ) {
      setError(
        "Graduation year must be a number."
      );

      return;
    }

    setSaving(true);

    try {
      const request = {
        fullName:
          fullName.trim(),

        phone:
          phone.trim() || null,

        degree:
          degree.trim() || null,

        branch:
          branch.trim() || null,

        graduationYear:
          graduationYear
            ? Number(graduationYear)
            : null,

        city:
          city.trim() || null,

        preferredRole:
          preferredRole.trim() ||
          null,

        bio:
          bio.trim() || null,

        collegeId,
      };

      const updated =
        await updateMyProfile(
          request
        );

      setFullName(
        updated.fullName || ""
      );

      setPhone(
        updated.phone || ""
      );

      setDegree(
        updated.degree || ""
      );

      setBranch(
        updated.branch || ""
      );

      setGraduationYear(
        updated.graduationYear
          ? String(
              updated.graduationYear
            )
          : ""
      );

      setCity(
        updated.city || ""
      );

      setPreferredRole(
        updated.preferredRole || ""
      );

      setBio(
        updated.bio || ""
      );

      setCollegeName(
        updated.collegeName || ""
      );

      setCollegeSearch(
        updated.collegeName || ""
      );

      setCollegeId(
        updated.collegeId || null
      );

      await refreshCompletion();

      setSuccess(
        "Profile updated successfully."
      );
    } catch (error: unknown) {
      console.error(
        "PROFILE SAVE ERROR:",
        error
      );

      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            `Unable to update profile. Status: ${
              error.response?.status ||
              "unknown"
            }`
        );
      } else {
        setError(
          "Something went wrong while saving profile."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  return {
    fullName,
    setFullName,

    phone,
    setPhone,

    degree,
    setDegree,

    branch,
    setBranch,

    graduationYear,
    setGraduationYear,

    city,
    setCity,

    preferredRole,
    setPreferredRole,

    bio,
    setBio,

    collegeName,
    collegeId,
    collegeSearch,
    colleges,
    searchingColleges,
    showCollegeResults,

    setShowCollegeResults,
    updateCollegeSearch,
    selectCollege,
    clearCollege,

    completion,

    loading,
    saving,
    error,
    success,

    saveProfile,
  };
}