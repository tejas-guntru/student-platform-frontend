export default function ProfileLoading() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F7F3] px-6 text-[#14213D]">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#C9A227]/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#14213D]/5 blur-3xl" />

      <div className="relative flex flex-col items-center">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#E3E1DA] border-t-[#C9A227]" />

        <p className="mt-4 text-sm font-medium text-[#6B707B]">
          Loading profile...
        </p>
      </div>
    </main>
  );
}