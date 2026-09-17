import { useState } from "react";
import { Loader2, MapPin, RefreshCw, Send, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TripItinerary } from "./types";

interface ItineraryPanelProps {
  itinerary: TripItinerary;
  generating: boolean;
  onRefine: (hint: string) => void;
  onConfirm: () => void;
}

export const ItineraryPanel = ({ itinerary, generating, onRefine, onConfirm }: ItineraryPanelProps) => {
  const [hint, setHint] = useState("");

  const refine = (event: React.FormEvent) => {
    event.preventDefault();
    const value = hint.trim();
    if (!value || generating) return;
    setHint("");
    onRefine(value);
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
        <div className="border-b bg-muted/40 px-6 py-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="gap-1">
              <MapPin className="h-3 w-3" />
              Your travel plan
            </Badge>
            {itinerary.seasonNote && <Badge variant="secondary">Season note</Badge>}
          </div>
          <h3 className="mt-3 font-serif text-2xl font-bold text-foreground">{itinerary.title}</h3>
          {itinerary.vibe && <p className="mt-1 font-serif italic text-accent">{itinerary.vibe}</p>}
          {itinerary.overview && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{itinerary.overview}</p>}
        </div>

        <ol className="divide-y divide-border">
          {itinerary.days.map((day) => (
            <li key={day.day} className="flex gap-4 px-6 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {day.day}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold uppercase tracking-wide text-accent">{day.title}</p>
                <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
                  {day.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
                {day.stay && (
                  <p className="mt-1.5 text-sm text-emerald-700">
                    <strong>Stay:</strong> {day.stay}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>

        <div className="space-y-3 border-t bg-muted/30 px-6 py-4">
          {itinerary.budgetEstimate && (
            <p className={cn("flex items-start gap-2 text-sm font-semibold text-emerald-700")}>
              <Wallet className="mt-0.5 h-4 w-4 shrink-0" />
              {itinerary.budgetEstimate}
            </p>
          )}
          {itinerary.notes?.length > 0 && (
            <ul className="list-disc space-y-1 pl-5 text-xs leading-relaxed text-muted-foreground">
              {itinerary.notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <form
        onSubmit={refine}
        className="flex flex-col gap-2 rounded-2xl border bg-background p-4 shadow-sm sm:flex-row"
      >
        <Input
          value={hint}
          onChange={(event) => setHint(event.target.value)}
          placeholder="Make it more yours… e.g. slower mornings, a houseboat night, 5-star stays"
          disabled={generating}
          className="flex-1"
        />
        <Button type="submit" disabled={!hint.trim() || generating} className="gap-2">
          {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          {generating ? "Reworking…" : "Refine"}
        </Button>
      </form>

      <Button onClick={onConfirm} disabled={generating} className="w-full gap-2">
        <Send className="h-4 w-4" />
        Looks good — share my brief
      </Button>
    </div>
  );
};