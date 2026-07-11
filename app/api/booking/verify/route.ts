import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const SCRIPT_URL = process.env.APPS_SCRIPT_WEB_APP_URL;
const API_SECRET = process.env.BOOKING_API_SECRET;

export async function POST(request: NextRequest) {
  try {
    if (!SCRIPT_URL || !API_SECRET) {
      return NextResponse.json(
        {
          success: false,
          error: "Booking-ul nu este configurat pe server.",
        },
        { status: 500 },
      );
    }

    const body = await request.json();

    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        action: "verify",
        secret: API_SECRET,
        token: body.token,
        pin: body.pin,
      }),
      cache: "no-store",
      redirect: "follow",
    });

    const rawText = await response.text();

    let data: {
      success?: boolean;
      error?: string;
    };

    try {
      data = JSON.parse(rawText);
    } catch {
      console.error("Apps Script non-JSON response:", rawText);

      return NextResponse.json(
        {
          success: false,
          error: "Apps Script nu a returnat un răspuns valid.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json(data, {
      status: data.success ? 200 : 400,
    });
  } catch (error) {
    console.error("Verify PIN error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Programarea nu a putut fi confirmată.",
      },
      { status: 500 },
    );
  }
}