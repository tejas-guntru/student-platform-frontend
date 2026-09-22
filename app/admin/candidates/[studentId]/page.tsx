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
  AlertCircle,
  ArrowLeft,
  LoaderCircle,
  UserRound,
} from "lucide-react";

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

  // =========================================================
  // LOAD CANDIDATE
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

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <main
        className="
          relative
          flex
          min-h-screen
          items-center
          justify-center
          overflow-hidden
          bg-[#F4F9FF]
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            -left-32
            top-12
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#38BDF8]/15
            blur-[120px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            bottom-12
            h-[460px]
            w-[460px]
            rounded-full
            bg-[#0877E8]/12
            blur-[130px]
          "
        />

        <div
          className="
            relative
            flex
            flex-col
            items-center
            text-center
          "
        >
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-[#0877E8]
              to-[#38BDF8]
              text-white
              shadow-[0_14px_35px_rgba(8,119,232,0.25)]
            "
          >
            <LoaderCircle
              size={25}
              className="animate-spin"
            />
          </div>

          <p
            className="
              mt-5
              font-semibold
              text-[#173B63]
            "
          >
            Loading candidate
          </p>

          <p
            className="
              mt-1
              text-sm
              text-[#8095A8]
            "
          >
            Preparing student profile...
          </p>
        </div>
      </main>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (
    error ||
    !candidate
  ) {
    return (
      <main
        className="
          relative
          min-h-screen
          overflow-hidden
          bg-[#F4F9FF]
          px-4
          py-8

          sm:px-6
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            -left-40
            top-20
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#38BDF8]/10
            blur-[130px]
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-5xl
          "
        >
          <Link
            href="/admin/applications"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-[#D7E8F4]
              bg-white
              px-4
              py-2.5
              text-sm
              font-semibold
              text-[#58748B]
              shadow-[0_8px_24px_rgba(8,119,232,0.04)]
              transition-all

              hover:border-[#B7D9F0]
              hover:bg-[#F7FBFF]
              hover:text-[#0877E8]
            "
          >
            <ArrowLeft size={15} />

            Applications
          </Link>

          <div
            className="
              mt-8
              flex
              items-start
              gap-4
              rounded-[24px]
              border
              border-red-200
              bg-white
              p-6
              shadow-[0_12px_34px_rgba(239,68,68,0.06)]
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-red-50
                text-red-600
              "
            >
              <AlertCircle size={20} />
            </div>

            <div>
              <p
                className="
                  text-sm
                  font-bold
                  text-red-700
                "
              >
                Candidate unavailable
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  leading-6
                  text-red-600/80
                "
              >
                {error ||
                  "Candidate not found."}
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#F4F9FF]
        text-[#173B63]
      "
    >
      {/* BACKGROUND */}

      <div
        className="
          pointer-events-none
          absolute
          -left-52
          top-24
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#38BDF8]/10
          blur-[140px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-56
          top-[620px]
          h-[560px]
          w-[560px]
          rounded-full
          bg-[#0877E8]/8
          blur-[150px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.18]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(8,119,232,0.04) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(8,119,232,0.04) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "56px 56px",
        }}
      />

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-4
          py-6

          sm:px-6

          lg:px-8
          lg:py-8
        "
      >
        {/* BACK LINK */}

        <Link
          href="/admin/applications"
          className="
            mb-5
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-[#D7E8F4]
            bg-white/85
            px-4
            py-2.5
            text-sm
            font-semibold
            text-[#58748B]
            shadow-[0_8px_24px_rgba(8,119,232,0.04)]
            backdrop-blur-xl
            transition-all

            hover:border-[#B7D9F0]
            hover:bg-white
            hover:text-[#0877E8]
          "
        >
          <ArrowLeft size={15} />

          Applications
        </Link>

        {/* PAGE INTRO */}

        <section
          className="
            relative
            mb-8
            overflow-hidden
            rounded-[30px]
            bg-gradient-to-r
            from-[#0877E8]
            via-[#1294F2]
            to-[#38BDF8]
            px-6
            py-8
            text-white
            shadow-[0_22px_60px_rgba(8,119,232,0.18)]

            sm:px-8
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-28
              h-72
              w-72
              rounded-full
              bg-white/18
              blur-[80px]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-24
              left-[30%]
              h-64
              w-64
              rounded-full
              bg-[#D7F4FF]/20
              blur-[80px]
            "
          />

          <div
            className="
              relative
              flex
              items-start
              gap-4
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                border
                border-white/20
                bg-white/12
                backdrop-blur
              "
            >
              <UserRound size={21} />
            </div>

            <div>
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-white/70
                "
              >
                Candidate Profile
              </p>

              <h1
                className="
                  mt-2
                  text-3xl
                  font-bold
                  tracking-[-0.04em]

                  sm:text-4xl
                "
              >
                Candidate Overview
              </h1>

              <p
                className="
                  mt-3
                  max-w-2xl
                  text-sm
                  leading-6
                  text-white/75
                "
              >
                Review the student&apos;s profile,
                ranking, skills, coding profiles,
                projects and experience in one place.
              </p>
            </div>
          </div>
        </section>

        {/* CANDIDATE SECTIONS */}

        <div className="space-y-8">
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

        {/* FOOTER */}

        <footer
          className="
            mt-12
            border-t
            border-[#DCEAF5]
            py-6
            text-center
          "
        >
          <p
            className="
              text-xs
              text-[#8298AB]
            "
          >
            Trailbliz Administration
            <span
              className="
                mx-2
                text-[#C1D4E2]
              "
            >
              •
            </span>
            Candidate Management
          </p>
        </footer>
      </div>
    </main>
  );
}