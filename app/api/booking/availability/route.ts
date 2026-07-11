import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const SCRIPT_URL = process.env.APPS_SCRIPT_WEB_APP_URL;
const API_SECRET = process.env.BOOKING_API_SECRET;

export async function POST(request: NextRequest) {
  try {
    if (!SCRIPT_URL || !API_SECRET) {
      return NextResponse.json(
        { error: "Booking-ul nu este configurat pe server." },
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
        action: "availability",
        secret: API_SECRET,
        date: body.date,
      }),
      cache: "no-store",
      redirect: "follow",
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: data.success ? 200 : 400,
    });
  } catch (error) {
    console.error("Availability error:", error);

    return NextResponse.json(
      { error: "Disponibilitatea nu a putut fi încărcată." },
      { status: 500 },
    );
  }
}