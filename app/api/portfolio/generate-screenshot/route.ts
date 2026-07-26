import {
  type NextRequest,
  NextResponse,
} from "next/server";
import { revalidatePath } from "next/cache";
import { parseBody } from "next-sanity/webhook";

import { writeClient } from "@/sanity/lib/writeClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

type PortfolioScreenshotPayload = {
  _id?: string;
  title?: string;
  demoUrl?: string;
};

function normalizePublicUrl(
  value: string,
) {
  const url = new URL(value);

  if (
    url.protocol !== "https:" &&
    url.protocol !== "http:"
  ) {
    throw new Error(
      "URL-ul trebuie să folosească HTTP sau HTTPS.",
    );
  }

  const hostname =
    url.hostname.toLowerCase();

  const isLocalAddress =
    hostname === "localhost" ||
    hostname === "0.0.0.0" ||
    hostname === "::1" ||
    hostname.endsWith(".local") ||
    hostname.startsWith("127.") ||
    hostname.startsWith("10.") ||
    hostname.startsWith("192.168.");

  const private172Match =
    hostname.match(
      /^172\.(\d{1,2})\./,
    );

  const isPrivate172 =
    private172Match !== null &&
    Number(private172Match[1]) >=
      16 &&
    Number(private172Match[1]) <=
      31;

  if (
    isLocalAddress ||
    isPrivate172
  ) {
    throw new Error(
      "URL-ul proiectului trebuie să fie public.",
    );
  }

  return url.toString();
}

function createSafeFilename(
  title?: string,
) {
  const normalized = (
    title || "portfolio-project"
  )
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      "",
    )
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);

  return `${
    normalized ||
    "portfolio-project"
  }-${Date.now()}.jpg`;
}

async function generateCardScreenshot(
  pageUrl: string,
) {
  const accessKey =
    process.env
      .SCREENSHOTONE_ACCESS_KEY;

  if (!accessKey) {
    throw new Error(
      "Lipsește SCREENSHOTONE_ACCESS_KEY.",
    );
  }

  const response = await fetch(
    "https://api.screenshotone.com/take",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        access_key: accessKey,
        url: pageUrl,

        format: "jpeg",
        image_quality: 95,

        viewport_width: 1440,
        viewport_height: 900,
        device_scale_factor: 2,

        full_page: false,

        delay: 2,
        wait_until:
          "networkidle2",

        reduced_motion: true,
        block_cookie_banners: true,
        block_chats: true,

        timeout: 60,
        navigation_timeout: 30,
      }),

      cache: "no-store",
    },
  );

  if (!response.ok) {
    const errorBody =
      await response.text();

    throw new Error(
      `ScreenshotOne a răspuns cu ${response.status}: ${errorBody.slice(
        0,
        700,
      )}`,
    );
  }

  const contentType =
    response.headers.get(
      "content-type",
    ) || "";

  if (
    !contentType.startsWith(
      "image/",
    )
  ) {
    const responseBody =
      await response.text();

    throw new Error(
      `ScreenshotOne nu a returnat o imagine: ${responseBody.slice(
        0,
        700,
      )}`,
    );
  }

  return Buffer.from(
    await response.arrayBuffer(),
  );
}

export async function POST(
  request: NextRequest,
) {
  const webhookSecret =
    process.env
      .SANITY_SCREENSHOT_WEBHOOK_SECRET;

  let documentId:
    | string
    | undefined;

  if (!webhookSecret) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Lipsește SANITY_SCREENSHOT_WEBHOOK_SECRET.",
      },
      {
        status: 500,
      },
    );
  }

  if (
    !process.env
      .SANITY_API_WRITE_TOKEN
  ) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Lipsește SANITY_API_WRITE_TOKEN.",
      },
      {
        status: 500,
      },
    );
  }

  try {
    const {
      isValidSignature,
      body,
    } =
      await parseBody<PortfolioScreenshotPayload>(
        request,
        webhookSecret,
      );

    if (!isValidSignature) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Semnătura webhookului Sanity este invalidă.",
        },
        {
          status: 401,
        },
      );
    }

    if (
      !body?._id ||
      !body.demoUrl
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Payload incomplet. Sunt necesare _id și demoUrl.",
        },
        {
          status: 400,
        },
      );
    }

    documentId = body._id;

    const publicUrl =
      normalizePublicUrl(
        body.demoUrl,
      );

    const screenshotBuffer =
      await generateCardScreenshot(
        publicUrl,
      );

    const screenshotAsset =
      await writeClient.assets.upload(
        "image",
        screenshotBuffer,
        {
          filename:
            createSafeFilename(
              body.title,
            ),

          contentType:
            "image/jpeg",
        },
      );

    await writeClient
      .patch(documentId)
      .set({
        previewImage: {
          _type: "image",

          asset: {
            _type: "reference",
            _ref:
              screenshotAsset._id,
          },
        },

        screenshotGeneratedAt:
          new Date().toISOString(),

        screenshotSourceUrl:
          publicUrl,

        refreshScreenshot:
          false,
      })
      .unset([
        "screenshotError",
      ])
      .commit();

    revalidatePath(
      "/portofoliu",
    );

    revalidatePath("/");

    return NextResponse.json({
      success: true,
      documentId,
      assetId:
        screenshotAsset._id,
      screenshotSourceUrl:
        publicUrl,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Eroare necunoscută.";

    console.error(
      "Portfolio screenshot generation failed:",
      error,
    );

    if (documentId) {
      await writeClient
        .patch(documentId)
        .set({
          screenshotError:
            message.slice(
              0,
              1000,
            ),

          refreshScreenshot:
            false,
        })
        .commit()
        .catch(
          (patchError) => {
            console.error(
              "Nu s-a putut salva eroarea screenshotului:",
              patchError,
            );
          },
        );
    }

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      {
        status: 500,
      },
    );
  }
}