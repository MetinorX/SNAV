import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

import heroUttarakhand from "@/assets/hero-uttarakhand.jpg";
import heroManali from "@/assets/hero-manali.jpg";
import heroKashmir from "@/assets/hero-kashmir.jpg";
import heroRajasthan from "@/assets/hero-rajasthan.jpg";
import heroGoldenTemple from "@/assets/hero-golden-temple.jpg";
import heroKerala from "@/assets/hero-kerala.jpg";
import heroTamilNadu from "@/assets/hero-tamilnadu.jpg";

const slides = [
  {
    image: heroUttarakhand,
    title: "Uttarakhand Paradise",
    subtitle: "Sacred Temples & Mountain Majesty",
    location: "Uttarakhand",
  },
  {
    image: heroManali,
    title: "Manali Adventures",
    subtitle: "Snow-Capped Peaks & Valley Views",
    location: "Himachal Pradesh",
  },
  {
    image: heroKashmir,
    title: "Kashmir - Heaven on Earth",
    subtitle: "Dal Lake & Mughal Gardens",
    location: "Jammu & Kashmir",
  },
  {
    image: heroRajasthan,
    title: "Royal Rajasthan",
    subtitle: "Palaces, Forts & Desert Tales",
    location: "Rajasthan",
  },
  {
    image: heroGoldenTemple,
    title: "Golden Temple Splendor",
    subtitle: "Spiritual Journey to Sacred Shrine",
    location: "Amritsar, Punjab",
  },
  {
    image: heroKerala,
    title: "Kerala Backwaters",
    subtitle: "God's Own Country Awaits",
    location: "Kerala",
  },
  {
    image: heroTamilNadu,
    title: "Tamil Nadu Heritage",
    subtitle: "Ancient Temples & Dravidian Glory",
    location: "Tamil Nadu",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  useEffect(() => {
    return () => {
      if (resumeTimeout.current) {
        clearTimeout(resumeTimeout.current);
      }
    };
  }, []);

  const pauseAndResume = () => {
    setIsAutoPlaying(false);
    if (resumeTimeout.current) {
      clearTimeout(resumeTimeout.current);
    }
    resumeTimeout.current = setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    pauseAndResume();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    pauseAndResume();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    pauseAndResume();
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/80" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
            <div className="inline-block px-4 py-2 bg-accent/20 backdrop-blur-sm rounded-full border border-accent/50 mb-4">
              <span className="text-accent font-semibold tracking-wide">
                {slides[currentSlide].location}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-primary-foreground mb-4 tracking-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl font-serif text-primary-foreground/90 mb-8">
              {slides[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/packages">
                <Button variant="hero" size="xl">
                  Explore Packages
                </Button>
              </Link>
              <Link to="/custom-trips">
                <Button variant="outline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Plan Your Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/20 backdrop-blur-sm border border-primary-foreground/30 text-primary-foreground hover:bg-background/40 transition-all hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/20 backdrop-blur-sm border border-primary-foreground/30 text-primary-foreground hover:bg-background/40 transition-all hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? "w-12 bg-accent"
                : "w-2 bg-primary-foreground/40 hover:bg-primary-foreground/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
