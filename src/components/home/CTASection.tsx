import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 bg-secondary mb-12 rounded-3xl mx-4">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight text-primary">
            Ready to Start Your <br className="hidden sm:block" />
            Medical Journey to India?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            Get a free medical opinion from India's top specialists. Share your reports
            and receive a comprehensive treatment plan and cost estimate within 48 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/contact">
              <Button size="xl" className="w-full sm:w-auto shadow-lg text-lg px-8">
                <MessageCircle className="h-5 w-5 mr-2" />
                Get Free Consultation
              </Button>
            </Link>
            <a href="tel:+919876543210">
              <Button variant="outline" size="xl" className="w-full sm:w-auto shadow-lg text-lg px-8 border-primary text-primary hover:bg-primary hover:text-white">
                <Phone className="h-5 w-5 mr-2" />
                Call Us Now
              </Button>
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-8 pt-8 text-muted-foreground font-medium">
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-primary" />
              <span>Free Medical Opinion</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-primary" />
              <span>No Obligation Quote</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-primary" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
