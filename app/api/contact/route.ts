import { NextRequest, NextResponse } from "next/server";

// Both BigOne and Chase Logistics post leads into the same Telegram channel,
// so every message leads with its source to make the origin obvious.
const SOURCE_LABEL = "🏢 BIGONE WEBSITE — yangi so'rov";

// parse_mode is HTML: user input containing "<" or "&" makes Telegram reject
// the whole message, silently losing the lead. Escape everything we echo back.
function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, services, message } = await req.json();

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID   = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return NextResponse.json({ error: "Server config missing" }, { status: 500 });
    }

    const servicesList = Array.isArray(services) && services.length
      ? services.map(esc).join(", ")
      : "Ko'rsatilmagan";

    const text = [
      `🔔 <b>${SOURCE_LABEL}</b>`,
      "",
      `👤 <b>Ism:</b> ${esc(name)}`,
      `📧 <b>Email:</b> ${esc(email)}`,
      `🛠 <b>Xizmat:</b> ${servicesList}`,
      `💬 <b>Xabar:</b>`,
      esc(message),
    ].join("\n");

    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      }
    );

    const data = await res.json();

    if (!data.ok) {
      return NextResponse.json({ error: data.description }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
