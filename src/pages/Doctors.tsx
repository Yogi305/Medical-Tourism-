import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Award, 
  Users, 
  MapPin,
  Star,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const hospitals = [
  {
    name: "Apollo Hospitals",
    location: "Chennai, India",
    beds: "10,000+",
    specialties: ["Cardiac Surgery", "Orthopedics", "Oncology", "Transplants"],
    accreditations: ["JCI", "NABH", "NABL"],
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Fortis Healthcare",
    location: "Multiple Locations",
    beds: "4,000+",
    specialties: ["Neurology", "Cardiology", "Renal Sciences", "Bone & Joint"],
    accreditations: ["JCI", "NABH"],
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Max Healthcare",
    location: "Delhi NCR",
    beds: "3,000+",
    specialties: ["Cancer Care", "Cardiac Sciences", "Neurosciences", "Orthopedics"],
    accreditations: ["JCI", "NABH", "NABL"],
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Medanta - The Medicity",
    location: "Gurugram, India",
    beds: "1,600+",
    specialties: ["Heart Institute", "Liver Transplant", "Cancer Institute", "Neurosciences"],
    accreditations: ["JCI", "NABH"],
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80",
  },
];

const doctorCategories = [
  {
    specialty: "Cardiac Surgeons",
    description: "World-renowned cardiac surgeons performing 5000+ heart surgeries annually",
    count: "50+",
  },
  {
    specialty: "Orthopedic Specialists",
    description: "Experts in joint replacements and spine surgery with robotic assistance",
    count: "40+",
  },
  {
    specialty: "Oncologists",
    description: "Comprehensive cancer care specialists with multi-disciplinary approach",
    count: "60+",
  },
  {
    specialty: "Neurosurgeons",
    description: "Skilled neurosurgeons for brain and spine conditions",
    count: "30+",
  },
  {
    specialty: "Transplant Surgeons",
    description: "Pioneers in organ transplantation with excellent success rates",
    count: "25+",
  },
  {
    specialty: "Fertility Specialists",
    description: "IVF experts with high success rates and personalized care",
    count: "35+",
  },
];

const Doctors = () => {
  return (
    <>
      <Helmet>
        <title>Top Doctors & Hospitals in India | JCI Accredited Healthcare</title>
        <meta 
          name="description" 
          content="Connect with India's top doctors and JCI-accredited hospitals. World-trained specialists in cardiac surgery, orthopedics, oncology, and more." 
        />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-secondary/50 via-background to-secondary/30 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                Our Network
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                India's Top <span className="text-gradient">Doctors & Hospitals</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                We partner with JCI-accredited hospitals and world-trained specialists 
                to ensure you receive the highest quality care.
              </p>
              <Link to="/contact">
                <Button variant="cta" size="lg">
                  Find the Right Doctor
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Hospitals Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Partner <span className="text-gradient">Hospitals</span>
              </h2>
              <p className="text-muted-foreground">
                Our network includes India's most prestigious healthcare institutions, 
                all internationally accredited for quality and patient safety.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {hospitals.map((hospital, index) => (
                <div
                  key={hospital.name}
                  className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-card transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={hospital.image}
                      alt={hospital.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-serif font-bold text-foreground">
                          {hospital.name}
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4" />
                          {hospital.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-medical-gold/10 px-3 py-1 rounded-full">
                        <Star className="h-4 w-4 fill-medical-gold text-medical-gold" />
                        <span className="text-sm font-semibold">{hospital.rating}</span>
                      </div>
                    </div>

                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">{hospital.beds} Beds</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">{hospital.accreditations.join(", ")}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {hospital.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Doctors Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Expert <span className="text-gradient">Specialists</span>
              </h2>
              <p className="text-muted-foreground">
                Our network includes doctors trained at the world's finest institutions – 
                Harvard, Johns Hopkins, Mayo Clinic, and more.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctorCategories.map((category, index) => (
                <div
                  key={category.specialty}
                  className="bg-background rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-serif font-bold text-primary">{category.count}</p>
                      <p className="text-sm text-muted-foreground">Specialists</p>
                    </div>
                  </div>
                  <h3 className="font-serif font-semibold text-foreground mb-2">
                    {category.specialty}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-6">
                We'll match you with the best specialist for your specific condition.
              </p>
              <Link to="/contact">
                <Button variant="cta" size="lg">
                  Get Matched with a Doctor
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center text-primary-foreground">
                {[
                  { value: "50+", label: "Partner Hospitals" },
                  { value: "500+", label: "Specialist Doctors" },
                  { value: "37", label: "JCI Accredited" },
                  { value: "150+", label: "Countries Served" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl md:text-4xl font-serif font-bold">{stat.value}</p>
                    <p className="text-sm opacity-80 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Doctors;
