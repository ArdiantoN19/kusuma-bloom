import AboutSection from "@/components/About";
import FacilitySection from "@/components/Facility";
import Footer from "@/components/Footer";
import GuidenceSection from "@/components/Guidence";
import HeroSection from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ServiceSection from "@/components/Service";
import TestimonialSection from "@/components/Testimonial";
import VendorSection from "@/components/Vendor";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ServiceSection />
      <FacilitySection />
      <AboutSection />
      <TestimonialSection />
      <GuidenceSection />
      <VendorSection />
      <Footer />
    </main>
  );
}
