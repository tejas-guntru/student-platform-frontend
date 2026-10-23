
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
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Overview */}
        <section
          id="overview"
          className="scroll-mt-24 pb-20 pt-24 md:pt-28"
        >
          <HiringOverview setActiveTab={scrollToSection} />
        </section>




        {/* Pro Membership */}
        <section id="pro" className="scroll-mt-24">
          <div className="rounded-lg border border-gray-200 bg-white shadow-md">
            <ProSubscription />
          </div>
        </section>

        <HiringFooter onNavigate={scrollToSection} />
      </div>
    </main>
  );
}
