"use client";

import { Smartphone, BarChart3, Users, Zap, Globe, Shield } from "lucide-react";

export default function TechnologyPlatform() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Enterprise Learning Platform
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Professional technology infrastructure for corporate training and
            development
          </p>
        </div>

        {/* Unified Platform Container */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
          {/* Dashboard Section */}
          <div className="p-8 border-b border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Unified Learning Management System
              </h3>
              <p className="text-gray-600">
                Comprehensive dashboard for training administration and learner
                progress tracking
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Course Management */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-blue-700" />
                  </div>
                  <span className="font-medium text-gray-900">
                    Course Management
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded p-3">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-700">
                        Leadership Development
                      </span>
                      <span className="font-medium text-gray-900">
                        Complete
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-[#093697] h-1.5 rounded-full w-full"></div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-700">Compliance Training</span>
                      <span className="font-medium text-gray-900">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-[#093697] h-1.5 rounded-full"
                        style={{ width: "78%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-blue-700" />
                  </div>
                  <span className="font-medium text-gray-900">
                    Performance Metrics
                  </span>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    94%
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    Completion Rate
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <div className="text-xs text-gray-500 mb-1">
                      Department Average
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      Above Target by 12%
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Collaboration */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-700" />
                  </div>
                  <span className="font-medium text-gray-900">
                    Team Collaboration
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-900">
                        Team Members Active
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">
                      247 employees currently training
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      Discussion Forums
                    </div>
                    <div className="text-xs text-gray-600">
                      18 active training discussions
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Statistics Section */}
          <div className="p-8 border-b border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Platform Performance Metrics
              </h3>
              <p className="text-gray-600">
                Proven reliability and performance for enterprise deployments
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    99.9%
                  </div>
                  <div className="text-[#093697] font-medium">
                    System Uptime
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    1.2s
                  </div>
                  <div className="text-[#093697] font-medium">
                    Page Load Time
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    100+
                  </div>
                  <div className="text-[#093697] font-medium">
                    System Integrations
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    24/7
                  </div>
                  <div className="text-[#093697] font-medium">
                    Technical Support
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Capabilities Section */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Smartphone className="w-5 h-5 text-blue-700" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Multi-Device Access
                </h4>
                <p className="text-sm text-gray-600">
                  Full-featured mobile application with offline capability
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-5 h-5 text-green-700" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">
                  High Performance
                </h4>
                <p className="text-sm text-gray-600">
                  Optimized infrastructure for large-scale deployments
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-5 h-5 text-purple-700" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Enterprise Security
                </h4>
                <p className="text-sm text-gray-600">
                  Bank-grade encryption and compliance standards
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-5 h-5 text-orange-700" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Global Scale</h4>
                <p className="text-sm text-gray-600">
                  Multi-language support and regional data centers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
