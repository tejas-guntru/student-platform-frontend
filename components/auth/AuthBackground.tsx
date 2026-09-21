export default function AuthBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* =====================================================
          BASE BLUE-WHITE GRADIENT
      ===================================================== */}

      <div
        className="
          absolute inset-0
          bg-[linear-gradient(135deg,#E8F5FF_0%,#F8FCFF_42%,#EEF8FF_68%,#DDF2FF_100%)]
        "
      />

      {/* =====================================================
          LARGE AURORA GLOWS
      ===================================================== */}

      <div
        className="
          absolute
          -left-[180px]
          -top-[180px]
          h-[520px]
          w-[520px]
          rounded-full
          bg-[#4DBBFF]/30
          blur-[130px]

          sm:h-[650px]
          sm:w-[650px]
        "
      />

      <div
        className="
          absolute
          -right-[180px]
          top-[5%]
          h-[520px]
          w-[520px]
          rounded-full
          bg-[#70D6FF]/35
          blur-[140px]

          sm:h-[700px]
          sm:w-[700px]
        "
      />

      <div
        className="
          absolute
          -bottom-[240px]
          left-[20%]
          h-[620px]
          w-[620px]
          rounded-full
          bg-[#1689F5]/15
          blur-[150px]
        "
      />

      {/* =====================================================
          CENTER WHITE LIGHT
      ===================================================== */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[680px]
          w-[680px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/70
          blur-[120px]
        "
      />

      {/* =====================================================
          DIAGONAL LIGHT BEAM
      ===================================================== */}

      <div
        className="
          absolute
          -right-[15%]
          top-[20%]
          h-[180px]
          w-[900px]
          rotate-[-20deg]

          bg-gradient-to-r
          from-transparent
          via-white/45
          to-transparent

          blur-3xl
        "
      />

      {/* =====================================================
          SUBTLE GRID
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.32]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(8,119,232,0.045) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(8,119,232,0.045) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "52px 52px",
        }}
      />

      {/* =====================================================
          DOT PATTERN
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.22]
        "
        style={{
          backgroundImage:
            "radial-gradient(rgba(8,119,232,0.16) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* =====================================================
          MAIN SVG ARTWORK
      ===================================================== */}

      <svg
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          {/* Main trail gradient */}

          <linearGradient
            id="authTrailGradient"
            x1="0"
            y1="0"
            x2="1440"
            y2="900"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0"
              stopColor="#0877E8"
              stopOpacity="0.08"
            />

            <stop
              offset="0.42"
              stopColor="#1689F5"
              stopOpacity="0.42"
            />

            <stop
              offset="0.7"
              stopColor="#38BDF8"
              stopOpacity="0.34"
            />

            <stop
              offset="1"
              stopColor="#7DD3FC"
              stopOpacity="0.05"
            />
          </linearGradient>

          {/* Cyan trail gradient */}

          <linearGradient
            id="authTrailBright"
            x1="100"
            y1="700"
            x2="1350"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor="#1689F5"
              stopOpacity="0.15"
            />

            <stop
              offset="0.45"
              stopColor="#1294F2"
              stopOpacity="0.75"
            />

            <stop
              offset="1"
              stopColor="#52D2FF"
              stopOpacity="0.3"
            />
          </linearGradient>

          {/* Background orb gradients */}

          <radialGradient id="orbOne">
            <stop
              offset="0"
              stopColor="#FFFFFF"
              stopOpacity="0.72"
            />

            <stop
              offset="0.45"
              stopColor="#BDE8FF"
              stopOpacity="0.22"
            />

            <stop
              offset="1"
              stopColor="#1689F5"
              stopOpacity="0"
            />
          </radialGradient>

          <radialGradient id="orbTwo">
            <stop
              offset="0"
              stopColor="#FFFFFF"
              stopOpacity="0.7"
            />

            <stop
              offset="0.5"
              stopColor="#8FDBFF"
              stopOpacity="0.2"
            />

            <stop
              offset="1"
              stopColor="#0877E8"
              stopOpacity="0"
            />
          </radialGradient>

          {/* Glow filter */}

          <filter
            id="blueGlow"
            x="-200%"
            y="-200%"
            width="400%"
            height="400%"
          >
            <feGaussianBlur
              stdDeviation="12"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ===================================================
            LARGE BACKGROUND ORBS
        =================================================== */}

        <circle
          cx="160"
          cy="190"
          r="210"
          fill="url(#orbOne)"
        />

        <circle
          cx="1290"
          cy="680"
          r="250"
          fill="url(#orbTwo)"
        />

        {/* ===================================================
            VERY SOFT CURVED TRAIL
        =================================================== */}

        <path
          d="
            M-120 720
            C120 650 140 280 410 300
            C690 320 460 730 760 650
            C1030 580 850 180 1120 210
            C1280 230 1330 350 1540 250
          "
          stroke="url(#authTrailGradient)"
          strokeWidth="18"
          strokeLinecap="round"
          opacity="0.14"
        />

        {/* ===================================================
            SHARP MAIN TRAIL
        =================================================== */}

        <path
          d="
            M-120 720
            C120 650 140 280 410 300
            C690 320 460 730 760 650
            C1030 580 850 180 1120 210
            C1280 230 1330 350 1540 250
          "
          stroke="url(#authTrailBright)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="8 18"
          opacity="0.5"
        />

        {/* ===================================================
            SECONDARY FLOATING CURVE
        =================================================== */}

        <path
          d="
            M80 170
            C270 70 420 110 570 190
            C760 290 830 120 1040 110
            C1190 100 1270 145 1400 80
          "
          stroke="#38BDF8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="3 18"
          opacity="0.14"
        />

        {/* ===================================================
            GLOWING NODES
        =================================================== */}

        <circle
          cx="410"
          cy="300"
          r="28"
          fill="#38BDF8"
          opacity="0.06"
        />

        <circle
          cx="410"
          cy="300"
          r="6"
          fill="#1689F5"
          opacity="0.8"
          filter="url(#blueGlow)"
        />

        <circle
          cx="760"
          cy="650"
          r="24"
          fill="#38BDF8"
          opacity="0.06"
        />

        <circle
          cx="760"
          cy="650"
          r="5"
          fill="#38BDF8"
          opacity="0.7"
          filter="url(#blueGlow)"
        />

        <circle
          cx="1120"
          cy="210"
          r="28"
          fill="#38BDF8"
          opacity="0.06"
        />

        <circle
          cx="1120"
          cy="210"
          r="6"
          fill="#38BDF8"
          opacity="0.72"
          filter="url(#blueGlow)"
        />

        {/* ===================================================
            SMALL AMBIENT DOTS
        =================================================== */}

        <circle
          cx="185"
          cy="520"
          r="3"
          fill="#1689F5"
          opacity="0.28"
        />

        <circle
          cx="330"
          cy="120"
          r="3"
          fill="#38BDF8"
          opacity="0.24"
        />

        <circle
          cx="1230"
          cy="470"
          r="3"
          fill="#1689F5"
          opacity="0.26"
        />

        <circle
          cx="1010"
          cy="760"
          r="3"
          fill="#38BDF8"
          opacity="0.22"
        />

        <circle
          cx="1320"
          cy="130"
          r="2.5"
          fill="#0877E8"
          opacity="0.22"
        />
      </svg>

      {/* =====================================================
          FLOATING GLASS ORB — LEFT
      ===================================================== */}

      <div
        className="
          absolute
          left-[7%]
          top-[25%]

          hidden
          h-16
          w-16

          rounded-[22px]

          border
          border-white/60

          bg-white/25

          shadow-[0_18px_50px_rgba(8,119,232,0.08)]

          backdrop-blur-xl

          lg:block
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-1/2

            h-5
            w-5

            -translate-x-1/2
            -translate-y-1/2

            rounded-full

            bg-[#1689F5]/25

            shadow-[0_0_24px_rgba(8,119,232,0.25)]
          "
        />
      </div>

      {/* =====================================================
          FLOATING GLASS ORB — RIGHT
      ===================================================== */}

      <div
        className="
          absolute
          bottom-[18%]
          right-[8%]

          hidden
          h-20
          w-20

          rotate-12

          rounded-[26px]

          border
          border-white/60

          bg-white/20

          shadow-[0_20px_60px_rgba(8,119,232,0.08)]

          backdrop-blur-xl

          lg:block
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-1/2

            h-7
            w-7

            -translate-x-1/2
            -translate-y-1/2

            rounded-xl

            border
            border-[#5EC9FF]/30

            bg-[#C9EDFF]/35
          "
        />
      </div>

      {/* =====================================================
          EDGE FADE
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_25%,rgba(245,250,255,0.20)_70%,rgba(235,247,255,0.50)_100%)]
        "
      />
    </div>
  );
}