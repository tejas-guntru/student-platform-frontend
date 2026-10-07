"use client";

import axios from "axios";
import Link from "next/link";

import {
  ArrowRight,
  Layers3,
  LoaderCircle,
  Plus,
  UsersRound,
} from "lucide-react";

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

  const [joinCode, setJoinCode] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [joining, setJoining] =
    useState(false);

  const [error, setError] =
    useState("");

  const [joinResult, setJoinResult] =
    useState<BatchJoinRequestResponse | null>(
      null
    );

  /* =======================================================
     AUTH FAILURE
  ======================================================= */

  const handleAuthFailure =
    useCallback(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");

      window.location.replace("/login");
    }, []);

  /* =======================================================
     LOAD BATCHES
  ======================================================= */

  const loadBatches =
    useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        const response =
          await getMyBatches();

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
            handleAuthFailure();
            return;
          }

          setError(
            error.response?.data?.message ||
              "Could not load your batches."
          );

          return;
        }

        setError(
          "Could not load your batches."
        );
      } finally {
        setLoading(false);
      }
    }, [handleAuthFailure]);

  useEffect(() => {
    loadBatches();
  }, [loadBatches]);

  /* =======================================================
     JOIN BATCH
  ======================================================= */

  const handleJoin = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const normalizedCode =
      joinCode.trim();

    if (!normalizedCode) {
      setError(
        "Enter a batch join code."
      );

      return;
    }

    setJoining(true);
    setError("");
    setJoinResult(null);

    try {
      const response =
        await joinBatch({
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
          handleAuthFailure();
          return;
        }

        setError(
          error.response?.data?.message ||
            "Could not submit the join request."
        );

        return;
      }

      setError(
        "Could not submit the join request."
      );
    } finally {
      setJoining(false);
    }
  };

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main
      className="
        min-h-screen
        min-w-0
        bg-slate-50
        px-4
        py-8

        sm:px-6
        sm:py-10
      "
    >
      <div
        className="
          mx-auto
          min-w-0
          max-w-5xl
        "
      >
        {/* HEADER */}

        <div className="min-w-0">
          <div
            className="
              inline-flex
              max-w-full
              items-center
              gap-2
              rounded-full
              bg-blue-50
              px-3
              py-1.5
              text-blue-700
            "
          >
            <UsersRound
              size={14}
              className="shrink-0"
              aria-hidden="true"
            />

            <span
              className="
                break-words
                text-xs
                font-semibold
              "
            >
              Student workspace
            </span>
          </div>

          <h1
            className="
              mt-3
              break-words
              text-3xl
              font-bold
              tracking-tight
              text-slate-950

              sm:text-4xl
            "
          >
            My Batches
          </h1>

          <p
            className="
              mt-2
              max-w-2xl
              break-words
              text-sm
              leading-6
              text-slate-600

              sm:text-base
            "
          >
            View your batches or request to
            join a new batch.
          </p>
        </div>

        {/* JOIN BATCH */}

        <section
          className="
            mt-8
            min-w-0
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-4

            sm:p-6
          "
        >
          <div
            className="
              flex
              min-w-0
              items-start
              gap-3
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-blue-50
                text-blue-700
              "
            >
              <Plus
                size={18}
                aria-hidden="true"
              />
            </div>

            <div className="min-w-0">
              <h2
                className="
                  break-words
                  text-lg
                  font-semibold
                  text-slate-950

                  sm:text-xl
                "
              >
                Join a batch
              </h2>

              <p
                className="
                  mt-1
                  break-words
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                Enter the join code shared by
                your instructor.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleJoin}
            className="
              mt-5
              flex
              min-w-0
              flex-col
              gap-3

              sm:flex-row
            "
          >
            <label
              htmlFor="batch-join-code"
              className="sr-only"
            >
              Batch join code
            </label>

            <input
              id="batch-join-code"
              name="joinCode"
              type="text"
              value={joinCode}
              maxLength={20}
              autoComplete="off"
              placeholder="Enter join code"
              disabled={joining}
              onChange={(event) => {
                setJoinCode(
                  event.target.value
                );

                if (error) {
                  setError("");
                }
              }}
              className="
                min-h-12
                min-w-0
                w-full
                flex-1
                rounded-xl
                border
                border-slate-300
                bg-white
                px-4
                text-sm
                text-slate-950
                outline-none
                transition

                placeholder:text-slate-400

                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100

                disabled:cursor-not-allowed
                disabled:bg-slate-50
                disabled:opacity-70
              "
            />

            <button
              type="submit"
              disabled={
                joining ||
                !joinCode.trim()
              }
              className="
                inline-flex
                min-h-12
                w-full
                shrink-0
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-blue-600
                px-5
                text-sm
                font-semibold
                text-white
                transition

                hover:bg-blue-700

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-blue-300
                focus-visible:ring-offset-2

                disabled:cursor-not-allowed
                disabled:opacity-50

                sm:w-auto
              "
            >
              {joining ? (
                <>
                  <LoaderCircle
                    size={16}
                    className="
                      shrink-0
                      animate-spin
                    "
                    aria-hidden="true"
                  />

                  Joining...
                </>
              ) : (
                <>
                  Join batch

                  <ArrowRight
                    size={15}
                    className="shrink-0"
                    aria-hidden="true"
                  />
                </>
              )}
            </button>
          </form>

          {joinResult && (
            <div
              className="
                mt-4
                min-w-0
                break-words
                rounded-xl
                border
                border-green-200
                bg-green-50
                p-4
                text-sm
                leading-6
                text-green-800

                [overflow-wrap:anywhere]
              "
              role="status"
            >
              Request submitted for{" "}
              <strong>
                {joinResult.batchName}
              </strong>
              . Status:{" "}
              <strong>
                {formatStatus(
                  joinResult.status
                )}
              </strong>
              .
            </div>
          )}
        </section>

        {/* ERROR */}

        {error && (
          <div
            className="
              mt-6
              min-w-0
              break-words
              rounded-xl
              border
              border-red-200
              bg-red-50
              p-4
              text-sm
              leading-6
              text-red-700

              [overflow-wrap:anywhere]
            "
            role="alert"
          >
            {error}
          </div>
        )}

        {/* BATCHES */}

        <section
          className="
            mt-10
            min-w-0
          "
        >
          <div className="min-w-0">
            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.12em]
                text-blue-700
              "
            >
              Learning groups
            </p>

            <h2
              className="
                mt-2
                break-words
                text-xl
                font-semibold
                text-slate-950

                sm:text-2xl
              "
            >
              Your batches
            </h2>
          </div>

          {loading ? (
            <div
              className="
                mt-4
                flex
                min-w-0
                items-center
                gap-3
                rounded-xl
                border
                border-slate-200
                bg-white
                p-5
                text-sm
                text-slate-500

                sm:p-6
              "
              role="status"
            >
              <LoaderCircle
                size={18}
                className="
                  shrink-0
                  animate-spin
                "
                aria-hidden="true"
              />

              Loading batches...
            </div>
          ) : batches.length === 0 ? (
            <div
              className="
                mt-4
                min-w-0
                rounded-xl
                border
                border-slate-200
                bg-white
                p-5

                sm:p-6
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-50
                  text-blue-700
                "
              >
                <Layers3
                  size={18}
                  aria-hidden="true"
                />
              </div>

              <h3
                className="
                  mt-4
                  font-semibold
                  text-slate-950
                "
              >
                No batches yet
              </h3>

              <p
                className="
                  mt-2
                  max-w-xl
                  break-words
                  text-sm
                  leading-6
                  text-slate-600
                "
              >
                You are not currently in any
                batches. Use a join code above
                to request access to one.
              </p>
            </div>
          ) : (
            <div
              className="
                mt-4
                grid
                min-w-0
                grid-cols-1
                gap-4

                md:grid-cols-2
              "
            >
              {batches.map((batch) => (
                <Link
                  key={batch.id}
                  href={`/student/batches/${batch.id}`}
                  className="
                    group
                    flex
                    min-w-0
                    flex-col
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-4
                    transition

                    hover:border-blue-300
                    hover:shadow-sm

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-blue-200
                    focus-visible:ring-offset-2

                    sm:p-5
                  "
                >
                  <div
                    className="
                      flex
                      min-w-0
                      flex-col
                      gap-3

                      sm:flex-row
                      sm:items-start
                      sm:justify-between
                      sm:gap-4
                    "
                  >
                    <h3
                      className="
                        min-w-0
                        break-words
                        text-lg
                        font-semibold
                        leading-7
                        text-slate-950

                        [overflow-wrap:anywhere]
                      "
                    >
                      {batch.name}
                    </h3>

                    <span
                      className="
                        inline-flex
                        w-fit
                        max-w-full
                        shrink-0
                        rounded-full
                        bg-slate-100
                        px-2.5
                        py-1
                        text-xs
                        font-semibold
                        text-slate-700
                      "
                    >
                      <span
                        className="
                          break-words
                          [overflow-wrap:anywhere]
                        "
                      >
                        {formatStatus(
                          batch.status
                        )}
                      </span>
                    </span>
                  </div>

                  {batch.description && (
                    <p
                      className="
                        mt-3
                        break-words
                        text-sm
                        leading-6
                        text-slate-600

                        [overflow-wrap:anywhere]
                      "
                    >
                      {batch.description}
                    </p>
                  )}

                  <div
                    className="
                      mt-4
                      min-w-0
                      text-sm
                      leading-6
                      text-slate-500
                    "
                  >
                    <span className="font-medium">
                      Instructor:
                    </span>{" "}
                    <span
                      className="
                        break-words
                        [overflow-wrap:anywhere]
                      "
                    >
                      {batch.instructorName}
                    </span>
                  </div>

                  <div
                    className="
                      mt-auto
                      flex
                      items-center
                      gap-2
                      pt-5
                      text-sm
                      font-semibold
                      text-blue-700
                    "
                  >
                    Open batch

                    <ArrowRight
                      size={14}
                      className="
                        shrink-0
                        transition-transform

                        group-hover:translate-x-1
                      "
                      aria-hidden="true"
                    />
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

/* =========================================================
   FORMAT STATUS
========================================================= */

function formatStatus(
  value: string
) {
  return value
    .split("_")
    .map(
      (word) =>
        word.charAt(0) +
        word.slice(1).toLowerCase()
    )
    .join(" ");
}