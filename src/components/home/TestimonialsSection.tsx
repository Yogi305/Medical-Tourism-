import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "James Mitchell",
    country: "United Kingdom",
    treatment: "Cardiac Bypass Surgery",
    quote: "The care I received was exceptional. From the moment I landed in Chennai, every detail was taken care of. My surgery was successful and I saved over £40,000 compared to UK prices.",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    country: "United States",
    treatment: "Hip Replacement",
    quote: "I was hesitant about medical tourism, but VV Global Health made the entire process seamless. The hospital was world-class and my surgeon was trained at Harvard. Best decision I ever made.",
    rating: 5,
  },
  {
    name: "Ahmed Al-Rashid",
    country: "UAE",
    treatment: "Liver Transplant",
    quote: "My father needed a liver transplant urgently. VV Global Health arranged everything within two weeks. The medical team saved his life. We are forever grateful.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Patient Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Hear From Our <span className="text-gradient">Global Patients</span>
          </h2>
          <p className="text-muted-foreground">
            Real stories from international patients who trusted us with their healthcare journey.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-background rounded-xl p-8 border border-border shadow-soft hover:shadow-card transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <Quote className="h-10 w-10 text-primary/20 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-medical-gold text-medical-gold" />
                ))}
              </div>

              {/* Quote */}
              <span className="text-gray-600 block mb-4">"VV Global Health made my complex cardiac surgery possible. The level of care was comparable to the US but at a fraction of the cost."</span>

              {/* Author */}
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.country}</p>
                <p className="text-sm text-primary font-medium mt-1">{testimonial.treatment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
