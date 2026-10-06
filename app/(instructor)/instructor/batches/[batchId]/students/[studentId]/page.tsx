"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import InstructorStudentHeader from "@/components/instructor/student/InstructorStudentHeader";
import StudentOverviewStats from "@/components/instructor/student/StudentOverviewStats";
import StudentBasicInfo from "@/components/instructor/student/StudentBasicInfo";
import StudentSkills from "@/components/instructor/student/StudentSkills";
import StudentProjects from "@/components/instructor/student/StudentProjects";
import StudentExperience from "@/components/instructor/student/StudentExperience";
import StudentCodingProfiles from "@/components/instructor/student/StudentCodingProfiles";
import StudentAssessmentProgress from "@/components/instructor/student/StudentAssessmentProgress";
import StudentTaskProgress from "@/components/instructor/student/StudentTaskProgress";
import StudentCourseProgress from "@/components/instructor/student/StudentCourseProgress";

import {
  getInstructorStudentOverview,
} from "@/services/instructorStudentService";

import type {
  InstructorStudentOverviewResponse,
} from "@/types/instructorStudent";

/* =========================================================
   PAGE
========================================================= */

export default function InstructorStudentOverviewPage() {
  const params = useParams();

  const batchId =
    typeof params.batchId === "string"
      ? params.batchId
      : "";

  const studentId =
    typeof params.studentId === "string"
      ? params.studentId
      : "";

  const [student, setStudent] =
    useState<InstructorStudentOverviewResponse | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* =========================================================
     AUTH FAILURE
  ========================================================= */

  const handleAuthFailure =
    useCallback(() => {
      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "email"
      );

      localStorage.removeItem(
        "role"
      );

      window.location.replace(
        "/login"
      );
    }, []);

  /* =========================================================
     LOAD STUDENT
  ========================================================= */

  const loadStudent =
    useCallback(async () => {
      if (
        !batchId ||
        !studentId
      ) {
        setError(
          "Invalid student or batch."
        );

        setLoading(false);

        return;
      }

      setLoading(true);
      setError("");

      try {
        const response =
          await getInstructorStudentOverview(
            batchId,
            studentId
          );

        /*
         * Keep the same compatibility protection
         * from the old page.
         *
         * Older backend responses may not contain
         * every overview array.
         */

        setStudent({
          ...response,

          skills:
            response.skills ?? [],

          projects:
            response.projects ?? [],

          experiences:
            response.experiences ?? [],

          codingProfiles:
            response.codingProfiles ?? [],

          assessments:
            response.assessments ?? [],

          tasks:
            response.tasks ?? [],

          courses:
            response.courses ?? [],
        });
      } catch (error: unknown) {
        console.error(
          "LOAD INSTRUCTOR STUDENT ERROR:",
          error
        );

        if (
          axios.isAxiosError(error)
        ) {
          if (
            error.response?.status ===
              401 ||
            error.response?.status ===
              403
          ) {
            handleAuthFailure();

            return;
          }

          setError(
            error.response?.data
              ?.message ||
              "Could not load student."
          );

          return;
        }

        setError(
          "Could not load student."
        );
      } finally {
        setLoading(false);
      }
    }, [
      batchId,
      studentId,
      handleAuthFailure,
    ]);

  useEffect(() => {
    loadStudent();
  }, [loadStudent]);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main
        className="
          bg-slate-50
          px-4
          py-8

          sm:px-6
          sm:py-10

          lg:px-8
        "
      >
        <div
          className="
            mx-auto
            max-w-7xl
          "
        >
          <StudentPageSkeleton />
        </div>
      </main>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (
    error ||
    !student
  ) {
    return (
      <main
        className="
          bg-slate-50
          px-4
          py-8

          sm:px-6
          sm:py-10

          lg:px-8
        "
      >
        <div
          className="
            mx-auto
            max-w-7xl
          "
        >
          <Link
            href={`/instructor/batches/${batchId}`}
            className="
              text-sm
              font-semibold
              text-[#1256AF]
            "
          >
            ← Back to Batch
          </Link>

          <div
            className="
              mt-6
              rounded-2xl
              border
              border-red-200
              bg-red-50
              p-6
            "
          >
            <h1
              className="
                text-lg
                font-bold
                text-red-800
              "
            >
              Could not open student
            </h1>

            <p
              className="
                mt-2
                text-sm
                text-red-700
              "
            >
              {error ||
                "Student not found."}
            </p>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main
      className="
        bg-slate-50
        px-4
        py-8

        sm:px-6
        sm:py-10

        lg:px-8
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
        "
      >
        {/* ===================================================
            STUDENT HEADER
        =================================================== */}

        <InstructorStudentHeader
          batchId={batchId}
          student={student}
        />

        {/* ===================================================
            QUICK OVERVIEW
        =================================================== */}

        <StudentOverviewStats
          student={student}
        />

        {/* ===================================================
            PROFILE
        =================================================== */}

        <section className="mt-10">
          <SectionTitle
            eyebrow="Student Profile"
            title="Profile & Experience"
            description="Review the student's academic profile, skills, projects and professional experience."
          />

          <div
            className="
              mt-5
              space-y-5
            "
          >
            <StudentBasicInfo
              student={student}
            />

            <StudentSkills
              skills={student.skills}
            />

            <div
              className="
                grid
                gap-5

                xl:grid-cols-2
              "
            >
              <StudentProjects
                projects={
                  student.projects
                }
              />

              <StudentExperience
                experiences={
                  student.experiences
                }
              />
            </div>

            <StudentCodingProfiles
              profiles={
                student.codingProfiles
              }
            />
          </div>
        </section>

        {/* ===================================================
            LEARNING PERFORMANCE
        =================================================== */}

        <section className="mt-12">
          <SectionTitle
            eyebrow="Batch Performance"
            title="Learning Progress"
            description="Track this student's assessment results, task submissions and course progress inside the batch."
          />

          <div
            className="
              mt-5
              grid
              gap-5

              xl:grid-cols-2
            "
          >
            <StudentAssessmentProgress
              assessments={
                student.assessments
              }
            />

            <StudentTaskProgress
              tasks={student.tasks}
            />
          </div>

          <div className="mt-5">
            <StudentCourseProgress
              courses={
                student.courses
              }
            />
          </div>
        </section>
      </div>
    </main>
  );
}

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p
        className="
          text-xs
          font-bold
          uppercase
          tracking-[0.12em]
          text-[#1256AF]
        "
      >
        {eyebrow}
      </p>

      <h2
        className="
          mt-2
          text-2xl
          font-bold
          tracking-tight
          text-slate-950
        "
      >
        {title}
      </h2>

      <p
        className="
          mt-1
          max-w-2xl
          text-sm
          leading-6
          text-slate-500
        "
      >
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   LOADING SKELETON
========================================================= */

function StudentPageSkeleton() {
  return (
    <div className="animate-pulse">
      <div
        className="
          h-4
          w-28
          rounded
          bg-slate-200
        "
      />

      {/* HEADER */}

      <div
        className="
          mt-5
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-8
        "
      >
        <div
          className="
            flex
            items-start
            gap-4
          "
        >
          <div
            className="
              h-14
              w-14
              shrink-0
              rounded-2xl
              bg-slate-100
            "
          />

          <div className="flex-1">
            <div
              className="
                h-3
                w-24
                rounded
                bg-slate-100
              "
            />

            <div
              className="
                mt-3
                h-7
                w-56
                rounded
                bg-slate-100
              "
            />

            <div
              className="
                mt-3
                h-4
                w-72
                max-w-full
                rounded
                bg-slate-100
              "
            />
          </div>
        </div>
      </div>

      {/* STATS */}

      <div
        className="
          mt-6
          grid
          gap-3

          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-6
        "
      >
        {Array.from({
          length: 6,
        }).map((_, index) => (
          <div
            key={index}
            className="
              h-20
              rounded-2xl
              border
              border-slate-200
              bg-white
            "
          />
        ))}
      </div>

      {/* PROFILE */}

      <div className="mt-10">
        <div
          className="
            h-3
            w-24
            rounded
            bg-slate-200
          "
        />

        <div
          className="
            mt-3
            h-7
            w-56
            rounded
            bg-slate-200
          "
        />

        <div
          className="
            mt-5
            h-72
            rounded-2xl
            border
            border-slate-200
            bg-white
          "
        />

        <div
          className="
            mt-5
            grid
            gap-5

            xl:grid-cols-2
          "
        >
          <div
            className="
              h-80
              rounded-2xl
              border
              border-slate-200
              bg-white
            "
          />

          <div
            className="
              h-80
              rounded-2xl
              border
              border-slate-200
              bg-white
            "
          />
        </div>
      </div>

      {/* PERFORMANCE */}

      <div
        className="
          mt-12
          grid
          gap-5

          xl:grid-cols-2
        "
      >
        <div
          className="
            h-72
            rounded-2xl
            border
            border-slate-200
            bg-white
          "
        />

        <div
          className="
            h-72
            rounded-2xl
            border
            border-slate-200
            bg-white
          "
        />
      </div>
    </div>
  );
}