import Image from "next/image";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection"
// import EnforcementLayer from "./components/EnforcementLayer";
import FeatureSections from "./components/FeatureSection";
// import DashboardPreview from "./components/DashboardPreview";
import BookDemo from "./components/BookDemo";
import Footer from "./components/Footer";
export default function Home() {
  return (
   <div>
    <Navbar/>
    <HeroSection/>
    <FeatureSections />
    <BookDemo />
    <Footer />
   </div>
  );
}