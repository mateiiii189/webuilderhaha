import type { Metadata } from "next";
import Link from "next/link";
import { Quote } from "lucide-react";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Container } from "@/components/layout/Container";

type ReviewFromSanity = {
  _id: string;
  company: string;
  brandImage?: unknown;
  project?: string;
  rating?: number;
  text: string;
  publishedAt?: string;
  _createdAt: string;
};

type Review = {
  _id: string;
  company: string;
  brandImageUrl?: string;
  project: string;
  rating: number;
  text: string;
  publishedAt?: string;
  createdAt: string;
};

type ReviewPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const reviewQuery = `
  *[
    _type == "review" &&
    _id == $id
  ][0] {
    _id,
    company,
    brandImage,
    project,
    rating,
    text,
    publishedAt,
    _createdAt
  }
`;

async function getReview(
  id: string,
): Promise<Review | null> {
  const review =
    await client.fetch<ReviewFromSanity | null>(
      reviewQuery,
      {
        id,
      },
      {
        next: {
          tags: ["reviews"],
        },
      },
    );

  if (!review) {
    return null;
  }

  return {
    _id: review._id,
    company: review.company,
    brandImageUrl: review.brandImage
      ? urlFor(review.brandImage)
          .width(700)
          .height(700)
          .url()
      : undefined,
    project:
      review.project || "Website",
    rating: review.rating ?? 5,
    text: review.text,
    publishedAt: review.publishedAt,
    createdAt: review._createdAt,
  };
}

function getInitials(company: string) {
  return company
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function BrandMark({
  review,
}: {
  review: Review;
}) {
  if (review.brandImageUrl) {
    return (
      <div className="h-16 w-16 overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.04]">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${review.brandImageUrl})`,
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-[1.25rem] border border-amber-400/30 bg-amber-400/10 text-xl font-black text-amber-300">
      {getInitials(review.company)}
    </div>
  );
}

function Stars({
  rating,
}: {
  rating: number;
}) {
  const safeRating = Math.min(
    Math.max(Math.round(rating), 0),
    5,
  );

  return (
    <div
      className="flex items-center gap-1 text-base md:text-lg"
      aria-label={`${safeRating} din 5 stele`}
    >
      {Array.from({ length: 5 }).map(
        (_, index) => (
          <span
            key={index}
            className={
              index < safeRating
                ? "text-amber-400"
                : "text-white/15"
            }
          >
            ★
          </span>
        ),
      )}
    </div>
  );
}

function formatReviewDate(
  review: Review,
) {
  return new Date(
    review.publishedAt ||
      review.createdAt,
  ).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: ReviewPageProps): Promise<Metadata> {
  const { id } = await params;
  const review = await getReview(
    decodeURIComponent(id),
  );

  if (!review) {
    return {
      title: "Testimonial inexistent",
    };
  }

  return {
    title: `Testimonial ${review.company}`,
    description: review.text.slice(
      0,
      155,
    ),
  };
}

export default async function ReviewPage({
  params,
}: ReviewPageProps) {
  const { id } = await params;

  const review = await getReview(
    decodeURIComponent(id),
  );

  if (!review) {
    notFound();
  }

  return (
    <main className="bg-[#0B0F14] text-white">
      <section className="relative overflow-hidden pb-20 pt-32 md:pb-24 md:pt-36">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
        <div className="absolute left-1/2 top-0 h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-amber-400/15 blur-[110px]" />
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0B0F14] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#0B0F14] to-transparent" />

        <Container className="relative">
          <Link
              href="/testimoniale"
              className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-gray-300 transition-all duration-300 hover:-translate-y-0.5 hover:text-amber-300"
            >
              <span className="inline-block text-lg leading-none transition-transform duration-300 group-hover:-translate-x-1.5">
                ←
              </span>

              <span className="inline-block transition-transform duration-300">
                Înapoi la testimoniale
              </span>
          </Link>

          <article className="group relative mx-auto mt-8 max-w-4xl overflow-hidden rounded-[2.25rem] border border-amber-400/35 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.15),rgba(17,22,29,0.98)_42%,#11161D_100%)] p-7 shadow-2xl shadow-black/35 transition duration-500 hover:-translate-y-1 hover:border-amber-400/55 hover:shadow-black/50 md:p-10">
              <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />

              <div className="relative min-w-0">
                <div className="flex items-start justify-between gap-6">
                  <BrandMark
                    review={review}
                  />

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/10 text-amber-300">
                    <Quote className="h-5 w-5" />
                  </div>
                </div>

                <blockquote className="mt-8 whitespace-pre-wrap break-words text-lg font-semibold leading-[1.65] tracking-[-0.025em] text-white [overflow-wrap:anywhere] md:text-xl">
                  „{review.text}”
                </blockquote>

                <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
                  <div className="min-w-0">
                    <p className="break-words !text-base font-black tracking-[-0.02em] !text-white [overflow-wrap:anywhere] md:!text-lg">
                      {review.company}
                    </p>

                    <p className="mt-1.5 break-words text-sm text-gray-400 [overflow-wrap:anywhere]">
                      {review.project}
                    </p>

                    <time className="mt-2.5 block text-xs text-gray-500">
                      {formatReviewDate(
                        review,
                      )}
                    </time>
                  </div>

                  <Stars
                    rating={review.rating}
                  />
                </div>
              </div>
          </article>
        </Container>
      </section>
    </main>
  );
}