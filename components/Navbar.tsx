import Link from "next/link";

export default function Navbar() {
  return (
    <header
      className="
        absolute
        left-0
        right-0
        top-0
        z-50
        px-4
        pt-4
        sm:px-6
        lg:px-8
      "
    >
      <nav
        aria-label="Main navigation"
        className="
          relative
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between

          overflow-hidden
          rounded-[22px]

          border
          border-white/20

          bg-[#075EB5]/45

          px-5
          py-3

          shadow-[0_12px_40px_rgba(0,35,90,0.14)]

          backdrop-blur-xl
          backdrop-saturate-150

          sm:px-7
          lg:px-8
        "
      >
        {/* Glass highlight */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-10
            right-10
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-white/45
            to-transparent
          "
        />

        {/* Soft inner glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[-70px]
            h-[120px]
            w-[65%]
            -translate-x-1/2
            rounded-full
            bg-white/[0.10]
            blur-[45px]
          "
        />

        {/* =========================
            LOGO
        ========================= */}

        <Link
          href="/"
          aria-label="Trailbliz home"
          className="
            relative
            z-10
            flex
            h-[42px]
            w-[175px]
            shrink-0
            items-center
            justify-start
            overflow-hidden

            transition-transform
            duration-300

            hover:scale-[1.02]

            sm:h-[46px]
            sm:w-[195px]

            lg:h-[48px]
            lg:w-[210px]
          "
        >
          <img
            src="/trailbliz-logo-v2.png"
            alt="Trailbliz"
            className="
              h-full
              w-auto
              object-contain
              drop-shadow-[0_3px_12px_rgba(0,0,0,0.12)]
            "
          />
        </Link>

        {/* =========================
            DESKTOP NAVIGATION
        ========================= */}

        <div className="relative z-10 hidden items-center gap-1 md:flex">
          <Link
            href="/about"
            className="
              rounded-xl
              px-4
              py-2.5

              text-sm
              font-medium
              text-white/85

              transition-all
              duration-200

              hover:bg-white/10
              hover:text-white
            "
          >
            Platform
          </Link>

          <Link
            href="/login"
            className="
              rounded-xl
              px-4
              py-2.5

              text-sm
              font-medium
              text-white/85

              transition-all
              duration-200

              hover:bg-white/10
              hover:text-white
            "
          >
            Log in
          </Link>

          {/* Divider */}
          <div className="mx-2 h-6 w-px bg-white/20" />

          {/* CTA */}
          <Link
            href="/register"
            className="
              group
              inline-flex
              min-h-11
              items-center
              justify-center
              gap-2.5

              rounded-xl

              border
              border-white/40

              bg-white

              px-5
              py-2.5

              text-sm
              font-semibold
              text-[#0877E8]

              shadow-[0_8px_24px_rgba(0,40,100,0.18)]

              transition-all
              duration-300

              hover:-translate-y-0.5
              hover:bg-[#F4FBFF]
              hover:shadow-[0_12px_32px_rgba(0,40,100,0.25)]
            "
          >
            Join Trailbliz

            <span
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              →
            </span>
          </Link>
        </div>

        {/* =========================
            MOBILE
        ========================= */}

        <div className="relative z-10 flex items-center gap-1 md:hidden">
          <Link
            href="/login"
            className="
              rounded-lg
              px-3
              py-2

              text-[13px]
              font-medium
              text-white/90

              transition-all
              duration-200

              hover:bg-white/10
              hover:text-white
            "
          >
            Log in
          </Link>

          <Link
            href="/register"
            className="
              inline-flex
              min-h-10
              items-center
              justify-center

              rounded-xl

              border
              border-white/40

              bg-white

              px-4
              py-2

              text-[13px]
              font-semibold
              text-[#0877E8]

              shadow-[0_6px_18px_rgba(0,40,100,0.18)]

              transition-all
              duration-200

              hover:-translate-y-0.5
              hover:bg-[#F4FBFF]
            "
          >
            Join
          </Link>
        </div>
      </nav>
    </header>
  );
}