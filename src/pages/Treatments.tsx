import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Bone,
  Brain,
  Baby,
  Smile,
  Stethoscope,
  Eye,
  Scissors,
  ArrowRight
} from "lucide-react";

const treatments = [
  {
    icon: Heart,
    title: "Cardiac Surgery",
    description: "Comprehensive heart care including bypass surgery, valve replacement, angioplasty, heart transplants, and pediatric cardiac surgery. Our cardiac centers are equipped with the latest hybrid operating rooms and catheterization labs.",
    procedures: ["Coronary Bypass Surgery", "Heart Valve Replacement", "Angioplasty & Stenting", "Heart Transplant", "Pediatric Heart Surgery"],
    savings: "Up to 80%",
    recovery: "7-14 days",
  },
  {
    icon: Bone,
    title: "Orthopedic Surgery",
    description: "Advanced orthopedic care with robotic-assisted surgeries, minimally invasive procedures, and comprehensive rehabilitation. Specializing in joint replacements, spine surgery, and sports medicine.",
    procedures: ["Knee Replacement", "Hip Replacement", "Spine Surgery", "Shoulder Surgery", "Sports Injury Treatment"],
    savings: "Up to 75%",
    recovery: "5-10 days",
  },
  {
    icon: Brain,
    title: "Neurosurgery",
    description: "Expert neurosurgical care for brain tumors, spine disorders, and neurological conditions. Featuring intraoperative MRI, neuronavigation, and gamma knife radiosurgery.",
    procedures: ["Brain Tumor Surgery", "Spine Disc Surgery", "Deep Brain Stimulation", "Epilepsy Surgery", "Stroke Treatment"],
    savings: "Up to 70%",
    recovery: "10-21 days",
  },
  {
    icon: Stethoscope,
    title: "Cancer Treatment",
    description: "Comprehensive oncology services including surgical oncology, chemotherapy, radiation therapy, immunotherapy, and bone marrow transplants. Multi-disciplinary tumor boards ensure optimal treatment plans.",
    procedures: ["Surgical Oncology", "Chemotherapy", "Radiation Therapy", "Immunotherapy", "Bone Marrow Transplant"],
    savings: "Up to 65%",
    recovery: "Varies",
  },
  {
    icon: Baby,
    title: "Fertility Treatment",
    description: "Advanced reproductive medicine with high success rates. Offering IVF, IUI, egg freezing, and surrogacy services with state-of-the-art embryology labs.",
    procedures: ["IVF Treatment", "IUI", "Egg Freezing", "ICSI", "Surrogacy Services"],
    savings: "Up to 70%",
    recovery: "1-2 weeks",
  },
  {
    icon: Smile,
    title: "Cosmetic Surgery",
    description: "Aesthetic procedures performed by board-certified plastic surgeons. Natural-looking results with minimal scarring and quick recovery times.",
    procedures: ["Rhinoplasty", "Facelift", "Liposuction", "Breast Surgery", "Hair Transplant"],
    savings: "Up to 80%",
    recovery: "5-14 days",
  },
  {
    icon: Eye,
    title: "Eye Care",
    description: "Advanced ophthalmic care including LASIK, cataract surgery, glaucoma treatment, and cornea transplants. Using the latest femtosecond lasers and IOL technology.",
    procedures: ["LASIK Surgery", "Cataract Surgery", "Glaucoma Treatment", "Cornea Transplant", "Retina Surgery"],
    savings: "Up to 75%",
    recovery: "1-3 days",
  },
  {
    icon: Scissors,
    title: "Organ Transplant",
    description: "Life-saving transplant surgeries with excellent success rates. Comprehensive pre and post-transplant care with dedicated transplant coordinators.",
    procedures: ["Kidney Transplant", "Liver Transplant", "Heart Transplant", "Bone Marrow Transplant", "Cornea Transplant"],
    savings: "Up to 70%",
    recovery: "21-30 days",
  },
];

const Treatments = () => {
  return (
    <>
      <Helmet>
        <title>Medical Treatments in India | World-Class Healthcare at Affordable Costs</title>
        <meta
          name="description"
          content="Explore our comprehensive range of medical treatments including cardiac surgery, orthopedics, cancer care, fertility treatments, and more. Save up to 80% on world-class healthcare."
        />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-secondary/50 via-background to-secondary/30 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                Our Treatments
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                World-Class Medical <span className="text-gradient">Treatments</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Access cutting-edge medical treatments from internationally accredited hospitals
                and renowned specialists at a fraction of Western prices.
              </p>
              <Link to="/contact">
                <Button variant="cta" size="lg">
                  Get a Free Quote
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Treatments Grid */}
        <section className="py-2">
          <div className="container mx-auto px-4">
            <div className="grid gap-8">
              {treatments.map((treatment, index) => (
                <div
                  key={treatment.title}
                  className="bg-card rounded-2xl border border-border p-8 hover:shadow-card transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center">
                          <treatment.icon className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-serif font-bold text-foreground">
                            {treatment.title}
                          </h2>
                          <div className="flex gap-4 mt-1">

                            <span className="text-sm text-muted-foreground">
                              Recovery: {treatment.recovery}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {treatment.description}
                      </p>
                    </div>

                    {/* Procedures & CTA */}
                    <div className="flex flex-col justify-between h-full gap-8">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Common Procedures</h4>
                        <ul className="space-y-2">
                          {treatment.procedures.map((procedure) => (
                            <li key={procedure} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {procedure}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Link to="/contact">
                        <Button variant="outline" className="w-full">
                          Enquire About {treatment.title}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-6 mb-12">
          <div className="container mx-auto px-4">
            <div className="bg-secondary/50 rounded-3xl py-12 px-8 text-center">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-primary">
                Not Sure Which Treatment You Need?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Share your medical reports with us and our specialists will recommend
                the best treatment options for your condition.
              </p>
              <Link to="/contact">
                <Button variant="cta" size="xl">
                  Get Expert Advice
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

export default Treatments;
