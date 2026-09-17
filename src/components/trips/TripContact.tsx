import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import type { TripItinerary, TripProfile } from "./types";

interface TripContactProps {
  itinerary: TripItinerary;
  profile: Partial<TripProfile>;
  isSubmitting: boolean;
  onBack: () => void;
  onSubmit: (contact: { name: string; phone: string; email: string }) => void;
}

const emailValidCheck = (value: string) => /.+@.+\..+/.test(value);

export const TripContact = ({ itinerary, profile, isSubmitting, onBack, onSubmit }: TripContactProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nameValid = name.trim().length >= 2;
    const phoneValid = /^[6-9]\d{9}$/.test(phone.trim());
    const emailValid = emailValidCheck(email.trim());
    if (!nameValid || !phoneValid || !emailValid) {
      toast.error("Please add your name, a valid 10-digit WhatsApp number and email.");
      return;
    }
    onSubmit({ name: name.trim(), phone: phone.trim(), email: email.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="ct-name">Your name *</Label>
        <Input id="ct-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Priya Sharma" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="ct-phone">Phone (WhatsApp) *</Label>
          <Input
            id="ct-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="10-digit mobile number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ct-email">Email *</Label>
          <Input
            id="ct-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">
        <p className="mb-2 font-semibold text-foreground">Your request summary</p>
        <ul className="list-disc space-y-1 pl-5">
          {profile.destination && <li>Destinations: {profile.destination}</li>}
          {profile.month && <li>Time of year: {profile.month}</li>}
          {profile.durationDays && <li>Duration: {profile.durationDays} day(s)</li>}
          {profile.travelers && <li>Travelers: {profile.travelers}{profile.travelerNote ? ` (${profile.travelerNote})` : ""}</li>}
          {profile.budgetPerPerson && (
            <li>Budget: Rs. {profile.budgetPerPerson.toLocaleString("en-IN")} per person</li>
          )}
          {profile.interests.length > 0 && <li>Interests: {profile.interests.join(", ")}</li>}
          {profile.occasion && <li>Occasion: {profile.occasion}</li>}
          <li>Plan: {itinerary.title} — {itinerary.days.length} day(s)</li>
        </ul>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
          Back
        </Button>
        <Button type="submit" disabled={isSubmitting} className="gap-2">
          <Send className="h-4 w-4" />
          {isSubmitting ? "Sending…" : "Send my brief"}
        </Button>
      </div>
    </form>
  );
};