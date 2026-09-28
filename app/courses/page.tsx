import YourTrail from "@/components/home/YourTrail";
import ImpactStats from "@/components/home/ImpactStats";
import KeepGoing from "@/components/home/KeepGoing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Courses() {
  return (
    <>
      <Navbar />

      <main>
        <YourTrail />
        <ImpactStats />
        <KeepGoing />
      </main>

      <Footer />
    </>
  );
}