"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BookOpen, Users, CheckCircle } from "lucide-react";

export default function AboutHeader() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const images = [
    "first.e4d1fbde.svg",
    "second.4fe17835.svg",
    "third.3e25901b.svg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 300);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="mt-18 bg-white w-full pt-18">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual Left */}
          <div className="order-2 lg:order-1 flex flex-col items-center">
            <div className="relative w-full">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-3 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="aspect-[4/3] relative mb-4 overflow-hidden rounded-xl bg-white p-1">
                  <div className="relative w-full h-full">
                    {images.map((image, idx) => (
                      <Image
                        key={idx}
                        src={`/images/learning/${image}`}
                        alt="Learning methodology"
                        width={500}
                        height={375}
                        className={`absolute inset-0 rounded-lg w-full h-full object-contain transition-all duration-700 ease-in-out ${
                          idx === currentImageIndex
                            ? `opacity-100 scale-100 ${isTransitioning ? "opacity-0 scale-95" : ""}`
                            : "opacity-0 scale-95"
                        }`}
                        style={{
                          transform:
                            idx === currentImageIndex && !isTransitioning
                              ? "translateY(0px)"
                              : idx === currentImageIndex && isTransitioning
                                ? "translateY(-10px)"
                                : "translateY(10px)",
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-center space-x-2 mb-3">
                  {images.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 rounded-full transition-all duration-500 ease-out ${
                        idx === currentImageIndex
                          ? "bg-[#093697] w-6"
                          : "bg-gray-300 w-2"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Proven Learning Framework
                  </h3>
                  <p className="text-sm text-gray-600">
                    Interactive • Project-Based • Industry-Focused
                  </p>
                </div>
              </div>
              {/* Visual Accents */}
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-[#093697] bg-opacity-10 rounded-2xl -z-10"></div>
              <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-[#093697] bg-opacity-5 rounded-xl -z-10"></div>
            </div>
          </div>

          {/* Content Right */}
          <div className="order-1 lg:order-2 flex flex-col items-start justify-center h-full">
            {/* Logo */}

            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
              Shaping the
              <span className="block text-[#093697]">Next Generation</span>
              <span className="block text-gray-600 text-3xl lg:text-4xl font-semibold mt-1">
                of Professionals
              </span>
            </h1>
            <div className="space-y-4 mb-8">
              <p className="text-lg text-gray-700 font-medium leading-relaxed">
                We don't just teach skills—we build careers. Through expert
                mentorship, hands-on projects, and industry partnerships, we
                ensure every graduate is job-ready.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Our comprehensive approach combines cutting-edge curriculum with
                personalized guidance, creating a direct pathway from learning
                to employment.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/courses"
                className="bg-[#093697] hover:bg-[#093697]/90 text-white !text-white px-7 py-3 rounded-xl font-semibold transition-colors duration-200 text-center"
              >
                <span className="text-white !text-white">Explore Courses</span>
              </Link>
              <Link
                href="#our-journey"
                className="border-2 border-[#093697] text-[#093697] hover:bg-[#093697] hover:text-white px-7 py-3 rounded-xl font-semibold transition-all duration-200 text-center"
              >
                Our Journey
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-[#093697] mb-3">
              Our Track Record
            </h2>
            <p className="text-lg text-gray-600">
              Results that speak for themselves
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                number: "17,000+",
                label: "Graduates Trained",
                description: "Skilled professionals launched",
              },
              {
                number: "13,600+",
                label: "Career Placements",
                description: "Direct job placements secured",
              },
              {
                number: "120+",
                label: "Hiring Partners",
                description: "Companies actively recruiting",
              },
              {
                number: "94%",
                label: "Placement Rate",
                description: "Within 6 months of graduation",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              >
                <div className="text-3xl font-extrabold text-gray-900  mb-2">
                  {stat.number}
                </div>
                <div className="text-base font-bold text-[#093697] mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Why Trailbliz Stands Apart
            </h2>
            <p className="text-lg text-[#093697] max-w-3xl mx-auto">
              We've reimagined professional education to deliver real-world
              results through our comprehensive approach to career development.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="text-left bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-300">
              <div className="inline-flex items-center text-[#093697]  justify-center w-12 h-12  bg-opacity-10 rounded-xl mb-3">
                <BookOpen className="w-9 h-9 " />
              </div>
              <h3 className="text-xl font-bold text-gray-900  mb-3">
                Industry-Driven Curriculum
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                Our courses are developed in partnership with leading companies,
                ensuring you learn the exact skills employers are seeking.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-[#093697] rounded-full mr-3 flex-shrink-0"></div>
                  Real company case studies
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-[#093697] rounded-full mr-3 flex-shrink-0"></div>
                  Latest industry tools & technologies
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-[#093697] rounded-full mr-3 flex-shrink-0"></div>
                  Regular curriculum updates
                </li>
              </ul>
            </div>
            <div className="text-left bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-300">
              <div className="inline-flex items-center justify-center w-12 h-12  bg-opacity-10 rounded-xl mb-3">
                <Users className="w-9 h-9 text-[#093697]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900  mb-3">
                Expert Mentorship Program
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                Learn from professionals who've built successful careers at top
                companies and are passionate about sharing their knowledge.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-[#093697] rounded-full mr-3 flex-shrink-0"></div>
                  One-on-one career guidance
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-[#093697] rounded-full mr-3 flex-shrink-0"></div>
                  Portfolio & resume reviews
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-[#093697] rounded-full mr-3 flex-shrink-0"></div>
                  Interview preparation
                </li>
              </ul>
            </div>
            <div className="text-left bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-300">
              <div className="inline-flex items-center justify-center w-12 h-12  bg-opacity-10 rounded-xl mb-3">
                <CheckCircle className="w-9 h-9 text-[#093697]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900  mb-3">
                Guaranteed Job Support
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                Our dedicated placement team works with you until you land your
                ideal role, with ongoing support throughout your career journey.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-[#093697] rounded-full mr-3 flex-shrink-0"></div>
                  Direct company introductions
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-[#093697] rounded-full mr-3 flex-shrink-0"></div>
                  Salary negotiation support
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-[#093697] rounded-full mr-3 flex-shrink-0"></div>
                  Lifetime career assistance
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-[#093697] py-6 w-[95%] mx-auto rounded-xl relative overflow-hidden">
        {/* Star Background */}
        <div className="absolute inset-0 opacity-70">
          {/* Small star shapes scattered across */}
          <div className="absolute top-4 left-8 text-white text-xs">✦</div>
          <div className="absolute top-12 left-20 text-white text-sm">★</div>
          <div className="absolute top-6 left-32 text-white text-xs">✦</div>
          <div className="absolute top-16 left-48 text-white text-sm">★</div>
          <div className="absolute top-8 left-64 text-white text-xs">✧</div>
          <div className="absolute top-20 left-80 text-white text-sm">✦</div>

          <div className="absolute top-4 right-8 text-white text-sm">★</div>
          <div className="absolute top-14 right-20 text-white text-xs">✧</div>
          <div className="absolute top-6 right-32 text-white text-sm">✦</div>
          <div className="absolute top-18 right-48 text-white text-xs">★</div>
          <div className="absolute top-10 right-64 text-white text-sm">✧</div>
          <div className="absolute top-22 right-80 text-white text-xs">✦</div>

          <div className="absolute bottom-4 left-12 text-white text-xs">★</div>
          <div className="absolute bottom-16 left-24 text-white text-sm">✧</div>
          <div className="absolute bottom-8 left-40 text-white text-xs">✦</div>
          <div className="absolute bottom-12 left-56 text-white text-sm">★</div>
          <div className="absolute bottom-20 left-72 text-white text-xs">✧</div>

          <div className="absolute bottom-6 right-12 text-white text-sm">✦</div>
          <div className="absolute bottom-18 right-28 text-white text-xs">
            ★
          </div>
          <div className="absolute bottom-10 right-44 text-white text-sm">
            ✧
          </div>
          <div className="absolute bottom-14 right-60 text-white text-xs">
            ✦
          </div>
          <div className="absolute bottom-22 right-76 text-white text-sm">
            ★
          </div>

          {/* Center area stars */}
          <div className="absolute top-10 left-1/4 text-white text-xs">✧</div>
          <div className="absolute top-24 left-1/3 text-white text-sm">★</div>
          <div className="absolute top-16 right-1/4 text-white text-xs">✦</div>
          <div className="absolute top-28 right-1/3 text-white text-sm">✧</div>
          <div className="absolute bottom-8 left-1/2 text-white text-xs">★</div>
          <div className="absolute bottom-20 right-1/2 text-white text-sm">
            ✦
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-2xl font-bold text-white mb-3">
            Your Professional Journey Starts Here
          </h2>
          <p className="text-base text-white/90 mb-6 leading-relaxed">
            Join the thousands of professionals who have transformed their
            careers with Trailbliz. Take the first step toward a successful
            future in technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses"
              className="border-2 border-white text-white hover:bg-white hover:text-[#093697] px-8 py-3 rounded-xl font-semibold transition-all duration-200 group"
            >
              <span className="text-white group-hover:text-[#093697] transition-colors duration-200">
                Start Learning Today
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
