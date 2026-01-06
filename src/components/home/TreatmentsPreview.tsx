import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Bone, Brain, Baby, Smile, Stethoscope, ArrowRight } from "lucide-react";

const treatments = [
  {
    icon: Heart,
    title: "Cardiac Surgery",
    description: "Bypass surgery, valve replacement, angioplasty, and heart transplants by world-renowned cardiologists.",
    savings: "Up to 80% savings",
  },
  {
    icon: Bone,
    title: "Orthopedic Surgery",
    description: "Joint replacements, spine surgery, and sports medicine with cutting-edge robotic assistance.",
    savings: "Up to 75% savings",
  },
  {
    icon: Brain,
    title: "Neurosurgery",
    description: "Brain tumor removal, spine disorders, and neurological conditions treated by expert neurosurgeons.",
    savings: "Up to 70% savings",
  },
  {
    icon: Stethoscope,
    title: "Cancer Treatment",
    description: "Comprehensive oncology care including surgery, chemotherapy, radiation, and immunotherapy.",
    savings: "Up to 65% savings",
  },
  {
    icon: Baby,
    title: "Fertility Treatment",
    description: "IVF, IUI, and advanced reproductive technologies with high success rates.",
    savings: "Up to 70% savings",
  },
  {
    icon: Smile,
    title: "Cosmetic Surgery",
    description: "Aesthetic procedures including rhinoplasty, facelifts, and body contouring by skilled surgeons.",
    savings: "Up to 80% savings",
  },
];

const TreatmentsPreview = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Our Specialties
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            World-Class Treatments at <span className="text-gradient">Affordable Costs</span>
          </h2>
          <p className="text-muted-foreground">
            Access the same quality of care as leading Western hospitals at a fraction of the price,
            with no waiting lists.
          </p>
        </div>

        {/* Treatment Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treatments.map((treatment, index) => (
            <div
              key={treatment.title}
              className="group bg-background rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-card transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
                <treatment.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                {treatment.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {treatment.description}
              </p>
              <div className="flex items-center justify-between">

                <Link
                  to="/contact"
                  className="text-primary font-medium text-sm hover:underline flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Enquire <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/treatments">
            <Button variant="outline" size="lg">
              View All Treatments
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TreatmentsPreview;
