export default function ProfilePageBackground() {
  return (
    <>
      <div className="pointer-events-none absolute -left-48 top-40 h-[420px] w-[420px] rounded-full bg-[#C9A227]/5 blur-3xl" />

      <div className="pointer-events-none absolute -right-48 top-[600px] h-[500px] w-[500px] rounded-full bg-[#14213D]/5 blur-3xl" />

      <svg
        aria-hidden="true"
        viewBox="0 0 1400 900"
        fill="none"
        className="pointer-events-none absolute left-0 top-0 h-[700px] w-full opacity-60"
      >
        <path
          d="
            M-100 620
            C180 620 120 180 390 220
            C650 260 500 650 760 620
            C1010 590 820 160 1110 210
            C1260 235 1310 360 1500 270
          "
          stroke="#E3E1DA"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="
            M-100 620
            C180 620 120 180 390 220
            C650 260 500 650 760 620
            C1010 590 820 160 1110 210
            C1260 235 1310 360 1500 270
          "
          stroke="#C9A227"
          strokeWidth="2"
          strokeDasharray="5 17"
          strokeLinecap="round"
        />
      </svg>
    </>
  );
}