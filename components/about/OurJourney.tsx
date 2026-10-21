"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function OurJourney() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const milestones = [
    {
      date: "February 2024",
      title: "Company Founded",
      description:
        "Established with a mission to bridge the gap between academic learning and industry demands through comprehensive skill development and career support programs.",
      metrics: "Founding Investment: ₹50L",
    },
    {
      date: "June 2024",
      title: "First Training Programs Launched",
      description:
        "Successfully launched comprehensive training programs in Full-Stack Web Development, AI/ML, and Placement Preparation with industry-aligned curriculum.",
      metrics: "Initial Cohort: 250 Students",
    },
    {
      date: "October 2024",
      title: "College Partnership Network",
      description:
        "Established strategic partnerships with 5 engineering colleges across Hyderabad, delivering technical workshops and career development sessions.",
      metrics: "Partner Institutions: 5 Colleges",
    },
    {
      date: "March 2025",
      title: "Market Leadership Position",
      description:
        "Achieved significant scale with 120+ college partnerships and 17,000+ students trained through workshops, bootcamps, and placement drives, with 13,600+ successful placements.",
      metrics: "Placement Rate: 94% Success",
    },
    {
      date: "June 2025",
      title: "National Expansion",
      description:
        "Executing nationwide growth strategy with expanded college partnerships, internship programs, and career services across major Indian cities.",
      metrics: "Expansion Target: 50+ Cities",
    },
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index") ?? "0");
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.3 },
    );

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const timelineContainer = section.querySelector(".timeline-container");
      if (!timelineContainer) return;

      const containerRect = timelineContainer.getBoundingClientRect();
      const containerTop = containerRect.top + window.scrollY;
      const containerHeight = containerRect.height;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      // Calculate progress through the timeline container specifically
      const startOffset = containerTop - windowHeight * 0.8;
      const endOffset = containerTop + containerHeight - windowHeight * 0.2;
      const progress = Math.max(
        0,
        Math.min(1, (scrollTop - startOffset) / (endOffset - startOffset)),
      );

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes subtle-float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-2px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-subtle-float {
          animation: subtle-float 3s ease-in-out infinite;
        }
      `}</style>
      <section
        ref={sectionRef}
        id="our-journey"
        className="relative pt-24 pb-12 bg-slate-50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-block">
              <span className="inline-flex items-center px-4 py-2 rounded-md bg-slate-900 text-white text-sm font-medium tracking-wide mb-6">
                COMPANY TIMELINE
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Our Journey
            </h2>
            <div className="w-16 h-px bg-slate-900 mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Milestones that define our growth and commitment to excellence in
              professional education.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative timeline-container">
            {/* Timeline line with scroll progress */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px md:transform md:-translate-x-0.5">
              {/* Background line */}
              <div className="w-full h-full bg-slate-300"></div>
              {/* Progress line */}
              <div
                className="absolute top-0 left-0 w-full bg-slate-900 transition-all duration-300 ease-out"
                style={{ height: `${scrollProgress * 100}%` }}
              ></div>
              {/* Moving cursor */}
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 transition-all duration-300 ease-out"
                style={{
                  top: `${Math.max(0, Math.min(96, scrollProgress * 100))}%`,
                  opacity: scrollProgress > 0 ? 1 : 0,
                }}
              >
                <div className="w-full h-full bg-slate-900 rounded-full shadow-lg border-2 border-white">
                  <div className="absolute inset-0 bg-slate-900 rounded-full animate-ping opacity-75"></div>
                </div>
              </div>
            </div>

            {/* Timeline items */}
            <div className="space-y-20">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  data-index={index}
                  ref={(el) => {
                    if (el && observerRef.current) {
                      observerRef.current.observe(el);
                    }
                  }}
                  className={`relative transition-all duration-700 ease-out ${
                    visibleItems.includes(index)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <div
                    className={`flex flex-col md:flex-row items-start ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Timeline marker */}
                    <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 z-10">
                      <div className="w-3 h-3 rounded-full bg-slate-900 border-4 border-white shadow-sm"></div>
                    </div>

                    {/* Date section */}
                    <div
                      className={`w-full md:w-1/2 mb-4 md:mb-0 pl-20 md:pl-0 ${
                        index % 2 === 0
                          ? "md:pr-12 md:text-right"
                          : "md:pl-12 md:text-left"
                      }`}
                    >
                      <span className="inline-block text-sm font-semibold text-slate-500 bg-white px-3 py-1 rounded border">
                        {milestone.date}
                      </span>
                    </div>

                    {/* Content section */}
                    <div
                      className={`w-full md:w-1/2 pl-20 md:pl-0 ${
                        index % 2 === 0 ? "md:pl-8" : "md:pr-8"
                      }`}
                    >
                      <div
                        className={`bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 ${
                          visibleItems.includes(index)
                            ? "animate-subtle-float"
                            : ""
                        }`}
                      >
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-slate-600 mb-4 leading-relaxed text-sm">
                          {milestone.description}
                        </p>

                        {/* Metrics */}
                        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg border-l-4 border-[#093697]">
                          <div className="flex-shrink-0">
                            <div className="w-5 h-5 bg-[#093697] rounded flex items-center justify-center">
                              <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                              </svg>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                              Key Metric
                            </p>
                            <p className="text-sm font-semibold text-slate-900">
                              {milestone.metrics}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Timeline Ending */}
          <div className="relative mt-16">
            {/* Extended timeline line ending */}
            <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-0.5 top-0 h-12 w-px bg-gradient-to-b from-slate-900 to-transparent"></div>

            {/* Future milestone placeholder */}
            <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 top-8 z-10">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#093697] to-blue-500 border-4 border-white shadow-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Future content */}
            <div className="pt-16 text-center">
              <div className="inline-flex items-center gap-2 bg-[#093697] px-6 py-3 rounded-full text-white text-sm font-semibold mb-4 shadow-lg">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                THE JOURNEY CONTINUES
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                What's Next?
              </h3>
              <p className="text-slate-600 max-w-lg mx-auto mb-8">
                Our story is still being written. Every student we empower,
                every partnership we forge, and every innovation we embrace adds
                a new chapter to our mission.
              </p>
            </div>
          </div>

          {/* Completely Redesigned Footer */}
        </div>
      </section>
    </>
  );
}
