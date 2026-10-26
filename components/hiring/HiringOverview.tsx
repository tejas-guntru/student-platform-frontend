"use client";

import React from "react";
import {
  TrendingUp,
  Sparkles,
  Award,
  Building2,
  Globe,
  ArrowRight,
  Bell,
  Users,
  Target,
  Briefcase,
  CheckCircle,
} from "lucide-react";

interface HiringOverviewProps {
  setActiveTab: (tab: string) => void;
}

const primaryBtn =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#1256af] px-5 py-2.5 !text-sm !font-semibold text-white transition-colors hover:bg-[#0f4b99]";

const secondaryBtn =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg !border !border-solid !border-[#e1e6ee] bg-white px-5 py-2.5 !text-sm !font-semibold !text-[#3e4d63] transition-colors hover:bg-[#f7f9fc]";

const surface =
  "rounded-2xl border border-[#e4e9f0] bg-white shadow-[0_16px_40px_rgba(16,33,58,0.05)]";

const sectionTitle =
  "text-3xl font-extrabold tracking-tight text-[#122a46] sm:text-4xl lg:text-5xl lg:leading-[1.1]";

const lede =
  "text-[15px] leading-7 text-[#5c6b80] sm:text-base";

export default function HiringOverview({ setActiveTab }: HiringOverviewProps) {
  const features = [
    {
      icon: Target,
      title: "AI-Powered Matching",
      description:
        "Sophisticated algorithms analyze your profile to identify opportunities that align with your experience and career objectives",
    },
    {
      icon: Award,
      title: "Verified Companies",
      description:
        "Access positions from thoroughly vetted organizations known for their professional standards and growth opportunities",
    },
    {
      icon: Building2,
      title: "Career Development",
      description:
        "Comprehensive mentoring programs and skill development resources to advance your professional trajectory",
    },
    {
      icon: Globe,
      title: "Global Network",
      description:
        "Connect with leading companies worldwide offering remote and international career opportunities",
    },
  ];

  const successStories = [
    {
      name: "Sarah Chen",
      role: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      salary: "₹52 LPA",
      story:
        "Advanced from mid-level to senior position with 140% salary increase",
    },
    {
      name: "Rajesh Kumar",
      role: "Product Manager",
      company: "Innovation Corp",
      salary: "₹45 LPA",
      story:
        "Successfully transitioned from development to product management role",
    },
    {
      name: "Ananya Sharma",
      role: "Data Scientist",
      company: "Analytics Pro",
      salary: "₹48 LPA",
      story: "Secured ideal position through our intelligent matching system",
    },
  ];

  const benefits = [
    "Personalized job recommendations",
    "Direct communication with hiring managers",
    "Comprehensive interview preparation",
    "Professional salary negotiation guidance",
    "One-on-one career mentorship",
    "Industry insights and market analysis",
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero Section */}
      <section className={surface}>
        <div className="px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-6">
                {/* Professional Badge */}
                <div>
                  <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b93a3]">
                    <Sparkles className="h-3.5 w-3.5 text-[#1256af]" />
                    Trusted by 50,000+ professionals
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-2.5 block h-[2px] w-7 rounded-full bg-[#c4a265]"
                  />
                </div>

                {/* Main Heading */}
                <div className="space-y-4">
                  <h1 className="text-[1.95rem] font-bold leading-[1.05] tracking-[-0.04em] text-[#101828] min-[420px]:text-[2.2rem] sm:text-[2.55rem] lg:text-[2.75rem] xl:text-[2.9rem]">
                    <span className="block">Advance Your</span>
                    <span className="mt-1 block italic text-[#1256af]">
                      Professional Career
                    </span>
                  </h1>
                  <p className={`max-w-[460px] ${lede}`}>
                    Connect with industry-leading companies and discover
                    opportunities that match your expertise and career
                    aspirations.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                  <button
                    onClick={() => setActiveTab("apply")}
                    className={primaryBtn}
                  >
                    <Briefcase className="h-4 w-4" />
                    Start Application
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab("jobs")}
                    className={secondaryBtn}
                  >
                    <Bell className="h-4 w-4" />
                    Browse Positions
                  </button>
                </div>
              </div>

              {/* Stats Section */}
              <div className="rounded-2xl border border-[#eef1f5] bg-[#f8fafc] p-6">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#1256af] text-white">
                    <TrendingUp className="h-5 w-5" />
                  </span>
                  <h3 className="text-[17px] font-semibold leading-6 tracking-[-0.02em] text-[#121826]">
                    Platform Statistics
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Active Positions", value: "3,500+" },
                    { label: "Success Rate", value: "94%" },
                    { label: "Average Growth", value: "75%" },
                    { label: "Partner Companies", value: "650+" },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-[#e4e9f0] bg-white p-3 text-center"
                    >
                      <div className="mb-1 text-[17px] font-semibold leading-6 tracking-[-0.02em] text-[#121826]">
                        {stat.value}
                      </div>
                      <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#8b93a3]">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={surface}>
        <div className="px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <h2 className={sectionTitle}>
                Professional{" "}
                <span className="text-[#1256af]">Advantages</span>
              </h2>
              <p className={`mx-auto mt-4 max-w-2xl ${lede}`}>
                Our platform provides comprehensive tools and resources designed
                for serious professionals seeking career advancement.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-[#e4e9f0] bg-white p-5 transition-shadow hover:shadow-[0_10px_30px_rgb(23_59_99_/_0.08)] sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#1256af] text-white">
                      <feature.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-extrabold tracking-tight text-[#122a46]">
                        {feature.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-6 text-[#4a607a]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className={surface}>
        <div className="px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <h2 className={sectionTitle}>
                Professional{" "}
                <span className="text-[#1256af]">Success Stories</span>
              </h2>
              <p className={`mx-auto mt-4 max-w-2xl ${lede}`}>
                Read about professionals who have successfully advanced their
                careers through our comprehensive platform.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
              {successStories.map((person, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-[#e4e9f0] bg-[#f8fafc] p-5 sm:p-6"
                >
                  <div className="mb-4 text-center">
                    <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#e7f1fc]">
                      <Users className="h-5 w-5 text-[#1256af]" />
                    </div>
                    <h3 className="text-[17px] font-semibold leading-6 tracking-[-0.02em] text-[#121826]">
                      {person.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold !text-[#1256af]">
                      {person.role}
                    </p>
                    <p className="mt-0.5 text-sm leading-6 text-[#667085]">
                      {person.company}
                    </p>
                    <div className="mt-3 inline-block rounded-lg border border-[#e4e9f0] bg-white px-3 py-1 text-sm font-semibold text-[#121826]">
                      {person.salary}
                    </div>
                  </div>
                  <p className="text-center text-sm leading-6 text-[#4a607a]">
                    &ldquo;{person.story}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={surface}>
        <div className="px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div>
                <h2 className={sectionTitle}>
                  Comprehensive{" "}
                  <span className="text-[#1256af]">Career Support</span>
                </h2>
                <p className={`mt-4 ${lede}`}>
                  Access professional tools and resources designed to support
                  every aspect of your career development journey.
                </p>
                <div className="mt-6 space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 shrink-0 text-[#1256af]" />
                      <span className="text-sm leading-6 text-[#122a46]">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-[#eef1f5] bg-[#f8fafc] p-6 sm:p-7">
                <div className="text-center">
                  <span className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#1256af] text-white">
                    <Target className="h-5 w-5" />
                  </span>
                  <h3 className="text-xl font-extrabold tracking-tight text-[#122a46] sm:text-2xl">
                    Ready to Advance Your Career?
                  </h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#4a607a]">
                    Join our professional network and connect with opportunities
                    that match your expertise and career objectives.
                  </p>
                  <div className="mt-6 space-y-3">
                    <button
                      onClick={() => setActiveTab("apply")}
                      className={`${primaryBtn} w-full`}
                    >
                      <Briefcase className="h-4 w-4" />
                      Create Professional Profile
                    </button>
                    <button
                      onClick={() => setActiveTab("jobs")}
                      className={`${secondaryBtn} w-full`}
                    >
                      <Bell className="h-4 w-4" />
                      View Available Positions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
