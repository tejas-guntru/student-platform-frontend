export default function ProfileNotice() {
  return (
    <div className="mt-6 rounded-2xl border border-[#1256AF]/15 bg-[#1256AF]/5 px-5 py-4 shadow-[0_6px_20px_rgba(18,86,175,0.04)] backdrop-blur-md">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[#1256AF]/10 text-sm font-bold text-[#1256AF]">
          i
        </div>

        <p className="text-xs leading-5 text-gray-600">
          After registration, you&apos;ll complete your college, degree,
          branch, graduation year and career preferences from your student
          profile.
        </p>
      </div>
    </div>
  );
}