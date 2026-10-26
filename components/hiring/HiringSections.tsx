
"use client";

import { useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import HiringOverview from "./HiringOverview";
import ProSubscription from "./ProSubscription";

import HiringFooter from "./HiringFooter";

type SectionId = "overview" | "apply" | "jobs" | "pro";

const sectionIds: SectionId[] = [
  "overview",
  "apply",
  "jobs",
  "pro",
];

export default function HiringSections() {
  const searchParams = useSearchParams();

  const scrollToSection = useCallback((tab: string) => {
    const sectionId = sectionIds.includes(tab as SectionId)
      ? tab
      : "overview";

    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  useEffect(() => {
    const tab = searchParams.get("tab");

    if (!tab || !sectionIds.includes(tab as SectionId)) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      document.getElementById(tab)?.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-[#eef2f6] text-[#121826] [font-family:var(--font-geist-sans),Arial,Helvetica,sans-serif]">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-8 lg:px-10">
        {/* Overview */}
        <section
          id="overview"
          className="scroll-mt-24 pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36"
        >
          <HiringOverview setActiveTab={scrollToSection} />
        </section>




        {/* Pro Membership */}
        <section id="pro" className="scroll-mt-24">
          <div className="rounded-2xl border border-[#e4e9f0] bg-white shadow-[0_16px_40px_rgba(16,33,58,0.05)]">
            <ProSubscription />
          </div>
        </section>

        <HiringFooter onNavigate={scrollToSection} />
      </div>
    </main>
  );
}
