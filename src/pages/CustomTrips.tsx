import { useEffect, useState } from "react";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TripChat } from "@/components/trips/TripChat";
import { ItineraryPanel } from "@/components/trips/ItineraryPanel";
import { TripContact } from "@/components/trips/TripContact";
import { toast } from "sonner";
import { ChevronLeft, RotateCcw, Sparkles } from "lucide-react";
import type { ChatMessage, TripItinerary, TripProfile } from "@/components/trips/types";

const STORAGE_KEY = "snav-custom-trip-v1";

interface PersistedState {
  messages: ChatMessage[];
  profile: Partial<TripProfile>;
  readyForItinerary: boolean;
  itinerary: TripItinerary | null;
  phase: "chat" | "preview" | "contact";
}

const greeting: ChatMessage = {
  role: "assistant",
  content:
    "Namaste! I'm Aria, your SNAV trip designer. Let's shape a trip that feels like you — a destination, a season, a few days, or just the start of a dream all work. What's on your mind?",
};

const freshState = (): PersistedState => ({
  messages: [greeting],
  profile: {},
  readyForItinerary: false,
  itinerary: null,
  phase: "chat",
});

const loadState = (): PersistedState => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<PersistedState>;
      if (parsed && Array.isArray(parsed.messages) && parsed.messages.length > 0) {
        return {
          messages: parsed.messages,
          profile: parsed.profile ?? {},
          readyForItinerary: Boolean(parsed.readyForItinerary),
          itinerary: parsed.itinerary ?? null,
          phase: parsed.phase === "preview" || parsed.phase === "contact" ? parsed.phase : "chat",
        };
      }
    }
  } catch {
    // ignore corrupted storage
  }
  return freshState();
};

const phases = ["Discover", "Your plan", "Share"];
const phaseIndex = (phase: PersistedState["phase"]): number => (phase === "chat" ? 0 : phase === "preview" ? 1 : 2);

const buildWhatsAppSummary = (
  profile: Partial<TripProfile>,
  itinerary: TripItinerary,
  contact: { name: string; phone: string; email: string }
): string =>
  [
    "Custom Trip Request",
    profile.destination ? `Destinations: ${profile.destination}` : "",
    profile.month ? `Time of year: ${profile.month}` : "",
    profile.durationDays ? `Duration: ${profile.durationDays} day(s)` : "",
    profile.travelers ? `Travelers: ${profile.travelers}${profile.travelerNote ? ` (${profile.travelerNote})` : ""}` : "",
    profile.budgetPerPerson ? `Budget: Rs. ${profile.budgetPerPerson.toLocaleString("en-IN")} per person` : "",
    profile.interests.length > 0 ? `Interests: ${profile.interests.join(", ")}` : "",
    profile.occasion ? `Occasion: ${profile.occasion}` : "",
    `Plan: ${itinerary.title} (${itinerary.days.length} days)`,
    "---",
    `Name: ${contact.name}`,
    `Phone: ${contact.phone}`,
    `Email: ${contact.email}`,
  ]
    .filter(Boolean)
    .join("\n");

const CustomTrips = () => {
  const [state, setState] = useState<PersistedState>(loadState);
  const [sending, setSending] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage full or unavailable — chat still works
    }
  }, [state]);

  const handleSend = async (content: string) => {
    const messages: ChatMessage[] = [...state.messages, { role: "user", content }];
    setState((current) => ({ ...current, messages }));
    setSending(true);
    try {
      const response = await fetch("/api/custom-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "chat", messages }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        reply?: string;
        profile?: Partial<TripProfile>;
        readyForItinerary?: boolean;
      };
      if (response.ok && data.reply) {
        setState((current) => ({
          ...current,
          messages: [...messages, { role: "assistant", content: data.reply as string }],
          profile: { ...current.profile, ...(data.profile ?? {}) },
          readyForItinerary: Boolean(data.readyForItinerary),
        }));
      } else {
        toast.error("Aria lost her train of thought — please try sending that again.");
      }
    } catch {
      toast.error("We couldn't reach Aria just now. Please try again in a moment.");
    } finally {
      setSending(false);
    }
  };

  const generateItinerary = async (refineHint?: string) => {
    setGenerating(true);
    try {
      const response = await fetch("/api/custom-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "preview", profile: state.profile, refineHint }),
      });
      const data = (await response.json()) as { ok?: boolean; itinerary?: TripItinerary };
      if (response.ok && data.itinerary) {
        setState((current) => ({ ...current, itinerary: data.itinerary as TripItinerary, phase: "preview" }));
      } else {
        toast.error("The itinerary draft didn't come together. Mind trying once more?");
      }
    } catch {
      toast.error("We couldn't draft your plan just now. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async (contact: { name: string; phone: string; email: string }) => {
    if (!state.itinerary) return;
    setIsSubmitting(true);
    const summary = buildWhatsAppSummary(state.profile, state.itinerary, contact);
    window.open(`https://wa.me/8652885584?text=${encodeURIComponent(summary)}`, "_blank");

    try {
      const response = await fetch("/api/custom-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "submit",
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          profile: state.profile,
          itinerary: state.itinerary,
          transcript: state.messages,
        }),
      });
      if (response.ok) {
        toast.success("Trip brief sent to our team! We'll get back to you within 24 hours.");
      } else {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        toast.warning(data?.error ?? "Your WhatsApp message opened — the email copy couldn't be sent. We'll text you back.");
      }
    } catch {
      toast.warning("Your WhatsApp message opened — the email copy couldn't be sent. We'll text you back.");
    } finally {
      setIsSubmitting(false);
      setState(freshState());
    }
  };

  const handleReset = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setState(freshState());
    toast.message("Fresh start — a new blank slate.");
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <Seo
        title="Custom Trip Builder | SNAV Tourism"
        description="Design your own India itinerary with SNAV Tourism's AI trip designer. Chat with Aria, refine your day-by-day plan, and get it confirmed by our experts."
        path="/custom-trips"
      />
      <div className="container mx-auto max-w-3xl px-4 lg:px-8">
        <div className="mb-10 text-center animate-fade-in-up">
          <h1 className="mb-4 font-serif text-4xl font-bold text-foreground md:text-5xl">
            Build Your Custom Trip
          </h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Chat with Aria, our AI trip designer. Describe the trip you're dreaming of and refine a one-of-a-kind plan before our experts make it real.
          </p>
        </div>

        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-accent">{phases[phaseIndex(state.phase)]}</span>
            <Button variant="ghost" size="sm" onClick={handleReset} disabled={sending || generating || isSubmitting} className="gap-1.5">
              <RotateCcw className="h-3.5 w-3.5" />
              Start over
            </Button>
          </div>
          <Progress value={((phaseIndex(state.phase) + 1) / phases.length) * 100} className="h-2" />
        </div>

        <Card className="shadow-md animate-fade-in-up">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-serif">
              {state.phase === "chat" && "Tell Aria about your dream trip"}
              {state.phase === "preview" && "Your personalized plan"}
              {state.phase === "contact" && "Where should we send it?"}
            </CardTitle>
            <CardDescription>
              {state.phase === "chat" && "Answer in your own words — Aria will ask follow-ups one at a time."}
              {state.phase === "preview" && "This is just a first draft. Tell Aria how to shape it."}
              {state.phase === "contact" && "Our experts will review your brief and get back to you within 24 hours."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {state.phase === "chat" && (
              <TripChat
                messages={state.messages}
                sending={sending}
                readyForItinerary={state.readyForItinerary}
                generating={generating}
                profile={state.profile}
                onSend={handleSend}
                onGenerate={() => generateItinerary()}
                onReset={handleReset}
              />
            )}
            {state.phase === "preview" && state.itinerary && (
              <ItineraryPanel
                itinerary={state.itinerary}
                generating={generating}
                onRefine={(hint) => generateItinerary(hint)}
                onConfirm={() => setState((current) => ({ ...current, phase: "contact" }))}
              />
            )}
            {state.phase === "contact" && state.itinerary && (
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => setState((current) => ({ ...current, phase: "preview" }))}
                  disabled={isSubmitting}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back to your plan
                </Button>
                <TripContact
                  itinerary={state.itinerary}
                  profile={state.profile}
                  isSubmitting={isSubmitting}
                  onBack={() => setState((current) => ({ ...current, phase: "preview" }))}
                  onSubmit={handleSubmit}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {state.phase !== "chat" && state.itinerary && (
          <p className="mt-6 flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-accent" />
            Drafted by SNAV's AI, perfected by our experts.
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomTrips;