import { proof, tracks } from "./content";
import { SectionLabel } from "./SectionLabel";
import { cn } from "./utils";

const tintClass = {
  blue: "bg-[#e7f1fc] text-[#1256af]",
  peach: "bg-[#fff1e8] text-[#ff6b35]",
  mint: "bg-[#e5f8ef] text-[#00c97a]",
};

const scale = [
  { value: "50,000+", label: "students have learned this way" },
  { value: "20+", label: "partner institutions run it on campus" },
  { value: "370+", label: "associated companies shape what we teach" },
];

export function Tracks() {
  return (
    <>
      <section className="bg-[#f5f9ff] py-16 text-[#122a46] sm:py-20 lg:py-24" aria-labelledby="tracks-title">
        <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-8">
          <SectionLabel index="06" label="Tracks" />
          <h2
            id="tracks-title"
            className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight text-[#122a46] sm:text-4xl lg:text-5xl"
          >
            Five tracks. One way of learning.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#4a607a] sm:text-base">
            Each track runs on the same loop and the same LMS. What changes is what you&apos;ll be able to do at the
            end, and what you&apos;ll have built to prove it.
          </p>
          <div className="mt-8 grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tracks.map((track) => (
              <article key={track.title} className="flex flex-col rounded-3xl border border-[#dce7f3] bg-white p-5 shadow-[0_10px_30px_rgb(23_59_99_/_0.08)] sm:p-6">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex size-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold",
                      tintClass[track.tint],
                    )}
                  >
                    {track.mark}
                  </span>
                  <h3 className="text-lg font-extrabold tracking-tight text-[#122a46]">{track.title}</h3>
                </div>
                <p className="mt-5 text-xs font-bold tracking-widest text-[#6b7f96] uppercase">By the end, you can</p>
                <p className="mt-2 text-sm leading-6 text-[#4a607a]">{track.can}</p>
                <div className="mt-5 border-t border-[#dce7f3] pt-4">
                  <p className="text-xs font-bold tracking-widest text-[#6b7f96] uppercase">What you&apos;ll build</p>
                  <ul className="mt-3 space-y-2 text-sm text-[#122a46]">
                    {track.build.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-[#1256af]" aria-hidden="true">
                          →
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
            <article className="flex flex-col rounded-3xl bg-[#1256af] p-5 text-white sm:p-6">
              <h3 className="text-2xl font-extrabold tracking-tight text-white">
                Finish a track, and you leave with more than a certificate.
              </h3>
              <ul className="mt-auto space-y-4 pt-10 text-sm leading-6 text-white/90">
                {proof.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
