import Image from "next/image";
import Link from "next/link";

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600";

const features = [
  {
    number: "01",
    title: "A profile with substance.",
    description:
      "Bring your skills, projects, experience, and resume together. Show what you’ve learned and what you can build.",
  },
  {
    number: "02",
    title: "Progress you can see.",
    description:
      "Connect your coding profiles, explore the leaderboard, and keep your development in perspective.",
  },
  {
    number: "03",
    title: "A clearer next step.",
    description:
      "Explore internships and jobs, submit applications, and follow their status from one place.",
  },
];

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className={`h-4 w-4 ${className}`}
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#20201E]">
      <a
        href="#main"
        className="sr-only z-50 rounded-lg bg-white p-4 text-blue-700 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <header className="border-b border-[#E7E5DF]">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12"
        >
          <Link
  href="/"
  aria-label="Trailbliz home"
  className={`block shrink-0 ${focus}`}
>
  <Image
    src="/trailbliz.png"
    alt="Trailbliz"
    width={220}
    height={54}
    priority
    className="h-auto w-[180px] sm:w-[210px]"
  />
</Link>

          <div className="flex items-center gap-3 sm:gap-7">
            <Link
              href="#platform"
              className={`hidden rounded text-sm font-medium text-[#66665F] transition hover:text-black md:block ${focus}`}
            >
              The platform
            </Link>

            <Link
              href="/login"
              className={`rounded px-2 py-2 text-sm font-semibold ${focus}`}
            >
              Log in
            </Link>

            <Link
              href="/register"
              className={`hidden rounded-lg bg-[#20201E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#383833] sm:block ${focus}`}
            >
              Get started
            </Link>
          </div>
        </nav>
      </header>

      <main id="main">
        <section
          aria-labelledby="hero-title"
          className="mx-auto grid max-w-7xl items-center gap-14 px-6 pt-16 pb-20 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:gap-20 lg:px-12 lg:pt-28 lg:pb-28"
        >
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.16em] text-[#66665F] uppercase">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-[#888880]"
              />
              A place to move forward
            </p>

            <h1
              id="hero-title"
              className="mt-7 max-w-2xl text-5xl leading-[1.04] font-extrabold tracking-[-0.055em] sm:text-6xl lg:text-7xl"
            >
              Your potential.
              <br />
              Your next
              <br />
              <span className="text-[#2458D3]">possibility.</span>
            </h1>

            <p className="mt-7 max-w-md text-lg leading-8 text-[#66665F]">
              Build a profile that reflects your work. Track your
              coding progress. Find opportunities to take it further.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                href="/register"
                className={`inline-flex items-center gap-4 rounded-lg bg-[#2458D3] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#1D47AD] ${focus}`}
              >
                Create your profile
                <Arrow />
              </Link>

              <Link
                href="#platform"
                className={`inline-flex items-center gap-2 rounded-lg px-1 py-3 text-sm font-semibold text-[#44443F] transition hover:text-[#2458D3] ${focus}`}
              >
                Explore Trailbliz
                <Arrow className="rotate-45" />
              </Link>
            </div>

            <p className="mt-5 text-xs leading-6 text-[#74746C]">
              Free to register. Your next step starts with you.
            </p>
          </div>

          <aside
            aria-label="What you can build on Trailbliz"
            className="relative"
          >
            <div className="rounded-2xl border border-[#E4E2DC] bg-white p-6 shadow-[0_20px_60px_-35px_rgba(30,30,25,0.25)] sm:p-8">
              <div className="flex items-center justify-between border-b border-[#EEEDE8] pb-5">
                <span className="text-xs font-semibold tracking-[0.14em] text-[#74746C] uppercase">
                  The bigger picture
                </span>
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-[#2458D3]"
                />
              </div>

              <h2 className="mt-7 text-3xl leading-tight font-bold tracking-tight">
                A little more you.
                <br />
                <span className="text-[#85857C]">
                  A lot more possibility.
                </span>
              </h2>

              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E7E5DF] bg-[#FAF9F6] text-sm font-semibold"
                  >
                    01
                  </span>
                  <div>
                    <h3 className="text-sm font-bold">Your foundation</h3>
                    <p className="mt-1 text-sm leading-6 text-[#74746C]">
                      Skills, projects, experience, and resume.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E7E5DF] bg-[#FAF9F6] text-sm font-semibold"
                  >
                    02
                  </span>
                  <div>
                    <h3 className="text-sm font-bold">Your momentum</h3>
                    <p className="mt-1 text-sm leading-6 text-[#74746C]">
                      Coding profiles and leaderboard progress.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E7E5DF] bg-[#FAF9F6] text-sm font-semibold"
                  >
                    03
                  </span>
                  <div>
                    <h3 className="text-sm font-bold">Your next chapter</h3>
                    <p className="mt-1 text-sm leading-6 text-[#74746C]">
                      Internships, jobs, and application tracking.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4 rounded-xl bg-[#F3F5FA] px-4 py-4">
                <p className="text-xs font-medium text-[#535D73]">
                  Built around your student journey.
                </p>
                <Arrow className="shrink-0 text-[#2458D3]" />
              </div>
            </div>
          </aside>
        </section>

        <section
          aria-label="Platform features"
          className="border-y border-[#E7E5DF]"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-6 py-6 text-center text-xs font-medium text-[#74746C] sm:px-8 md:grid-cols-4 lg:px-12">
            <p>Student profiles</p>
            <p>Coding leaderboards</p>
            <p>Internships & jobs</p>
            <p>Application tracking</p>
          </div>
        </section>

        <section
          id="platform"
          aria-labelledby="platform-title"
          className="mx-auto max-w-7xl scroll-mt-8 px-6 py-20 sm:px-8 lg:px-12 lg:py-24"
        >
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-[#74746C] uppercase">
                Less scattered. More connected.
              </p>
              <h2
                id="platform-title"
                className="mt-4 text-3xl leading-tight font-bold tracking-tight sm:text-4xl"
              >
                Make room for what&apos;s next.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-[#74746C]">
              One place for the work you&apos;ve done and the
              opportunities you want to explore.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
            {features.map((feature) => (
              <article
                key={feature.number}
                className="border-t border-[#DCDAD3] pt-6"
              >
                <span className="font-mono text-xs text-[#74746C]">
                  / {feature.number}
                </span>
                <h3 className="mt-6 text-xl font-bold tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#66665F]">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="access-title"
          className="mx-auto max-w-7xl px-6 pb-20 sm:px-8 lg:px-12"
        >
          <div className="grid overflow-hidden rounded-2xl border border-[#E4E2DC] bg-white md:grid-cols-2">
            <div className="p-8 sm:p-10">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#74746C] uppercase">
                Start here
              </p>
              <h2
                id="access-title"
                className="mt-4 text-3xl font-bold tracking-tight"
              >
                Build your profile.
                <br />
                Make it your own.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-[#66665F]">
                Register, add your skills and projects, upload your
                resume, and explore the leaderboard. These features
                are free.
              </p>
              <Link
                href="/register"
                className={`mt-6 inline-flex items-center gap-3 rounded text-sm font-semibold text-[#2458D3] ${focus}`}
              >
                Start building
                <Arrow />
              </Link>
            </div>

            <div className="border-t border-[#E7E5DF] bg-[#F2F1ED] p-8 sm:p-10 md:border-t-0 md:border-l">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#74746C] uppercase">
                Go further
              </p>
              <h3 className="mt-4 text-3xl font-bold tracking-tight">
                Ready for
                <br />
                your next opportunity?
              </h3>
              <p className="mt-5 max-w-md text-sm leading-7 text-[#66665F]">
                An active membership unlocks full opportunity details,
                applications, and application tracking.
              </p>
              <p className="mt-5 text-xs leading-6 text-[#74746C]">
                Membership provides platform access. Hiring decisions
                remain with employers.
              </p>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="join-title"
          className="border-t border-[#E7E5DF]"
        >
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 sm:px-8 md:flex-row md:items-center lg:px-12">
            <div>
              <h2
                id="join-title"
                className="text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Start where you are.
              </h2>
              <p className="mt-3 text-base text-[#74746C]">
                Build toward where you want to be.
              </p>
            </div>
            <Link
              href="/register"
              className={`inline-flex shrink-0 items-center gap-4 rounded-lg bg-[#20201E] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#383833] ${focus}`}
            >
              Join Trailbliz
              <Arrow />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#E7E5DF]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <div>
            <p className="text-lg font-extrabold tracking-tight">
              trailbliz<span className="text-[#2458D3]">.</span>
            </p>
            <p className="mt-1 text-xs text-[#74746C]">
              Empowering students. Building futures.
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex gap-6 text-sm text-[#66665F]"
          >
            <Link
              href="/login"
              className={`rounded hover:text-[#2458D3] ${focus}`}
            >
              Log in
            </Link>
            <Link
              href="/register"
              className={`rounded hover:text-[#2458D3] ${focus}`}
            >
              Register
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}