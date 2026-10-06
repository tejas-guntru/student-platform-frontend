"use client";

import axios from "axios";
import Link from "next/link";

import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Copy,
  Layers3,
  Plus,
  UsersRound,
} from "lucide-react";

import {
  createBatch,
  getInstructorBatches,
} from "@/services/instructorBatchService";

import type {
  BatchResponse,
} from "@/types/batch";

/* =========================================================
   PAGE
========================================================= */

export default function InstructorPage() {
  const [batches, setBatches] = useState<
    BatchResponse[]
  >([]);

  const [name, setName] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [loading, setLoading] =
    useState(true);

  const [creating, setCreating] =
    useState(false);

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [
    copiedBatchId,
    setCopiedBatchId,
  ] = useState<string | null>(null);

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
     LOAD BATCHES
  ========================================================= */

  const loadBatches =
    useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        const response =
          await getInstructorBatches();

        setBatches(response);
      } catch (error: unknown) {
        console.error(
          "INSTRUCTOR BATCHES ERROR:",
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
              "Could not load batches."
          );

          return;
        }

        setError(
          "Could not load batches."
        );
      } finally {
        setLoading(false);
      }
    }, [handleAuthFailure]);

  useEffect(() => {
    loadBatches();
  }, [loadBatches]);

  /* =========================================================
     CREATE BATCH
  ========================================================= */

  const handleCreateBatch = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const normalizedName =
      name.trim();

    if (!normalizedName) {
      setError(
        "Batch name is required."
      );

      return;
    }

    setCreating(true);
    setError("");
    setMessage("");

    try {
      await createBatch({
        name: normalizedName,

        description:
          description.trim() ||
          undefined,
      });

      setName("");
      setDescription("");

      setMessage(
        "Batch created successfully."
      );

      await loadBatches();
    } catch (error: unknown) {
      console.error(
        "CREATE BATCH ERROR:",
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
            "Could not create batch."
        );

        return;
      }

      setError(
        "Could not create batch."
      );
    } finally {
      setCreating(false);
    }
  };

  /* =========================================================
     COPY JOIN CODE
  ========================================================= */

  const handleCopyJoinCode =
    async (
      batchId: string,
      joinCode: string
    ) => {
      try {
        await navigator.clipboard.writeText(
          joinCode
        );

        setCopiedBatchId(
          batchId
        );

        window.setTimeout(() => {
          setCopiedBatchId(
            (current) =>
              current === batchId
                ? null
                : current
          );
        }, 1600);
      } catch {
        setError(
          "Could not copy join code."
        );
      }
    };

  /* =========================================================
     DERIVED DATA
  ========================================================= */

  const activeBatches =
    useMemo(
      () =>
        batches.filter(
          (batch) =>
            batch.status === "ACTIVE"
        ).length,
      [batches]
    );

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main
      className="
        min-h-screen
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
            HERO
        =================================================== */}

        <section
          className="
            overflow-hidden
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6

            sm:p-8

            lg:p-10
          "
        >
          <div
            className="
              flex
              flex-col
              gap-8

              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            <div
              className="
                max-w-2xl
              "
            >
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-blue-50
                  px-3
                  py-1.5
                  text-xs
                  font-bold
                  text-[#1256AF]
                "
              >
                <BookOpen
                  size={14}
                />

                Instructor Workspace
              </div>

              <h1
                className="
                  mt-5
                  text-3xl
                  font-bold
                  tracking-tight
                  text-slate-950

                  sm:text-4xl
                "
              >
                Manage your learning
                spaces.
              </h1>

              <p
                className="
                  mt-3
                  max-w-xl
                  text-sm
                  leading-6
                  text-slate-600

                  sm:text-base
                "
              >
                Create batches,
                organize students and
                move directly into
                tasks, assessments and
                learning progress.
              </p>
            </div>

            <a
              href="#create-batch"
              className="
                inline-flex
                w-fit
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#1256AF]
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition-colors

                hover:bg-[#0F4B99]
              "
            >
              <Plus size={17} />

              Create Batch
            </a>
          </div>

          {/* STATS */}

          <div
            className="
              mt-8
              grid
              gap-3

              sm:grid-cols-2

              lg:max-w-2xl
            "
          >
            <StatCard
              icon={Layers3}
              label="Total Batches"
              value={
                loading
                  ? "—"
                  : String(
                      batches.length
                    )
              }
              description="Learning spaces you manage"
            />

            <StatCard
              icon={CheckCircle2}
              label="Active Batches"
              value={
                loading
                  ? "—"
                  : String(
                      activeBatches
                    )
              }
              description="Currently active"
            />
          </div>
        </section>

        {/* ===================================================
            MESSAGES
        =================================================== */}

        {error && (
          <div
            className="
              mt-6
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              font-medium
              text-red-700
            "
          >
            {error}
          </div>
        )}

        {message && (
          <div
            className="
              mt-6
              rounded-xl
              border
              border-green-200
              bg-green-50
              px-4
              py-3
              text-sm
              font-medium
              text-green-700
            "
          >
            {message}
          </div>
        )}

        {/* ===================================================
            BATCHES
        =================================================== */}

        <section
          className="
            mt-10
          "
        >
          <div
            className="
              flex
              flex-col
              gap-2

              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
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
                Workspace
              </p>

              <h2
                className="
                  mt-2
                  text-2xl
                  font-bold
                  text-slate-950
                "
              >
                Your Batches
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                Open a batch to manage
                students, tasks and
                assessments.
              </p>
            </div>

            {!loading &&
              batches.length > 0 && (
                <p
                  className="
                    text-sm
                    font-medium
                    text-slate-500
                  "
                >
                  {batches.length}{" "}
                  {batches.length === 1
                    ? "batch"
                    : "batches"}
                </p>
              )}
          </div>

          {/* LOADING */}

          {loading ? (
            <div
              className="
                mt-5
                grid
                gap-4

                md:grid-cols-2

                xl:grid-cols-3
              "
            >
              {Array.from({
                length: 3,
              }).map((_, index) => (
                <BatchSkeleton
                  key={index}
                />
              ))}
            </div>
          ) : batches.length === 0 ? (
            /* EMPTY */

            <div
              className="
                mt-5
                rounded-2xl
                border
                border-dashed
                border-slate-300
                bg-white
                px-6
                py-12
                text-center
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
                  rounded-xl
                  bg-blue-50
                  text-[#1256AF]
                "
              >
                <UsersRound
                  size={22}
                />
              </div>

              <h3
                className="
                  mt-4
                  text-lg
                  font-semibold
                  text-slate-950
                "
              >
                No batches yet
              </h3>

              <p
                className="
                  mx-auto
                  mt-2
                  max-w-md
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                Create your first
                batch to start
                organizing students,
                tasks and assessments.
              </p>

              <a
                href="#create-batch"
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-[#1256AF]
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white

                  hover:bg-[#0F4B99]
                "
              >
                <Plus size={16} />

                Create first batch
              </a>
            </div>
          ) : (
            /* BATCH GRID */

            <div
              className="
                mt-5
                grid
                gap-4

                md:grid-cols-2

                xl:grid-cols-3
              "
            >
              {batches.map(
                (batch) => (
                  <article
                    key={batch.id}
                    className="
                      group
                      flex
                      min-h-[300px]
                      flex-col
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      p-5
                      transition-all

                      hover:-translate-y-0.5
                      hover:border-blue-200
                      hover:shadow-[0_12px_35px_rgba(15,23,42,0.06)]
                    "
                  >
                    {/* CARD HEADER */}

                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
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
                            text-[#1256AF]
                          "
                        >
                          <Layers3
                            size={18}
                          />
                        </div>

                        <div className="min-w-0">
                          <h3
                            className="
                              truncate
                              text-base
                              font-bold
                              text-slate-950
                            "
                          >
                            {batch.name}
                          </h3>

                          <p
                            className="
                              mt-1
                              text-xs
                              text-slate-400
                            "
                          >
                            Instructor batch
                          </p>
                        </div>
                      </div>

                      <BatchStatus
                        status={
                          batch.status
                        }
                      />
                    </div>

                    {/* DESCRIPTION */}

                    <div
                      className="
                        mt-5
                        flex-1
                      "
                    >
                      <p
                        className="
                          line-clamp-3
                          text-sm
                          leading-6
                          text-slate-600
                        "
                      >
                        {batch.description ||
                          "No description has been added for this batch."}
                      </p>
                    </div>

                    {/* JOIN CODE */}

                    <div
                      className="
                        mt-5
                        rounded-xl
                        border
                        border-slate-100
                        bg-slate-50
                        p-3.5
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          gap-3
                        "
                      >
                        <div>
                          <p
                            className="
                              text-[10px]
                              font-bold
                              uppercase
                              tracking-[0.1em]
                              text-slate-400
                            "
                          >
                            Join Code
                          </p>

                          <p
                            className="
                              mt-1
                              font-mono
                              text-lg
                              font-bold
                              tracking-[0.12em]
                              text-slate-950
                            "
                          >
                            {
                              batch.joinCode
                            }
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handleCopyJoinCode(
                              batch.id,
                              batch.joinCode
                            )
                          }
                          className="
                            flex
                            h-9
                            items-center
                            gap-1.5
                            rounded-lg
                            border
                            border-slate-200
                            bg-white
                            px-2.5
                            text-xs
                            font-semibold
                            text-slate-600
                            transition-colors

                            hover:border-blue-200
                            hover:text-[#1256AF]
                          "
                        >
                          {copiedBatchId ===
                          batch.id ? (
                            <>
                              <CheckCircle2
                                size={14}
                              />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy
                                size={14}
                              />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* ACTION */}

                    <Link
                      href={`/instructor/batches/${batch.id}`}
                      className="
                        mt-5
                        flex
                        items-center
                        justify-between
                        border-t
                        border-slate-100
                        pt-4
                        text-sm
                        font-semibold
                        text-[#1256AF]
                      "
                    >
                      Manage batch

                      <ArrowRight
                        size={16}
                        className="
                          transition-transform

                          group-hover:translate-x-1
                        "
                      />
                    </Link>
                  </article>
                )
              )}
            </div>
          )}
        </section>

        {/* ===================================================
            CREATE BATCH
        =================================================== */}

        <section
          id="create-batch"
          className="
            mt-12
            scroll-mt-24
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5

            sm:p-6

            lg:p-8
          "
        >
          <div
            className="
              grid
              gap-8

              lg:grid-cols-[0.75fr_1.25fr]
              lg:gap-12
            "
          >
            {/* INTRO */}

            <div>
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-50
                  text-[#1256AF]
                "
              >
                <Plus size={20} />
              </div>

              <h2
                className="
                  mt-5
                  text-2xl
                  font-bold
                  text-slate-950
                "
              >
                Create a new batch
              </h2>

              <p
                className="
                  mt-2
                  max-w-sm
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                Each batch gets its
                own join code. Students
                can use it to request
                access to your learning
                space.
              </p>
            </div>

            {/* FORM */}

            <form
              onSubmit={
                handleCreateBatch
              }
              className="
                space-y-5
              "
            >
              <div>
                <label
                  htmlFor="batch-name"
                  className="
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  Batch name
                  <span className="text-red-500">
                    {" "}
                    *
                  </span>
                </label>

                <input
                  id="batch-name"
                  type="text"
                  value={name}
                  maxLength={150}
                  disabled={creating}
                  onChange={(event) =>
                    setName(
                      event.target
                        .value
                    )
                  }
                  placeholder="Example: Java Batch 2027"
                  className="
                    mt-2
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-slate-950
                    outline-none
                    transition-colors

                    placeholder:text-slate-400

                    focus:border-[#1256AF]
                    focus:ring-4
                    focus:ring-blue-50

                    disabled:cursor-not-allowed
                    disabled:bg-slate-50
                  "
                />
              </div>

              <div>
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >
                  <label
                    htmlFor="batch-description"
                    className="
                      text-sm
                      font-semibold
                      text-slate-700
                    "
                  >
                    Description
                  </label>

                  <span
                    className="
                      text-xs
                      text-slate-400
                    "
                  >
                    {description.length}
                    /2000
                  </span>
                </div>

                <textarea
                  id="batch-description"
                  value={description}
                  maxLength={2000}
                  disabled={creating}
                  onChange={(event) =>
                    setDescription(
                      event.target
                        .value
                    )
                  }
                  placeholder="What will students learn or work on in this batch?"
                  rows={5}
                  className="
                    mt-2
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    px-4
                    py-3
                    text-sm
                    leading-6
                    text-slate-950
                    outline-none
                    transition-colors

                    placeholder:text-slate-400

                    focus:border-[#1256AF]
                    focus:ring-4
                    focus:ring-blue-50

                    disabled:cursor-not-allowed
                    disabled:bg-slate-50
                  "
                />
              </div>

              <div
                className="
                  flex
                  flex-col
                  gap-3

                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <p
                  className="
                    text-xs
                    text-slate-400
                  "
                >
                  You can manage the
                  batch after creating
                  it.
                </p>

                <button
                  type="submit"
                  disabled={
                    creating ||
                    !name.trim()
                  }
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#1256AF]
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition-colors

                    hover:bg-[#0F4B99]

                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  <Plus size={16} />

                  {creating
                    ? "Creating..."
                    : "Create Batch"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: typeof Layers3;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-slate-100
        bg-slate-50
        p-4
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
          rounded-xl
          bg-white
          text-[#1256AF]
          shadow-sm
        "
      >
        <Icon size={19} />
      </div>

      <div>
        <p
          className="
            text-xs
            font-semibold
            text-slate-500
          "
        >
          {label}
        </p>

        <div
          className="
            mt-0.5
            flex
            items-baseline
            gap-2
          "
        >
          <p
            className="
              text-2xl
              font-bold
              text-slate-950
            "
          >
            {value}
          </p>

          <p
            className="
              hidden
              text-xs
              text-slate-400

              sm:block
            "
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   BATCH STATUS
========================================================= */

function BatchStatus({
  status,
}: {
  status: BatchResponse["status"];
}) {
  const active =
    status === "ACTIVE";

  return (
    <span
      className={`
        shrink-0
        rounded-full
        px-2.5
        py-1
        text-[10px]
        font-bold
        uppercase
        tracking-wide

        ${
          active
            ? `
                bg-green-50
                text-green-700
              `
            : `
                bg-slate-100
                text-slate-600
              `
        }
      `}
    >
      {status}
    </span>
  );
}

/* =========================================================
   LOADING SKELETON
========================================================= */

function BatchSkeleton() {
  return (
    <div
      className="
        min-h-[300px]
        animate-pulse
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
      "
    >
      <div
        className="
          flex
          items-start
          gap-3
        "
      >
        <div
          className="
            h-10
            w-10
            rounded-xl
            bg-slate-100
          "
        />

        <div className="flex-1">
          <div
            className="
              h-4
              w-1/2
              rounded
              bg-slate-100
            "
          />

          <div
            className="
              mt-2
              h-3
              w-1/3
              rounded
              bg-slate-100
            "
          />
        </div>
      </div>

      <div
        className="
          mt-7
          h-3
          w-full
          rounded
          bg-slate-100
        "
      />

      <div
        className="
          mt-2
          h-3
          w-4/5
          rounded
          bg-slate-100
        "
      />

      <div
        className="
          mt-8
          h-16
          rounded-xl
          bg-slate-100
        "
      />

      <div
        className="
          mt-6
          h-4
          w-1/3
          rounded
          bg-slate-100
        "
      />
    </div>
  );
}
