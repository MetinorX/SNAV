import type { NewsletterData, TripProfile, TripItinerary } from "./ai.js";

export const escapeHtml = (value: unknown): string => {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
};

const NAVY = "#151E2E";
const GOLD = "#DFAC2A";
const EMERALD = "#28624E";
const MUTED = "#52617A";
const CREAM = "#F6F2E9";
const BEIGE = "#E7DDCB";
const DISC = "#0B0E14";
const LOGO_URL = "https://snavtourism.com/logo.png";

const FONT_DISPLAY = "'Bebas Neue',Impact,'Arial Narrow',sans-serif";
const FONT_SERIF = "'Playfair Display',Georgia,'Times New Roman',serif";
const FONT_SANS = "Inter,Arial,Helvetica,sans-serif";

const FONTS_LINK = `<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet" />`;

const headerHtml = (): string => {
  return `<tr>
    <td align="center" style="background-color:${NAVY};padding:32px 24px 26px;">
      <img src="${LOGO_URL}" alt="SNAV Tourism" width="112" height="112" style="display:block;width:112px;height:112px;border-radius:50%;background-color:${DISC};border:3px solid ${GOLD};padding:8px;margin:0 auto 18px;" />
      <div style="font-family:${FONT_DISPLAY};font-size:34px;line-height:1.1;font-weight:400;letter-spacing:3px;color:#ffffff;">SNAV <span style="color:${GOLD};">TOURISM</span></div>
      <div style="font-family:${FONT_SANS};font-size:11px;color:#AAB6C4;margin-top:8px;letter-spacing:3px;text-transform:uppercase;">Premium India Travel Experiences</div>
      <div style="height:3px;width:56px;background-color:${GOLD};margin:18px auto 0;border-radius:2px;"></div>
    </td>
  </tr>`;
};

const shell = (body: string, footerHtml: string): string => {
  return `<!doctype html>
<html>
  <head>
    ${FONTS_LINK}
  </head>
  <body style="margin:0;padding:0;background-color:${CREAM};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${CREAM};padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;font-family:${FONT_SANS};color:${NAVY};">
            ${headerHtml()}
            <tr>
              <td style="padding:32px 28px;">
                ${body}
              </td>
            </tr>
            <tr>
              <td style="background-color:${CREAM};padding:24px 28px;border-top:1px solid ${BEIGE};">
                ${footerHtml}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

const shareFooter = (): string => {
  return `<p style="margin:0 0 10px;font-family:${FONT_SERIF};font-size:15px;font-weight:700;color:${NAVY};">SNAV Tourism</p>
  <p style="margin:0 0 6px;font-family:${FONT_SANS};font-size:12px;line-height:1.7;color:${MUTED};">
    Gopi Cine Mall, 210, Dombivli West, Maharashtra<br />
    +91 8652885584 · snavtourism@gmail.com
  </p>
  <p style="margin:0 0 10px;font-family:${FONT_SANS};font-size:12px;line-height:1.7;color:${MUTED};">
    WhatsApp: <a href="https://wa.me/918652885584" target="_blank" style="color:${GOLD};text-decoration:none;">Chat with us</a>
    &nbsp;·&nbsp; Facebook: <a href="https://www.facebook.com/p/SNAV-Tourism-100075677268291/" target="_blank" style="color:${GOLD};text-decoration:none;">SNAV Tourism</a>
    &nbsp;·&nbsp; Instagram: <a href="https://www.instagram.com/snav_tourism" target="_blank" style="color:${GOLD};text-decoration:none;">@snav_tourism</a>
  </p>
  <p style="margin:0;font-family:${FONT_SANS};font-size:11px;line-height:1.6;color:#94A3B8;">
    You are receiving this email because you subscribed at snavtourism.com.
    <br />To unsubscribe at any time, <a href="mailto:snavtourism@gmail.com?subject=Unsubscribe" style="color:${GOLD};">contact us here</a>.
  </p>`;
};

export const welcomeEmailHtml = (email: string): string => {
  void email;
  const body = `
    <h1 style="margin:0 0 18px;font-family:${FONT_SERIF};font-size:24px;font-weight:700;color:${NAVY};">Welcome to the SNAV Family! 💙🌍</h1>
    <p style="margin:0 0 16px;font-family:${FONT_SANS};font-size:15px;line-height:1.7;color:${MUTED};">
      Thank you for choosing to stay connected with <strong style="color:${NAVY};">SNAV Tourism</strong>!
    </p>
    <p style="margin:0 0 16px;font-family:${FONT_SANS};font-size:15px;line-height:1.7;color:${MUTED};">
      We're excited to have you with us. From hidden gems and beautiful destinations to unforgettable experiences, travel inspiration, and special offers, we'll be sharing a little something to make your next journey even more memorable.
    </p>
    <p style="margin:0 0 16px;font-family:${FONT_SANS};font-size:15px;line-height:1.7;color:${MUTED};">
      Whether you're dreaming about your next getaway, planning an adventure, or simply love discovering new places — <strong style="color:${NAVY};">we're here to travel with you.</strong> ✈️
    </p>
    <p style="margin:0 0 16px;font-family:${FONT_SANS};font-size:15px;line-height:1.7;color:${MUTED};">
      So, keep your bags ready. There's always another place waiting to be discovered. 🧳✨
    </p>
    <p style="margin:0 0 24px;font-family:${FONT_SANS};font-size:15px;line-height:1.7;color:${MUTED};">
      <strong style="color:${NAVY};">Welcome aboard!</strong><br />
      With love,<br />
      <strong style="color:${NAVY};">Team SNAV Tourism</strong>
    </p>
    <p style="margin:0;">
      <a href="https://snavtourism.com/packages" style="display:inline-block;background-color:${GOLD};color:#ffffff;text-decoration:none;padding:12px 26px;border-radius:6px;font-family:${FONT_SANS};font-size:14px;font-weight:700;">Explore Tour Packages</a>
      &nbsp;
      <a href="https://snavtourism.com/custom-trips" style="display:inline-block;border:2px solid ${EMERALD};color:${EMERALD};text-decoration:none;padding:10px 24px;border-radius:6px;font-family:${FONT_SANS};font-size:14px;font-weight:700;">Plan a Custom Trip</a>
    </p>`;
  return shell(body, shareFooter());
};

const formatNumber = (value: number | undefined): string =>
  value ? value.toLocaleString("en-IN") : "";

const detailRow = (label: string, value: string, highlight = false): string => `
  <tr>
    <td style="padding:8px 0;color:${MUTED};font-family:${FONT_SANS};font-size:13px;font-weight:600;width:150px;vertical-align:top;">${label}</td>
    <td style="padding:8px 0;color:${highlight ? EMERALD : NAVY};font-family:${FONT_SANS};font-size:13px;font-weight:${highlight ? 700 : 500};vertical-align:top;">${value}</td>
  </tr>`;

const itineraryHtml = (itinerary: TripItinerary): string => {
  const daysHtml = itinerary.days.length
    ? itinerary.days
        .map(
          (day) => `
      <tr>
        <td style="padding:14px 0 4px;border-top:1px solid ${BEIGE};">
          <p style="margin:0 0 6px;font-family:${FONT_SERIF};font-size:16px;font-weight:700;color:${NAVY};">
            Day ${day.day} — <span style="font-family:${FONT_SANS};font-size:14px;color:${GOLD};text-transform:uppercase;letter-spacing:0.5px;">${escapeHtml(day.title)}</span>
          </p>
          <ul style="margin:0 0 6px;padding-left:18px;font-family:${FONT_SANS};font-size:13px;line-height:1.7;color:${MUTED};">
            ${day.highlights.map((highlight) => `<li>${escapeHtml(highlight)}</li>`).join("")}
          </ul>
          ${day.stay ? `<p style="margin:0 0 4px;font-family:${FONT_SANS};font-size:12px;color:${EMERALD};"><strong>Stay:</strong> ${escapeHtml(day.stay)}</p>` : ""}
        </td>
      </tr>`
        )
        .join("")
    : "";
  const notesHtml = itinerary.notes.length
    ? `<p style="margin:18px 0 6px;font-family:${FONT_SANS};font-size:13px;font-weight:700;color:${NAVY};">Notes &amp; assumptions</p>
       <ul style="margin:0;padding-left:18px;font-family:${FONT_SANS};font-size:13px;line-height:1.7;color:${MUTED};">
         ${itinerary.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
       </ul>`
    : "";
  const budgetHtml = itinerary.budgetEstimate
    ? `<p style="margin:18px 0 0;padding:12px 16px;background-color:${CREAM};border-left:4px solid ${GOLD};border-radius:6px;font-family:${FONT_SANS};font-size:13px;color:${EMERALD};font-weight:600;">${escapeHtml(itinerary.budgetEstimate)}</p>`
    : "";
  return `
    <h3 style="margin:28px 0 12px;font-family:${FONT_SERIF};font-size:19px;font-weight:700;color:${NAVY};">Proposed itinerary</h3>
    <p style="margin:0 0 4px;font-family:${FONT_SERIF};font-size:17px;font-weight:700;color:${EMERALD};">${escapeHtml(itinerary.title)}</p>
    ${itinerary.vibe ? `<p style="margin:0 0 10px;font-family:${FONT_SERIF};font-style:italic;font-size:14px;color:${GOLD};">${escapeHtml(itinerary.vibe)}</p>` : ""}
    ${itinerary.overview ? `<p style="margin:0 0 8px;font-family:${FONT_SANS};font-size:14px;line-height:1.7;color:${MUTED};">${escapeHtml(itinerary.overview)}</p>` : ""}
    ${itinerary.seasonNote ? `<p style="margin:0 0 12px;font-family:${FONT_SANS};font-size:13px;line-height:1.6;color:${MUTED};"><strong>Season note:</strong> ${escapeHtml(itinerary.seasonNote)}</p>` : ""}
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      ${daysHtml}
    </table>
    ${budgetHtml}
    ${notesHtml}`;
};

export const customTripAdminHtml = (trip: {
  profile: Partial<TripProfile>;
  itinerary?: TripItinerary | null;
  name: string;
  phone: string;
  email: string;
}): string => {
  const { profile, itinerary } = trip;
  const whatsappLink = `https://wa.me/918652885584?text=${encodeURIComponent(
    `Hello SNAV Tourism! Regarding my custom trip request from ${trip.name}.`
  )}`;

  const body = `
    <p style="margin:0 0 18px;font-family:${FONT_SANS};font-size:14px;line-height:1.6;color:${MUTED};">
      A new custom trip brief arrived from the website. Review the details below, then reach out to the traveler to confirm the plan.
    </p>
    <h2 style="margin:0 0 14px;font-family:${FONT_SERIF};font-size:22px;font-weight:700;color:${NAVY};">Traveler details</h2>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      ${detailRow("Name", escapeHtml(trip.name), true)}
      ${detailRow("Phone (WhatsApp)", escapeHtml(trip.phone))}
      ${detailRow("Email", escapeHtml(trip.email))}
      ${detailRow("What's next", `<a href="${whatsappLink}" style="color:${GOLD};font-weight:600;text-decoration:none;">WhatsApp the traveler</a>`, true)}
    </table>
    <h2 style="margin:26px 0 14px;font-family:${FONT_SERIF};font-size:22px;font-weight:700;color:${NAVY};">Trip brief</h2>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      ${profile.destination ? detailRow("Destinations", escapeHtml(profile.destination), true) : ""}
      ${profile.month ? detailRow("Time of year", escapeHtml(profile.month)) : ""}
      ${profile.durationDays ? detailRow("Duration", `${escapeHtml(String(profile.durationDays))} day(s)`) : ""}
      ${profile.travelers ? detailRow("Travelers", `${escapeHtml(String(profile.travelers))}${profile.travelerNote ? ` (${escapeHtml(profile.travelerNote)})` : ""}`) : ""}
      ${profile.budgetPerPerson ? detailRow("Budget/person", `Rs. ${formatNumber(profile.budgetPerPerson)}`) : ""}
      ${profile.interests.length ? detailRow("Interests", escapeHtml(profile.interests.join(", "))) : ""}
      ${profile.occasion ? detailRow("Occasion", escapeHtml(profile.occasion)) : ""}
      ${profile.pace ? detailRow("Pace", escapeHtml(profile.pace)) : ""}
      ${profile.style ? detailRow("Style", escapeHtml(profile.style)) : ""}
      ${profile.needs.length ? detailRow("Special needs", escapeHtml(profile.needs.join(", "))) : ""}
    </table>
    ${itinerary && itinerary.days.length ? itineraryHtml(itinerary) : ""}
    <p style="margin:24px 0 0;font-family:${FONT_SANS};font-size:13px;line-height:1.6;color:${MUTED};">
      Status on this request is <strong style="color:${EMERALD};">new</strong>. Mark it as reviewed once you've taken it forward.
    </p>`;
  return shell(body, shareFooter());
};

const HERO_FALLBACK = "hero-kashmir.jpg";

export const HERO_CID = "newsletter-hero@snavtourism.com";

export const heroFor = (destinationName: string | undefined): string => {
  const name = (destinationName ?? "").toLowerCase();
  if (name.includes("rajasthan")) return "hero-rajasthan.jpg";
  if (name.includes("kashmir")) return "hero-kashmir.jpg";
  if (name.includes("kerala")) return "hero-kerala.jpg";
  if (name.includes("himachal") || name.includes("manali") || name.includes("ladakh")) return "hero-manali.jpg";
  if (name.includes("golden temple") || name.includes("amritsar") || name.includes("punjab")) return "hero-golden-temple.jpg";
  if (name.includes("uttarakhand") || name.includes("rishikesh") || name.includes("char dham")) return "hero-uttarakhand.jpg";
  if (name.includes("tamil") || name.includes("chennai") || name.includes("south india")) return "hero-tamilnadu.jpg";
  return HERO_FALLBACK;
};

export const weeklyNewsletterHtml = (
  data: NewsletterData,
  opts?: { heroCid?: string; heroAlt?: string }
): string => {
  const heroHtml = opts?.heroCid
    ? `<img src="cid:${opts.heroCid}" alt="${escapeHtml(opts.heroAlt ?? "Destinations to explore")}" width="544" style="display:block;width:100%;max-height:280px;object-fit:cover;border-radius:8px;margin:0 0 20px;font-family:${FONT_SANS};font-size:13px;color:${MUTED};" />`
    : "";
  const destinationsHtml = data.destinations.length
    ? data.destinations
        .map(
          (d) => `<h3 style="margin:0 0 4px;font-family:${FONT_SERIF};font-size:18px;font-weight:700;color:${NAVY};border-left:4px solid ${GOLD};padding-left:12px;">${escapeHtml(d.name)}</h3>
            <p style="margin:0 0 18px;font-family:${FONT_SANS};font-size:14px;line-height:1.7;color:${MUTED};padding-left:16px;">${escapeHtml(d.description)}</p>`
        )
        .join("")
    : "";

  const tipsHtml = data.tips.length
    ? `<ol style="margin:16px 0 0;padding-left:20px;font-family:${FONT_SANS};color:${MUTED};font-size:14px;line-height:1.8;">
        ${data.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("")}
      </ol>`
    : "";

  const quoteHtml = data.quote
    ? `<p style="margin:24px 0 0;padding:16px 20px;background-color:${CREAM};border-left:4px solid ${GOLD};border-radius:8px;font-family:${FONT_SERIF};font-size:15px;font-style:italic;color:${EMERALD};">${escapeHtml(data.quote)}</p>`
    : "";

  const body = `
    ${heroHtml}
    <p style="margin:0 0 20px;font-family:${FONT_SANS};font-size:15px;line-height:1.7;color:${MUTED};">${escapeHtml(data.intro)}</p>
    <h2 style="margin:0 0 16px;font-family:${FONT_SERIF};font-size:20px;font-weight:700;color:${NAVY};letter-spacing:0.5px;">THIS WEEK'S WANDERLIST</h2>
    ${destinationsHtml}
    ${tipsHtml
      ? `<h2 style="margin:20px 0 0;font-family:${FONT_SERIF};font-size:20px;font-weight:700;color:${NAVY};letter-spacing:0.5px;">TRAVEL TIPS</h2>${tipsHtml}`
      : ""}
    ${quoteHtml}
    <p style="margin:24px 0 0;">
      <a href="https://snavtourism.com/packages" style="display:inline-block;background-color:${EMERALD};color:#ffffff;text-decoration:none;padding:12px 26px;border-radius:6px;font-family:${FONT_SANS};font-size:14px;font-weight:700;">Plan With Us</a>
    </p>`;
  return shell(body, shareFooter());
};