import AuthBackground from "@/components/auth/AuthBackground";
import AuthLogo from "@/components/auth/AuthLogo";
import RegisterForm from "@/components/auth/RegisterForm";
import ProfileNotice from "@/components/auth/ProfileNotice";

export default function RegisterPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F7F3] px-6 py-12">
      <AuthBackground />

      <div className="relative z-10 w-full max-w-md">
        <AuthLogo />

        <RegisterForm />

        <ProfileNotice />

        <div className="mt-7 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-[#D8D5CC]" />

          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#858994]">
            Begin your trail
          </span>

          <span className="h-px w-12 bg-[#D8D5CC]" />
        </div>
      </div>
    </main>
  );
}