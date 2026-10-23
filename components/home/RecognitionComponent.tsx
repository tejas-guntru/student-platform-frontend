const recognitions = [
  {
    title: "Ministry Recognition",
    subtitle: "Government recognised",
    image: "/images/ministries/image1.jpg",
  },
  {
    title: "Startup India",
    subtitle: "DPIIT ecosystem",
    image: "/images/ministries/image2.jpg",
  },
  {
    title: "MSME",
    subtitle: "Registered enterprise",
    image: "/images/ministries/image3.jpg",
  },
];

export default function RecognitionComponent() {
  return (
    <section
      id="recognition"
      aria-labelledby="recognition-title"
      className="border-y border-slate-200 bg-slate-50 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Our recognitions
          </p>

          <h2
            id="recognition-title"
            className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            Recognised by institutions
            <span className="mt-1 block text-slate-500">
              shaping India&apos;s future.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600">
            Recognition across government and startup ecosystems supports
            our commitment to meaningful career outcomes for students.
          </p>
        </header>

        <ul className="mt-12 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-3">
          {recognitions.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div className="flex h-36 items-center justify-center px-4">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="max-h-28 max-w-full object-contain"
                />
              </div>

              <div className="mt-5 border-t border-slate-100 pt-5 text-center">
                <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {item.subtitle}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-sm text-slate-500">
          Building trust. Creating opportunities.
        </p>
      </div>
    </section>
  );
}