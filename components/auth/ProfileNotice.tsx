export default function ProfileNotice() {
  return (
    <div
      className="
        mt-6
        rounded-2xl
        border
        border-[#CFE5F6]
        bg-[#F4FAFF]/90
        px-5
        py-4
        shadow-[0_6px_20px_rgba(8,119,232,0.04)]
        backdrop-blur-md
      "
    >
      <div className="flex items-start gap-3">
        <div
          className="
            mt-0.5
            flex
            h-7
            w-7
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#E4F3FF]
            text-sm
            font-bold
            text-[#0877E8]
          "
        >
          i
        </div>

        <p
          className="
            text-xs
            leading-5
            text-[#647B91]
          "
        >
          After registration, you&apos;ll complete your college, degree,
          branch, graduation year and career preferences from your
          student profile.
        </p>
      </div>
    </div>
  );
}