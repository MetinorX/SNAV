import type { NewsletterData } from "./ai";

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

const NAVY = "#14233b";
const GOLD = "#e2a316";
const EMERALD = "#2a6b4f";
const MUTED = "#5b6b7e";

const shell = (body: string, footerHtml: string): string => {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#f4f2ec;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f2ec;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;color:${NAVY};">
            <tr>
              <td align="center" style="background-color:${NAVY};padding:28px 24px;">
                <div style="font-family:Georgia,'Times New Roman',serif;font-size:30px;font-weight:bold;color:#ffffff;letter-spacing:2px;">
                  SNAV<span style="color:${GOLD};">Tourism</span>
                </div>
                <div style="color:#aab6c4;font-size:12px;margin-top:6px;letter-spacing:1px;">PREMIUM INDIA TRAVEL EXPERIENCES</div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 28px;">
                ${body}
              </td>
            </tr>
            <tr>
              <td style="background-color:#faf9f5;padding:24px 28px;border-top:1px solid #eee;">
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
  return `<p style="margin:0 0 8px;color:${MUTED};font-size:12px;line-height:1.6;">
    SNAV Tourism · Gopi Cine Mall, 210, Dombivli West, Maharashtra
  </p>
  <p style="margin:0;color:#94a3b8;font-size:11px;line-height:1.6;">
    You are receiving this email because you subscribed at snavtourism.com.
    <br />To reach us: +91 8652885584 · snavtourism@gmail.com
    <br /><a href="mailto:snavtourism@gmail.com?subject=Unsubscribe" style="color:${GOLD};">Unsubscribe</a>
  </p>`;
};

export const welcomeEmailHtml = (email: string): string => {
  const body = `
    <h1 style="margin:0 0 16px;font-size:22px;color:${NAVY};">Namaste & Welcome to SNAV Tourism!</h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:${MUTED};">
      You are now part of the SNAV Travel Family <strong>(${escapeHtml(email)})</strong>. Every Saturday you will
      receive our curated digest — featured destinations, seasonal gems, and practical tips to plan your
      next escape across Incredible India.
    </p>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:${MUTED};">
      Dreaming of Kashmir's valleys, Rajasthan's forts, or Kerala's backwaters? Our experts are one message away.
    </p>
    <p style="margin:0;">
      <a href="https://snavtourism.com/packages" style="display:inline-block;background-color:${GOLD};color:#ffffff;text-decoration:none;padding:12px 26px;border-radius:6px;font-size:14px;font-weight:bold;">Explore Tour Packages</a>
    </p>`;
  return shell(body, shareFooter());
};

export const weeklyNewsletterHtml = (data: NewsletterData): string => {
  const destinationsHtml = data.destinations.length
    ? data.destinations
        .map(
          (d) => `<h3 style="margin:0 0 4px;font-size:17px;color:${NAVY};border-left:4px solid ${GOLD};padding-left:12px;">${escapeHtml(d.name)}</h3>
            <p style="margin:0 0 18px;font-size:14px;line-height:1.7;color:${MUTED};padding-left:16px;">${escapeHtml(d.description)}</p>`
        )
        .join("")
    : "";

  const tipsHtml = data.tips.length
    ? `<ol style="margin:16px 0 0;padding-left:20px;color:${MUTED};font-size:14px;line-height:1.8;">
        ${data.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("")}
      </ol>`
    : "";

  const quoteHtml = data.quote
    ? `<p style="margin:24px 0 0;padding:16px 20px;background-color:#faf9f5;border-radius:8px;font-family:Georgia,'Times New Roman',serif;font-size:15px;font-style:italic;color:${EMERALD};text-align:center;">${escapeHtml(data.quote)}</p>`
    : "";

  const body = `
    <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:${MUTED};">${escapeHtml(data.intro)}</p>
    <h2 style="margin:0 0 16px;font-size:20px;color:${NAVY};letter-spacing:0.5px;">THIS WEEK'S WANDERLIST</h2>
    ${destinationsHtml}
    ${tipsHtml
      ? `<h2 style="margin:20px 0 0;font-size:20px;color:${NAVY};letter-spacing:0.5px;">TRAVEL TIPS</h2>${tipsHtml}`
      : ""}
    ${quoteHtml}
    <p style="margin:24px 0 0;">
      <a href="https://snavtourism.com/packages" style="display:inline-block;background-color:${EMERALD};color:#ffffff;text-decoration:none;padding:12px 26px;border-radius:6px;font-size:14px;font-weight:bold;">Plan With Us</a>
    </p>`;
  return shell(body, shareFooter());
};