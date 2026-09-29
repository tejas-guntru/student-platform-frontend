import Image from "next/image";
import Link from "next/link";

const links = [
  {
    label: "Home",
    href: "/student",
  },
  {
    label: "Courses",
    href: "/student/courses",
  },
  {
    label: "Profile",
    href: "/profile",
  },
];

export default function StudentFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/student"
              aria-label="Trailbliz student home"
              className="inline-flex"
            >
              <Image
                src="/tbz.png"
                alt="Trailbliz"
                width={160}
                height={44}
                className="h-9 w-auto object-contain"
              />
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
              Build your skills. Show your progress.
              Move toward what comes next.
            </p>
          </div>

          <nav
            className="flex flex-wrap items-center gap-x-6 gap-y-3"
            aria-label="Student footer navigation"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-slate-500 transition hover:text-[#1256af]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Trailbliz. All rights reserved.
          </p>

          <p>
            Made with love.{" "}
            <Link
              href="/developers"
              className="font-medium text-slate-600 transition hover:text-[#1256af]"
            >
              Tejas Guntru
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}