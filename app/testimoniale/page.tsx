import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Handshake,
  Quote,
  Sparkles,
} from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PaginationDotsPanel } from "@/components/sections/PaginationDotsPanel";

export const metadata: Metadata = {
  title: "Testimoniale | Webuilder.ro",
  description:
    "Experiențe reale din proiectele dezvoltate de Webuilder pentru firme și branduri care și-au dorit o prezență online mai clară, rapidă și profesionistă.",
};

type ReviewFromSanity = {
  _id: string;
  company: string;
  brandImage?: unknown;
  project?: string;
  rating?: number;
  text: string;
  publishedAt?: string;
  _createdAt: string;
  isPinned?: boolean;
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
  isPinned: boolean;
};

type TestimonialsPageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

const REVIEWS_PER_PAGE = 6;
const FEATURED_REVIEW_PREVIEW_LENGTH = 360;
const REVIEW_CARD_PREVIEW_LENGTH = 220;

const reviewsQuery = `
  *[_type == "review"] |
  order(
    coalesce(publishedAt, _createdAt) desc,
    _createdAt desc,
    _id desc
  ) {
    _id,
    company,
    brandImage,
    project,
    rating,
    text,
    publishedAt,
    _createdAt,
    isPinned
  }
`;

function getPaginationItems(
  currentPage: number,
  totalPages: number,
) {
  const items: Array<number | "..."> = [];

  if (totalPages <= 5) {
    for (
      let page = 1;
      page <= totalPages;
      page += 1
    ) {
      items.push(page);
    }

    return items;
  }

  if (currentPage <= 3) {
    items.push(
      1,
      2,
      3,
      "...",
      totalPages,
    );

    return items;
  }

  if (currentPage >= totalPages - 2) {
    items.push(
      1,
      "...",
      totalPages - 2,
      totalPages - 1,
      totalPages,
    );

    return items;
  }

  items.push(
    1,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  );

  return items;
}

function getTestimonialsPageHref(
  page: number,
) {
  return page === 1
    ? "/testimoniale"
    : `/testimoniale?page=${page}`;
}


function getReviewHref(reviewId: string) {
  return `/testimoniale/${encodeURIComponent(
    reviewId,
  )}`;
}

function truncateText(
  text: string,
  maxLength: number,
) {
  const normalized = text.trim();

  if (normalized.length <= maxLength) {
    return {
      value: normalized,
      truncated: false,
    };
  }

  const candidate = normalized.slice(
    0,
    maxLength + 1,
  );

  const lastSpace =
    candidate.lastIndexOf(" ");

  const cutAt =
    lastSpace >= maxLength * 0.65
      ? lastSpace
      : maxLength;

  return {
    value: `${normalized
      .slice(0, cutAt)
      .trimEnd()}...`,
    truncated: true,
  };
}

function getEffectiveReviewTimestamp(
  review: Pick<Review, "publishedAt" | "createdAt">,
): number {
  const value =
    review.publishedAt || review.createdAt;

  const timestamp = Date.parse(value);

  return Number.isNaN(timestamp)
    ? 0
    : timestamp;
}

function compareReviewsByPublishedDateDesc(
  a: Review,
  b: Review,
): number {
  const publishedDifference =
    getEffectiveReviewTimestamp(b) -
    getEffectiveReviewTimestamp(a);

  if (publishedDifference !== 0) {
    return publishedDifference;
  }

  const createdDifference =
    Date.parse(b.createdAt) -
    Date.parse(a.createdAt);

  if (createdDifference !== 0) {
    return createdDifference;
  }

  return b._id.localeCompare(
    a._id,
    undefined,
    {
      numeric: true,
      sensitivity: "base",
    },
  );
}

function getInitials(company: string) {
  return company
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Stars({
  rating = 5,
  large = false,
}: {
  rating?: number;
  large?: boolean;
}) {
  const safeRating = Math.min(
    Math.max(Math.round(rating), 0),
    5,
  );

  return (
    <div
      className={`flex items-center gap-1 ${
        large ? "text-xl" : "text-base"
      }`}
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

function BrandMark({
  review,
  large = false,
}: {
  review: Review;
  large?: boolean;
}) {
  const size = large
    ? "h-20 w-20 rounded-[1.4rem] text-2xl"
    : "h-14 w-14 rounded-2xl text-lg";

  if (review.brandImageUrl) {
    return (
      <div
        className={`${size} overflow-hidden border border-white/10 bg-white/[0.04]`}
      >
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
    <div
      className={`${size} flex items-center justify-center border border-amber-400/30 bg-amber-400/10 font-black text-amber-300`}
    >
      {getInitials(review.company)}
    </div>
  );
}

const collaborationPrinciples = [
  {
    icon: Handshake,
    title: "Comunicare clară",
    text:
      "Deciziile, pașii următori și limitele proiectului sunt explicate direct, fără ambiguități.",
  },
  {
    icon: Sparkles,
    title: "Atenție la detalii",
    text:
      "Designul, structura, viteza și experiența finală sunt tratate ca părți ale aceluiași sistem.",
  },
  {
    icon: CheckCircle2,
    title: "Soluții potrivite afacerii",
    text:
      "Construim în jurul obiectivelor reale, nu în jurul unui șablon aplicat tuturor proiectelor.",
  },
];

export default async function TestimonialsPage({
  searchParams,
}: TestimonialsPageProps) {
  const resolvedSearchParams =
    await searchParams;

  const requestedPage = Number(
    resolvedSearchParams?.page || 1,
  );

  const currentPage =
    Number.isFinite(requestedPage) &&
    requestedPage > 0
      ? Math.floor(requestedPage)
      : 1;

  const reviewsFromSanity =
    await client.fetch<ReviewFromSanity[]>(
      reviewsQuery,
      {},
      {
        next: {
          tags: ["reviews"],
        },
      },
    );

  const reviews: Review[] =
    reviewsFromSanity
      .map((review) => ({
        _id: review._id,
        company: review.company,
        brandImageUrl: review.brandImage
          ? urlFor(review.brandImage)
              .width(600)
              .height(600)
              .url()
          : undefined,
        project:
          review.project || "Website",
        rating: review.rating ?? 5,
        text: review.text,
        publishedAt: review.publishedAt,
        createdAt: review._createdAt,
        isPinned:
          review.isPinned === true,
      }))
      .sort(compareReviewsByPublishedDateDesc);

  const pinnedReview = reviews.find(
    (review) => review.isPinned,
  );

  const featuredReview =
    pinnedReview || reviews[0];

  /*
   * Cardul mare este întotdeauna exclus din lista de jos:
   * atât când este pinned, cât și când este fallback-ul
   * „Cel mai recent”.
   */
  const reviewsForList = featuredReview
    ? reviews.filter(
        (review) =>
          review._id !==
          featuredReview._id,
      )
    : reviews;

  const totalPages = Math.max(
    Math.ceil(
      reviewsForList.length /
        REVIEWS_PER_PAGE,
    ),
    1,
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages,
  );

  const startIndex =
    (safeCurrentPage - 1) *
    REVIEWS_PER_PAGE;

  const paginatedReviews =
    reviewsForList.slice(
      startIndex,
      startIndex + REVIEWS_PER_PAGE,
    );

  const paginationItems =
    getPaginationItems(
      safeCurrentPage,
      totalPages,
    );

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (total, review) =>
              total + review.rating,
            0,
          ) / reviews.length
        ).toFixed(1)
      : "5.0";

  const featuredPreview =
    featuredReview
      ? truncateText(
          featuredReview.text,
          FEATURED_REVIEW_PREVIEW_LENGTH,
        )
      : null;

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <section className="relative overflow-hidden border-b border-white/10 pb-20 pt-36 md:pb-24 md:pt-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
        <div className="absolute left-1/2 top-0 h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-amber-400/15 blur-[110px]" />
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0B0F14] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#0B0F14] to-transparent" />

        <Container className="relative">
          <div className="grid gap-12 xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] xl:items-end">
            <ScrollReveal>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
                  Testimoniale
                </p>

                <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.94] tracking-[-0.06em] text-white md:text-7xl">
                  Rezultatele sunt importante. Experiența colaborării la fel.
                </h1>

                <p className="mt-7 max-w-2xl text-base leading-8 text-gray-300 md:text-lg">
                  Aici găsești feedback real din proiectele
                  dezvoltate împreună cu firme și branduri care
                  au avut nevoie de mai multă claritate,
                  performanță și încredere online.
                </p>

                <div className="mt-10 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/30">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                      Colaborări prezentate
                    </p>

                    <p className="mt-2 text-2xl font-black">
                      {reviews.length}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/30">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                      Rating mediu
                    </p>

                    <div className="mt-2 flex items-center gap-3">
                      <p className="text-2xl font-black">
                        {averageRating}
                      </p>

                      <Stars
                        rating={Number(
                          averageRating,
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {featuredReview ? (
              <ScrollReveal delay={0.1}>
                <article className="group relative flex min-w-0 flex-col overflow-hidden rounded-[2.25rem] border border-amber-400/35 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.15),rgba(17,22,29,0.98)_42%,#11161D_100%)] p-8 shadow-2xl shadow-black/30 transition duration-500 hover:-translate-y-1 hover:border-amber-400/55 md:p-10 xl:min-h-[430px]">
                  <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />

                  <div className="relative flex h-full min-w-0 flex-col">
                    <div className="flex items-start justify-between gap-6">
                      <BrandMark
                        review={featuredReview}
                        large
                      />

                      <div className="flex flex-col items-end gap-3">
                        {featuredReview.isPinned ? (
                          <span className="rounded-full border border-amber-400/35 bg-amber-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-amber-300">
                            Pinned
                          </span>
                        ) : (
                          <span
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/35 bg-amber-400/10 text-amber-300"
                            title="Cel mai recent"
                            aria-label="Cel mai recent"
                          >
                            <Clock3 className="h-4 w-4" />
                          </span>
                        )}

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 text-amber-300">
                          <Quote className="h-6 w-6" />
                        </div>
                      </div>
                    </div>

                    {featuredPreview ? (
                      <div className="mt-8 min-w-0">
                        <blockquote className="break-words text-xl font-semibold leading-[1.4] tracking-[-0.035em] text-white [overflow-wrap:anywhere] md:text-2xl 2xl:text-3xl">
                          „{featuredPreview.value}”
                        </blockquote>

                        {featuredPreview.truncated ? (
                          <a
                            href={getReviewHref(
                              featuredReview._id,
                            )}
                            className="group/more mt-5 inline-flex w-fit items-center gap-2 text-sm font-black text-amber-300 transition duration-300 hover:-translate-y-0.5 hover:text-amber-200"
                          >
                            Citește mai mult

                            <span className="text-lg leading-none transition duration-300 group-hover/more:translate-x-1">
                              →
                            </span>
                          </a>
                        ) : null}
                      </div>
                    ) : null}

                    <div className="mt-auto flex min-w-0 flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
                      <div className="min-w-0">
                        <p className="break-words text-xl font-black [overflow-wrap:anywhere]">
                          {featuredReview.company}
                        </p>

                        <p className="mt-1 break-words text-sm text-gray-400 [overflow-wrap:anywhere]">
                          {featuredReview.project}
                        </p>
                      </div>

                      <Stars
                        rating={
                          featuredReview.rating
                        }
                        large
                      />
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ) : null}
          </div>
        </Container>
      </section>

      {reviews.length === 0 ? (
        <section className="bg-[#080B10] py-20 md:py-24">
          <Container>
            <ScrollReveal>
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 text-center">
                <p className="text-xl font-semibold">
                  Momentan nu există testimoniale publicate.
                </p>

                <p className="mt-3 text-sm leading-7 text-gray-400">
                  Testimonialele adăugate în Sanity Studio
                  vor apărea automat aici.
                </p>
              </div>
            </ScrollReveal>
          </Container>
        </section>
      ) : (
        <section className="relative overflow-hidden bg-[#080B10] py-20 md:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(250,204,21,0.055),transparent_38%)]" />

          <Container className="relative">
            <ScrollReveal>
              <div className="max-w-4xl">
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-amber-400">
                  Experiențe reale
                </p>

                <h2 className="mt-5 text-4xl font-black leading-[0.98] tracking-[-0.05em] md:text-5xl">
                  Fiecare proiect are alt context. Încrederea se construiește la fel.
                </h2>

                <p className="mt-6 max-w-3xl text-base leading-8 text-gray-400 md:text-lg">
                  Testimonialele sunt ordonate după data
                  publicării. Dacă modifici manual „Published at”
                  în Sanity, testimonialul își schimbă poziția;
                  celelalte editări nu îi afectează ordinea.
                </p>
              </div>
            </ScrollReveal>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {paginatedReviews.map(
                (review, index) => {
                  const preview =
                    truncateText(
                      review.text,
                      REVIEW_CARD_PREVIEW_LENGTH,
                    );

                  return (
                    <ScrollReveal
                      key={review._id}
                      delay={Math.min(
                        index * 0.05,
                        0.25,
                      )}
                    >
                    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 shadow-2xl shadow-black/20 transition duration-500 hover:-translate-y-1 hover:border-amber-400/35 hover:bg-white/[0.045]">
                      {review.isPinned ? (
                        <span className="absolute right-6 top-6 rounded-full border border-amber-400/35 bg-amber-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-amber-300">
                          Pinned
                        </span>
                      ) : null}

                      <div className="flex items-start justify-between gap-5">
                        <BrandMark
                          review={review}
                        />

                        {!review.isPinned ? (
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-amber-300">
                            <Quote className="h-5 w-5" />
                          </div>
                        ) : null}
                      </div>

                      <div className="mt-7 flex min-w-0 flex-1 flex-col">
                        <blockquote className="min-w-0 break-words text-sm leading-7 text-gray-300 [overflow-wrap:anywhere]">
                          „{preview.value}”
                        </blockquote>

                        {preview.truncated ? (
                          <a
                            href={getReviewHref(
                              review._id,
                            )}
                            className="group/more mt-5 inline-flex w-fit items-center gap-2 text-sm font-black text-amber-300 transition duration-300 hover:-translate-y-0.5 hover:text-amber-200"
                          >
                            Citește mai mult

                            <span className="text-lg leading-none transition duration-300 group-hover/more:translate-x-1">
                              →
                            </span>
                          </a>
                        ) : null}
                      </div>

                      <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-5 sm:flex-row sm:items-end sm:justify-between">
                        <div className="min-w-0">
                          <h3 className="break-words text-xl font-black tracking-[-0.035em] text-white transition duration-500 [overflow-wrap:anywhere] group-hover:text-amber-300">
                            {review.company}
                          </h3>

                          <p className="mt-1 break-words text-sm text-gray-500 [overflow-wrap:anywhere]">
                            {review.project}
                          </p>
                        </div>

                        <Stars
                          rating={review.rating}
                        />
                      </div>
                    </article>
                    </ScrollReveal>
                  );
                },
              )}
            </div>

            {totalPages > 1 ? (
              <ScrollReveal delay={0.12}>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-12">
                  {safeCurrentPage > 1 ? (
                    <Link
                      href={getTestimonialsPageHref(
                        safeCurrentPage - 1,
                      )}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm font-black text-white transition duration-500 hover:-translate-y-0.5 hover:border-amber-400/40 hover:text-amber-300"
                      aria-label="Pagina anterioară"
                    >
                      ←
                    </Link>
                  ) : null}

                  {paginationItems.map(
                    (item, index) =>
                      item === "..." ? (
                        <PaginationDotsPanel
                          key={`dots-${index}`}
                          currentPage={
                            safeCurrentPage
                          }
                          totalPages={
                            totalPages
                          }
                          basePath="/testimoniale"
                        />
                      ) : (
                        <Link
                          key={item}
                          href={getTestimonialsPageHref(
                            item,
                          )}
                          className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-black transition duration-500 hover:-translate-y-0.5 ${
                            item ===
                            safeCurrentPage
                              ? "border-amber-400 bg-amber-400 text-black"
                              : "border-white/10 bg-white/[0.03] text-white hover:border-amber-400/40 hover:text-amber-300"
                          }`}
                        >
                          {item}
                        </Link>
                      ),
                  )}

                  {safeCurrentPage <
                  totalPages ? (
                    <Link
                      href={getTestimonialsPageHref(
                        safeCurrentPage + 1,
                      )}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm font-black text-white transition duration-500 hover:-translate-y-0.5 hover:border-amber-400/40 hover:text-amber-300"
                      aria-label="Pagina următoare"
                    >
                      →
                    </Link>
                  ) : null}
                </div>
              </ScrollReveal>
            ) : null}
          </Container>
        </section>
      )}

      <section className="border-t border-white/10 bg-[#0B0F14] py-20 md:py-24">
        <Container>
          <ScrollReveal>
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-amber-400">
                Colaborarea
              </p>

              <h2 className="mt-5 text-4xl font-black leading-[0.98] tracking-[-0.05em] md:text-5xl">
                Ce urmărim în fiecare proiect.
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {collaborationPrinciples.map(
              (principle, index) => {
                const Icon = principle.icon;

                return (
                  <ScrollReveal
                    key={principle.title}
                    delay={index * 0.07}
                  >
                    <article className="group h-full rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 transition duration-500 hover:-translate-y-1 hover:border-amber-400/35 hover:bg-white/[0.045]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 text-amber-300">
                        <Icon
                          className="h-5 w-5"
                          strokeWidth={2.1}
                        />
                      </div>

                      <h3 className="mt-7 text-2xl font-black tracking-[-0.04em]">
                        {principle.title}
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-gray-400">
                        {principle.text}
                      </p>
                    </article>
                  </ScrollReveal>
                );
              },
            )}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/10 bg-[#080B10] py-20 md:py-24">
        <Container>
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-[2.25rem] border border-amber-400/25 bg-amber-400/[0.055] p-8 md:p-12">
              <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />

              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div className="max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-400">
                    Următorul proiect
                  </p>

                  <h2 className="mt-4 text-4xl font-black leading-[0.98] tracking-[-0.045em] md:text-5xl">
                    Hai să construim o colaborare despre care merită să vorbești.
                  </h2>

                  <p className="mt-5 text-base leading-8 text-gray-300">
                    Spune-ne ce vrei să construiești și
                    stabilim împreună direcția potrivită.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="group/button inline-flex h-12 w-fit items-center justify-center gap-2 rounded-full bg-amber-400 px-7 text-sm font-black text-black transition duration-300 hover:-translate-y-0.5 hover:bg-amber-300"
                >
                  Cere ofertă

                  <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}