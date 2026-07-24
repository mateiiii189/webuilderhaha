import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type RescheduleAction =
  | "rescheduleDetails"
  | "rescheduleAvailability"
  | "sendReschedulePin"
  | "verifyReschedulePin";

type RequestBody = {
  action?: RescheduleAction;
  eventId?: string;
  signature?: string;
  date?: string;
  startIso?: string;
  token?: string;
  pin?: string;
};

function getAppsScriptUrl(): string {
  const value =
    process.env.APPS_SCRIPT_WEB_APP_URL ??
    process.env.GOOGLE_APPS_SCRIPT_URL ??
    process.env.BOOKING_API_URL ??
    process.env.APPS_SCRIPT_URL;

  if (!value) {
    throw new Error(
      "Lipsește APPS_SCRIPT_WEB_APP_URL din variabilele de mediu.",
    );
  }

  return value;
}

function isValidAction(
  value: unknown,
): value is RescheduleAction {
  return (
    value === "rescheduleDetails" ||
    value === "rescheduleAvailability" ||
    value === "sendReschedulePin" ||
    value === "verifyReschedulePin"
  );
}

export async function POST(request: Request) {
  try {
    const body =
      (await request.json()) as RequestBody;

    if (!isValidAction(body.action)) {
      return NextResponse.json(
        {
          success: false,
          code: "INVALID_ACTION",
          error: "Acțiune invalidă.",
        },
        { status: 400 },
      );
    }

    if (
      body.action !== "verifyReschedulePin" &&
      (!body.eventId || !body.signature)
    ) {
      return NextResponse.json(
        {
          success: false,
          code: "INVALID_LINK",
          error:
            "Linkul de reprogramare este incomplet.",
        },
        { status: 400 },
      );
    }

    if (
      body.action ===
        "rescheduleAvailability" &&
      !body.date
    ) {
      return NextResponse.json(
        {
          success: false,
          code: "INVALID_DATE",
          error: "Data lipsește.",
        },
        { status: 400 },
      );
    }

    if (
      body.action === "sendReschedulePin" &&
      !body.startIso
    ) {
      return NextResponse.json(
        {
          success: false,
          code: "INVALID_SLOT",
          error: "Intervalul selectat lipsește.",
        },
        { status: 400 },
      );
    }

    if (
      body.action === "verifyReschedulePin" &&
      (!body.token || !body.pin)
    ) {
      return NextResponse.json(
        {
          success: false,
          code: "INVALID_PIN",
          error:
            "Codul de verificare este incomplet.",
        },
        { status: 400 },
      );
    }

    const secret =
      process.env.BOOKING_API_SECRET;

    if (!secret) {
      throw new Error(
        "Lipsește BOOKING_API_SECRET din variabilele de mediu.",
      );
    }

    const response = await fetch(
      getAppsScriptUrl(),
      {
        method: "POST",
        headers: {
          "Content-Type":
            "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          ...body,
          secret,
        }),
        cache: "no-store",
        redirect: "follow",
      },
    );

    const data = (await response.json()) as {
      success?: boolean;
      code?: string;
      error?: string;
      [key: string]: unknown;
    };

    const status =
      data.code === "NOT_FOUND"
        ? 404
        : data.code === "BUSY"
          ? 409
          : data.success
            ? 200
            : 400;

    return NextResponse.json(data, {
      status,
    });
  } catch (error) {
    console.error(
      "Reschedule API error:",
      error,
    );

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
