import { ArrowRight, Clock, MapPin, MessageCircle, Route } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { bookPackageMessage, whatsappLink, type TourPackage } from "@/data/packages";

interface PackageCardProps {
  pkg: TourPackage;
}

const PackageCard = ({ pkg }: PackageCardProps) => {
  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.imageAlt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Duration badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-foreground">
            <Clock className="h-3.5 w-3.5 text-accent" />
            {pkg.shortDuration}
          </span>
        </div>

        {/* Price badge */}
        <div className="absolute bottom-4 right-4 rounded-full bg-accent/95 backdrop-blur-sm px-4 py-1.5 text-right shadow-lg">
          <p className="text-[10px] font-medium uppercase tracking-wide text-accent-foreground/70 leading-none">
            Starting from
          </p>
          <p className="text-lg font-bold leading-tight text-accent-foreground">
            ₹{pkg.startingPrice.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Route */}
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Route className="h-4 w-4 shrink-0 text-accent" />
          <span className="truncate">{pkg.route.join(" → ")}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-serif font-semibold text-foreground group-hover:text-accent transition-colors">
          {pkg.title}
        </h3>
        <p className="text-sm text-muted-foreground">{pkg.tagline}</p>

        {/* Highlights */}
        <ul className="space-y-1">
          {pkg.highlights.slice(0, 3).map((highlight, index) => (
            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        {/* Duration & transport */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-accent shrink-0" />
          <span className="truncate">{pkg.duration} · {pkg.transport}</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <Link to={`/packages/${pkg.slug}`} className="flex-1">
            <Button variant="default" size="default" className="w-full gap-1.5">
              View Details
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
          <a href={whatsappLink(bookPackageMessage(pkg))} target="_blank" rel="noopener noreferrer">
            <Button variant="whatsapp" size="default" className="gap-1.5">
              <MessageCircle className="h-4 w-4" />
              Book
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;