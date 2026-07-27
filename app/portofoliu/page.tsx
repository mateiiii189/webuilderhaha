import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { FixedPageHero } from "@/components/layout/FixedPageHero";
import {
  PortfolioCarousel,
  type PortfolioDemo,
} from "@/components/sections/PortfolioCarousel";
import { PortfolioProjectsGrid } from "@/components/sections/PortfolioProjectsGrid";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Portofoliu",
  description:
    "Demo-uri și proiecte web construite pentru firme moderne din industrii precum fitness, medical, logistică, HoReCa, imobiliare, beauty și auto.",
};

/*
 * Pagina este randată la fiecare request.
 * Modificările publicate în Sanity apar după refresh,
 * fără să fie necesar un nou deployment.
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;

const freshClient = client.withConfig({
  useCdn: false,
  perspective: "published",
});

type PortfolioReview = {
  _id: string;
  company: string;
  brandImage?: unknown;
  project?: string;
  rating?: number;
  text: string;
};

type PortfolioProjectFromSanity = {
  _id: string;
  title: string;
  category?: string;
  description?: string;
  tags?: string[];
  demoUrl: string;
  previewImage?: unknown;
  isPinned?: boolean;
  isFeatured?: boolean;
  isPublished?: boolean;
  publishedAt?: string;
  _createdAt: string;
};

type PortfolioProject =
  PortfolioDemo & {
    isPinned: boolean;
    isFeatured: boolean;
    isPublished: boolean;
    publishedAt?: string;
    createdAt: string;
  };

const portfolioReviewQuery = `
  *[_type == "review"] |
  order(
    isPinned desc,
    coalesce(publishedAt, _createdAt) desc,
    _createdAt desc
  )[0] {
    _id,
    company,
    brandImage,
    project,
    rating,
    text
  }
`;

const portfolioProjectsQuery = `
  *[
    _type == "portfolioProject" &&
    coalesce(isPublished, true) == true &&
    defined(title) &&
    defined(demoUrl)
  ] |
  order(
    coalesce(publishedAt, _createdAt) desc,
    _createdAt desc,
    _id desc
  ) {
    _id,
    title,
    category,
    description,
    tags,
    demoUrl,
    previewImage,
    isPinned,
    isFeatured,
    isPublished,
    publishedAt,
    _createdAt
  }
`;

function getReviewPreview(
  text: string,
  maxLength = 420,
) {
  const normalized = text.trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  const candidate = normalized.slice(
    0,
    maxLength + 1,
  );

  const lastSpace =
    candidate.lastIndexOf(" ");

  const cutAt =
    lastSpace >= maxLength * 0.7
      ? lastSpace
      : maxLength;

  return `${normalized
    .slice(0, cutAt)
    .trimEnd()}…`;
}

function ReviewStars({
  rating = 5,
}: {
  rating?: number;
}) {
  const safeRating = Math.min(
    Math.max(Math.round(rating), 0),
    5,
  );

  return (
    <div
      className="flex items-center gap-1 text-lg"
      aria-label={`${safeRating} din 5 stele`}
    >
      {Array.from({
        length: 5,
      }).map((_, index) => (
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
      ))}
    </div>
  );
}

function FeaturedPortfolioProject({
  project,
}: {
  project: PortfolioProject;
}) {
  return (
    <article className="group relative isolate flex h-full min-h-0 w-full flex-col overflow-hidden rounded-[2rem] border border-amber-400/35 bg-[#11161D] shadow-2xl shadow-black/30 transition duration-500 [transform:translateZ(0)] hover:-translate-y-1 hover:border-amber-400/55">
      <div className="relative -mb-1 h-[269px] shrink-0 overflow-hidden bg-[#11161D] [transform:translateZ(0)]">
        {project.previewImageUrl ? (
          <img
            src={project.previewImageUrl}
            alt={project.title}
            className="block h-full w-full object-cover object-top opacity-95 transition duration-700 [transform:translateZ(0)] group-hover:scale-[1.018] group-hover:opacity-100"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:48px_48px]">
            <div className="w-full max-w-[285px] rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition duration-500 group-hover:border-amber-400/25">
              <div className="mb-4 flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                <span className="h-3 w-3 rounded-full bg-green-400/80" />
              </div>

              <div className="space-y-3">
                <div className="h-3 w-24 rounded-full bg-amber-400/40" />
                <div className="h-4 w-full rounded-full bg-white/15" />
                <div className="h-4 w-3/4 rounded-full bg-white/10" />

                <div className="grid grid-cols-3 gap-2 pt-3">
                  <div className="h-11 rounded-xl border border-white/10 bg-white/[0.03]" />
                  <div className="h-11 rounded-xl border border-white/10 bg-white/[0.03]" />
                  <div className="h-11 rounded-xl border border-white/10 bg-white/[0.03]" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#11161D] via-transparent to-transparent" />

        <span className="absolute right-5 top-5 z-20 rounded-full border border-amber-400/35 bg-[#11161D]/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-amber-300 shadow-lg shadow-black/20 backdrop-blur-md">
          {project.isPinned
            ? "Pinned"
            : "Cel mai recent"}
        </span>
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col bg-[#11161D] p-5">
        <div className="min-h-0">
          <div className="flex min-w-0 items-center justify-between gap-4">
            <p className="min-w-0 shrink truncate text-sm font-semibold text-amber-300">
              {project.category}
            </p>

            {project.tags.length > 0 ? (
              <div className="flex min-w-0 flex-1 items-center justify-end gap-2.5 overflow-visible py-1">
                {project.tags
                  .slice(0, 3)
                  .map((tag) => (
                    <span
                      key={tag}
                      title={tag}
                      className="max-w-[120px] shrink-0 cursor-default truncate rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-semibold text-gray-300 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/40 hover:bg-amber-400/[0.09] hover:text-amber-200"
                    >
                      {tag}
                    </span>
                  ))}

                {project.tags.length >
                3 ? (
                  <span className="shrink-0 cursor-default rounded-full border border-amber-400/20 bg-amber-400/[0.07] px-3 py-1.5 text-[11px] font-black text-amber-300 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/45 hover:bg-amber-400/[0.13] hover:text-amber-200">
                    +
                    {project.tags.length -
                      3}
                  </span>
                ) : null}
              </div>
            ) : null}
          </div>

          <h2 className="mt-4 line-clamp-2 break-words text-3xl font-black leading-[1] tracking-[-0.045em] text-white [overflow-wrap:anywhere]">
            {project.title}
          </h2>

          <p className="mt-4 line-clamp-2 min-h-[56px] break-words text-sm leading-7 text-gray-400 [overflow-wrap:anywhere]">
            {project.description}
          </p>
        </div>

        <div className="mt-auto pt-5">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/live inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/35 hover:bg-white/[0.06] hover:text-amber-300"
          >
            Vezi proiectul live

            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default async function PortofoliuPage() {
  const [
    featuredReview,
    portfolioProjectsFromSanity,
  ] = await Promise.all([
    freshClient.fetch<
      PortfolioReview | null
    >(
      portfolioReviewQuery,
      {},
      {
        cache: "no-store",
      },
    ),

    freshClient.fetch<
      PortfolioProjectFromSanity[]
    >(
      portfolioProjectsQuery,
      {},
      {
        cache: "no-store",
      },
    ),
  ]);

  const portfolioProjects: PortfolioProject[] =
    portfolioProjectsFromSanity.map(
      (project) => ({
        _id: project._id,
        title: project.title,

        category:
          project.category ||
          "Website de prezentare",

        description:
          project.description ||
          "Proiect digital construit pentru prezentarea serviciilor, generarea de cereri și dezvoltarea prezenței online.",

        tags: project.tags || [],

        href: project.demoUrl,

        previewImageUrl:
          project.previewImage
            ? urlFor(
                project.previewImage,
              )
                .width(1600)
                .height(1000)
                .fit("crop")
                .crop("top")
                .quality(92)
                .url()
            : undefined,

        isPinned:
          project.isPinned === true,

        isFeatured:
          project.isFeatured === true,

        isPublished:
          project.isPublished !== false,

        publishedAt:
          project.publishedAt,

        createdAt:
          project._createdAt,
      }),
    );

  const pinnedPortfolioProject =
    portfolioProjects.find(
      (project) =>
        project.isPinned,
    );

  const featuredPortfolioProject =
    pinnedPortfolioProject ||
    portfolioProjects[0];

  const projectsWithoutHero =
    featuredPortfolioProject
      ? portfolioProjects.filter(
          (project) =>
            project._id !==
            featuredPortfolioProject._id,
        )
      : portfolioProjects;

  const manuallyFeaturedProjects =
    projectsWithoutHero.filter(
      (project) =>
        project.isFeatured,
    );

  const carouselProjects =
    manuallyFeaturedProjects.length > 0
      ? manuallyFeaturedProjects.slice(
          0,
          10,
        )
      : projectsWithoutHero.slice(
          0,
          8,
        );

  const archiveProjects =
    portfolioProjects;

  const reviewPreview = featuredReview
    ? getReviewPreview(
        featuredReview.text,
      )
    : null;

  const featuredBrandImageUrl =
    featuredReview?.brandImage
      ? urlFor(
          featuredReview.brandImage,
        )
          .width(300)
          .height(300)
          .url()
      : undefined;

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#0B0F14] text-white">
      <FixedPageHero
        eyebrow="Portofoliu"
        title={
          <>
            Demo-uri reale, construite ca website-uri separate.
          </>
        }
        description={
          <>
            În loc de simple screenshot-uri, construim platforme demo reale,
            găzduite separat, astfel încât fiecare client să poată vedea cum
            ar arăta un website complet în industria lui.
          </>
        }
        bottom={
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button href="/contact">
              Vreau un demo pentru firma mea
            </Button>

            <Button
              href="/preturi"
              variant="secondary"
            >
              Vezi prețuri
            </Button>
          </div>
        }
        aside={
          featuredPortfolioProject ? (
            <FeaturedPortfolioProject
              project={
                featuredPortfolioProject
              }
            />
          ) : null
        }
      />

      {carouselProjects.length > 0 ? (
        <section className="relative overflow-hidden bg-[#080B10] py-20 md:py-24">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/[0.035] blur-3xl" />

          <Container className="relative">
            <ScrollReveal>
              <div className="max-w-4xl">
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-amber-400">
                  Proiecte selectate
                </p>

                <h2 className="mt-5 text-4xl font-black leading-[0.98] tracking-[-0.05em] text-white md:text-5xl">
                  Câteva direcții construite pentru industrii și obiective diferite.
                </h2>

                <p className="mt-6 max-w-3xl text-base leading-8 text-gray-400 md:text-lg">
                  Explorează proiectele pe rând. Cardurile laterale îți arată ce
                  urmează, iar proiectul activ poate fi deschis live.
                </p>
              </div>
            </ScrollReveal>

            <PortfolioCarousel
              demos={carouselProjects}
            />
          </Container>
        </section>
      ) : null}

      {archiveProjects.length > 0 ? (
        <section className="relative overflow-hidden border-t border-white/10 bg-[#0B0F14] py-20 md:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(250,204,21,0.045),transparent_34%)]" />

          <Container className="relative">
            <ScrollReveal>
              <div className="max-w-4xl">
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-amber-400">
                  Explorează portofoliul
                </p>

                <h2 className="mt-5 text-4xl font-black leading-[0.98] tracking-[-0.05em] text-white md:text-5xl">
                  Toate proiectele, organizate după tipul website-ului.
                </h2>

                <p className="mt-6 max-w-3xl text-base leading-8 text-gray-400 md:text-lg">
                  Poți vedea toate proiectele sau poți selecta direct categoria
                  relevantă pentru afacerea ta.
                </p>
              </div>
            </ScrollReveal>

            <PortfolioProjectsGrid
              projects={archiveProjects}
            />
          </Container>
        </section>
      ) : null}

      {featuredReview &&
      reviewPreview ? (
        <section className="relative overflow-hidden border-t border-white/10 bg-[#080B10] py-20 md:py-24">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/[0.055] blur-3xl" />

          <Container className="relative">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
              <ScrollReveal>
                <div className="max-w-xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.34em] text-amber-400">
                    Dincolo de design
                  </p>

                  <h2 className="mt-5 text-4xl font-black leading-[0.98] tracking-[-0.05em] md:text-5xl">
                    Proiectele contează. La fel și experiența colaborării.
                  </h2>

                  <p className="mt-6 text-base leading-8 text-gray-400 md:text-lg">
                    Portofoliul arată ce putem construi. Testimonialele arată
                    cum este să lucrezi cu noi de la prima discuție până la
                    lansare.
                  </p>

                  <Link
                    href="/testimoniale"
                    className="group/testimonials mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/40 hover:bg-white/[0.06] hover:text-amber-300"
                  >
                    Vezi toate testimonialele

                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/testimonials:translate-x-0.5 group-hover/testimonials:-translate-y-0.5" />
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.08}>
                <article className="group relative overflow-hidden rounded-[2rem] border border-amber-400/30 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.13),rgba(17,22,29,0.98)_44%,#11161D_100%)] p-7 shadow-2xl shadow-black/30 transition duration-500 hover:-translate-y-1 hover:border-amber-400/50 md:p-9">
                  <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />

                  <div className="relative">
                    <div className="flex min-h-14 items-center justify-between gap-6">
                      <div className="flex min-w-0 items-center gap-4">
                        {featuredBrandImageUrl ? (
                          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-[1.1rem] border border-white/10 bg-white/[0.04] transition duration-300 group-hover:border-amber-400/45">
                            <div
                              className="h-full w-full bg-cover bg-center transition duration-500 group-hover:scale-[1.04]"
                              style={{
                                backgroundImage: `url(${featuredBrandImageUrl})`,
                              }}
                            />
                          </div>
                        ) : (
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.1rem] border border-amber-400/30 bg-amber-400/10 text-lg font-black text-amber-300 transition duration-300 group-hover:border-amber-400/55 group-hover:bg-amber-400/15">
                            {featuredReview.company
                              .split(" ")
                              .map(
                                (word) =>
                                  word[0],
                              )
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>
                        )}

                        <p className="min-w-0 break-words text-lg font-black tracking-[-0.03em] text-white [overflow-wrap:anywhere]">
                          {featuredReview.company}
                        </p>
                      </div>

                      <ReviewStars
                        rating={
                          featuredReview.rating
                        }
                      />
                    </div>

                    <blockquote className="mt-8 break-words text-lg font-semibold leading-8 tracking-[-0.02em] text-white [overflow-wrap:anywhere] md:text-xl md:leading-9">
                      „{reviewPreview}”
                    </blockquote>

                    <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                      <p className="min-w-0 break-words text-sm text-gray-500 [overflow-wrap:anywhere]">
                        {featuredReview.project ||
                          "Website"}
                      </p>

                      <Link
                        href={`/testimoniale/${encodeURIComponent(
                          featuredReview._id,
                        )}`}
                        className="group/read inline-flex w-fit shrink-0 items-center gap-2 text-sm font-black text-amber-300 transition duration-300 hover:text-amber-200"
                      >
                        Citește testimonialul

                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/read:translate-x-0.5 group-hover/read:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="border-t border-white/10 bg-[#0B0F14] py-24">
        <Container>
          <Panel>
            <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <div>
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-amber-400">
                  Strategie
                </p>

                <h2 className="text-4xl font-black leading-[1] tracking-tight text-white md:text-5xl">
                  Pentru fiecare client putem crea un demo personalizat.
                </h2>

                <p className="mt-5 text-base leading-8 text-gray-400 md:text-lg">
                  Dacă firma activează într-o nișă diferită, putem construi un
                  demo separat pentru construcții, consultanță, servicii
                  medicale, transport, auto, HoReCa sau orice alt domeniu.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#080B10] p-6">
                <p className="text-sm font-semibold text-amber-300">
                  Cum prezentăm demo-ul
                </p>

                <div className="mt-6 space-y-4">
                  {[
                    "Subdomeniu separat pe Vercel",
                    "Design adaptat industriei",
                    "Structură SEO realistă",
                    "CTA-uri pentru lead-uri",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-gray-300 shadow-2xl shadow-black/20 transition duration-500 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/[0.05] hover:text-white"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Button href="/contact">
                    Cere demo personalizat
                  </Button>
                </div>
              </div>
            </div>
          </Panel>
        </Container>
      </section>
    </main>
  );
}