import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-3xl font-display font-bold tracking-wider">
              SNAV<span className="text-accent">Tourism</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Curating extraordinary travel experiences worldwide. From adventure
              to luxury, we turn your dream journeys into reality.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/p/SNAV-Tourism-100075677268291/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/snav_tourism?"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Tour Packages", path: "/packages" },
                { name: "Custom Trips", path: "/custom-trips" },
                { name: "Destinations", path: "/destinations" },
                { name: "Gallery", path: "/gallery" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent">
              Popular Destinations
            </h3>
            <ul className="space-y-2">
              {[
                "Uttarakhand",
                "Manali, Himachal Pradesh",
                "Kashmir",
                "Rajasthan",
                "Golden Temple, Amritsar",
                "Kerala Backwaters",
                "Tamil Nadu Temples",
                "Goa Beaches",
              ].map((destination) => (
                <li key={destination}>
                  <Link
                    to="/destinations"
                    className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                  >
                    {destination}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="text-sm text-primary-foreground/80">
                    +91 8652885584
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="text-sm text-primary-foreground/80">
                    snavtourism@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="text-sm text-primary-foreground/80">
                    Gopi Cine Mall, 210
                    <br />
                    Dombivli West, Maharashtra
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <h4 className="text-sm font-semibold mb-3">
                Join Our Travel Community
              </h4>
              <div className="flex gap-2">
                <Button variant="hero" size="default" asChild>
                  <a href="mailto:snavtourism@gmail.com?subject=Newsletter%20Subscription">
                    Subscribe
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/70">
            © 2025 SNAV Tourism. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              to="/privacy"
              className="text-primary-foreground/70 hover:text-accent transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-primary-foreground/70 hover:text-accent transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
