import { signals } from "./content";
import { SectionLabel } from "./SectionLabel";
import { cn } from "./utils";

const fills = {
  green: "bg-[#00c97a]",
  blue: "bg-[#7aa2e3]",
  accent: "bg-[#ff6b35]",
};

export function Readiness() {
  return (
    <section className="bg-[#173b63] py-16 text-white sm:py-20 lg:py-24" aria-labelledby="ready-title">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <div className="[&_p]:!text-white/60">
            <SectionLabel index="05" label="How you'll know you're ready" tone="dark" />
          </div>
          <h2 id="ready-title" className="mt-5 text-3xl font-extrabold tracking-tight !text-white sm:text-4xl lg:text-5xl lg:leading-[1.1]">
            No guessing. You&apos;ll have evidence.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 !text-white/75 sm:text-base">
            Marks tell you what you remembered on one day. We track what you can actually do — and every signal
            links back to real work you can show a recruiter.
          </p>
          <ul className="mt-6 space-y-3 text-sm leading-6">
            {[
              "Problems solved under timed, interview-like conditions",
              "Projects reviewed by mentors and pushed to GitHub",
              "Mock interviews with written feedback you can act on",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 size-2 shrink-0 rounded-full bg-[#00c97a]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#1f4a78] p-5 sm:p-6 text-white">
          <div className="flex items-start justify-between gap-3">
            <p className="text-base font-bold !text-white">Readiness profile</p>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">Sample learner</span>
          </div>
          <ul className="mt-6 space-y-4">
            {signals.map((signal) => (
              <li key={signal.label}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-semibold text-white">{signal.label}</span>
                  <span className="text-xs !text-white/60">{signal.note}</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15">
                  <div
                    className={cn("h-full rounded-full", fills[signal.tone])}
                    style={{ width: `${signal.width}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
