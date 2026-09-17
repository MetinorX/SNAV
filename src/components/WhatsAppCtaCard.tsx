import { CalendarClock, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { whatsappLink, type WhatsAppCard } from "@/data/packages";
import { Reveal } from "@/components/Reveal";

interface WhatsAppCtaCardProps {
  card: WhatsAppCard;
  index?: number;
}

const WhatsAppCtaCard = ({ card, index = 0 }: WhatsAppCtaCardProps) => {
  return (
    <Reveal delay={index * 120} className="h-full">
      <div className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-card shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        <div className="relative h-44 overflow-hidden">
          <img
            src={card.image}
            alt={card.imageAlt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
          <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-primary-foreground">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold">{card.title}</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <p className="text-sm leading-relaxed text-muted-foreground">{card.description}</p>
          <div className="mt-auto flex flex-col gap-3">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-accent">
              <CalendarClock className="h-4 w-4" />
              {card.cta}
            </p>
            <a
              href={whatsappLink(card.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="whatsapp" size="default" className="w-full gap-2">
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </Button>
            </a>
            <p className="text-center text-xs text-muted-foreground">
              Dates, batches & prices shared directly on chat
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default WhatsAppCtaCard;