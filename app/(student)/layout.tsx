import type {
  ReactNode,
} from "react";

import StudentAuthGuard from "@/components/student/StudentAuthGuard";
import StudentFooter from "@/components/student/StudentFooter";
import StudentNavbar from "@/components/student/StudentNavbar";

export default function StudentLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <StudentAuthGuard>
      <div className="flex min-h-screen flex-col bg-[#F7F9FC]">
        <StudentNavbar />

        <main className="flex-1">
          {children}
        </main>

        <StudentFooter />
      </div>
    </StudentAuthGuard>
  );
}