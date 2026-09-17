import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Loader2,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ChatMessage, TripProfile } from "./types";

interface TripChatProps {
  messages: ChatMessage[];
  sending: boolean;
  readyForItinerary: boolean;
  generating: boolean;
  profile: Partial<TripProfile>;
  onSend: (content: string) => void;
  onGenerate: () => void;
  onReset: () => void;
}

const profileChips = (profile: Partial<TripProfile>): string[] => {
  const chips: string[] = [];
  if (profile.destination) chips.push(profile.destination);
  if (profile.month) chips.push(profile.month);
  if (profile.durationDays) chips.push(`${profile.durationDays} days`);
  if (profile.travelers) chips.push(`${profile.travelers} traveler${profile.travelers > 1 ? "s" : ""}`);
  if (profile.budgetPerPerson) chips.push(`Rs. ${profile.budgetPerPerson.toLocaleString("en-IN")}/person`);
  if (profile.interests.length) chips.push(profile.interests.slice(0, 3).join(", "));
  if (profile.occasion) chips.push(profile.occasion);
  return chips.slice(0, 5);
};

export const TripChat = ({
  messages,
  sending,
  readyForItinerary,
  generating,
  profile,
  onSend,
  onGenerate,
  onReset,
}: TripChatProps) => {
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const content = draft.trim();
    if (!content || sending || generating) return;
    setDraft("");
    onSend(content);
  };

  const chips = profileChips(profile);

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border bg-background shadow-sm">
        <div
          ref={scrollRef}
          className="flex max-h-[420px] min-h-[320px] flex-col gap-3 overflow-y-auto p-4"
        >
          {messages.map((message, index) => (
            <div
              key={`${index}-${message.role}`}
              className={cn(
                "flex items-start gap-2 animate-fade-in-up",
                message.role === "user" && "flex-row-reverse"
              )}
            >
              <span
                className={cn(
                  "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                  message.role === "assistant"
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground"
                )}
              >
                {message.role === "assistant" ? <Bot className="h-4 w-4" /> : <UserRound className="h-4 w-4" />}
              </span>
              <div
                className={cn(
                  "max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                  message.role === "assistant"
                    ? "bg-muted text-foreground"
                    : "bg-accent text-accent-foreground"
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
          {sending && (
            <div className="flex items-start gap-2 animate-fade-in-up">
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </span>
              <div className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Aria is thinking…
              </div>
            </div>
          )}
        </div>

        {chips.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 border-t px-4 py-2.5">
            <span className="mr-1 text-xs text-muted-foreground">So far:</span>
            {chips.map((chip) => (
              <Badge key={chip} variant="secondary" className="text-xs">
                {chip}
              </Badge>
            ))}
          </div>
        )}

        <form onSubmit={submit} className="flex items-center gap-2 border-t p-3">
          <Input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Tell Aria what you're dreaming of…"
            disabled={sending || generating}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!draft.trim() || sending || generating} aria-label="Send message">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        {readyForItinerary ? (
          <Button onClick={onGenerate} disabled={generating} className="gap-2">
            <Sparkles className="h-4 w-4" />
            {generating ? "Crafting your itinerary…" : "Generate my itinerary"}
          </Button>
        ) : (
          <p className="text-sm text-muted-foreground">
            Keep chatting and I'll know when we're ready to draft your itinerary.
          </p>
        )}
        <Button variant="ghost" size="sm" onClick={onReset} disabled={sending}>
          Start over
        </Button>
      </div>
    </div>
  );
};