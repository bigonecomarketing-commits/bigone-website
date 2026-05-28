import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, services, message } = await req.json();

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID   = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return NextResponse.json({ error: "Server config missing" }, { status: 500 });
    }

    const servicesList = services?.length
      ? services.join(", ")
      : "Ko'rsatilmagan";

    const text = `
🔔 <b>Yangi so'rov — BigOne Website</b>

👤 <b>Ism:</b> ${name}
📧 <b>Email:</b> ${email}
🛠 <b>Xizmat:</b> ${servicesList}
💬 <b>Xabar:</b>
${message}
    `.trim();

    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "HTML",
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
