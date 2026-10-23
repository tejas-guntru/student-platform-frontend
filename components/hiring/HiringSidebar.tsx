"use client";
import React from "react";
import { Users, Bell, Crown, Target } from "lucide-react";
export type TabId = "overview" | "apply" | "jobs" | "pro";
export interface HiringTabNavigationProps {
  activeTab: TabId;
  setActiveTab: React.Dispatch<React.SetStateAction<TabId>>;
}
export default function HiringTabNavigation({
  activeTab,
  setActiveTab,
}: HiringTabNavigationProps) {
  const tabs = [
    { id: "overview", label: "Overview", icon: Target },
    { id: "jobs", label: "Job Notifications", icon: Bell },
    { id: "apply", label: "Apply for Jobs", icon: Users },
    { id: "pro", label: "Pro Subscription", icon: Crown },
  ];

  return (
    <>
      {/* Top tab navigation (desktop/tablet) */}
      <div className="hidden md:block">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-3 py-2 max-w-4xl mx-auto">
          <nav className="flex flex-wrap items-center justify-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabId)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-4 left-1/2 z-50 -translate-x-1/2 max-w-md w-[90%] flex justify-around items-center rounded-full border border-gray-200 bg-white/95 backdrop-blur-sm px-4 py-2 shadow-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabId)}
              className={`flex flex-col items-center flex-1 p-1.5 ${
                isActive ? "text-blue-600" : "text-gray-400"
              } hover:text-blue-600`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] mt-0.5 font-medium">
                {tab.label.split(" ")[0]}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
