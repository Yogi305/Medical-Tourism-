import React from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import PatientIntakeForm from "@/components/forms/PatientIntakeForm";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | VV Global Health</title>
        <meta
          name="description"
          content="Get in touch with VV Global Health for a free medical consultation. We're here to help you plan your medical journey to India."
        />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-secondary/50 via-background to-secondary/30 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                Get In Touch
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                Start Your <span className="text-gradient">Medical Journey</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Fill out our patient intake form and receive a free medical opinion
                from India's top specialists within 24-48 hours.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Info Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-card rounded-2xl p-6 border border-border shadow-soft sticky top-32">
                  <h3 className="text-xl font-serif font-semibold text-foreground mb-6">
                    Contact Information
                  </h3>

                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Phone</p>
                        <a href="tel:+918939737272" className="text-muted-foreground hover:text-primary transition-colors">
                          +91 89397 37272
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">WhatsApp</p>
                        <a href="https://wa.me/918939737272" className="text-muted-foreground hover:text-primary transition-colors">
                          +91 89397 37272
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Email</p>
                        <a href="mailto:vglobalhealth@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                          vglobalhealth@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Address</p>
                        <a
                          href="https://www.google.com/maps/search/?api=1&query=No+-+36%2F47%2C+2nd+Street%2C+Anjugham+Nagar%2C+Jafferkhanpet%2C+Chennai+-+600+083"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors text-sm leading-relaxed block"
                        >
                          No - 36/47, 2nd Street, Anjugham Nagar, Jafferkhanpet, Chennai - 600 083.
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Response Time</p>
                        <p className="text-muted-foreground">
                          24-48 hours for medical opinion
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border">
                    <h4 className="font-medium text-foreground mb-3">What happens next?</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-semibold">1.</span>
                        We review your medical information
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-semibold">2.</span>
                        Specialists analyze your case
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-semibold">3.</span>
                        You receive treatment options & costs
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-semibold">4.</span>
                        We help plan your medical journey
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-2xl p-8 border border-border shadow-soft">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
                      Patient Intake Form
                    </h2>
                    <p className="text-muted-foreground">
                      Complete this form for a free medical review. All information is kept confidential.
                    </p>
                  </div>
                  <PatientIntakeForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
