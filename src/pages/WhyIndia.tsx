import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  Clock,
  Award,
  Globe,
  Plane,
  HeartHandshake,
  GraduationCap,
  Building2,
  Stethoscope,
  Users,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "70-80% Cost Savings",
    description: "Medical treatments in India cost a fraction of what you'd pay in the US, UK, or Europe. The same quality care, same technology, same outcomes – just significantly more affordable.",
    details: ["No hidden costs", "All-inclusive packages", "Transparent pricing"],
  },
  {
    icon: Award,
    title: "JCI Accredited Hospitals",
    description: "India has the highest number of JCI-accredited hospitals in Asia. These hospitals meet rigorous international standards for patient safety and quality of care.",
    details: ["37+ JCI hospitals", "NABH accreditation", "ISO certified labs"],
  },
  {
    icon: GraduationCap,
    title: "World-Trained Specialists",
    description: "Indian doctors are trained at the world's finest medical institutions. Many have practiced in the US, UK, and Europe before returning to India.",
    details: ["Harvard, Johns Hopkins trained", "30+ years experience", "Published researchers"],
  },
  {
    icon: Clock,
    title: "No Waiting Lists",
    description: "Unlike many Western countries, there are no long waiting periods. Get your surgery scheduled within days of your arrival.",
    details: ["Immediate consultations", "Quick diagnostics", "Fast-track scheduling"],
  },
  {
    icon: Building2,
    title: "State-of-the-Art Facilities",
    description: "Indian hospitals feature the latest medical technology – robotic surgery, hybrid ORs, proton therapy, and more. Often newer than equipment in Western hospitals.",
    details: ["Da Vinci robotics", "CyberKnife", "Latest imaging tech"],
  },
  {
    icon: Globe,
    title: "English Speaking Staff",
    description: "Communication is never a barrier. Doctors, nurses, and hospital staff are fluent in English, ensuring clear communication throughout your treatment.",
    details: ["Multilingual support", "Clear explanations", "Detailed documentation"],
  },
];

const stats = [
  { value: "2M+", label: "Medical Tourists Annually" },
  { value: "37+", label: "JCI Accredited Hospitals" },
  { value: "150+", label: "Countries Served" },
  { value: "98%", label: "Patient Satisfaction" },
];

const WhyIndia = () => {
  return (
    <>
      <Helmet>
        <title>Why Choose India | VV Global Health</title>
        <meta name="description" content="Discover why India is the leading destination for medical tourism. World-class healthcare, cost advantages, and immediate access to treatment." />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-secondary/50 via-background to-secondary/30 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                Why India
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                India: The Global Leader in <span className="text-gradient">Medical Tourism</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Every year, over 2 million international patients choose India for their medical care.
                Here's why you should too.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="bg-secondary/50 rounded-3xl py-10 px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-4xl md:text-5xl font-serif font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Why Patients Choose <span className="text-gradient">India</span>
              </h2>
              <p className="text-muted-foreground">
                From world-class facilities to significant cost savings, India offers
                an unmatched medical tourism experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="bg-card rounded-2xl p-8 border border-border hover:shadow-card transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex gap-6">
                    <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-serif font-bold text-foreground">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                      <ul className="space-y-2">
                        {benefit.details.map((detail) => (
                          <li key={detail} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-medical-success" />
                            <span className="text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Your Medical Journey <span className="text-gradient">Made Simple</span>
              </h2>
              <p className="text-muted-foreground">
                We handle everything from medical consultations to travel arrangements,
                ensuring a seamless experience.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: 1, title: "Share Medical Reports", description: "Upload your medical documents and receive a free expert opinion within 48 hours.", icon: Stethoscope },
                { step: 2, title: "Get Treatment Plan", description: "Receive a detailed treatment plan with hospital options and cost estimates.", icon: Award },
                { step: 3, title: "Travel to India", description: "We assist with visa, flights, and accommodation. Airport pickup included.", icon: Plane },
                { step: 4, title: "Treatment & Recovery", description: "Receive world-class treatment with dedicated patient coordinators by your side.", icon: HeartHandshake },
              ].map((item, index) => (
                <div
                  key={item.step}
                  className="text-center animate-slide-up"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 bg-gradient-cta rounded-full flex items-center justify-center text-primary-foreground shadow-lg">
                      <item.icon className="h-10 w-10" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-card border-2 border-primary rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 mb-12">
          <div className="container mx-auto px-4">
            <div className="bg-secondary/50 rounded-3xl py-12 px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-primary">
                Ready to Start Your Medical Journey?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get a free medical opinion from India's top specialists.
                Share your reports and receive a comprehensive treatment plan within 48 hours.
              </p>
              <Link to="/contact">
                <Button variant="cta" size="xl">
                  Get Free Consultation
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default WhyIndia;
