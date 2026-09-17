import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { CalendarDays, MapPin, Compass, Sparkles } from "lucide-react";

import heroUttarakhand from "@/assets/hero-uttarakhand.jpg";
import heroManali from "@/assets/hero-manali.jpg";
import heroKashmir from "@/assets/hero-kashmir.jpg";
import heroRajasthan from "@/assets/hero-rajasthan.jpg";
import heroGoldenTemple from "@/assets/hero-golden-temple.jpg";
import heroKerala from "@/assets/hero-kerala.jpg";
import heroTamilNadu from "@/assets/hero-tamilnadu.jpg";
import packageGoa from "@/assets/package-goa.jpg";

const destinations = [
  {
    id: "uttarakhand",
    image: heroUttarakhand,
    name: "Uttarakhand",
    region: "The Himalayas",
    tagline: "Devbhoomi — land of gods, rivers and high-altitude magic.",
    highlights: ["Char Dham pilgrimage trail", "Rishikesh river rafting", "Nainital & Mussoorie hill towns"],
    bestTime: "Mar–Jun · Sep–Nov",
  },
  {
    id: "manali",
    image: heroManali,
    name: "Manali",
    region: "Himachal Pradesh",
    tagline: "Alpine valleys where snow peaks meet cedar forests.",
    highlights: ["Solang Valley adventure park", "Rohtang Pass snow escapades", "Old Manali cafés & bazaars"],
    bestTime: "Oct–Mar",
  },
  {
    id: "kashmir",
    image: heroKashmir,
    name: "Kashmir",
    region: "Jammu & Kashmir",
    tagline: "Paradise on Earth — shikaras, saffron fields and valley views.",
    highlights: ["Dal Lake shikara ride & houseboat stay", "Gulmarg gondola & meadows", "Sonamarg glacier walks"],
    bestTime: "Apr–Oct",
  },
  {
    id: "rajasthan",
    image: heroRajasthan,
    name: "Rajasthan",
    region: "The Royal Desert",
    tagline: "Forts, palaces and dunes on the golden circuit.",
    highlights: ["Jaipur Pink City & Amber Fort", "Udaipur palaces & lakes", "Jaisalmer desert safari"],
    bestTime: "Oct–Mar",
  },
  {
    id: "golden-temple",
    image: heroGoldenTemple,
    name: "Golden Temple · Amritsar",
    region: "Punjab",
    tagline: "Soul-stirring serenity at Punjab's spiritual heart.",
    highlights: ["Golden Temple darshan & langar", "Wagah Border ceremony", "Jallianwala Bagh memorial"],
    bestTime: "Oct–Mar",
  },
  {
    id: "kerala",
    image: heroKerala,
    name: "Kerala",
    region: "God's Own Country",
    tagline: "Backwaters, tea hills and Ayurveda in the deep south.",
    highlights: ["Alleppey houseboat cruise", "Munnar tea plantations", "Kovalam & Varkala beaches"],
    bestTime: "Sep–Mar",
  },
  {
    id: "tamil-nadu",
    image: heroTamilNadu,
    name: "Tamil Nadu",
    region: "The Temple South",
    tagline: "Towering gopurams and thousand-year-old temples.",
    highlights: ["Meenakshi Temple, Madurai", "Kanchipuram & Mahabalipuram", "Ooty hill station retreat"],
    bestTime: "Oct–Mar",
  },
  {
    id: "goa",
    image: packageGoa,
    name: "Goa",
    region: "The Coastal Escape",
    tagline: "Sun, sand, shacks and slow golden evenings.",
    highlights: ["North & South Goa beaches", "Old Goa heritage churches", "Mandovi sunset cruise"],
    bestTime: "Nov–Feb",
  },
];

const Destinations = () => (
  <div className="min-h-screen pt-24 pb-16">
    <Seo
      title="Destinations | SNAV Tourism"
      description="Explore India's most loved destinations with SNAV Tourism - Kashmir, Rajasthan, Kerala, Goa, Manali, Uttarakhand, Golden Temple Amritsar, Tamil Nadu. Best times to visit and highlights for each."
      path="/destinations"
    />
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4">
          Travel Destinations
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Eight unforgettable corners of India — each with its own rhythm, flavour and story
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Badge className="absolute top-4 left-4 bg-sunset text-sunset-foreground font-semibold">
                {destination.region}
              </Badge>
              <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full z-10">
                <CalendarDays className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold">{destination.bestTime}</span>
              </div>
            </div>

            <div className="p-6 space-y-4 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-sm font-medium text-accent">
                <MapPin className="h-4 w-4" />
                <span>{destination.region}</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground group-hover:text-accent transition-colors">
                {destination.name}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{destination.tagline}</p>
              <ul className="space-y-1.5">
                {destination.highlights.map((highlight) => (
                  <li key={highlight} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-accent mt-1.5">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-4">
                <Link to="/packages" className="w-full">
                  <Button variant="default" size="default" className="w-full">
                    View Packages
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl bg-gradient-to-r from-primary to-accent p-8 md:p-12 text-center text-primary-foreground animate-fade-in-up">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Compass className="h-8 w-8" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold">Don't see your perfect route?</h2>
        </div>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Every traveller is different. Tell us where you dream of going and we'll craft a bespoke itinerary around you.
        </p>
        <Link to="/custom-trips">
          <Button variant="secondary" size="lg" className="gap-2">
            <Sparkles className="h-5 w-5" />
            Build a Custom Trip
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

export default Destinations;