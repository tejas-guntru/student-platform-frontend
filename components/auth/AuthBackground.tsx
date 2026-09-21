export default function AuthBackground() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1400 900"
      fill="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <path
        d="
          M-100 690
          C120 690 110 170 370 210
          C610 245 420 680 690 660
          C960 640 760 170 1050 205
          C1230 225 1240 390 1500 280
        "
        stroke="#E3E1DA"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="
          M-100 690
          C120 690 110 170 370 210
          C610 245 420 680 690 660
          C960 640 760 170 1050 205
          C1230 225 1240 390 1500 280
        "
        stroke="#C9A227"
        strokeWidth="2.5"
        strokeDasharray="5 16"
        strokeLinecap="round"
      />

      <circle
        cx="370"
        cy="210"
        r="6"
        fill="#C9A227"
      />

      <circle
        cx="1050"
        cy="205"
        r="6"
        fill="#C9A227"
      />
    </svg>
  );
}