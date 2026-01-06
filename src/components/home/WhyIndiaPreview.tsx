import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DollarSign, Clock, Award, Globe, Plane, HeartHandshake, ArrowRight } from "lucide-react";

const reasons = [
  {
    icon: DollarSign,
    title: "70-80% Cost Savings",
    description: "Same quality treatments at a fraction of Western prices, without compromising on care.",
  },
  {
    icon: Award,
    title: "JCI Accredited Hospitals",
    description: "India has the highest number of JCI-accredited hospitals in Asia, ensuring global standards.",
  },
  {
    icon: Clock,
    title: "No Waiting Lists",
    description: "Get treated within days, not months. Skip the long queues common in other countries.",
  },
  {
    icon: Globe,
    title: "English Speaking Staff",
    description: "Clear communication with doctors and staff fluent in English and other languages.",
  },
  {
    icon: Plane,
    title: "Complete Travel Assistance",
    description: "We handle visas, flights, accommodation, and local transport for a stress-free journey.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Care",
    description: "Dedicated patient coordinators guide you through every step of your medical journey.",
  },
];

const WhyIndiaPreview = () => {
  return (
    <section className="py-10 bg-gradient-to-br from-secondary/50 via-background to-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 space-y-4">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider">
            Why Choose India
          </span>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-foreground">
            India: The Global Destination for <span className="text-gradient">Quality Healthcare</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Every year, millions of international patients choose India for medical treatment.
            With state-of-the-art facilities, internationally trained doctors, and significant
            cost advantages, India offers an unmatched healthcare experience.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {reasons.slice(0, 4).map((reason, index) => (
            <div
              key={reason.title}
              className="bg-card rounded-2xl p-5 shadow-sm border border-border/50 hover:shadow-md transition-all flex flex-col items-center text-center group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <reason.icon className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-lg font-serif font-semibold text-foreground mb-2">{reason.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/why-india">
            <Button variant="cta" size="lg" className="shadow-lg hover:shadow-xl transition-all">
              Discover More Benefits
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyIndiaPreview;
