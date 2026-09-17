import { useState } from "react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "submitting" | "success" | "error";

interface NewsletterFormProps {
  variant?: "hero" | "footer";
}

const NewsletterForm = ({ variant = "hero" }: NewsletterFormProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!/.+@.+\..+/.test(trimmed)) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      if (response.ok) {
        const data = (await response.json().catch(() => null)) as { alreadySubscribed?: boolean } | null;
        if (data?.alreadySubscribed) {
          setStatus("success");
          setMessage("You're already on our list — welcome back!");
        } else {
          setStatus("success");
          setMessage("Successfully subscribed! Check your inbox for a welcome email.");
        }
        setEmail("");
      } else {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setStatus("error");
        setMessage(data?.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the newsletter service right now. Please try again.");
    }
  };

  const isFooter = variant === "footer";

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`flex flex-col ${isFooter ? "gap-2" : "sm:flex-row gap-4 max-w-xl mx-auto"}`}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          disabled={status === "submitting"}
          aria-label="Email address for newsletter"
          className={`${
            isFooter
              ? "flex-1 px-4 py-2.5 rounded-lg bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
              : "flex-1 px-6 py-4 rounded-lg bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
          }`}
        />
        <Button
          variant="hero"
          type="submit"
          disabled={status === "submitting"}
          size={isFooter ? "default" : "lg"}
          className={isFooter ? "" : "px-8"}
        >
          {status === "submitting" ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>
      {message && (
        <p
          className={`text-sm mt-3 font-semibold ${
            status === "success" ? "text-green-300" : "text-red-300"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default NewsletterForm;