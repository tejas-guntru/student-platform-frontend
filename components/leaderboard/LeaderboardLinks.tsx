import Link from "next/link";

export default function LeaderboardLinks() {
  return (
    <section className="mt-8 flex flex-wrap gap-3">
      <Link
        href="/coding-profiles"
        className="rounded-xl bg-[#C9A227] px-5 py-2.5 text-sm font-bold text-[#14213D] transition hover:bg-[#E0C766]"
      >
        Coding Profiles
      </Link>

      <Link
        href="/profile"
        className="rounded-xl border border-[#D8D5CC] bg-white px-5 py-2.5 text-sm font-bold text-[#14213D] transition hover:border-[#C9A227] hover:text-[#A98616]"
      >
        My Profile
      </Link>
    </section>
  );
}