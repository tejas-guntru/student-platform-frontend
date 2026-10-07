"use client";

import {
  ClipboardCheck,
  LoaderCircle,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import AssessmentCard from "./AssessmentCard";

import {
  getAvailableAssessments,
  getMyAssessmentAttempts,
} from "@/services/studentAssessmentService";

import type {
  AssessmentAttemptResponse,
  StudentAssessmentSummaryResponse,
} from "@/types/assessment";

export default function AssessmentList() {
  const [
    assessments,
    setAssessments,
  ] =
    useState<
      StudentAssessmentSummaryResponse[]
    >([]);

  const [
    attempts,
    setAttempts,
  ] =
    useState<
      AssessmentAttemptResponse[]
    >([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const [
          assessmentData,
          attemptData,
        ] = await Promise.all([
          getAvailableAssessments(),
          getMyAssessmentAttempts(),
        ]);

        if (!active) {
          return;
        }

        setAssessments(
          assessmentData
        );

        setAttempts(
          attemptData
        );
      } catch {
        if (active) {
          setError(
            "We couldn't load your assessments."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, []);

  const attemptByAssessment =
    useMemo(() => {
      return new Map(
        attempts.map(
          (attempt) => [
            attempt.assessmentId,
            attempt,
          ]
        )
      );
    }, [attempts]);

  if (loading) {
    return (
      <div
        className="
          flex
          min-h-[280px]
          min-w-0
          items-center
          justify-center
          px-4

          sm:min-h-[360px]
        "
        role="status"
        aria-live="polite"
      >
        <div className="text-center">
          <LoaderCircle
            size={24}
            className="
              mx-auto
              animate-spin
              text-[#1256AF]
            "
            aria-hidden="true"
          />

          <p
            className="
              mt-3
              text-sm
              font-semibold
              text-slate-500
            "
          >
            Loading assessments...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="
          min-w-0
          rounded-2xl
          border
          border-red-100
          bg-red-50
          p-5
          text-center

          sm:rounded-3xl
          sm:p-8
        "
        role="alert"
      >
        <p
          className="
            break-words
            text-sm
            font-semibold
            leading-6
            text-red-700

            sm:text-base
          "
        >
          {error}
        </p>

        <p
          className="
            mx-auto
            mt-1
            max-w-md
            text-sm
            leading-6
            text-red-600/80
          "
        >
          Try refreshing the page. If the
          problem continues, check your
          connection and try again.
        </p>
      </div>
    );
  }

  if (assessments.length === 0) {
    return (
      <div
        className="
          min-w-0
          rounded-2xl
          border
          border-dashed
          border-slate-300
          bg-white
          px-4
          py-10
          text-center

          sm:rounded-3xl
          sm:px-6
          sm:py-16
        "
      >
        <div
          className="
            mx-auto
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-slate-100
            text-slate-500
          "
        >
          <ClipboardCheck
            size={21}
            aria-hidden="true"
          />
        </div>

        <h2
          className="
            mt-4
            break-words
            font-bold
            text-slate-900
          "
        >
          No assessments yet
        </h2>

        <p
          className="
            mx-auto
            mt-2
            max-w-md
            break-words
            text-sm
            leading-6
            text-slate-500
          "
        >
          Assessments assigned through
          your batches will appear here.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        min-w-0
        grid-cols-1
        gap-4

        md:grid-cols-2
        md:gap-5

        xl:grid-cols-3
      "
    >
      {assessments.map(
        (assessment) => (
          <div
            key={assessment.id}
            className="min-w-0"
          >
            <AssessmentCard
              assessment={assessment}
              attempt={
                attemptByAssessment.get(
                  assessment.id
                )
              }
            />
          </div>
        )
      )}
    </div>
  );
}