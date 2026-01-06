import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import TreatmentsPreview from "@/components/home/TreatmentsPreview";
import WhyIndiaPreview from "@/components/home/WhyIndiaPreview";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>VV Global Health - World-Class Medical Tourism in India | Affordable Healthcare</title>
        <meta
          name="description"
          content="Experience world-class medical care in India at 70% less cost. JCI-accredited hospitals, renowned specialists, and complete travel assistance. Get a free medical opinion today."
        />
        <meta name="keywords" content="medical tourism India, affordable healthcare, cardiac surgery India, cancer treatment India, orthopedic surgery, organ transplant India" />
      </Helmet>
      <Layout>
        <HeroSection />
        <TreatmentsPreview />
        <WhyIndiaPreview />
        <TestimonialsSection />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
