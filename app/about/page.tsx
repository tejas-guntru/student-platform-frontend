"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHeader from "@/components/about/AboutHeader";
import OurMission from "@/components/about/OurMission";
import EducationalApproach from "@/components/about/EducationalApproach";
import TechnologyPlatform from "@/components/about/TechnologyPlatform";
import OurTeam from "@/components/about/OurTeam";
import OurJourney from "@/components/about/OurJourney";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <AboutHeader />
      <OurMission />
      <EducationalApproach />
      <TechnologyPlatform />
      <OurTeam />
      <OurJourney />
      <Footer />
    </main>
  );
}



