import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Braces,
  CheckCircle2,
  Code2,
  Database,
  Layers3,
  Play,
  Sparkles,
} from "lucide-react";

const learningPaths = [
  {
    title: "Programming Foundations",
    description:
      "Strengthen your programming fundamentals and problem-solving approach.",
    icon: Braces,
    lessons: "Foundation",
    href: "#",
  },
  {
    title: "Web Development",
    description:
      "Build modern web applications and understand frontend development.",
    icon: Layers3,
    lessons: "Development",
    href: "#",
  },
  {
    title: "Backend Development",
    description:
      "Learn APIs, server-side development and application architecture.",
    icon: Code2,
    lessons: "Development",
    href: "#",
  },
  {
    title: "Data & Databases",
    description:
      "Understand databases, data handling and the foundations of working with data.",
    icon: Database,
    lessons: "Data",
    href: "#",
  },
];

const journey = [
  {
    number: "01",
    title: "Choose what to learn",
    description:
      "Pick a learning path that supports the skills you want to develop.",
  },
  {
    number: "02",
    title: "Build consistently",
    description:
      "Work through concepts and strengthen your understanding over time.",
  },
  {
    number: "03",
    title: "Show your progress",
    description:
      "Connect what you learn with your skills, projects and Trailbliz profile.",
  },
];

export default function StudentCoursesPage() {
  return (
    <div className="bg-[#F7F9FC] text-slate-950">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_330px]">
            <div className="max-w-3xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1256AF]/[0.08] text-[#1256AF]">
                <BookOpen size={21} />
              </div>

              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.17em] text-[#1256AF]">
                Learning
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-[54px] lg:leading-[1.04]">
                Learn what moves
                <br />

                <span className="text-[#1256AF]">
                  you forward.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-[17px]">
                Build practical skills, strengthen your
                foundation and turn what you learn into
                visible progress across your Trailbliz
                profile.
              </p>
            </div>

            {/* SIDE MESSAGE */}

            <div className="rounded-[24px] border border-slate-200 bg-[#F8FAFC] p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#1256AF] shadow-sm ring-1 ring-slate-200">
                <Sparkles size={18} />
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                Learning matters
              </p>

              <h2 className="mt-2 text-lg font-bold tracking-tight text-slate-900">
                Learn. Build. Show.
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Learning becomes more valuable when
                it turns into skills, projects and
                visible progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          LEARNING PATHS
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="max-w-2xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#1256AF]">
            Explore
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-slate-950 sm:text-3xl">
            Choose your learning path.
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Start with the area you want to strengthen
            and keep building from there.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {learningPaths.map((course) => {
            const Icon = course.icon;

            return (
              <div
                key={course.title}
                className="group flex min-h-[260px] flex-col rounded-[24px] border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#1256AF]/20 hover:shadow-[0_18px_50px_rgba(15,23,42,0.07)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1256AF]/[0.07] text-[#1256AF]">
                    <Icon size={19} />
                  </div>

                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">
                    {course.lessons}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-bold tracking-[-0.02em] text-slate-900">
                  {course.title}
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                  {course.description}
                </p>

                <div className="mt-auto pt-6">
                  {course.href === "#" ? (
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400">
                      <Play size={14} />

                      Coming soon
                    </div>
                  ) : (
                    <Link
                      href={course.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#1256AF]"
                    >
                      Start learning

                      <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          LEARNING JOURNEY
      ===================================================== */}

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#1256AF]">
                Your learning journey
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-[-0.035em] text-slate-950 sm:text-3xl">
                Progress happens one step at a time.
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Trailbliz connects learning with the
                professional profile you are building.
              </p>
            </div>

            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {journey.map((item) => (
                <div
                  key={item.number}
                  className="grid gap-4 py-6 sm:grid-cols-[60px_1fr]"
                >
                  <span className="text-sm font-bold text-[#1256AF]">
                    {item.number}
                  </span>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROFILE CONNECTION
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="overflow-hidden rounded-[28px] bg-[#0F2744] px-6 py-8 text-white sm:px-8 sm:py-10 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-[#8CC8FF]">
              <CheckCircle2 size={16} />

              <span className="text-[10px] font-bold uppercase tracking-[0.16em]">
                Your progress
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
              Learning is one part of your story.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
              Keep your skills, projects, experience
              and coding profiles updated alongside
              everything you learn.
            </p>
          </div>

          <div className="mt-6 lg:mt-0">
            <Link
              href="/profile"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-[#0F2744] transition hover:bg-slate-100"
            >
              View your profile

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}