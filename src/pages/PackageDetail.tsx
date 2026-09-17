import { useEffect, useRef, useState } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  BedDouble,
  ChevronDown,
  Clock,
  Flame,
  Hammer,
  ListChecks,
  MapPin,
  MessageCircle,
  Phone,
  Route,
  ShieldCheck,
  Sparkles,
  Tag,
  UtensilsCrossed,
  Wallet,
  XCircle,
} from "lucide-react";
import {
  tourPackages,
  whatsappLink,
  bookPackageMessage,
  BOOKING_CONTACTS,
  type TourPackage,
} from "@/data/packages";
import { useParallax, useScrollProgress, useTimelineParallax } from "@/lib/useInView";
import { cn } from "@/lib/utils";

const priceLabel = (price: number): string => `₹${price.toLocaleString("en-IN")}`;

/* ---------- Reusable section heading ---------- */
const SectionHeading = ({ icon, kicker, title }: { icon: React.ReactNode; kicker: string; title: string }) => (
  <Reveal className="mb-8">
    <div className="flex items-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 text-accent">
        {icon}
      </span>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-accent">{kicker}</p>
        <h2 className="font-serif text-3xl font-bold text-foreground">{title}</h2>
      </div>
    </div>
  </Reveal>
);

/* ---------- Generic list ---------- */
const CheckList = ({ items, color = "emerald" }: { items: string[]; color?: "emerald" | "sunset" }) => (
  <ul className="flex flex-col gap-2">
    {items.map((item, index) => (
      <Reveal key={index} delay={index * 35} as="li">
        <li className="flex items-start gap-3 rounded-lg bg-card px-4 py-3 text-sm leading-relaxed text-muted-foreground shadow-sm">
          <span
            className={cn(
              "mt-1.5 h-2 w-2 shrink-0 rounded-full",
              color === "emerald" ? "bg-emerald" : "bg-sunset"
            )}
          />
          <span>{item}</span>
        </li>
      </Reveal>
    ))}
  </ul>
);

/* ---------- Pricing table ---------- */
const PricingTable = ({ pkg }: { pkg: TourPackage }) => (
  <div className="space-y-6">
    {pkg.pricingGroups.map((group, groupIndex) => (
      <Reveal key={group.label} delay={groupIndex * 100}>
        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <p className="border-b bg-muted/40 px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-accent">
            {group.label}
          </p>
          <div className="divide-y divide-border">
            {group.rows.map((row) => (
              <div key={`${row.sharing}-${row.boarding ?? ""}`} className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">{row.sharing}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {row.occupancy ?? row.boarding}
                  </span>
                </div>
                <span className="text-base font-bold text-foreground">
                  {priceLabel(row.price)}
                  <span className="text-xs font-medium text-muted-foreground"> / person</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    ))}

    <Reveal delay={120} className="space-y-3">
      {pkg.installments && (
        <p className="flex items-start gap-2.5 rounded-lg bg-accent/10 p-4 text-sm font-semibold text-foreground">
          <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          {pkg.installments}
        </p>
      )}
      {pkg.bookingAmount && (
        <p className="flex items-start gap-2.5 rounded-lg bg-accent/10 p-4 text-sm font-semibold text-foreground">
          <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          {pkg.bookingAmount}
        </p>
      )}
      {pkg.pricingNotes && pkg.pricingNotes.length > 0 && (
        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <p className="border-b bg-muted/40 px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Notes
          </p>
          <ul className="divide-y divide-border">
            {pkg.pricingNotes.map((note, index) => (
              <li key={index} className="flex items-start gap-3 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {note}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Reveal>

    {pkg.childPolicy && (
      <Reveal delay={80}>
        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <p className="border-b bg-muted/40 px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-accent">
            Child Policy
          </p>
          <div className="divide-y divide-border">
            {pkg.childPolicy.map((row, index) => (
              <div key={index} className="flex items-center justify-between gap-3 px-4 py-3">
                <span className="text-sm font-semibold text-foreground">{row.age}</span>
                <span className="max-w-[60%] text-right text-sm text-muted-foreground">{row.charge}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    )}
  </div>
);

/* ---------- Stay & meal + hotels ---------- */
const StaysSection = ({ pkg }: { pkg: TourPackage }) => (
  <div className="space-y-6">
    {/* Stay & Meal Plan — full width, no scrollbar */}
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <p className="border-b bg-muted/40 px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-accent">
        Stay & Meal Plan
      </p>
      <div className="divide-y divide-border">
        {pkg.stayPlan.map((row, index) => (
          <div key={index} className="flex items-center gap-4 px-4 py-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
              {row.day}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground">{row.accommodation}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              <UtensilsCrossed className="h-3 w-3 text-accent" />
              {row.meals}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Hotels — full width below */}
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <p className="border-b bg-muted/40 px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-accent">
        Hotels
      </p>
      <div className="grid gap-0 divide-y divide-border sm:grid-cols-2">
        {pkg.hotels.map((row, index) => (
          <div key={index} className="flex items-start justify-between gap-3 px-4 py-3">
            <span className="text-sm font-semibold text-foreground">
              <MapPin className="mr-1 inline h-3.5 w-3.5 text-accent align-[-2px]" />
              {row.location}
            </span>
            <span className="text-right text-sm text-muted-foreground">{row.hotels}</span>
          </div>
        ))}
      </div>
      <p className="border-t bg-muted/20 px-4 py-2.5 text-center text-xs text-muted-foreground">
        Hotels subject to availability · similar category may apply
      </p>
    </div>
  </div>
);

/* ---------- Itinerary timeline ---------- */
const ItineraryTimeline = ({ pkg }: { pkg: TourPackage }) => {
  const { ref: progressRef, progress } = useScrollProgress<HTMLDivElement>();
  const [openDay, setOpenDay] = useState<number | null>(0);
  const dayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeDay, setActiveDay] = useState(0);
  const parallaxOffsets = useTimelineParallax(dayRefs, pkg.days.length, 0.055);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        let closest = 0;
        let bestDistance = Number.POSITIVE_INFINITY;
        const viewCenter = window.innerHeight / 2;
        pkg.days.forEach((_, index) => {
          const node = dayRefs.current[index];
          if (!node) return;
          const rect = node.getBoundingClientRect();
          const distance = Math.abs(rect.top + rect.height / 2 - viewCenter);
          if (distance < bestDistance) {
            bestDistance = distance;
            closest = index;
          }
        });
        setActiveDay(closest);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, [pkg.days]);

  // Auto-open the card that scrolls into the active (centre-most) position
  useEffect(() => {
    setOpenDay(activeDay);
  }, [activeDay]);

  return (
    <div ref={progressRef} className="relative">
      {/* rail */}
      <div className="absolute left-[22px] top-2 bottom-2 w-0.5 rounded-full bg-border md:left-1/2 md:-translate-x-1/2" />
      {/* progress fill */}
      <div
        className="absolute left-[22px] top-2 w-0.5 rounded-full bg-gradient-to-b from-accent via-accent to-emerald transition-[height] duration-150 md:left-1/2 md:-translate-x-1/2"
        style={{ height: `${Math.min(Math.max(progress * 100, 0), 100)}%` }}
      />

      <div className="space-y-12">
        {pkg.days.map((day, index) => {
          const isLeft = index % 2 === 0;
          const isOpen = openDay === index;
          const isActive = activeDay === index;
          return (
            <div
              key={index}
              ref={(node) => {
                dayRefs.current[index] = node;
              }}
              className="relative"
            >
              {/* node — sits on the rail: left-[22px] on mobile, left-1/2 on desktop */}
              <button
                type="button"
                aria-label={`Toggle Day ${index + 1}`}
                onClick={() => setOpenDay(isOpen ? null : index)}
                className={cn(
                  "absolute top-8 left-[22px] z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full font-display text-lg font-bold ring-4 transition-all duration-500 md:left-1/2",
                  isActive
                    ? "scale-110 bg-emerald text-white ring-emerald/25"
                    : "bg-primary text-primary-foreground ring-accent/30 hover:scale-110"
                )}
              >
                {index + 1}
              </button>

              {/* card — parallax offset drives a subtle split-column depth effect */}
              <div
                className={cn(
                  "pl-16 md:pl-0",
                  isLeft
                    ? "md:pr-[calc(50%+3rem)]"
                    : "md:pl-[calc(50%+3rem)]"
                )}
                style={{
                  transform: `translateY(${parallaxOffsets[index] ?? 0}px)`,
                  willChange: "transform",
                }}
              >
                <Reveal direction={isLeft ? "left" : "right"} delay={index * 60}>
                  <div
                    className={cn(
                      "overflow-hidden rounded-xl border bg-card shadow-md transition-all duration-300",
                      isActive && "border-accent shadow-lg",
                      isOpen && "ring-1 ring-accent/40"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenDay(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-accent">
                          Day {index + 1}
                        </p>
                        <h3 className="font-serif text-lg font-bold text-foreground">{day.title}</h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {day.stay && day.stay !== "—" ? day.stay : "On the move"}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-foreground transition-transform duration-300",
                          isOpen && "rotate-180 bg-accent text-accent-foreground"
                        )}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </button>

                    <div
                      className={cn(
                        "grid transition-all duration-500 ease-out",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="space-y-3 border-t px-5 py-4">
                          <ul className="list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted-foreground">
                            {day.points.map((point, pointIndex) => (
                              <li key={pointIndex}>{point}</li>
                            ))}
                          </ul>
                          <p className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                            <UtensilsCrossed className="h-3.5 w-3.5" />
                            Meals: {day.meals}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ---------- Cancellation ---------- */
const CancellationSection = ({ pkg }: { pkg: TourPackage }) => (
  <div className="space-y-6">
    {/* Key points — full-width card list */}
    <Reveal>
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <ul className="divide-y divide-border">
          {pkg.cancellationPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-3 px-4 py-3.5 text-sm leading-relaxed text-muted-foreground">
              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-sunset" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>

    {/* Deduction table */}
    <Reveal delay={80}>
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <p className="border-b bg-muted/40 px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-sunset">
          Timeline before departure → Deduction
        </p>
        <div className="divide-y divide-border">
          {pkg.cancellationTable.map((row, index) => (
            <div key={index} className="flex items-center justify-between gap-3 px-4 py-3">
              <span className="text-sm text-muted-foreground">{row.before}</span>
              <span className="text-sm font-bold text-foreground">{row.deduction}</span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>

    {/* Tail notes — styled info card */}
    {pkg.cancellationTail && pkg.cancellationTail.length > 0 && (
      <Reveal delay={120}>
        <div className="overflow-hidden rounded-xl border border-sunset/30 bg-sunset/5 shadow-sm">
          <ul className="divide-y divide-sunset/10">
            {pkg.cancellationTail.map((line, index) => (
              <li key={index} className="flex items-start gap-3 px-4 py-3.5 text-sm leading-relaxed text-muted-foreground">
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-sunset/70" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    )}
  </div>
);

/* ---------- Page ---------- */
const PackageDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const pkg = tourPackages.find((item) => item.slug === slug);

  const parallaxHero = useParallax<HTMLElement>(0.4);

  if (!pkg) {
    return <Navigate to="/packages" replace />;
  }

  const heroOffset = Math.min(parallaxHero.offset, 240);
  const whatsappHref = whatsappLink(bookPackageMessage(pkg));

  const sectionLinks = [
    { id: "journey", label: "The Journey" },
    { id: "inclusions", label: "Inclusions" },
    { id: "pricing", label: "Pricing" },
    { id: "stays", label: "Stay & Meals" },
    { id: "terms", label: "Terms" },
    { id: "cancellation", label: "Cancellation" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-cream/40">
      <Seo
        title={`${pkg.title} | ${pkg.duration} | SNAV Tourism`}
        description={`${pkg.title} — ${pkg.duration}, from ${priceLabel(pkg.startingPrice)} per person. ${pkg.tagline}. Book your seat on WhatsApp.`}
        path={`/packages/${pkg.slug}`}
      />

      {/* ===== Parallax hero ===== */}
      <section ref={parallaxHero.ref} className="relative h-[68vh] min-h-[460px] overflow-hidden">
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translate3d(0, ${heroOffset}px, 0)` }}
        >
          <img src={pkg.image} alt={pkg.imageAlt} className="h-[120%] w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/55 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container mx-auto px-4 lg:px-8 pb-10">
            <Link
              to="/packages"
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              All packages
            </Link>

            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge className="bg-accent/90 text-accent-foreground">
                <Clock className="mr-1 h-3 w-3" />
                {pkg.duration}
              </Badge>
              <Badge variant="secondary" className="bg-background/20 text-white">
                <Route className="mr-1 h-3 w-3 text-accent" />
                {pkg.transport}
              </Badge>
            </div>

            <h1 className="max-w-3xl font-serif text-4xl font-bold text-white drop-shadow md:text-6xl">
              {pkg.title}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-white/85">{pkg.tagline}</p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="lg" className="gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Book on WhatsApp
                </Button>
              </a>
              <div className="rounded-xl bg-background/15 px-5 py-2.5 backdrop-blur-sm">
                <p className="text-xs text-white/70">Starting from</p>
                <p className="text-2xl font-bold text-white">
                  {priceLabel(pkg.startingPrice)}
                  <span className="text-sm font-medium text-white/70"> / person</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Sticky section nav ===== */}
      <nav className="sticky top-0 z-30 border-b bg-background/85 backdrop-blur-md">
        <div className="container mx-auto flex gap-2 overflow-x-auto px-4 py-3 lg:px-8">
          {sectionLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollTo(link.id)}
              className="shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {link.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ===== Summary strip ===== */}
      <div className="container mx-auto px-4 lg:px-8 py-10">
        <Reveal>
          <div className="grid gap-4 rounded-2xl border bg-card p-6 shadow-sm sm:grid-cols-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-accent">The route</p>
              <p className="mt-1 text-sm font-semibold text-foreground">{pkg.route.join(" → ")}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-accent">Highlights</p>
              <ul className="mt-1 space-y-0.5">
                {pkg.highlights.slice(0, 3).map((highlight, index) => (
                  <li key={index} className="text-sm text-muted-foreground">• {highlight}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-accent">Activities</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {pkg.activities.map((activity) => (
                  <Badge key={activity} variant="secondary" className="gap-1">
                    <Sparkles className="h-3 w-3 text-accent" />
                    {activity}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ===== Itinerary timeline ===== */}
        <section id="journey" className="scroll-mt-24 pt-16">
          <SectionHeading
            icon={<MapPin className="h-5 w-5" />}
            kicker="Day by day"
            title="The Journey"
          />
          <ItineraryTimeline pkg={pkg} />
        </section>

        {/* ===== Inclusions / Exclusions ===== */}
        <section id="inclusions" className="scroll-mt-24 pt-20">
          <SectionHeading
            icon={<ListChecks className="h-5 w-5" />}
            kicker="What's covered"
            title="Inclusions & Exclusions"
          />
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <Reveal className="mb-4">
                <h3 className="flex items-center gap-2 font-serif text-xl font-bold text-foreground">
                  <ShieldCheck className="h-5 w-5 text-emerald" />
                  Inclusions
                </h3>
              </Reveal>
              <CheckList items={pkg.inclusions} />
            </div>
            <div>
              <Reveal className="mb-4">
                <h3 className="flex items-center gap-2 font-serif text-xl font-bold text-foreground">
                  <Flame className="h-5 w-5 text-sunset" />
                  Exclusions
                </h3>
              </Reveal>
              <CheckList items={pkg.exclusions} color="sunset" />
            </div>
          </div>
          {pkg.notes && (
            <Reveal delay={80} className="mt-10">
              <div className="rounded-2xl border border-accent/30 bg-accent/10 p-6">
                <h4 className="mb-3 font-serif text-lg font-bold text-foreground">Good to know</h4>
                <ul className="space-y-1.5">
                  {pkg.notes.map((note, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </section>

        {/* ===== Pricing ===== */}
        <section id="pricing" className="scroll-mt-24 pt-20">
          <SectionHeading
            icon={<Tag className="h-5 w-5" />}
            kicker="Transparent rates"
            title="Pricing"
          />
          <PricingTable pkg={pkg} />
        </section>

        {/* ===== Stay & meals ===== */}
        <section id="stays" className="scroll-mt-24 pt-20">
          <SectionHeading
            icon={<BedDouble className="h-5 w-5" />}
            kicker="Where you'll rest"
            title="Stay & Meals"
          />
          <StaysSection pkg={pkg} />
        </section>

        {/* ===== Terms ===== */}
        <section id="terms" className="scroll-mt-24 pt-20">
          <SectionHeading
            icon={<Hammer className="h-5 w-5" />}
            kicker="The fine print"
            title="Terms & Conditions"
          />
          <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
            <ul className="divide-y divide-border">
              {pkg.terms.map((term, index) => (
                <Reveal key={index} delay={index * 30} as="li">
                  <li className="flex items-start gap-4 px-4 py-3.5">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                      {index + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{term}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ===== Cancellation ===== */}
        <section id="cancellation" className="scroll-mt-24 pt-20">
          <SectionHeading
            icon={<XCircle className="h-5 w-5" />}
            kicker="Plan with clarity"
            title="Cancellation Policy"
          />
          <CancellationSection pkg={pkg} />
        </section>

        {/* ===== Final CTA ===== */}
        <section className="pt-24">
          <Reveal direction="zoom">
            <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-14 text-center">
              <img
                src={pkg.image}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary to-primary/40" />
              <div className="relative">
                <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
                  Ready to take this journey?
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-white/80">
                  Seats on each batch are limited. Message us on WhatsApp and we'll hold a spot for you.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                    <Button variant="whatsapp" size="lg" className="gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Book {pkg.shortDuration} on WhatsApp
                    </Button>
                  </a>
                </div>
                <p className="mt-6 flex items-center justify-center gap-2 text-sm text-white/70">
                  <Phone className="h-4 w-4 text-accent" />
                  Or call {BOOKING_CONTACTS.join(" · ")}
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
};

export default PackageDetail;