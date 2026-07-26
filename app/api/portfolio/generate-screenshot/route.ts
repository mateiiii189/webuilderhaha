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
        capture_beyond_viewport:
          false,

        wait_until:
          "networkidle2",

        delay: 2,

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
        600,
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
      `Răspunsul primit nu este o imagine: ${responseBody.slice(
        0,
        600,
      )}`,
    );
  }

  return Buffer.from(
    await response.arrayBuffer(),
  );
}