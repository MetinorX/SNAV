export interface TripProfile {
  destination: string;
  month: string;
  durationDays?: number;
  travelers?: number;
  travelerNote: string;
  budgetPerPerson?: number;
  interests: string[];
  occasion: string;
  pace: string;
  style: string;
  needs: string[];
}

export interface TripDay {
  day: number;
  title: string;
  highlights: string[];
  stay?: string;
}

export interface TripItinerary {
  title: string;
  vibe: string;
  overview: string;
  seasonNote: string;
  days: TripDay[];
  budgetEstimate: string;
  notes: string[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}