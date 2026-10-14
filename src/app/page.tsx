import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ContactSection, FaqSection, FeaturedProjects, Process, ServiceArea, ServicesOverview, Testimonials, WhyChooseUs } from "@/components/home/Sections";
import { faqs } from "@/data/content";
import { JsonLd, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <WhyChooseUs />
      <FeaturedProjects />
      <Process />
      <Testimonials />
      <ServiceArea />
      <FaqSection />
      <ContactSection />
      <JsonLd data={faqJsonLd(faqs)} />
    </>
  );
}
