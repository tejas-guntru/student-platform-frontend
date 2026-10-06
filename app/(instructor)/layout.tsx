import type {
  ReactNode,
} from "react";

import InstructorAuthGuard from "@/components/instructor/InstructorAuthGuard";
import InstructorFooter from "@/components/instructor/InstructorFooter";
import InstructorNavbar from "@/components/instructor/InstructorNavbar";

export default function InstructorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <InstructorAuthGuard>
      <div
        className="
          flex
          min-h-screen
          flex-col
          bg-slate-50
        "
      >
        <InstructorNavbar />

        <div className="flex-1">
          {children}
        </div>

        <InstructorFooter />
      </div>
    </InstructorAuthGuard>
  );
}
