import { NextRequest, NextResponse } from "next/server";
import { EMAIL } from "@/lib/madapath";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, lang } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "MadaPath <onboarding@resend.dev>",
          to: EMAIL,
          replyTo: email,
          subject: `[MadaPath] ${subject} — ${name}`,
          text: [
            `Nom / Name: ${name}`,
            `Email: ${email}`,
            `Téléphone / Phone: ${phone || "N/A"}`,
            `Motif / Subject: ${subject}`,
            "",
            message,
          ].join("\n"),
        }),
      });

      if (!res.ok) {
        console.error("Resend error:", await res.text());
        return NextResponse.json({ error: "Email send failed" }, { status: 500 });
      }

      return NextResponse.json({ ok: true });
    }

    // Fallback: log to console for environments without email service configured
    console.info("[MadaPath Contact Form]", {
      name,
      email,
      phone,
      subject,
      message,
      lang,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
