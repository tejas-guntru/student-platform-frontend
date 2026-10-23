"use client";

import axios from "axios";
import {
  Briefcase,
  GraduationCap,
  Layers,
  Landmark,
  LineChart,
  List,
  MapPin,
  Search,
  SquarePlay,
  Target,
  TrendingUp,
  Users,
  Zap,
  Clock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type ReactNode,
} from "react";

import {
  getMyCourses,
  getStudentCourseProgress,
} from "@/services/studentCourseService";
import type {
  StudentCourseProgressResponse,
  StudentCourseResponse,
} from "@/types/course";
import { HowWeTeach } from "./learn/HowWeTeach";
import { InsideLms } from "./learn/InsideLms";
import { RealWeek } from "./learn/RealWeek";
import { Readiness } from "./learn/Readiness";
import { Tracks } from "./learn/Tracks";

const inside = [
  {
    number: "01",
    title: "Modules",
    text: "Ordered parts of the course. Position is the path, not a suggestion.",
    icon: List,
  },
  {
    number: "02",
    title: "Lessons",
    text: "A lesson can be text, video, a document, a link, or a mix of those.",
    icon: SquarePlay,
  },
  {
    number: "03",
    title: "Progress",
    text: "Lessons you mark complete are saved, with a percentage on the course.",
    icon: TrendingUp,
  },
] as const;

const trail = [
  {
    number: "01",
    title: "Academics",
    text: "Your foundation and where your journey begins.",
    detail:
      "Bring your education, coursework and academic progress into one clear starting point for your career.",
    icon: GraduationCap,
  },
  {
    number: "02",
    title: "Skills",
    text: "The abilities you learn and continue improving.",
    detail:
      "Build practical technical and professional skills that prepare you for real opportunities.",
    icon: Zap,
  },
  {
    number: "03",
    title: "Projects",
    text: "Real proof of what you can build and create.",
    detail:
      "Turn what you learn into hands-on projects that demonstrate your ability beyond certificates and grades.",
    icon: Layers,
  },
  {
    number: "04",
    title: "Experience",
    text: "Where your knowledge becomes real-world work.",
    detail:
      "Add internships, collaborations and practical experience that show how you apply your skills.",
    icon: Briefcase,
  },
  {
    number: "05",
    title: "Progress",
    text: "Everything coming together for your next move.",
    detail:
      "See your academics, skills, projects and experience grow together as you prepare for what comes next.",
    icon: LineChart,
  },
] as const;

const benefits = [
  {
    number: "01",
    title: "Expert Mentorship",
    text: "Learn with mentors who guide your journey.",
    icon: Users,
  },
  {
    number: "02",
    title: "Regular Assessments",
    text: "Check your progress as you learn.",
    icon: Clock,
  },
  {
    number: "03",
    title: "Real-World Projects",
    text: "Hands-on projects that build real proof.",
    icon: Layers,
  },
  {
    number: "04",
    title: "Career Focused",
    text: "Built around today\u2019s job market.",
    icon: Target,
  },
  {
    number: "05",
    title: "Vibrant Community",
    text: "Grow alongside ambitious students.",
    icon: MapPin,
  },
] as const;

const impact = [
  { value: "50,000+", label: "Trained" },
  { value: "19,500+", label: "Placed" },
  { value: "368+", label: "Companies" },
] as const;

const recognition: {
  title: string;
  subtitle: string;
  image?: string;
  icon?: typeof Landmark;
}[] = [
  {
    title: "Ministry Recognition",
    subtitle: "Government recognised",
    icon: Landmark,
  },
  {
    title: "Startup India",
    subtitle: "DPIIT ecosystem",
    image: "/images/startup-india.png",
  },
  {
    title: "MSME",
    subtitle: "Registered enterprise",
    image: "/images/msme.png",
  },
];

type AuthState = "guest" | "student" | "other";

function readAuth(): AuthState {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return "guest";
  if (role === "STUDENT") return "student";
  return "other";
}

function readAuthServer(): AuthState {
  return "guest";
}

function subscribeAuth(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

const primaryBtn =
  "inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-lg bg-[#1256af] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0f4b99]";

const card =
  "rounded-2xl border border-[#e4e9f0] bg-white";

function SectionLabel({
  index,
  label,
}: {
  index: string;
  label: string;
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b93a3]">
        {index} — {label}
      </p>
      <span
        aria-hidden="true"
        className="mt-2.5 block h-[2px] w-7 rounded-full bg-[#c4a265]"
      />
    </div>
  );
}

function IconTile({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#1256af] text-white">
      {children}
    </span>
  );
}

function CourseFigure() {
  return (
    <figure className="w-full max-w-[400px] lg:ml-auto">
      <div className={`${card} px-6 pb-5 pt-6 shadow-[0_16px_40px_rgba(16,33,58,0.05)] sm:px-7`}>
        <Image
          src="/tbz.png"
          alt="Trailbliz"
          width={148}
          height={40}
          className="h-7 w-auto"
        />

        <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#98a2b3]">
          Course
        </p>
        <p className="mt-2 text-[17px] font-semibold leading-6 tracking-[-0.02em] text-[#121826]">
          Title your instructor publishes
        </p>
        <p className="mt-1.5 text-[13.5px] leading-6 text-[#667085]">
          A short description, when one has been written.
        </p>

        <div className="mt-5 border-t border-[#eef1f5]">
          <PreviewRow
            index="01"
            title="Module"
            text="Lessons in position order"
          />
          <PreviewRow
            index="02"
            title="Module"
            text="Mark a lesson complete"
          />
        </div>

        <div className="mt-2 border-t border-[#eef1f5] pt-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#98a2b3]">
              Progress
            </p>
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#b0b8c4]">
              Fills as you finish
            </p>
          </div>
          <div
            className="mt-3 h-[3px] overflow-hidden rounded-full bg-[#e7edf4]"
            aria-hidden="true"
          >
            <div className="h-full w-[46%] rounded-full bg-[#1256af]" />
          </div>
        </div>

        <figcaption className="mt-5 text-center text-[10px] font-medium uppercase tracking-[0.14em] text-[#a0a8b5]">
          Fig. 01 — How a course is organized
        </figcaption>
      </div>
    </figure>
  );
}

function PreviewRow({
  index,
  title,
  text,
}: {
  index: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4 border-b border-[#eef1f5] py-3.5 last:border-b-0">
      <span className="w-6 pt-0.5 text-[12px] font-medium text-[#98a2b3]">
        {index}
      </span>
      <div className="min-w-0">
        <p className="text-[15px] font-semibold text-[#121826]">
          {title}
        </p>
        <p className="mt-0.5 text-[13px] leading-5 text-[#667085]">
          {text}
        </p>
      </div>
    </div>
  );
}

function readError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;

    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  return "Could not load courses.";
}

export default function CoursesPage() {
  const router = useRouter();
  const searchId = useId();
  const [query, setQuery] = useState("");
  const auth = useSyncExternalStore(subscribeAuth, readAuth, readAuthServer);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [courses, setCourses] = useState<StudentCourseResponse[]>([]);
  const [progress, setProgress] = useState<
    Record<string, StudentCourseProgressResponse>
  >({});
  const [activeStep, setActiveStep] = useState(0);

  const loadCourses = useCallback(async (cancelled?: () => boolean) => {
    setLoading(true);
    setError("");

    try {
      const data = await getMyCourses();

      if (cancelled?.()) return;

      setCourses(data);

      const progressResults = await Promise.all(
        data.map(async (course) => {
          try {
            const courseProgress = await getStudentCourseProgress(
              course.courseId
            );

            return [course.courseId, courseProgress] as const;
          } catch {
            return null;
          }
        })
      );

      if (cancelled?.()) return;

      const progressMap: Record<string, StudentCourseProgressResponse> = {};

      progressResults.forEach((result) => {
        if (result) {
          progressMap[result[0]] = result[1];
        }
      });

      setProgress(progressMap);
    } catch (loadError: unknown) {
      if (cancelled?.()) return;

      setCourses([]);
      setProgress({});
      setError(readError(loadError));
    } finally {
      if (!cancelled?.()) {
        setLoading(false);
        setFetched(true);
      }
    }
  }, []);

  useEffect(() => {
    if (auth !== "student") return;

    let cancelled = false;
    const handle = window.setTimeout(() => {
      void loadCourses(() => cancelled);
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(handle);
    };
  }, [auth, loadCourses, reloadKey]);

  const visibleCourses = useMemo(() => {
    const needle = query.trim().toLowerCase();

    if (!needle) return courses;

    return courses.filter((course) => {
      const title = course.title.toLowerCase();
      const description = (course.description ?? "").toLowerCase();

      return title.includes(needle) || description.includes(needle);
    });
  }, [courses, query]);

  const step = trail[activeStep];
  const stepPercent = Math.round(((activeStep + 1) / trail.length) * 100);

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (auth !== "student") {
      router.push("/login");
      return;
    }

    document.getElementById("your-courses")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function advanceStep() {
    setActiveStep((current) => (current + 1) % trail.length);
  }

  return (
    <main className="bg-[#eef2f6] text-[#121826] [font-family:var(--font-geist-sans),Arial,Helvetica,sans-serif]">
      <section className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:px-10 lg:pb-24 lg:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(rgba(17,24,39,0.16) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage:
              "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 70%, transparent 100%)",
          }}
        />

        <div className="relative mx-auto grid w-full max-w-[1120px] items-center gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(300px,0.88fr)] lg:gap-16">
          <div className="min-w-0 max-w-[560px]">
            <SectionLabel index="01" label="Courses" />

            <h1 className="mt-6 text-[1.95rem] font-bold leading-[1.05] tracking-[-0.04em] text-[#101828] min-[420px]:text-[2.2rem] sm:text-[2.7rem] lg:text-[2.9rem] xl:text-[3.4rem]">
              <span className="block">Learn it in the</span>
              <span className="mt-1 block italic text-[#1256af]">
                order you’ll use it.
              </span>
            </h1>

            <p className="mt-5 max-w-[420px] text-[15px] leading-7 text-[#5c6b80] sm:text-base">
              Batches assign the courses. Search yours, continue what you
              started, and open the next lesson.
            </p>

            <form onSubmit={onSearch} className="mt-9 max-w-[360px]">
              <label
                htmlFor={searchId}
                className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8b93a3]"
              >
                Search courses
              </label>

              <div className="relative mt-3">
                <Search
                  size={16}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#98a2b3]"
                />
                <input
                  id={searchId}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Title or description"
                  className="h-11 w-full !rounded-lg !border !border-[#e1e6ee] !bg-white !pl-10 !pr-3 text-sm text-[#121826] !shadow-none placeholder:text-[#a0a8b5] focus:!border-[#1256af] focus:!ring-0 focus:!shadow-none focus:!outline-none"
                />
              </div>

              {auth === "student" ? (
                <button type="submit" className={`${primaryBtn} mt-3.5`}>
                  Continue your courses
                  <span aria-hidden="true">→</span>
                </button>
              ) : (
                <Link href="/login" className={`${primaryBtn} mt-3.5`}>
                  Sign in to your courses
                  <span aria-hidden="true">→</span>
                </Link>
              )}
            </form>
          </div>

          <CourseFigure />
        </div>
      </section>

      <HowWeTeach />
      <InsideLms />
      <RealWeek />
      <Readiness />
      <Tracks />
    </main>
  );
}

function AssignedCourses({
  auth,
  loading,
  error,
  courses,
  totalCourses,
  query,
  progress,
  onRetry,
}: {
  auth: AuthState;
  loading: boolean;
  error: string;
  courses: StudentCourseResponse[];
  totalCourses: number;
  query: string;
  progress: Record<string, StudentCourseProgressResponse>;
  onRetry: () => void;
}) {
  if (auth === "student" && loading && totalCourses === 0 && !error) {
    return (
      <div
        role="status"
        className={`${card} px-6 py-6 text-sm text-[#667085] sm:px-8`}
      >
        Loading your courses…
      </div>
    );
  }

  if (auth !== "student") {
    return (
      <div className="space-y-4">
        <div className={`${card} flex flex-col gap-6 px-6 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:py-7`}>
          <p className="text-lg font-semibold tracking-[-0.02em] text-[#121826] sm:text-xl">
            Sign in to see your courses.
          </p>
          <span
            aria-hidden="true"
            className="h-2 w-14 shrink-0 rounded-full bg-[#1256af]"
          />
        </div>

        <div className={`${card} flex flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-7`}>
          <p className="max-w-[640px] text-[15px] leading-7 text-[#3e4d63]">
            Courses appear after an instructor assigns them to one of your
            batches. This page does not invent a public catalogue.
          </p>
          <Link href="/login" className={`${primaryBtn} shrink-0`}>
            Sign in
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-2xl border border-[#f0d4d4] bg-white px-6 py-6 sm:px-8"
      >
        <p className="text-[15px] leading-7 text-[#9b3b3b]">{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 text-sm font-semibold text-[#1256af]"
        >
          Try again
        </button>
      </div>
    );
  }

  if (totalCourses === 0) {
    return (
      <div className={`${card} px-6 py-7 sm:px-8`}>
        <p className="text-lg font-semibold tracking-[-0.02em] text-[#121826]">
          No courses yet
        </p>
        <p className="mt-2 max-w-[560px] text-[15px] leading-7 text-[#5c6b80]">
          When an instructor assigns a course to one of your batches, it will
          appear here.
        </p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className={`${card} px-6 py-7 sm:px-8`}>
        <p className="text-lg font-semibold tracking-[-0.02em] text-[#121826]">
          No courses match that search.
        </p>
        <p className="mt-2 text-[15px] leading-7 text-[#5c6b80]">
          Nothing assigned to your batches matches &ldquo;{query.trim()}&rdquo;.
        </p>
      </div>
    );
  }

  return (
    <div className={`${card} divide-y divide-[#e8edf3]`}>
      {courses.map((course) => {
        const courseProgress = progress[course.courseId];
        const raw = courseProgress?.progressPercentage ?? 0;
        const percentage = Number.isFinite(raw)
          ? Math.min(100, Math.max(0, raw))
          : 0;
        const rounded = Math.round(percentage);

        return (
          <article key={course.courseId} className="px-6 py-6 sm:px-8 sm:py-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h3 className="text-[17px] font-semibold leading-6 tracking-[-0.02em] text-[#121826] [overflow-wrap:anywhere]">
                  {course.title}
                </h3>
                {course.description ? (
                  <p className="mt-1.5 max-w-[640px] text-[14px] leading-6 text-[#667085] [overflow-wrap:anywhere]">
                    {course.description}
                  </p>
                ) : null}
              </div>
              <p className="shrink-0 text-sm font-semibold text-[#121826]">
                {rounded}%
              </p>
            </div>

            <div
              className="mt-4 h-[3px] overflow-hidden rounded-full bg-[#e7edf4]"
              role="progressbar"
              aria-label={`${course.title} progress`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={rounded}
            >
              <div
                className="h-full rounded-full bg-[#1256af]"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[13px] text-[#8b93a3]">
                {courseProgress
                  ? `${courseProgress.completedLessons} of ${courseProgress.totalLessons} lessons`
                  : "Progress updates as you finish lessons"}
              </p>
              <Link
                href={`/student/courses/${course.courseId}`}
                className="text-sm font-semibold text-[#1256af]"
              >
                Continue course
                <span aria-hidden="true"> →</span>
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
