export default function AuthBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Base background */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#EFF6FF_0%,#FFFFFF_42%,#F0F9FF_72%,#EAF4FF_100%)]" />

      {/* Ambient glow - top left */}
      <div className="absolute -left-[180px] -top-[180px] h-[520px] w-[520px] rounded-full bg-[#1256AF]/10 blur-[130px] sm:h-[650px] sm:w-[650px]" />

      {/* Ambient glow - right */}
      <div className="absolute -right-[180px] top-[5%] h-[520px] w-[520px] rounded-full bg-blue-300/20 blur-[140px] sm:h-[700px] sm:w-[700px]" />

      {/* Ambient glow - bottom */}
      <div className="absolute -bottom-[240px] left-[20%] h-[620px] w-[620px] rounded-full bg-[#1256AF]/10 blur-[150px]" />

      {/* Center light */}
      <div className="absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-[120px]" />

      {/* Soft diagonal light */}
      <div className="absolute -right-[15%] top-[20%] h-[180px] w-[900px] rotate-[-20deg] bg-gradient-to-r from-transparent via-white/50 to-transparent blur-3xl" />

      {/* Trail artwork */}
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient
            id="authTrail"
            x1="0"
            y1="900"
            x2="1440"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0"
              stopColor="#1256AF"
              stopOpacity="0.04"
            />

            <stop
              offset="0.45"
              stopColor="#1256AF"
              stopOpacity="0.35"
            />

            <stop
              offset="0.75"
              stopColor="#3B82F6"
              stopOpacity="0.24"
            />

            <stop
              offset="1"
              stopColor="#1256AF"
              stopOpacity="0.03"
            />
          </linearGradient>

          <filter
            id="authGlow"
            x="-200%"
            y="-200%"
            width="400%"
            height="400%"
          >
            <feGaussianBlur
              stdDeviation="10"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main trail */}
        <path
          d="
            M-120 720
            C120 650 140 280 410 300
            C690 320 460 730 760 650
            C1030 580 850 180 1120 210
            C1280 230 1330 350 1540 250
          "
          stroke="url(#authTrail)"
          strokeWidth="14"
          strokeLinecap="round"
          opacity="0.15"
        />

        {/* Sharp trail */}
        <path
          d="
            M-120 720
            C120 650 140 280 410 300
            C690 320 460 730 760 650
            C1030 580 850 180 1120 210
            C1280 230 1330 350 1540 250
          "
          stroke="#1256AF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="8 18"
          opacity="0.22"
        />

        {/* Trail nodes */}
        <circle
          cx="410"
          cy="300"
          r="5"
          fill="#1256AF"
          opacity="0.65"
          filter="url(#authGlow)"
        />

        <circle
          cx="760"
          cy="650"
          r="5"
          fill="#1256AF"
          opacity="0.55"
          filter="url(#authGlow)"
        />

        <circle
          cx="1120"
          cy="210"
          r="5"
          fill="#1256AF"
          opacity="0.6"
          filter="url(#authGlow)"
        />

        {/* Small ambient points */}
        <circle
          cx="185"
          cy="520"
          r="3"
          fill="#1256AF"
          opacity="0.18"
        />

        <circle
          cx="330"
          cy="120"
          r="3"
          fill="#3B82F6"
          opacity="0.16"
        />

        <circle
          cx="1230"
          cy="470"
          r="3"
          fill="#1256AF"
          opacity="0.16"
        />

        <circle
          cx="1010"
          cy="760"
          r="3"
          fill="#3B82F6"
          opacity="0.14"
        />
      </svg>

      {/* Floating glass shape */}
      <div className="absolute left-[7%] top-[25%] hidden h-16 w-16 rounded-[22px] border border-white/70 bg-white/30 shadow-[0_18px_50px_rgba(18,86,175,0.08)] backdrop-blur-xl lg:block">
        <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1256AF]/20 shadow-[0_0_24px_rgba(18,86,175,0.18)]" />
      </div>

      {/* Floating glass shape */}
      <div className="absolute bottom-[18%] right-[8%] hidden h-20 w-20 rotate-12 rounded-[26px] border border-white/70 bg-white/25 shadow-[0_20px_60px_rgba(18,86,175,0.08)] backdrop-blur-xl lg:block">
        <div className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[#1256AF]/15 bg-blue-100/40" />
      </div>

      {/* Edge fade */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(248,250,252,0.12)_70%,rgba(239,246,255,0.40)_100%)]" />
    </div>
  );
}