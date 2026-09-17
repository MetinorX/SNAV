import { useState } from "react";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { CalendarDays, ChevronLeft, ChevronRight, Minus, Plus, Send, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const destinationOptions = [
  "Uttarakhand",
  "Manali",
  "Kashmir",
  "Rajasthan",
  "Golden Temple · Amritsar",
  "Kerala",
  "Tamil Nadu",
  "Goa",
];

const interestOptions = [
  "Adventure",
  "Heritage",
  "Beaches",
  "Spiritual",
  "Wildlife",
  "Luxury",
  "Honeymoon",
  "Food",
];

const durationOptions = [
  { value: "3", label: "3 days" },
  { value: "5", label: "5 days" },
  { value: "7", label: "7 days" },
  { value: "10", label: "10 days" },
  { value: "14", label: "14 days" },
];

const TOTAL_STEPS = 5;
const MIN_BUDGET = 10000;
const MAX_BUDGET = 250000;

interface ContactInfo {
  name: string;
  phone: string;
  email: string;
  notes: string;
}

const emptyContact: ContactInfo = { name: "", phone: "", email: "", notes: "" };

const CustomTrips = () => {
  const [step, setStep] = useState(1);
  const [destinations, setDestinations] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [duration, setDuration] = useState("7");
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState(50000);
  const [interests, setInterests] = useState<string[]>([]);
  const [contact, setContact] = useState<ContactInfo>(emptyContact);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleInList = (list: string[], value: string, setList: (next: string[]) => void) => {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  };

  const emailValidCheck = (value: string) => /.+@.+\..+/.test(value);

  const canProceed = (): boolean => {
    if (step === 1) return destinations.length > 0;
    if (step === 2) return Boolean(startDate);
    if (step === 3) return travelers >= 1 && budget >= MIN_BUDGET;
    if (step === 4) return interests.length > 0;
    if (step === 5) {
      const nameValid = contact.name.trim().length >= 2;
      const phoneValid = /^[6-9]\d{9}$/.test(contact.phone.trim());
      const emailValid = emailValidCheck(contact.email.trim());
      return nameValid && phoneValid && emailValid;
    }
    return false;
  };

  const handleNext = () => {
    if (!canProceed()) {
      toast.error("Please complete the required fields for this step.");
      return;
    }
    setStep((current) => Math.min(current + 1, TOTAL_STEPS));
  };

  const handleBack = () => setStep((current) => Math.max(current - 1, 1));

  const buildSummary = (): string => {
    return [
      "Custom Trip Request",
      `Destinations: ${destinations.join(", ")}`,
      `Start date: ${startDate ? startDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Flexible"}`,
      `Duration: ${duration} day(s)`,
      `Travelers: ${travelers}`,
      `Budget: Rs. ${budget.toLocaleString("en-IN")} per person`,
      `Interests: ${interests.join(", ") || "Not specified"}`,
      "---",
      `Name: ${contact.name}`,
      `Phone: ${contact.phone}`,
      `Email: ${contact.email}`,
      contact.notes.trim() ? `Notes: ${contact.notes.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const summary = buildSummary();

    window.open(`https://wa.me/8652885584?text=${encodeURIComponent(summary)}`, "_blank");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          subject: "Custom Trip Request",
          message: summary,
        }),
      });
      if (response.ok) {
        toast.success("Trip brief sent! We'll get back to you within 24 hours.");
      } else {
        toast.warning("Your WhatsApp message opened — the email copy couldn't be sent. We'll text you back.");
      }
    } catch {
      toast.warning("Your WhatsApp message opened — the email copy couldn't be sent. We'll text you back.");
    } finally {
      setIsSubmitting(false);
      setDestinations([]);
      setStartDate(undefined);
      setDuration("7");
      setTravelers(2);
      setBudget(50000);
      setInterests([]);
      setContact(emptyContact);
      setStep(1);
    }
  };

  const stepLabels = ["Destinations", "Plan details", "Travelers & budget", "Interests", "Contact"];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <Seo
        title="Custom Trip Builder | SNAV Tourism"
        description="Design your own India itinerary with SNAV Tourism's custom trip builder. Choose destinations, dates, travelers, budget and interests - get a personalized plan on WhatsApp."
        path="/custom-trips"
      />
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <div className="text-center mb-10 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Build Your Custom Trip
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Five quick steps. Tell us what you love, and our experts will craft the perfect itinerary.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-accent">
              Step {step} of {TOTAL_STEPS}
            </span>
            <span className="text-sm text-muted-foreground">{stepLabels[step - 1]}</span>
          </div>
          <Progress value={(step / TOTAL_STEPS) * 100} className="h-2" />
        </div>

        <Card className="shadow-md animate-fade-in-up">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-serif">{stepLabels[step - 1]}</CardTitle>
            <CardDescription>
              {step === 1 && "Pick one or more destinations for your journey."}
              {step === 2 && "When would you like to go, and for how long?"}
              {step === 3 && "Who's coming along, and how much per person?"}
              {step === 4 && "What kind of experiences matter most to you?"}
              {step === 5 && "Where should we send your personalized plan?"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="flex flex-wrap gap-3">
                {destinationOptions.map((destination) => {
                  const active = destinations.includes(destination);
                  return (
                    <button
                      key={destination}
                      type="button"
                      onClick={() => toggleInList(destinations, destination, setDestinations)}
                      aria-pressed={active}
                      className={cn(
                        "px-4 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer",
                        active
                          ? "bg-primary text-primary-foreground border-primary shadow-md"
                          : "bg-background text-foreground border-border hover:border-accent hover:text-accent"
                      )}
                    >
                      {destination}
                    </button>
                  );
                })}
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-8">
                <div className="space-y-3">
                  <Label>Preferred start date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start gap-2 font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarDays className="h-4 w-4" />
                        {startDate
                          ? startDate.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        disabled={{ before: new Date() }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-3">
                  <Label>Duration</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="How many days?" />
                    </SelectTrigger>
                    <SelectContent>
                      {durationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-10">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Travelers</Label>
                    <span className="text-sm font-semibold text-accent">{travelers}</span>
                  </div>
                  <div className="flex items-center gap-8 justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setTravelers((count) => Math.max(1, count - 1))}
                      aria-label="Remove a traveler"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2 text-2xl font-bold">
                      <Users className="h-6 w-6 text-accent" />
                      {travelers}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setTravelers((count) => Math.min(20, count + 1))}
                      aria-label="Add a traveler"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Budget per person</Label>
                    <span className="text-sm font-semibold text-accent">
                      Rs. {budget.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <Slider
                    value={[budget]}
                    onValueChange={(values) => setBudget(values[0])}
                    min={MIN_BUDGET}
                    max={MAX_BUDGET}
                    step={5000}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Rs. {MIN_BUDGET.toLocaleString("en-IN")}</span>
                    <span>Rs. {MAX_BUDGET.toLocaleString("en-IN")}+</span>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-wrap gap-3">
                {interestOptions.map((interest) => {
                  const active = interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInList(interests, interest, setInterests)}
                      aria-pressed={active}
                      className={cn(
                        "px-4 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer",
                        active
                          ? "bg-accent text-accent-foreground border-accent shadow-md"
                          : "bg-background text-foreground border-border hover:border-accent hover:text-accent"
                      )}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            )}

            {step === 5 && (
              <div className="grid gap-5">
                <div className="space-y-2">
                  <Label htmlFor="trip-name">Your name *</Label>
                  <Input
                    id="trip-name"
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="trip-phone">Phone (WhatsApp) *</Label>
                    <Input
                      id="trip-phone"
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => setContact({ ...contact, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                      placeholder="10-digit mobile number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trip-email">Email *</Label>
                    <Input
                      id="trip-email"
                      type="email"
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trip-notes">Anything else?</Label>
                  <Textarea
                    id="trip-notes"
                    value={contact.notes}
                    onChange={(e) => setContact({ ...contact, notes: e.target.value })}
                    placeholder="Dietary needs, hotel preferences, special occasions..."
                    className="min-h-[110px]"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          {step < TOTAL_STEPS ? (
            <Button onClick={handleNext} className="gap-2">
              Continue
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2">
              <Send className="h-4 w-4" />
              {isSubmitting ? "Sending..." : "Send via WhatsApp"}
            </Button>
          )}
        </div>

        {step === 5 && (
          <div className="mt-6 space-y-2 rounded-xl bg-muted p-5 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">Your request summary</p>
            {buildSummary()
              .split("\n")
              .filter(Boolean)
              .map((line) => (
                <div key={line} className="flex items-start gap-2">
                  <Badge className="mt-1.5 h-1.5 w-1.5 rounded-full p-0" />
                  <span>{line}</span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomTrips;