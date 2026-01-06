import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Award, Users } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 pt-8 pb-16 lg:pt-12 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Content */}
          <div className="space-y-8 animate-slide-up">

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary leading-tight">
              World-Class
              <span className="text-primary block">Medical Care</span>
              in India
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Experience exceptional healthcare at a fraction of the cost. We connect
              you with India's top hospitals and renowned specialists for treatments
              ranging from cardiac surgery to organ transplants.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Get Free Medical Opinion
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/treatments">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  View Treatments
                </Button>
              </Link>
            </div>

          </div>

          {/* Image */}
          <div className="relative animate-fade-in lg:mt-0 mt-8" style={{ animationDelay: "0.3s" }}>
            <div className="relative z-10 max-w-[90%] place-self-end">
              <img
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80"
                alt="Modern hospital facility"
                className="rounded-2xl shadow-elevated w-full object-cover aspect-[4/3]"
              />

            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent/10 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
