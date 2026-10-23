import { cn } from "./utils";
import { week } from "./content";
import { SectionLabel } from "./SectionLabel";

const tagClass = {
  live: "bg-[#e7f1fc] text-[#1256af]",
  lab: "bg-[#fff1e8] text-[#ff6b35]",
  peer: "bg-[#e5f8ef] text-[#00c97a]",
};

export function RealWeek() {
  return (
    <section className="bg-[#f5f9ff] py-16 text-[#122a46] sm:py-20 lg:py-24" aria-labelledby="week-title">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-8">
        <SectionLabel index="04" label="A real week" />
        <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <h2
            id="week-title"
            className="max-w-3xl text-3xl font-extrabold tracking-tight text-[#122a46] sm:text-4xl lg:text-5xl lg:leading-[1.1]"
          >
            Here&apos;s what Monday to
            <br className="hidden lg:block" /> Saturday actually looks like.
          </h2>
          <ul className="flex flex-wrap gap-2 text-xs font-semibold">
            <li className="rounded-full bg-[#e7f1fc] px-3 py-1.5 text-[#1256af]">Live with trainer</li>
            <li className="rounded-full bg-[#fff1e8] px-3 py-1.5 text-[#ff6b35]">Hands-on lab</li>
            <li className="rounded-full bg-[#e5f8ef] px-3 py-1.5 text-[#00c97a]">With your peers</li>
          </ul>
        </div>
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {week.map((day) => (
            <li key={day.day} className="rounded-2xl border border-[#dce7f3] bg-white p-4 shadow-[0_10px_30px_rgb(23_59_99_/_0.08)]">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xl font-extrabold text-[#122a46]">{day.day}</p>
                <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", tagClass[day.tone])}>
                  {day.tag}
                </span>
              </div>
              <h3 className="mt-5 text-base font-bold text-[#122a46]">{day.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#4a607a]">{day.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-[#122a46]">
          <span className="font-bold">Sunday:</span> rest. Consistency beats cramming, so the schedule protects one
          day off.
        </p>
      </div>
    </section>
  );
}
