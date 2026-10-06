"use client";

import {
  ClipboardCheck,
  LoaderCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

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
  const [assessments, setAssessments] =
    useState<StudentAssessmentSummaryResponse[]>([]);

  const [attempts, setAttempts] =
    useState<AssessmentAttemptResponse[]>([]);

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

        setAssessments(assessmentData);
        setAttempts(attemptData);
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
        attempts.map((attempt) => [
          attempt.assessmentId,
          attempt,
        ])
      );
    }, [attempts]);

  if (loading) {
    return (
      <div className="flex min-h-[360px] items-center justify-center">
        <div className="text-center">
          <LoaderCircle
            size={24}
            className="mx-auto animate-spin text-[#1256AF]"
          />

          <p className="mt-3 text-sm font-semibold text-slate-500">
            Loading assessments...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-100 bg-red-50 p-8 text-center">
        <p className="font-semibold text-red-700">
          {error}
        </p>
      </div>
    );
  }

  if (assessments.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
          <ClipboardCheck size={21} />
        </div>

        <h2 className="mt-4 font-bold text-slate-900">
          No assessments yet
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
          Assessments assigned through your batches will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {assessments.map((assessment) => (
        <AssessmentCard
          key={assessment.id}
          assessment={assessment}
          attempt={attemptByAssessment.get(
            assessment.id
          )}
        />
      ))}
    </div>
  );
}