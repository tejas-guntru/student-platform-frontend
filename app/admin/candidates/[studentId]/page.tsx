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
} from "@/types/adminCandidate";

import CandidateHeader from "@/components/admin/candidates/CandidateHeader";
import CandidateProfileSection from "@/components/admin/candidates/CandidateProfileSection";
import CandidateRankingSection from "@/components/admin/candidates/CandidateRankingSection";
import CandidateSkillsSection from "@/components/admin/candidates/CandidateSkillsSection";
import CandidateCodingProfilesSection from "@/components/admin/candidates/CandidateCodingProfilesSection";
import CandidateProjectsSection from "@/components/admin/candidates/CandidateProjectsSection";
import CandidateExperienceSection from "@/components/admin/candidates/CandidateExperienceSection";

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
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

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

          setLoading(false);

          return;
        }

        try {
          const data =
            await getAdminCandidate(
              studentId
            );

          setCandidate(data);
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
              error.response
                ?.status ===
                401 ||
              error.response
                ?.status ===
                403
            ) {
              localStorage.clear();

              window.location.href =
                "/login";

              return;
            }

            setError(
              error.response?.data
                ?.message ||
                "Unable to load candidate."
            );
          } else {
            setError(
              "Something went wrong while loading candidate."
            );
          }
        } finally {
          setLoading(false);
        }
      };

    load();
  }, [studentId]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <p className="text-zinc-400">
          Loading candidate...
        </p>
      </main>
    );
  }

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
        <CandidateHeader
          candidate={candidate}
        />

        <CandidateProfileSection
          candidate={candidate}
        />

        <CandidateRankingSection
          candidate={candidate}
        />

        <CandidateSkillsSection
          candidate={candidate}
        />

        <CandidateCodingProfilesSection
          candidate={candidate}
        />

        <CandidateProjectsSection
          candidate={candidate}
        />

        <CandidateExperienceSection
          candidate={candidate}
        />
      </div>
    </main>
  );
}