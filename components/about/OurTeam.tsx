"use client";

import Image from "next/image";
import Link from "next/link";

export default function OurTeam() {
  const founder = {
    name: "Nethaji Pusapati",
    role: "Founder & Chief Executive Officer",
    company: "Nirudhyog",
    bio: [
      "While most people wait for perfect conditions to start, Nethaji Pusapati built Nirudhyog from scratch in February 2024 with just one belief — if students get the right guidance and opportunities at the right time, they can change their entire career story.",
      "A 21-year-old entrepreneur, career mentor, and ex-army aspirant turned startup founder, Nethaji leads everything at Nirudhyog — from college partnerships, training modules, student mentorship, to placement drives.",
      "He's not a suit-and-tie CEO sitting in an office. He's the guy who's in your college canteen, career seminars, training labs, and LinkedIn DMs making things happen.",
    ],
    image: "/ceo.jpeg",
    socials: {
      linkedin: "https://www.linkedin.com/in/nethaji-pusapati/",
    },
  };

  const metrics = [
    {
      value: "17,000+",
      label: "Students Trained",
      description: "Across offline and online programs",
    },
    {
      value: "13,600+",
      label: "Placements",
      description: "In leading companies",
    },
    {
      value: "20+",
      label: "Partner Colleges",
      description: "Across Telugu states",
    },
    {
      value: "80%",
      label: "Placement Rate",
      description: "Industry-leading success",
    },
  ];

  const leadership = [
    {
      icon: (
        <svg
          className="w-4 h-4 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "Hands-On Leadership",
      desc: "Direct engagement with students, colleges, and industry partners.",
    },
    {
      icon: (
        <svg
          className="w-4 h-4 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Results-Driven",
      desc: "Focus on measurable outcomes and student success.",
    },
    {
      icon: (
        <svg
          className="w-4 h-4 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
        </svg>
      ),
      title: "Scalable Systems",
      desc: "Building sustainable frameworks for long-term growth.",
    },
  ];

  return (
    <section className="relative bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white pointer-events-none -z-10"></div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div
            className="inline-block px-3 py-1 mb-4 text-sm font-medium text-white rounded-full shadow-sm"
            style={{ backgroundColor: "#093697" }}
          >
            Leadership
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            Executive Leadership
          </h1>
          <p className="text-2xs leading-8 text-gray-600">
            Driving transformational change in career development through
            innovative education partnerships
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Left Column - Profile and Leadership Philosophy (70%) */}
            <div className="lg:col-span-2 flex flex-col h-full">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col h-full">
                {/* Profile Header */}
                <div className="p-8 pb-4 flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                      <Image
                        src={founder.image}
                        alt={founder.name}
                        fill
                        className="object-cover rounded-xl shadow-md"
                        priority
                      />
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {founder.name}
                      </h2>
                      <p className="text-lg font-medium text-gray-700">
                        {founder.role}
                      </p>
                      <p className="text-base font-medium text-[#093697]">
                        {founder.company}
                      </p>
                    </div>

                    <div>
                      {founder.socials.linkedin && (
                        <Link
                          href={founder.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white !text-white rounded-lg shadow-sm hover:opacity-90 transition-opacity duration-200"
                          style={{ backgroundColor: "#093697" }}
                        >
                          <svg
                            className="w-4 h-4 mr-2 text-white !text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                          </svg>
                          <span className="text-white !text-white">Connect on LinkedIn</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bio Section */}
                <div className="px-8 pb-6 flex flex-col space-y-6 flex-grow overflow-auto bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-b-2xl">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Executive Summary
                    </h3>
                    <div className="text-gray-700 leading-relaxed text-base space-y-4">
                      {founder.bio.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  {/* Leadership Philosophy */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Leadership Philosophy
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {leadership.map((item, i) => (
                        <div
                          key={i}
                          className="flex flex-col items-center text-center p-4 rounded-lg bg-white shadow-sm border border-gray-100"
                        >
                          <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-[#093697] mb-3">
                            {item.icon}
                          </div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Metrics Only (30%) */}
            <div className="lg:col-span-1 flex flex-col h-full">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
                  Key Metrics
                </h3>
                <div className="grid grid-cols-1 gap-4 flex-grow">
                  {metrics.map((metric, index) => (
                    <div
                      key={index}
                      className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-gray-50 border border-gray-100"
                    >
                      <div
                        className="text-2xl font-bold mb-1"
                        style={{ color: "#093697" }}
                      >
                        {metric.value}
                      </div>
                      <div className="text-sm font-semibold text-gray-900 mb-1">
                        {metric.label}
                      </div>
                      <div className="text-xs text-gray-500">
                        {metric.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
