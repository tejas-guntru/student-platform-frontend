"use client";

import {
  Lightbulb,
  Shield,
  GraduationCap,
  Users,
  Target,
  ArrowRight,
} from "lucide-react";

export default function OurMission() {
  return (
    <section className="mt-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Core Values Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Core Values
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Two principles that drive everything we do
          </p>
        </div>

        {/* Core Values Visual Section */}
        <div className="relative mb-16">
          {/* Values Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start relative">
            {/* Vertical Divider Line */}
            <div className="absolute left-1/2 top-8 bottom-8 w-0.5 bg-gradient-to-b from-transparent via-gray-200 to-transparent transform -translate-x-1/2 hidden lg:block"></div>

            {/* Curiosity Side */}
            <div className="text-center relative">
              <div className="inline-block relative mb-6">
                {/* Large Icon Background */}
                <div className="w-28 h-28 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mx-auto shadow-lg border-2 border-blue-200">
                  <Lightbulb className="w-14 h-14 text-[#093697]" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Curiosity
              </h3>
              <p className="text-base text-gray-600 mb-6 max-w-sm mx-auto leading-relaxed">
                We believe in the power of asking{" "}
                <span className="text-[#093697] font-bold">"why"</span> and{" "}
                <span className="text-[#093697] font-bold">"what if"</span> -
                driving innovation through endless exploration.
              </p>

              {/* Key Points - Enhanced with Gray Background */}
              <div className="bg-gray-100 rounded-xl p-6 max-w-sm mx-auto">
                <h4 className="text-sm font-bold  text-[#093697] mb-4 uppercase tracking-wide">
                  What This Means
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#093697] rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-left">
                      <span className="text-sm font-medium text-gray-800 block">
                        Lifelong Learning
                      </span>
                      <span className="text-xs text-gray-600">
                        Never stop growing
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#093697] rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-left">
                      <span className="text-sm font-medium text-gray-800 block">
                        Innovative Thinking
                      </span>
                      <span className="text-xs text-gray-600">
                        Creative problem solving
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#093697] rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-left">
                      <span className="text-sm font-medium text-gray-800 block">
                        Future-Ready Skills
                      </span>
                      <span className="text-xs text-gray-600">
                        Prepare for tomorrow
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Courage Side */}
            <div className="text-center relative">
              <div className="inline-block relative mb-6">
                {/* Large Icon Background */}
                <div className="w-28 h-28 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mx-auto shadow-lg border-2 border-blue-200">
                  <Shield className="w-14 h-14 text-[#093697]" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Courage</h3>
              <p className="text-base text-gray-600 mb-6 max-w-sm mx-auto leading-relaxed">
                We empower bold decisions and brave steps -{" "}
                <span className="font-bold text-[#093697]">
                  {" "}
                  transforming students
                </span>{" "}
                dreams into successful careers.
              </p>

              {/* Key Points - Enhanced with Gray Background */}
              <div className="bg-gray-100 rounded-xl p-6 max-w-sm mx-auto">
                <h4 className="text-sm font-bold  text-[#093697] mb-4 uppercase tracking-wide">
                  What This Means
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#093697] rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-left">
                      <span className="text-sm font-medium text-gray-800 block">
                        Bold Career Moves
                      </span>
                      <span className="text-xs text-gray-600">
                        Take calculated risks
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#093697] rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-left">
                      <span className="text-sm font-medium text-gray-800 block">
                        Risk & Growth
                      </span>
                      <span className="text-xs text-gray-600">
                        Embrace challenges
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#093697] rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-left">
                      <span className="text-sm font-medium text-gray-800 block">
                        Unwavering Support
                      </span>
                      <span className="text-xs text-gray-600">
                        You're never alone
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transition Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[#093697] to-purple-600 rounded-full blur-xl opacity-20"></div>
            <div className="relative bg-white px-8 py-4 rounded-full border-2 border-gray-100 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#093697] rounded-full"></div>
                <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Values in Action
                </span>
                <div className="w-3 h-3 bg-[#093697] rounded-full "></div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            How We Deliver on These Values
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Our <span className="font-semibold text-[#093697]">curiosity</span>{" "}
            and <span className="font-semibold text-[#093697]">courage</span>{" "}
            aren't just words—they're the foundation of concrete actions that
            transform lives through quality education and meaningful career
            opportunities.
          </p>
        </div>
      </div>

      {/* Mission Cards Section - Different Background */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Mission Cards */}
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {/* Quality Education Card */}
            <div className="bg-white rounded-xl p-5 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                Quality Education
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Provide industry-relevant, practical education that prepares
                students for real-world challenges and career success.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                  Modern curriculum design
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                  Hands-on learning approach
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                  Expert instructor guidance
                </li>
              </ul>
            </div>

            {/* Bridge the Gap Card */}
            <div className="bg-white rounded-xl p-5 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                Bridge the Gap
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Connect talented individuals with employment opportunities
                through strategic partnerships and dedicated career support.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3 flex-shrink-0"></div>
                  Industry partnerships
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3 flex-shrink-0"></div>
                  Direct job placements
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3 flex-shrink-0"></div>
                  Career mentorship programs
                </li>
              </ul>
            </div>

            {/* Continuous Innovation Card */}
            <div className="bg-white rounded-xl p-5 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <Lightbulb className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                Continuous Innovation
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Constantly evolve our methods and curriculum to adapt to
                changing industry needs and emerging career opportunities.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3 flex-shrink-0"></div>
                  Regular curriculum updates
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3 flex-shrink-0"></div>
                  Technology integration
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3 flex-shrink-0"></div>
                  Future-ready skills focus
                </li>
              </ul>
            </div>
          </div>

          {/* Compact Mission Statement Section */}
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-gray-100 text-center relative overflow-hidden max-w-4xl mx-auto">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#093697] via-blue-500 to-purple-600"></div>

            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl mb-4 border-2 border-gray-100">
              <Target className="w-8 h-8 text-[#093697]" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Our Commitment
            </h3>

            <p className="text-base text-gray-700 leading-relaxed mb-6 max-w-3xl mx-auto">
              "Built on{" "}
              <span className="font-semibold text-[#093697]">Curiosity</span>{" "}
              and <span className="font-semibold text-[#093697]">Courage</span>,
              we transform lives by bridging the gap between learning and career
              success. Every student deserves the opportunity to explore, grow,
              and boldly pursue their professional dreams."
            </p>

            <div className="inline-flex items-center bg-gradient-to-r from-[#093697] to-blue-600 px-6 py-2 rounded-full shadow-md">
              <p className="font-semibold text-white !text-white text-sm">
                — Team Trailbliz
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
