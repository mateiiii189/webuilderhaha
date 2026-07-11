import { NextResponse } from "next/server";

type CancellationAction =
  | "cancellationDetails"
  | "cancelBooking";

type RequestBody = {
  action?: CancellationAction;
  eventId?: string;
  signature?: string;
};

function getAppsScriptUrl(): string {
  const value =
    process.env.GOOGLE_APPS_SCRIPT_URL ??
    process.env.BOOKING_API_URL ??
    process.env.APPS_SCRIPT_URL;

  if (!value) {
    throw new Error(
      "Lipsește GOOGLE_APPS_SCRIPT_URL din variabilele de mediu.",
    );
  }

  return value;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;

    if (
      body.action !== "cancellationDetails" &&
      body.action !== "cancelBooking"
    ) {
      return NextResponse.json(
        {
          success: false,
          code: "INVALID_ACTION",
          error: "Acțiune invalidă.",
        },
        { status: 400 },
      );
    }

    if (!body.eventId || !body.signature) {
      return NextResponse.json(
        {
          success: false,
          code: "INVALID_LINK",
          error: "Linkul de anulare este incomplet.",
        },
        { status: 400 },
      );
    }

    const secret = process.env.BOOKING_API_SECRET;

    if (!secret) {
      throw new Error(
        "Lipsește BOOKING_API_SECRET din variabilele de mediu.",
      );
    }

    const response = await fetch(getAppsScriptUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: body.action,
        eventId: body.eventId,
        signature: body.signature,
        secret,
      }),
      cache: "no-store",
    });

    const data = (await response.json()) as {
      success?: boolean;
      code?: string;
      error?: string;
      [key: string]: unknown;
    };

    const status =
      data.code === "NOT_FOUND"
        ? 404
        : data.success
          ? 200
          : 400;

    return NextResponse.json(data, { status });
  } catch (error) {
    console.error("Cancellation API error:", error);

    return NextResponse.json(
      {
        success: false,
        code: "INTERNAL_ERROR",
        error:
          "Cererea nu a putut fi procesată momentan.",
      },
      { status: 500 },
    );
  }
}
