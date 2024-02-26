import AboutSection from "@/components/About";
import FacilitySection from "@/components/Facility";
import GuidenceSection from "@/components/Guidence";
import HeroSection from "@/components/Hero";
import ServiceSection from "@/components/Service";
import TestimonialSection from "@/components/Testimonial";
import VendorSection from "@/components/Vendor";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServiceSection />
      <FacilitySection />
      <AboutSection />
      <TestimonialSection />
      <GuidenceSection />
      <VendorSection />
    </main>
  );
}
