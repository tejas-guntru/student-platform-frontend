import Link from "next/link";

export default function Navbar() {
  return (
    <header className="px-6 py-5 sm:px-8 lg:px-12">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          aria-label="Trailbliz home"
          className="flex items-center"
        >
          <img
            src="/trailbliz.png"
            alt="Trailbliz"
            className="block h-auto max-h-8 w-auto max-w-[150px] object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <Link
            href="#your-trail"
            className="text-sm font-semibold text-[#14213D] transition-colors duration-200 hover:text-[#C9A227]"
          >
            Platform
          </Link>

          <Link
            href="/login"
            className="text-sm font-semibold text-[#14213D] transition-colors duration-200 hover:text-[#C9A227]"
          >
            Log in
          </Link>

          <Link
            href="/register"
            className="rounded-full bg-[#C9A227] px-6 py-3 text-sm font-bold text-[#14213D] shadow-sm transition-all duration-200 hover:bg-[#E0C766] hover:shadow-md"
          >
            Get started
          </Link>

        </div>

        {/* Mobile CTA */}
        <Link
          href="/register"
          className="rounded-full bg-[#C9A227] px-5 py-2.5 text-sm font-bold text-[#14213D] transition-colors duration-200 hover:bg-[#E0C766] md:hidden"
        >
          Get started
        </Link>

      </nav>
    </header>
  );
}