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

          rounded-[22px]
          border
          border-white/25

          bg-white/[0.12]

          px-5
          py-3

          shadow-[0_12px_40px_rgba(0,45,110,0.16)]

          backdrop-blur-2xl
          backdrop-saturate-150

          sm:px-7
          lg:px-8
        "
      >
        {/* Top glass highlight */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-8
            right-8
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-white/60
            to-transparent
          "
        />

        {/* Logo */}
        <Link
          href="/"
          aria-label="Trailbliz home"
          className="
            relative
            flex
            h-[42px]
            w-[175px]
            shrink-0
            items-center
            justify-start
            overflow-hidden

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
            "
          />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          <Link
            href="#your-trail"
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

          <div className="mx-2 h-6 w-px bg-white/25" />

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

              bg-white

              px-5
              py-2.5

              text-sm
              font-semibold
              text-[#0877E8]

              shadow-[0_8px_24px_rgba(0,52,120,0.18)]

              transition-all
              duration-200

              hover:-translate-y-0.5
              hover:bg-[#F1FAFF]
              hover:shadow-[0_12px_30px_rgba(0,52,120,0.25)]
            "
          >
            Join Trailbliz

            <span
              className="
                transition-transform
                duration-200
                group-hover:translate-x-1
              "
            >
              →
            </span>
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-1 md:hidden">
          <Link
            href="/login"
            className="
              rounded-lg
              px-3
              py-2
              text-[13px]
              font-medium
              text-white/85
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

              bg-white

              px-4
              py-2

              text-[13px]
              font-semibold
              text-[#0877E8]

              shadow-[0_6px_18px_rgba(0,52,120,0.18)]
            "
          >
            Join
          </Link>
        </div>
      </nav>
    </header>
  );
}