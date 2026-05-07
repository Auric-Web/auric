import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      name?: string;
      email?: string;
      company?: string;
      phone?: string;
      service?: string;
      message?: string;
      website?: string;
    };

    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const company = String(body.company || "").trim();
    const phone = String(body.phone || "").trim();
    const service = String(body.service || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER;
    const toAddress = process.env.SMTP_TO || fromAddress;

    if (!fromAddress || !toAddress) {
      return NextResponse.json(
        { ok: false, error: "Email configuration missing." },
        { status: 500 }
      );
    }

    const subject = service
      ? `New CaelusCore Inquiry — ${service}`
      : "New CaelusCore Inquiry";

    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : "",
      phone ? `Phone: ${phone}` : "",
      service ? `Service: ${service}` : "",
      "",
      "Message:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    await transporter.sendMail({
      from: `"CaelusCore Website" <${fromAddress}>`,
      to: toAddress,
      replyTo: email,
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Email send error:", error);

    return NextResponse.json(
      { ok: false, error: "Failed to send email." },
      { status: 500 }
    );
  }
}