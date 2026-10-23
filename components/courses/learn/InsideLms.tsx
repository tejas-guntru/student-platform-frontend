import type { ReactNode } from "react";
import { SectionLabel } from "./SectionLabel";
import { featureNotes } from "./content";

const nav = ["Today", "Skill map", "Playground", "Reviews", "Doubts", "Contests"];

const skills = [
  { name: "Arrays & strings", value: 92, bar: "bg-[#00c97a]" },
  { name: "SQL joins", value: 78, bar: "bg-[#00c97a]" },
  { name: "Recursion", value: 64, bar: "bg-[#1256af]" },
  { name: "REST APIs", value: 55, bar: "bg-[#1256af]" },
  { name: "System basics", value: 31, bar: "bg-[#ff6b35]" },
];

export function InsideLms() {
  return (
    <section className="bg-[#edf4fc] py-16 text-[#122a46] sm:py-20 lg:py-24" aria-labelledby="lms-title">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-8">
        <SectionLabel index="03" label="Inside the LMS" />
        <h2
          id="lms-title"
          className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight text-[#122a46] sm:text-4xl lg:text-5xl lg:leading-[1.1]"
        >
          Not a video library. A place where the work happens.
        </h2>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-[#4a607a] sm:text-base">
          When you log in, you don&apos;t scroll through a syllabus wondering where to start. You see one thing:
          what to do today, and why. Here&apos;s a learner&apos;s screen, numbered so you can follow along.
        </p>

        <div className="mt-10 overflow-hidden rounded-3xl border border-[#dce7f3] bg-white shadow-[0_18px_40px_rgb(23_59_99_/_0.12)]">
          <div className="flex items-center justify-between gap-3 border-b border-[#dce7f3] px-4 py-3 sm:px-5">
            <p className="flex items-center gap-2 text-sm font-bold text-[#122a46]">
              <Spark />
              <span className="tracking-wide">TRAILBLIZ</span>
              <span className="font-medium text-[#6b7f96]">Learn</span>
            </p>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#fff1e8] px-3 py-1 text-xs font-semibold text-[#ff6b35]">12-day streak</span>
              <span className="flex size-8 items-center justify-center rounded-full bg-[#1256af] text-xs font-bold text-white">
                AR
              </span>
            </div>
          </div>

          <div className="grid min-w-0 lg:grid-cols-[196px_1fr]">
            <nav aria-label="Learner sections" className="flex gap-1 overflow-x-auto border-b border-[#dce7f3] bg-[#f4f8fc] p-3 lg:flex-col lg:border-r lg:border-b-0">
              {nav.map((item, itemIndex) => (
                <span
                  key={item}
                  className={
                    itemIndex === 0
                      ? "inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#e7f1fc] px-3 text-sm font-semibold whitespace-nowrap text-[#1256af]"
                      : "inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium whitespace-nowrap text-[#4a607a]"
                  }
                >
                  <span
                    className={itemIndex === 0 ? "size-2 rounded-full bg-[#1256af]" : "size-2 rounded-full bg-[#c5d6e8]"}
                    aria-hidden="true"
                  />
                  {item}
                </span>
              ))}
            </nav>

            <div className="min-w-0 p-4 sm:p-6">
              <p className="text-xs text-[#6b7f96]">Full-Stack Development · Module 4 · APIs & Databases</p>
              <div className="mt-1 flex flex-wrap items-end justify-between gap-2">
                <h3 className="text-2xl font-extrabold tracking-tight text-[#122a46]">Good morning, Aarav.</h3>
                <p className="text-sm text-[#6b7f96]">Today&apos;s plan: about 2 hrs 10 min</p>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <Panel n="1">
                  <p className="text-xs font-bold tracking-widest text-[#6b7f96] uppercase">Today&apos;s mission</p>
                  <ul className="mt-4 space-y-3">
                    <li className="flex gap-3">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md bg-[#00c97a] text-white" aria-hidden="true">
                        <Check />
                      </span>
                      <span>
                        <span className="block text-sm text-[#6b7f96] line-through decoration-[#6b7f96]/70">
                          Watch: REST routing walkthrough
                        </span>
                        <span className="block text-xs text-[#6b7f96]">Trainer session · 18 min</span>
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-0.5 size-5 shrink-0 rounded-md border-2 border-[#1256af]" aria-hidden="true" />
                      <span>
                        <span className="block text-sm font-semibold text-[#122a46]">Build: /search endpoint with filters</span>
                        <span className="block text-xs font-medium text-[#1256af]">In progress · 4 of 5 tests passing</span>
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-0.5 size-5 shrink-0 rounded-md border-2 border-[#c5d6e8]" aria-hidden="true" />
                      <span>
                        <span className="block text-sm text-[#4a607a]">Break: fix 3 planted bugs in auth</span>
                        <span className="block text-xs text-[#6b7f96]">Debug lab · unlocks after build</span>
                      </span>
                    </li>
                  </ul>
                  <p className="mt-5 flex min-h-11 items-center justify-center rounded-xl bg-[#1256af] text-sm font-semibold text-white">
                    Continue building
                  </p>
                </Panel>

                <Panel n="2" dark>
                  <p className="font-mono text-xs text-[#9eb0c8]">routes/search.js</p>
                  <pre className="mt-3 overflow-x-auto font-mono text-xs leading-6 text-[#d7e4f4]">{`router.get('/search', async (req, res) => {
  const { branch, minCgpa } = req.query;
  const rows = await db.students
    .where({ branch })
    .andWhere('cgpa', '≥', minCgpa);
  res.json(rows);
});`}</pre>
                  <ul className="mt-4 space-y-1 border-t border-white/10 pt-3 font-mono text-xs">
                    <li className="text-[#00c97a]">✓ returns students by branch</li>
                    <li className="text-[#00c97a]">✓ filters by minimum CGPA</li>
                    <li className="text-[#ff6b35]">✗ handles missing minCgpa</li>
                  </ul>
                </Panel>

                <Panel n="3">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-xs font-bold tracking-widest text-[#6b7f96] uppercase">Skill map</p>
                    <p className="text-xs text-[#6b7f96]">Mastery from your attempts</p>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {skills.map((skill) => (
                      <li key={skill.name}>
                        <div className="flex justify-between text-sm font-semibold text-[#122a46]">
                          <span>{skill.name}</span>
                          <span className="text-xs font-medium text-[#6b7f96]">{skill.value}%</span>
                        </div>
                        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#edf4fc]">
                          <div className={`h-full rounded-full ${skill.bar}`} style={{ width: `${skill.value}%` }} />
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm font-medium text-[#ff6b35]">
                    Gap spotted: System basics → 2 short labs added to this week
                  </p>
                </Panel>

                <Panel n="4">
                  <p className="text-xs font-bold tracking-widest text-[#6b7f96] uppercase">Mentor code review</p>
                  <div className="mt-4 flex gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#00c97a] text-xs font-bold text-white">
                      MK
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[#122a46]">Mentor · on line 5 of search.js</p>
                      <p className="mt-1 text-sm leading-6 text-[#4a607a]">
                        Logic is right. But if minCgpa isn&apos;t sent, this compares against undefined. Default it, or
                        reject the request with a 400. Which would a real user prefer?
                      </p>
                      <div className="mt-3 flex gap-2 text-xs font-semibold">
                        <span className="rounded-lg bg-[#e7f1fc] px-3 py-1.5 text-[#1256af]">Reply</span>
                        <span className="rounded-lg bg-[#e5f8ef] px-3 py-1.5 text-[#00c97a]">Mark as fixed</span>
                      </div>
                    </div>
                  </div>
                </Panel>

                <Panel n="5">
                  <p className="text-xs font-bold tracking-widest text-[#6b7f96] uppercase">Doubt thread</p>
                  <div className="mt-4 space-y-2">
                    <p className="rounded-2xl bg-[#edf4fc] px-4 py-3 text-sm leading-6 text-[#122a46]">
                      Why does andWhere need the operator as a separate argument?
                    </p>
                    <p className="rounded-2xl bg-[#e7f1fc] px-4 py-3 text-sm leading-6 text-[#4a607a]">
                      <span className="font-bold text-[#1256af]">Trainer: </span>
                      So the query builder can escape the value safely. Try passing it as one string and see what the
                      SQL log shows you.
                    </p>
                  </div>
                  <p className="mt-3 text-xs text-[#6b7f96]">Linked to this exact line of your code</p>
                </Panel>

                <Panel n="6">
                  <div className="flex items-center gap-4">
                    <ReadinessRing />
                    <div>
                      <p className="text-xs font-bold tracking-widest text-[#6b7f96] uppercase">Placement readiness</p>
                      <p className="mt-2 text-sm leading-6 text-[#4a607a]">
                        Built from problems solved, reviews passed, projects shipped and mock interviews. Next unlock:
                        first mock interview.
                      </p>
                    </div>
                  </div>
                </Panel>
              </div>
            </div>
          </div>
        </div>

        <ol className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {featureNotes.map((note) => (
            <li key={note.number} className="flex gap-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#173b63] text-sm font-bold text-white">
                {note.number}
              </span>
              <div>
                <h3 className="text-base font-bold text-[#122a46]">{note.title}</h3>
                <p className="mt-1 text-sm leading-6 text-[#4a607a]">{note.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Panel({ n, dark = false, children }: { n: string; dark?: boolean; children: ReactNode }) {
  return (
    <article className={dark ? "relative rounded-2xl bg-[#0d2744] p-4 text-[#d7e4f4] sm:p-5" : "relative rounded-2xl border border-[#dce7f3] bg-white p-4 sm:p-5"}>
      <span className="absolute -top-3 -left-1 flex size-7 items-center justify-center rounded-full bg-[#ff6b35] text-xs font-bold text-white shadow-[0_10px_30px_rgb(23_59_99_/_0.08)] sm:-left-3">
        {n}
      </span>
      {children}
    </article>
  );
}

function Spark() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 text-[#ff6b35]" aria-hidden="true">
      <path d="M2 12 L6 8 L8.5 10.5 L14 3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
      <path d="M2 6.2 4.6 9 10 3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ReadinessRing() {
  const radius = 32;
  const circ = 2 * Math.PI * radius;
  const dash = circ * 0.68;
  return (
    <div className="relative size-24 shrink-0">
      <svg viewBox="0 0 80 80" className="size-24" aria-hidden="true">
        <circle cx="40" cy="40" r={radius} fill="none" className="text-[#edf4fc]" stroke="currentColor" strokeWidth="8" />
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          className="text-[#00c97a]"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          transform="rotate(-90 40 40)"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-lg font-extrabold text-[#122a46]">68%</span>
    </div>
  );
}
