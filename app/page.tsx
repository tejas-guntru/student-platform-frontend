import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Hero from "@/components/home/Hero";
import RecognitionComponent from "@/components/home/RecognitionComponent";
import CollegeSection from "@/components/home/CollegeSection";
import CompaniesSection from "@/components/home/CompaniesSection";


export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">
        <Hero />
        <CompaniesSection />
        <CollegeSection />
        <RecognitionComponent />
      </main>

      <Footer />
    </>
  );
}