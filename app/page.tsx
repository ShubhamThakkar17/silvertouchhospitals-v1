import { pageMeta } from "@/lib/seo";
import { getPosts } from "@/lib/content";
import { up } from "@/lib/media";
import { GENERAL_FAQS } from "@/content/faqs";
import { Hero } from "@/components/sections/Hero";
import { AboutSplit } from "@/components/sections/AboutSplit";
import { ServicesStack } from "@/components/sections/ServicesStack";
import { MissionBand } from "@/components/sections/MissionBand";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { DepartmentsCarousel } from "@/components/sections/DepartmentsCarousel";
import { AppointmentBand } from "@/components/sections/AppointmentBand";
import { Packages } from "@/components/sections/Packages";
import { Testimonials } from "@/components/sections/Testimonials";
import { DoctorsGrid } from "@/components/sections/DoctorsGrid";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { FaqSection } from "@/components/sections/FaqSection";
import { LatestPosts } from "@/components/sections/LatestPosts";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata = pageMeta({
  title: "Multispeciality Hospitals in Ahmedabad | Silver Touch Hospitals",
  description:
    "Silver Touch Multispeciality Hospitals in Ahmedabad offer top-notch ICU & surgical care. Our branches at Satellite-Prahladnagar and Nirnaynagar are empanelled under PMJAY.",
  path: "/",
  image: up("2023/09/banner04.jpg").src,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSplit />
      <ServicesStack />
      <MissionBand />
      <WhyChoose />
      <DepartmentsCarousel />
      <AppointmentBand />
      <Packages />
      <Testimonials />
      <DoctorsGrid />
      <LogoMarquee />
      <FaqSection faqs={GENERAL_FAQS} surface />
      <LatestPosts posts={getPosts().slice(0, 3)} />
      <CtaBanner />
    </>
  );
}
