import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get("secret");

    if (
      process.env.SANITY_REVALIDATE_SECRET &&
      secret !== process.env.SANITY_REVALIDATE_SECRET
    ) {
      return NextResponse.json(
        { message: "Invalid secret" },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => null);
    const type = body?._type;

    if (type === "post") {
      revalidateTag("posts", "max");
      revalidatePath("/blog");
      revalidatePath("/", "layout");
    }

    if (type === "review") {
      revalidateTag("reviews", "max");
      revalidatePath("/");
      revalidatePath("/", "layout");
    }

    if (type === "category" || type === "author") {
      revalidateTag("posts", "max");
      revalidatePath("/blog");
      revalidatePath("/", "layout");
    }

    return NextResponse.json({
      revalidated: true,
      type: type || "unknown",
    });
  } catch (error) {
    return NextResponse.json(
      {
        revalidated: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}