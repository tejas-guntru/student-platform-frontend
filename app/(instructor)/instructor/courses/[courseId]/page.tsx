"use client";

import axios from "axios";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import CourseBuilderHeader from "@/components/instructor/course/builder/CourseBuilderHeader";
import CreateModuleForm from "@/components/instructor/course/builder/CreateModuleForm";
import CourseModuleList from "@/components/instructor/course/builder/CourseModuleList";
import CourseLockedNotice from "@/components/instructor/course/builder/CourseLockedNotice";

import {
  createCourseModule,
  createLesson,
  getCourse,
  getCourseModules,
  getModuleLessons,
  publishCourse,
} from "@/services/instructorCourseService";

import type {
  CourseModuleResponse,
  CourseResponse,
  LessonResponse,
  LessonType,
} from "@/types/course";

/* =========================================================
   TYPES
========================================================= */

interface PageProps {
  params: Promise<{
    courseId: string;
  }>;
}

interface ModuleWithLessons {
  module: CourseModuleResponse;
  lessons: LessonResponse[];
}

/* =========================================================
   PAGE
========================================================= */

export default function InstructorCourseBuilderPage({
  params,
}: PageProps) {
  /* =========================================================
     COURSE STATE
  ========================================================= */

  const [courseId, setCourseId] =
    useState("");

  const [course, setCourse] =
    useState<CourseResponse | null>(
      null
    );

  const [modules, setModules] =
    useState<ModuleWithLessons[]>(
      []
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");

  /* =========================================================
     MODULE FORM
  ========================================================= */

  const [
    moduleTitle,
    setModuleTitle,
  ] = useState("");

  const [
    moduleDescription,
    setModuleDescription,
  ] = useState("");

  const [
    creatingModule,
    setCreatingModule,
  ] = useState(false);

  /* =========================================================
     LESSON FORM
  ========================================================= */

  const [
    activeModuleId,
    setActiveModuleId,
  ] = useState<string | null>(null);

  const [
    lessonTitle,
    setLessonTitle,
  ] = useState("");

  const [
    lessonContent,
    setLessonContent,
  ] = useState("");

  const [
    lessonType,
    setLessonType,
  ] =
    useState<LessonType>("TEXT");

  const [
    resourceUrl,
    setResourceUrl,
  ] = useState("");

  const [
    creatingLesson,
    setCreatingLesson,
  ] = useState(false);

  /* =========================================================
     PUBLISH
  ========================================================= */

  const [
    publishing,
    setPublishing,
  ] = useState(false);

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
     ERROR MESSAGE
  ========================================================= */

  const getErrorMessage = (
    error: unknown,
    fallback: string
  ) => {
    if (
      axios.isAxiosError(error)
    ) {
      return (
        error.response?.data
          ?.message || fallback
      );
    }

    return fallback;
  };

  /* =========================================================
     LOAD COURSE
  ========================================================= */

  const loadCourse =
    useCallback(
      async (id: string) => {
        setLoading(true);
        setError("");

        try {
          /*
           * Course metadata and modules
           * are independent, so load
           * them concurrently.
           */

          const [
            courseResponse,
            moduleResponse,
          ] = await Promise.all([
            getCourse(id),
            getCourseModules(id),
          ]);

          /*
           * Once modules are known,
           * load the lessons belonging
           * to each module.
           */

          const modulesWithLessons =
            await Promise.all(
              moduleResponse.map(
                async (module) => {
                  const lessons =
                    await getModuleLessons(
                      id,
                      module.id
                    );

                  return {
                    module,
                    lessons,
                  };
                }
              )
            );

          setCourse(
            courseResponse
          );

          setModules(
            modulesWithLessons.sort(
              (a, b) =>
                a.module.position -
                b.module.position
            )
          );
        } catch (error: unknown) {
          console.error(
            "LOAD COURSE ERROR:",
            error
          );

          if (
            axios.isAxiosError(
              error
            ) &&
            (error.response
              ?.status === 401 ||
              error.response
                ?.status === 403)
          ) {
            handleAuthFailure();
            return;
          }

          setError(
            getErrorMessage(
              error,
              "Could not load course."
            )
          );
        } finally {
          setLoading(false);
        }
      },
      [handleAuthFailure]
    );

  /* =========================================================
     RESOLVE ROUTE PARAM
  ========================================================= */

  useEffect(() => {
    async function resolveParams() {
      const resolved =
        await params;

      setCourseId(
        resolved.courseId
      );

      await loadCourse(
        resolved.courseId
      );
    }

    resolveParams();
  }, [params, loadCourse]);

  /* =========================================================
     CREATE MODULE
  ========================================================= */

  const handleCreateModule =
    async () => {
      if (!courseId) {
        return;
      }

      const cleanTitle =
        moduleTitle.trim();

      if (!cleanTitle) {
        setError(
          "Module title is required."
        );

        setMessage("");

        return;
      }

      setCreatingModule(true);

      setError("");
      setMessage("");

      try {
        const created =
          await createCourseModule(
            courseId,
            {
              title: cleanTitle,

              description:
                moduleDescription.trim() ||
                null,
            }
          );

        /*
         * New modules start without
         * lessons, so we can insert
         * them directly into local
         * builder state.
         */

        setModules(
          (current) => [
            ...current,
            {
              module: created,
              lessons: [],
            },
          ]
        );

        setModuleTitle("");
        setModuleDescription("");

        setMessage(
          "Module created successfully."
        );
      } catch (error: unknown) {
        console.error(
          "CREATE MODULE ERROR:",
          error
        );

        if (
          axios.isAxiosError(
            error
          ) &&
          (error.response
            ?.status === 401 ||
            error.response
              ?.status === 403)
        ) {
          handleAuthFailure();
          return;
        }

        setError(
          getErrorMessage(
            error,
            "Could not create module."
          )
        );
      } finally {
        setCreatingModule(
          false
        );
      }
    };

  /* =========================================================
     LESSON FORM
  ========================================================= */

  const openLessonForm = (
    moduleId: string
  ) => {
    setActiveModuleId(
      moduleId
    );

    setLessonTitle("");
    setLessonContent("");

    setLessonType("TEXT");

    setResourceUrl("");

    setError("");
    setMessage("");
  };

  const closeLessonForm =
    () => {
      setActiveModuleId(null);

      setLessonTitle("");
      setLessonContent("");

      setLessonType("TEXT");

      setResourceUrl("");
    };

  /* =========================================================
     CREATE LESSON
  ========================================================= */

  const handleCreateLesson =
    async () => {
      if (
        !courseId ||
        !activeModuleId
      ) {
        return;
      }

      const cleanTitle =
        lessonTitle.trim();

      if (!cleanTitle) {
        setError(
          "Lesson title is required."
        );

        setMessage("");

        return;
      }

      setCreatingLesson(true);

      setError("");
      setMessage("");

      try {
        const created =
          await createLesson(
            courseId,
            activeModuleId,
            {
              title: cleanTitle,

              content:
                lessonContent.trim() ||
                null,

              lessonType,

              resourceUrl:
                resourceUrl.trim() ||
                null,
            }
          );

        /*
         * Update only the module
         * receiving the new lesson.
         */

        setModules(
          (current) =>
            current.map(
              (item) => {
                if (
                  item.module.id !==
                  activeModuleId
                ) {
                  return item;
                }

                return {
                  ...item,

                  lessons: [
                    ...item.lessons,
                    created,
                  ],
                };
              }
            )
        );

        closeLessonForm();

        setMessage(
          "Lesson created successfully."
        );
      } catch (error: unknown) {
        console.error(
          "CREATE LESSON ERROR:",
          error
        );

        if (
          axios.isAxiosError(
            error
          ) &&
          (error.response
            ?.status === 401 ||
            error.response
              ?.status === 403)
        ) {
          handleAuthFailure();
          return;
        }

        setError(
          getErrorMessage(
            error,
            "Could not create lesson."
          )
        );
      } finally {
        setCreatingLesson(
          false
        );
      }
    };

  /* =========================================================
     PUBLISH
  ========================================================= */

  const handlePublish =
    async () => {
      if (
        !courseId ||
        !course
      ) {
        return;
      }

      if (
        modules.length === 0
      ) {
        setError(
          "Add at least one module before publishing."
        );

        setMessage("");

        return;
      }

      const totalLessons =
        modules.reduce(
          (total, item) =>
            total +
            item.lessons.length,
          0
        );

      if (totalLessons === 0) {
        setError(
          "Add at least one lesson before publishing."
        );

        setMessage("");

        return;
      }

      const confirmed =
        window.confirm(
          "Publish this course? Once published, the current backend does not allow editing its modules or lessons."
        );

      if (!confirmed) {
        return;
      }

      setPublishing(true);

      setError("");
      setMessage("");

      try {
        const updated =
          await publishCourse(
            courseId
          );

        setCourse(updated);

        /*
         * Publishing closes any
         * currently open lesson
         * creation state.
         */

        closeLessonForm();

        setMessage(
          "Course published successfully."
        );
      } catch (error: unknown) {
        console.error(
          "PUBLISH COURSE ERROR:",
          error
        );

        if (
          axios.isAxiosError(
            error
          ) &&
          (error.response
            ?.status === 401 ||
            error.response
              ?.status === 403)
        ) {
          handleAuthFailure();
          return;
        }

        setError(
          getErrorMessage(
            error,
            "Could not publish course."
          )
        );
      } finally {
        setPublishing(false);
      }
    };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
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
          <CourseBuilderSkeleton />
        </div>
      </main>
    );
  }

  /* =========================================================
     LOAD FAILURE
  ========================================================= */

  if (!course) {
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
          <Link
            href="/instructor/courses"
            className="
              text-sm
              font-semibold
              text-[#1256AF]
            "
          >
            ← Courses
          </Link>

          <div
            className="
              mt-6
              rounded-2xl
              border
              border-red-200
              bg-red-50
              p-6
              text-sm
              text-red-700
            "
          >
            {error ||
              "Course could not be loaded."}
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     DERIVED DATA
  ========================================================= */

  const editable =
    course.status === "DRAFT";

  const totalLessons =
    modules.reduce(
      (total, item) =>
        total +
        item.lessons.length,
      0
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
            HEADER
        =================================================== */}

        <CourseBuilderHeader
          course={course}
          moduleCount={
            modules.length
          }
          lessonCount={
            totalLessons
          }
          publishing={
            publishing
          }
          onPublish={
            handlePublish
          }
        />

        {/* ===================================================
            MESSAGES
        =================================================== */}

        {(error || message) && (
          <div
            className="
              mt-5
              space-y-3
            "
          >
            {error && (
              <div
                role="alert"
                className="
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
                role="status"
                className="
                  rounded-xl
                  border
                  border-emerald-200
                  bg-emerald-50
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-emerald-700
                "
              >
                {message}
              </div>
            )}
          </div>
        )}

        {/* ===================================================
            ADD MODULE
        =================================================== */}

        {editable && (
          <div className="mt-8">
            <CreateModuleForm
              title={
                moduleTitle
              }
              description={
                moduleDescription
              }
              creating={
                creatingModule
              }
              onTitleChange={(
                value
              ) => {
                setModuleTitle(
                  value
                );

                if (
                  error ===
                  "Module title is required."
                ) {
                  setError("");
                }
              }}
              onDescriptionChange={
                setModuleDescription
              }
              onSubmit={
                handleCreateModule
              }
            />
          </div>
        )}

        {/* ===================================================
            COURSE STRUCTURE
        =================================================== */}

        <div className="mt-10">
          <CourseModuleList
            modules={modules}
            editable={editable}
            activeModuleId={
              activeModuleId
            }
            lessonTitle={
              lessonTitle
            }
            lessonContent={
              lessonContent
            }
            lessonType={
              lessonType
            }
            resourceUrl={
              resourceUrl
            }
            creatingLesson={
              creatingLesson
            }
            onOpenLessonForm={
              openLessonForm
            }
            onCloseLessonForm={
              closeLessonForm
            }
            onLessonTitleChange={(
              value
            ) => {
              setLessonTitle(
                value
              );

              if (
                error ===
                "Lesson title is required."
              ) {
                setError("");
              }
            }}
            onLessonContentChange={
              setLessonContent
            }
            onLessonTypeChange={
              setLessonType
            }
            onResourceUrlChange={
              setResourceUrl
            }
            onCreateLesson={
              handleCreateLesson
            }
          />
        </div>

        {/* ===================================================
            LOCKED
        =================================================== */}

        {!editable && (
          <div className="mt-8">
            <CourseLockedNotice
              status={
                course.status
              }
            />
          </div>
        )}
      </div>
    </main>
  );
}

/* =========================================================
   SKELETON
========================================================= */

function CourseBuilderSkeleton() {
  return (
    <div className="animate-pulse">
      <div
        className="
          h-4
          w-24
          rounded
          bg-slate-200
        "
      />

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
            h-6
            w-32
            rounded-full
            bg-slate-100
          "
        />

        <div
          className="
            mt-5
            h-9
            w-96
            max-w-full
            rounded
            bg-slate-100
          "
        />

        <div
          className="
            mt-4
            h-4
            w-full
            max-w-2xl
            rounded
            bg-slate-100
          "
        />

        <div
          className="
            mt-8
            grid
            gap-3
            border-t
            border-slate-100
            pt-6
            sm:grid-cols-3
          "
        >
          {Array.from({
            length: 3,
          }).map((_, index) => (
            <div
              key={index}
              className="
                h-20
                rounded-2xl
                bg-slate-50
              "
            />
          ))}
        </div>
      </div>

      <div
        className="
          mt-10
          h-7
          w-52
          rounded
          bg-slate-200
        "
      />

      <div
        className="
          mt-5
          space-y-5
        "
      >
        {Array.from({
          length: 2,
        }).map((_, index) => (
          <div
            key={index}
            className="
              h-64
              rounded-2xl
              border
              border-slate-200
              bg-white
            "
          />
        ))}
      </div>
    </div>
  );
}