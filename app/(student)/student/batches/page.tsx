"use client";

import axios from "axios";
import Link from "next/link";
import {
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getMyBatches,
  joinBatch,
} from "@/services/batchService";

import type {
  BatchJoinRequestResponse,
  StudentBatchResponse,
} from "@/types/batch";

export default function StudentBatchesPage() {
  const [batches, setBatches] = useState<
    StudentBatchResponse[]
  >([]);

  const [joinCode, setJoinCode] = useState("");

  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  const [error, setError] = useState("");
  const [joinResult, setJoinResult] =
    useState<BatchJoinRequestResponse | null>(
      null
    );

  const loadBatches = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getMyBatches();

      setBatches(response);
    } catch (error: unknown) {
      console.error(
        "GET STUDENT BATCHES ERROR:",
        error
      );

      if (axios.isAxiosError(error)) {
        if (
          error.response?.status === 401 ||
          error.response?.status === 403
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          localStorage.removeItem("role");

          window.location.replace("/login");
          return;
        }

        setError(
          error.response?.data?.message ||
            "Could not load your batches."
        );
      } else {
        setError(
          "Could not load your batches."
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBatches();
  }, [loadBatches]);

  const handleJoin = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const normalizedCode =
      joinCode.trim();

    if (!normalizedCode) {
      setError("Enter a batch join code.");
      return;
    }

    setJoining(true);
    setError("");
    setJoinResult(null);

    try {
      const response = await joinBatch({
        joinCode: normalizedCode,
      });

      setJoinResult(response);
      setJoinCode("");

      await loadBatches();
    } catch (error: unknown) {
      console.error(
        "JOIN BATCH ERROR:",
        error
      );

      if (axios.isAxiosError(error)) {
        if (
          error.response?.status === 401 ||
          error.response?.status === 403
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          localStorage.removeItem("role");

          window.location.replace("/login");
          return;
        }

        setError(
          error.response?.data?.message ||
            "Could not submit the join request."
        );
      } else {
        setError(
          "Could not submit the join request."
        );
      }
    } finally {
      setJoining(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div>
          <p className="text-sm font-semibold text-blue-700">
            Student workspace
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            My Batches
          </h1>

          <p className="mt-2 text-slate-600">
            View your batches or request to join a
            new batch.
          </p>
        </div>

        {/* JOIN BATCH */}

        <section className="mt-8 rounded-xl border bg-white p-6">
          <h2 className="text-xl font-semibold">
            Join a batch
          </h2>

          <form
            onSubmit={handleJoin}
            className="mt-4 flex gap-3"
          >
            <input
              type="text"
              value={joinCode}
              maxLength={20}
              placeholder="Enter join code"
              onChange={(event) => {
                setJoinCode(event.target.value);

                if (error) {
                  setError("");
                }
              }}
              className="min-w-0 flex-1 rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              disabled={joining}
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-50"
            >
              {joining
                ? "Joining..."
                : "Join"}
            </button>
          </form>

          {joinResult && (
            <div className="mt-4 rounded-lg bg-green-50 p-4 text-sm text-green-800">
              Request submitted for{" "}
              <strong>
                {joinResult.batchName}
              </strong>
              . Status:{" "}
              <strong>
                {joinResult.status}
              </strong>
            </div>
          )}
        </section>

        {/* ERROR */}

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* BATCHES */}

        <section className="mt-8">
          <h2 className="text-xl font-semibold">
            Your batches
          </h2>

          {loading ? (
            <p className="mt-4 text-slate-500">
              Loading batches...
            </p>
          ) : batches.length === 0 ? (
            <div className="mt-4 rounded-xl border bg-white p-6">
              <p className="text-slate-600">
                You are not currently in any
                batches.
              </p>
            </div>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {batches.map((batch) => (
                <Link
                  key={batch.id}
                  href={`/student/batches/${batch.id}`}
                  className="rounded-xl border bg-white p-5 transition hover:border-blue-400"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold">
                      {batch.name}
                    </h3>

                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold">
                      {batch.status}
                    </span>
                  </div>

                  {batch.description && (
                    <p className="mt-3 text-sm text-slate-600">
                      {batch.description}
                    </p>
                  )}

                  <div className="mt-4 text-sm text-slate-500">
                    Instructor:{" "}
                    {batch.instructorName}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}