import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-primary pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-script text-2xl font-bold">VV Global Health</span>
            </Link>
            <div className="space-y-2 text-sm">
              <Link to="/about" className="block hover:underline">About Us</Link>
              <Link to="/careers" className="block hover:underline">Careers</Link>
              <Link to="/blog" className="block hover:underline">Blog</Link>
              <Link to="/testimonials" className="block hover:underline">Testimonials</Link>
              <Link to="/press" className="block hover:underline">Press</Link>
            </div>
          </div>

          {/* Legal Column */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-primary">Legal</h4>
            <div className="space-y-2 text-sm">
              <Link to="/faq" className="block hover:underline">Frequently Asked Questions</Link>
              <Link to="/terms" className="block hover:underline">Terms & Conditions</Link>
              <Link to="/privacy" className="block hover:underline">Privacy Policy</Link>
              <Link to="/cancellations" className="block hover:underline">Cancellations</Link>
              <Link to="/sitemap" className="block hover:underline">Sitemap</Link>
              <Link to="/contact" className="block hover:underline">Contact Us</Link>
            </div>
          </div>

          {/* Get in Touch Column */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-primary">Get in Touch</h4>
            <div className="space-y-3 text-sm">
              <a href="mailto:planners@vvtravels.com" className="flex items-center gap-2 hover:underline">
                <Mail className="h-4 w-4" />
                planners@vvtravels.com
              </a>
              <a href="tel:+918031274154" className="flex items-center gap-2 hover:underline">
                <Phone className="h-4 w-4" />
                +91 8031274154
              </a>
              <a href="tel:+916383822508" className="flex items-center gap-2 hover:underline">
                <Phone className="h-4 w-4" />
                +91 6383822508
              </a>
              <a href="mailto:careers@vvtravels.com" className="flex items-center gap-2 hover:underline">
                <Mail className="h-4 w-4" />
                careers@vvtravels.com
              </a>
            </div>
          </div>

          {/* Social Column */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-primary">Social</h4>
            <div className="space-y-3 text-sm">
              <a href="#" className="flex items-center gap-2 hover:underline"><Facebook className="h-4 w-4" /> Facebook</a>
              <a href="#" className="flex items-center gap-2 hover:underline"><Twitter className="h-4 w-4" /> Twitter</a>
              <a href="#" className="flex items-center gap-2 hover:underline"><Instagram className="h-4 w-4" /> Instagram</a>
              <a href="#" className="flex items-center gap-2 hover:underline"><Linkedin className="h-4 w-4" /> LinkedIn</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/20 pt-6 text-sm text-center md:text-left">
          <p>© {currentYear} VV Travels Global Private Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
