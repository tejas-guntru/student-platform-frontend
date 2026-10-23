"use client";

import React from "react";
import {
  TrendingUp,
  Sparkles,
  Zap,
  Award,
  Building2,
  Globe,
  ArrowRight,
  Bell,
  Crown,
  Users,
  Target,
  Briefcase,
  CheckCircle,
} from "lucide-react";

interface HiringOverviewProps {
  setActiveTab: (tab: string) => void;
}

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
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                {/* Professional Badge */}
                <div className="inline-flex items-center gap-2 bg-blue-50 rounded px-3 py-1 border">
                  <Sparkles className="w-4 h-4" style={{ color: "#093697" }} />
                  <span className="text-sm font-medium text-gray-700">
                    Trusted by 50,000+ professionals
                  </span>
                </div>

                {/* Main Heading */}
                <div className="space-y-4">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                    Advance Your{" "}
                    <span style={{ color: "#093697" }}>
                      Professional Career
                    </span>
                  </h1>
                  <p className="text-lg text-gray-600">
                    Connect with industry-leading companies and discover
                    opportunities that match your expertise and career
                    aspirations.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab("apply")}
                    className="text-white px-6 py-3 rounded font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    style={{ backgroundColor: "#093697" }}
                  >
                    <Briefcase className="w-4 h-4" />
                    Start Application
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab("jobs")}
                    className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 px-6 py-3 rounded font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Bell className="w-4 h-4" />
                    Browse Positions
                  </button>
                </div>
              </div>

              {/* Stats Section */}
              <div className="bg-gray-50 rounded border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="p-2 rounded"
                    style={{ backgroundColor: "#093697" }}
                  >
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
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
                      className="text-center p-3 bg-white rounded border"
                    >
                      <div className="text-xl font-bold text-gray-900 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-gray-600 text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white rounded border border-gray-200 shadow-sm">
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                Professional{" "}
                <span style={{ color: "#093697" }}>Advantages</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our platform provides comprehensive tools and resources designed
                for serious professionals seeking career advancement.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-5 bg-white rounded border border-gray-200 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="p-2 rounded flex-shrink-0"
                      style={{ backgroundColor: "#093697" }}
                    >
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
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
      <section className="bg-white rounded border border-gray-200 shadow-sm">
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                Professional{" "}
                <span style={{ color: "#093697" }}>Success Stories</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Read about professionals who have successfully advanced their
                careers through our comprehensive platform.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {successStories.map((person, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded p-5 border border-gray-200"
                >
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-white rounded-full mx-auto mb-3 flex items-center justify-center">
                      <Users className="w-6 h-6" style={{ color: "#093697" }} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {person.name}
                    </h3>
                    <p
                      className="font-medium text-sm mb-1"
                      style={{ color: "#093697" }}
                    >
                      {person.role}
                    </p>
                    <p className="text-gray-600 text-sm mb-3">
                      {person.company}
                    </p>
                    <div className="inline-block px-3 py-1 bg-white text-gray-900 font-semibold text-sm rounded border">
                      {person.salary}
                    </div>
                  </div>
                  <p className="text-gray-600 text-center text-sm">
                    "{person.story}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white rounded border border-gray-200 shadow-sm">
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  Comprehensive{" "}
                  <span style={{ color: "#093697" }}>Career Support</span>
                </h2>
                <p className="text-gray-600 mb-6">
                  Access professional tools and resources designed to support
                  every aspect of your career development journey.
                </p>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle
                        className="w-5 h-5 flex-shrink-0"
                        style={{ color: "#093697" }}
                      />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 rounded p-6 border border-gray-200">
                <div className="text-center">
                  <div
                    className="w-12 h-12 rounded mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: "#093697" }}
                  >
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Ready to Advance Your Career?
                  </h3>
                  <p className="text-gray-600 mb-5 text-sm">
                    Join our professional network and connect with opportunities
                    that match your expertise and career objectives.
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={() => setActiveTab("apply")}
                      className="w-full text-white px-5 py-3 rounded font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-sm"
                      style={{ backgroundColor: "#093697" }}
                    >
                      <Briefcase className="w-4 h-4" />
                      Create Professional Profile
                    </button>
                    <button
                      onClick={() => setActiveTab("jobs")}
                      className="w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 px-5 py-3 rounded font-semibold transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Bell className="w-4 h-4" />
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
