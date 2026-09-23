import Hero from "@/components/home/Hero";
import YourTrail from "@/components/home/YourTrail";
import Build from "@/components/home/Build";
import Show from "@/components/home/Show";
import Discover from "@/components/home/Discover";
import MoveForward from "@/components/home/MoveForward";
import KeepGoing from "@/components/home/KeepGoing";
import Navbar from "@/components/Navbar";
import StructuredData from "@/components/seo/StructuredData";
import RecognitionComponent from "@/components/home/RecognitionComponent";
import CollegeSection from "@/components/home/CollegeSection";
import CompaniesSection from "@/components/home/CompaniesSection";

export default function HomePage() {
  return (
    <main>
      <StructuredData />
      <Navbar />
      <Hero />
      <YourTrail />
      <RecognitionComponent />
      <Build />
      <CollegeSection />
      <CompaniesSection />
      <Show />
      <Discover />
      <MoveForward />
      <KeepGoing />
    </main>
  );
}