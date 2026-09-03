"use client";
import { useState, useRef } from "react";
import { type Lang, copy } from "@/lib/madapath";
import { WHATSAPP_LINK, WHATSAPP_MSG_FR, WHATSAPP_MSG_EN, PHONE_DISPLAY, TEL_LINK, EMAIL } from "@/lib/madapath";

export function ContactForm({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [consent, setConsent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const phone = data.get("phone") as string;
    const subject = data.get("subject") as string;
    const message = data.get("message") as string;

    if (!name || !email || !subject || !message) return;
    if (!consent) return;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message, lang }),
      });
      if (res.ok) {
        setStatus("success");
        formRef.current?.reset();
        setConsent(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const waMsg = lang === "fr" ? WHATSAPP_MSG_FR : WHATSAPP_MSG_EN;

  return (
    <div className="contact-layout">
      <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="contact-name">{c.contactName} *</label>
          <input id="contact-name" name="name" type="text" required autoComplete="name" />
        </div>
        <div className="form-row">
          <label htmlFor="contact-email">{c.contactEmail} *</label>
          <input id="contact-email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="form-row">
          <label htmlFor="contact-phone">{c.contactPhone}</label>
          <input id="contact-phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div className="form-row">
          <label htmlFor="contact-subject">{c.contactSubject} *</label>
          <select id="contact-subject" name="subject" required>
            <option value="">{lang === "fr" ? "-- S\u00e9lectionnez --" : "-- Select --"}</option>
            {c.subjects.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="contact-message">{c.contactMessage} *</label>
          <textarea id="contact-message" name="message" rows={5} required />
        </div>
        <label className="consent-label">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
          />
          <span>{c.contactConsent}</span>
        </label>
        <button className="button" type="submit" disabled={!consent}>
          {c.contactSubmit}
        </button>
        {status === "success" && <p className="form-success">{c.contactSuccess}</p>}
        {status === "error" && <p className="form-error">{c.contactError}</p>}
      </form>

      <aside className="contact-aside">
        <div className="contact-card">
          <h3>{lang === "fr" ? "Autres moyens de contact" : "Other ways to reach us"}</h3>
          <div className="contact-links">
            <a href={TEL_LINK} className="contact-link-item">
              <span className="contact-link-icon">{"\u260E"}</span>
              <div>
                <strong>{lang === "fr" ? "T\u00e9l\u00e9phone" : "Phone"}</strong>
                <span>{PHONE_DISPLAY}</span>
              </div>
            </a>
            <a
              href={`${WHATSAPP_LINK}${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link-item"
            >
              <span className="contact-link-icon whatsapp">{"\uD83D\uDCAC"}</span>
              <div>
                <strong>WhatsApp</strong>
                <span>{PHONE_DISPLAY}</span>
              </div>
            </a>
            <a href={`mailto:${EMAIL}`} className="contact-link-item">
              <span className="contact-link-icon">{"\u2709"}</span>
              <div>
                <strong>E-mail</strong>
                <span>{EMAIL}</span>
              </div>
            </a>
          </div>
          <p className="contact-response-time">
            {lang === "fr"
              ? "Nous r\u00e9pondons en g\u00e9n\u00e9ral sous 24 \u00e0 48 heures ouvr\u00e9es."
              : "We typically respond within 24 to 48 business hours."}
          </p>
        </div>
      </aside>
    </div>
  );
}
