import { useState } from "react";
import PackageCard from "@/components/PackageCard";
import WhatsAppCtaCard from "@/components/WhatsAppCtaCard";
import Seo from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Compass, MessageCircle } from "lucide-react";
import { tourPackages, whatsAppCards } from "@/data/packages";
import { cn } from "@/lib/utils";

type Category = "all" | "tours" | "backpackers" | "treks";

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "tours", label: "Tour Packages" },
  { id: "backpackers", label: "Backpackers" },
  { id: "treks", label: "Weekly Treks" },
];

const Packages = () => {
  const [category, setCategory] = useState<Category>("all");

  const showTours = category === "all" || category === "tours";
  const showCards = category === "all" || category === "backpackers" || category === "treks";
  const visibleCards = whatsAppCards.filter(
    (card) => category === "all" || card.kind === category
  );

  const resultCount =
    (showTours ? tourPackages.length : 0) + (showCards ? visibleCards.length : 0);

  return (
    <div className="min-h-screen pt-24 pb-16 overflow-hidden">
      <Seo
        title="Tour Packages 2026-27 | SNAV Tourism"
        description="Real SNAV Tourism group tour packages for 2026-27 — Himachal (9N/10D), Uttarakhand (8N/9D), Royal Rajasthan (8N/9D) and Hampi & Gokarna (5N/6D). Plus backpackers packages and weekly treks. Book on WhatsApp."
        path="/packages"
      />
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
            <Compass className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-accent">TOUR PACKAGES 2026-27</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4">
            India Tour Packages
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real group departures from Maharashtra — train-and-bus trails, desert camps and coastal escapes
          </p>
        </div>

        {/* Category Tabs */}
        <Reveal className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((item) => (
              <Button
                key={item.id}
                variant={category === item.id ? "hero" : "outline"}
                size="default"
                onClick={() => setCategory(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </div>
          <p className="mt-3 text-center text-sm text-muted-foreground">
            {resultCount} thing{resultCount === 1 ? "" : "s"} to explore in this view
          </p>
        </Reveal>

        {/* Tour Package Grid */}
        {showTours && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tourPackages.map((pkg, index) => (
              <Reveal key={pkg.slug} delay={index * 120} className="h-full">
                <PackageCard pkg={pkg} />
              </Reveal>
            ))}
          </div>
        )}

        {/* WhatsApp CTA Cards */}
        {showCards && (
          <>
            <div className={cn("grid gap-8", showTours && "mt-16")}>
              <div className={cn("grid grid-cols-1 gap-8", visibleCards.length > 1 ? "md:grid-cols-2" : "md:grid-cols-2 max-w-3xl", "mx-auto w-full")}>
                {visibleCards.map((card, index) => (
                  <WhatsAppCtaCard key={card.kind} card={card} index={index} />
                ))}
              </div>
            </div>
            <Reveal delay={120} className="mt-12">
              <div className="rounded-2xl border border-dashed border-accent/40 bg-accent/5 p-8 text-center">
                <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                  Not sure which trail fits you?
                </h3>
                <p className="mb-6 text-muted-foreground max-w-lg mx-auto">
                  Tell us your vibe, dates and budget — we'll point you to the right batch, or the right trek this week.
                </p>
                <a
                  href="https://wa.me/8652885584?text=Hello%20SNAV%20Tourism!%20Help%20me%20choose%20the%20right%20package%2C%20backpacker%20trip%20or%20trek."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="whatsapp" size="lg" className="gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Ask us on WhatsApp
                  </Button>
                </a>
              </div>
            </Reveal>
          </>
        )}
      </div>
    </div>
  );
};

export default Packages;