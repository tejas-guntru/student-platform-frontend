"use client";

import {
  BookOpen,
  Users,
  BarChart3,
  Lightbulb,
  Target,
  CheckCircle,
} from "lucide-react";

export default function EducationalApproach() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-5xl font-bold text-[#093697] mb-3">
            Trailbliz's Educational Approach
          </h2>
          <p className="text-lg sm:text-xsl text-gray-600 max-w-3xl mx-auto m-2">
            We combine cutting-edge technology with proven teaching
            methodologies to deliver an exceptional learning experience
          </p>
        </div>

        {/* Main Content - Flowing Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Left - Features Flow */}
          <div className="space-y-6">
            {/* Feature 1 */}
            <div className="flex items-start space-x-4 bg-white p-4 rounded-xl shadow-sm border-l-4 border-[#093697]">
              <div className="flex-shrink-0 w-12 h-12 bg-[#09369719] rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-[#093697]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Personalized Learning Paths
                </h3>
                <p className="text-sm text-gray-600">
                  Adaptive system creates customized paths based on individual
                  strengths and learning pace
                </p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="flex items-start space-x-4 bg-white p-4 rounded-xl shadow-sm border-l-4 border-purple-500">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Interactive Curriculum
                </h3>
                <p className="text-sm text-gray-600">
                  Engage with interactive lessons, simulations, and real-world
                  projects for practical learning
                </p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="flex items-start space-x-4 bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-500">
              <div className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Expert Instructors
                </h3>
                <p className="text-sm text-gray-600">
                  Learn from industry practitioners who bring real-world
                  experience to teaching
                </p>
              </div>
            </div>
            {/* Feature 4 */}
            <div className="flex items-start space-x-4 bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-500">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Progress Tracking
                </h3>
                <p className="text-sm text-gray-600">
                  Monitor your journey with detailed analytics and progress
                  reports
                </p>
              </div>
            </div>
          </div>

          {/* Right - Stats Visualization with extra metric */}
          <div className="relative">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#093697] to-purple-600"></div>
              <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 text-gray-900">
                Learner Success Metrics
              </h3>
              {/* Visual Stats */}
              <div className="space-y-6">
                {/* Completion Rate */}
                <div className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Course Completion
                    </span>
                    <span className="text-lg font-bold text-gray-900">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#093697] to-blue-500 h-2 rounded-full"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                </div>
                {/* Satisfaction Rate */}
                <div className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Student Satisfaction
                    </span>
                    <span className="text-lg font-bold  text-gray-900">
                      4.8/5
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                      style={{ width: "96%" }}
                    ></div>
                  </div>
                </div>
                {/* Employment Rate */}
                <div className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Employment Success
                    </span>
                    <span className="text-lg font-bold  text-gray-900">
                      94%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                      style={{ width: "94%" }}
                    ></div>
                  </div>
                </div>
                {/* Added Metric: Certifications Earned */}
                <div className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Certifications Earned
                    </span>
                    <span className="text-lg font-bold  text-gray-900">
                      9,800+
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Framework Process - Horizontal Flow */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#093697] to-purple-600"></div>
          <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-8">
            Our Learning Framework
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {/* Step 1 */}
            <div className="text-center relative">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#09369719] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-[#093697] border-opacity-20">
                <Target className="w-6 h-6 sm:w-7 sm:h-7 text-[#093697]" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">
                Assessment
              </h4>
              <p className="text-gray-600 text-xs sm:text-sm">
                Evaluate your current knowledge level
              </p>
              <div className="hidden md:block absolute top-8 -right-3 w-6 h-0.5 bg-[#093697] bg-opacity-30"></div>
            </div>
            {/* Step 2 */}
            <div className="text-center relative">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-green-300">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">
                Customization
              </h4>
              <p className="text-gray-600 text-xs sm:text-sm">
                Tailor learning paths to your goals
              </p>
              <div className="hidden md:block absolute top-8 -right-3 w-6 h-0.5 bg-green-400 bg-opacity-50"></div>
            </div>
            {/* Step 3 */}
            <div className="text-center relative">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-purple-300">
                <Lightbulb className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">
                Engagement
              </h4>
              <p className="text-gray-600 text-xs sm:text-sm">
                Interactive content and projects
              </p>
              <div className="hidden md:block absolute top-8 -right-3 w-6 h-0.5 bg-purple-400 bg-opacity-50"></div>
            </div>
            {/* Step 4 */}
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-orange-300">
                <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-orange-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">
                Mastery
              </h4>
              <p className="text-gray-600 text-xs sm:text-sm">
                Apply skills in real scenarios
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
