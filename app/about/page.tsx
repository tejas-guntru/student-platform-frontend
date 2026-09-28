"use client";

import AboutHeader from "../../components/about/AboutHeader";
import OurMission from "../../components/about/OurMission";
import OurTeam from "../../components/about/OurTeam";
import OurJourney from "../../components/about/OurJourney";
import EducationalApproach from "../../components/about/EducationalApproach";
import TechnologyPlatform from "../../components/about/TechnologyPlatform";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <Footer/>
    </main>
  );
}