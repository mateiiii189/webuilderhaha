import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: Request) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type?: string;
      slug?: {
        current?: string;
      };
    }>(req, process.env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 }
      );
    }

    const type = body?._type;
    const slug = body?.slug?.current;

    if (type === "post") {
      revalidatePath("/blog");

      if (slug) {
        revalidatePath(`/blog/${slug}`);
      }
    }

    if (type === "review") {
      revalidatePath("/");
    }

    if (type === "category" || type === "author") {
      revalidatePath("/blog");
      revalidatePath("/", "layout");
 type === "author") {
      revalidatePath("/blog");
      revalidatePath("/", "layout");
    }

    return NextResponse.json({
      revalidated: true,
      type,
      slug,
    });
  } catch (error) {
    return NextResponse.json(
      {
        revalidated: false,
        error: "Revalidation failed",
      },
      { status: 500 }
    );
  }
}