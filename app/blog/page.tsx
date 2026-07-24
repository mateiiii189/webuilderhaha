import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
} from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PaginationDotsPanel } from "@/components/sections/PaginationDotsPanel";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articole, ghiduri și noutăți despre website-uri, SEO, design web și prezență online pentru firme.",
};

type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  _createdAt: string;
  postType: string;
  isPinned?: boolean;
  coverImage?: unknown;
  category?: {
    title?: string;
  };
};

type BlogPageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

type TruncatedText = {
  value: string;
  truncated: boolean;
};

const FIRST_PAGE_POSTS = 7;
const OTHER_PAGE_POSTS = 6;
const FEATURED_TITLE_LIMIT = 120;
const FEATURED_EXCERPT_LIMIT = 300;
const CARD_TITLE_LIMIT = 86;
const CARD_EXCERPT_LIMIT = 185;

const postsQuery = `
  *[_type == "post" && defined(slug.current)] |
  order(
    coalesce(publishedAt, _createdAt) desc,
    _createdAt desc,
    _id desc
  ) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    _createdAt,
    postType,
    isPinned,
    coverImage,
    category->{title}
  }
`;

function getPostTypeLabel(type: string) {
  if (type === "seo") return "Ghid";
  if (type === "social") return "Social";
  if (type === "caseStudy") return "Studiu de caz";
  if (type === "update") return "Update";

  return "Articol";
}

function truncateText(
  text: string | undefined,
  maxLength: number,
): TruncatedText {
  const normalized = (text || "").trim();

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

function getPostDate(post: Post): string {
  return post.publishedAt || post._createdAt;
}

function formatPostDate(post: Post): string {
  return new Date(
    getPostDate(post),
  ).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getTotalPages(
  postCount: number,
): number {
  if (postCount <= FIRST_PAGE_POSTS) {
    return 1;
  }

  return (
    1 +
    Math.ceil(
      (postCount - FIRST_PAGE_POSTS) /
        OTHER_PAGE_POSTS,
    )
  );
}

function getPostsForPage(
  posts: Post[],
  page: number,
): Post[] {
  if (page === 1) {
    return posts.slice(
      0,
      FIRST_PAGE_POSTS,
    );
  }

  const startIndex =
    FIRST_PAGE_POSTS +
    (page - 2) * OTHER_PAGE_POSTS;

  return posts.slice(
    startIndex,
    startIndex + OTHER_PAGE_POSTS,
  );
}

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

  if (
    currentPage >=
    totalPages - 2
  ) {
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

function getBlogPageHref(page: number) {
  return page === 1
    ? "/blog"
    : `/blog?page=${page}`;
}

export default async function BlogPage({
  searchParams,
}: BlogPageProps) {
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

  const posts = await client.fetch<Post[]>(
    postsQuery,
    {},
    {
      next: {
        tags: ["posts"],
      },
    },
  );

  const pinnedPost = posts.find(
    (post) => post.isPinned,
  );

  const sortedPosts = pinnedPost
    ? [
        pinnedPost,
        ...posts.filter(
          (post) =>
            post._id !== pinnedPost._id,
        ),
      ]
    : posts;

  const totalPages = Math.max(
    getTotalPages(sortedPosts.length),
    1,
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages,
  );

  const paginatedPosts =
    getPostsForPage(
      sortedPosts,
      safeCurrentPage,
    );

  /*
   * Cardul lat există exclusiv pe pagina 1.
   * Paginile 2+ conțin câte 6 carduri normale.
   */
  const featuredPost =
    safeCurrentPage === 1
      ? paginatedPosts[0]
      : undefined;

  const otherPosts =
    safeCurrentPage === 1
      ? paginatedPosts.slice(1)
      : paginatedPosts;

  const paginationItems =
    getPaginationItems(
      safeCurrentPage,
      totalPages,
    );

  const featuredTitle = featuredPost
    ? truncateText(
        featuredPost.title,
        FEATURED_TITLE_LIMIT,
      )
    : null;

  const featuredExcerpt = featuredPost
    ? truncateText(
        featuredPost.excerpt,
        FEATURED_EXCERPT_LIMIT,
      )
    : null;

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0B0F14] pb-20 pt-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:64px_64px] opacity-25" />
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-400/15 blur-3xl" />

        <Container className="relative">
          <ScrollReveal>
            <div className="max-w-5xl">
              <p className="mb-5 border-l-4 border-amber-400 pl-4 text-sm font-bold uppercase tracking-[0.28em] text-amber-300">
                Webuilder Blog
              </p>

              <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
                Idei clare despre website-uri, SEO și prezență online.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-gray-400 md:text-lg">
                Ghiduri practice pentru firme care vor un website mai clar, mai
                rapid și mai ușor de transformat în cereri reale.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="bg-[#080B10] py-24">
        <Container>
          {paginatedPosts.length > 0 ? (
            <div className="space-y-10">
              {featuredPost &&
              featuredTitle &&
              featuredExcerpt ? (
                <ScrollReveal>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="group relative grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/30 transition duration-500 hover:-translate-y-1 hover:border-amber-400/35 hover:bg-white/[0.055] md:grid-cols-[1.1fr_0.9fr]"
                  >
                    {featuredPost.isPinned ? (
                      <PinnedArticleBadge />
                    ) : (
                      <RecentArticleBadge />
                    )}

                    <div className="relative min-h-[340px] overflow-hidden bg-[#11161D] md:min-h-[460px]">
                      {featuredPost.coverImage ? (
                        <img
                          src={urlFor(
                            featuredPost.coverImage,
                          )
                            .width(1200)
                            .height(800)
                            .url()}
                          alt={featuredPost.title}
                          className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:48px_48px]">
                          <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.24em] text-amber-300">
                            Webuilder
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex min-w-0 flex-col p-7 md:p-10">
                      <div className="min-w-0">
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-black">
                            {getPostTypeLabel(
                              featuredPost.postType,
                            )}
                          </span>

                          {featuredPost.category
                            ?.title ? (
                            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-gray-300">
                              {
                                featuredPost
                                  .category.title
                              }
                            </span>
                          ) : null}
                        </div>

                        <h2 className="mt-6 break-words text-4xl font-black leading-[1] tracking-tight text-white [overflow-wrap:anywhere] md:text-5xl">
                          {featuredTitle.value}
                        </h2>

                        {featuredExcerpt.value ? (
                          <p className="mt-5 break-words text-base leading-8 text-gray-400 [overflow-wrap:anywhere]">
                            {
                              featuredExcerpt.value
                            }
                          </p>
                        ) : null}
                      </div>

                      <div className="mt-auto flex items-center justify-between gap-5 border-t border-white/10 pt-5">
                        <time className="text-sm font-medium text-gray-500">
                          {formatPostDate(
                            featuredPost,
                          )}
                        </time>

                        <span className="group/read inline-flex shrink-0 items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-amber-300 transition duration-300 group-hover:text-amber-200">
                          Citește articolul

                          <ArrowRight className="h-4 w-4 transition duration-300 group-hover/read:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ) : null}

              {otherPosts.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-3">
                  {otherPosts.map(
                    (post, index) => {
                      const title =
                        truncateText(
                          post.title,
                          CARD_TITLE_LIMIT,
                        );

                      const excerpt =
                        truncateText(
                          post.excerpt,
                          CARD_EXCERPT_LIMIT,
                        );

                      return (
                        <ScrollReveal
                          key={post._id}
                          delay={
                            index * 0.08
                          }
                        >
                          <Link
                            href={`/blog/${post.slug}`}
                            className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/20 transition duration-500 hover:-translate-y-1 hover:border-amber-400/35 hover:bg-white/[0.055]"
                          >
                            {post.isPinned ? (
                              <PinnedArticleBadge
                                small
                              />
                            ) : null}

                            <div className="relative h-56 shrink-0 overflow-hidden bg-[#11161D]">
                              {post.coverImage ? (
                                <img
                                  src={urlFor(
                                    post.coverImage,
                                  )
                                    .width(800)
                                    .height(500)
                                    .url()}
                                  alt={post.title}
                                  className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:40px_40px]">
                                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
                                    Webuilder
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="flex min-w-0 flex-1 flex-col p-6">
                              <div className="flex flex-wrap gap-2">
                                <span className="rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-black">
                                  {getPostTypeLabel(
                                    post.postType,
                                  )}
                                </span>

                                {post.category
                                  ?.title ? (
                                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400">
                                    {
                                      post
                                        .category
                                        .title
                                    }
                                  </span>
                                ) : null}
                              </div>

                              <h2 className="mt-4 break-words text-2xl font-black leading-tight tracking-tight text-white [overflow-wrap:anywhere]">
                                {title.value}
                              </h2>

                              {excerpt.value ? (
                                <p className="mt-4 break-words text-sm leading-7 text-gray-400 [overflow-wrap:anywhere]">
                                  {excerpt.value}
                                </p>
                              ) : null}

                              <div className="mt-auto pt-6">
                                <span className="group/read inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-amber-300 transition duration-300 group-hover:text-amber-200">
                                  Citește articolul

                                  <ArrowRight className="h-4 w-4 transition duration-300 group-hover/read:translate-x-1" />
                                </span>
                              </div>
                            </div>
                          </Link>
                        </ScrollReveal>
                      );
                    },
                  )}
                </div>
              ) : null}

              {totalPages > 1 ? (
                <ScrollReveal delay={0.12}>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
                    {safeCurrentPage >
                    1 ? (
                      <Link
                        href={getBlogPageHref(
                          safeCurrentPage -
                            1,
                        )}
                        scroll
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
                          />
                        ) : (
                          <Link
                            key={item}
                            href={getBlogPageHref(
                              item,
                            )}
                            scroll
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
                        href={getBlogPageHref(
                          safeCurrentPage +
                            1,
                        )}
                        scroll
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm font-black text-white transition duration-500 hover:-translate-y-0.5 hover:border-amber-400/40 hover:text-amber-300"
                        aria-label="Pagina următoare"
                      >
                        →
                      </Link>
                    ) : null}
                  </div>
                </ScrollReveal>
              ) : null}
            </div>
          ) : (
            <ScrollReveal>
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 text-center">
                <h2 className="text-3xl font-black text-white">
                  Nu există articole publicate încă.
                </h2>
              </div>
            </ScrollReveal>
          )}
        </Container>
      </section>
    </main>
  );
}

function PinnedArticleBadge({
  small = false,
}: {
  small?: boolean;
}) {
  return (
    <div
      className={`absolute z-30 rounded-full border border-amber-400/40 bg-[#0B0F14]/95 font-black uppercase tracking-[0.18em] text-amber-300 shadow-lg shadow-black/30 ${
        small
          ? "right-4 top-4 px-3 py-1.5 text-[10px]"
          : "right-5 top-5 px-4 py-2 text-xs"
      }`}
    >
      Pinned
    </div>
  );
}

function RecentArticleBadge() {
  return (
    <div
      className="absolute right-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-amber-400/40 bg-[#0B0F14]/95 text-amber-300 shadow-lg shadow-black/30"
      title="Cel mai recent"
      aria-label="Cel mai recent"
    >
      <Clock3 className="h-5 w-5" />
    </div>
  );
}