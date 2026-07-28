import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, Pin } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Container } from "@/components/layout/Container";
import { FixedPageHero } from "@/components/layout/FixedPageHero";
import { BlogHeroSearch } from "@/components/blog/BlogHeroSearch";
import {
  CategoryFilterMenu,
  type CategoryFilterOption,
} from "@/components/ui/CategoryFilterMenu";
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
  body?: unknown;
  publishedAt?: string;
  _createdAt: string;
  categories?: string[];
  authorName?: string;
  legacyPostType?: string;
  legacyCategory?: {
    title?: string;
  };
  isPinned?: boolean;
  coverImage?: unknown;
};

type BlogPageProps = {
  searchParams?: Promise<{
    page?: string;
    category?: string;
  }>;
};

type TruncatedText = {
  value: string;
  truncated: boolean;
};

const FIRST_PAGE_POSTS = 7;
const OTHER_PAGE_POSTS = 6;
const FEATURED_TITLE_LIMIT = 92;
const FEATURED_EXCERPT_LIMIT = 190;
const CARD_TITLE_LIMIT = 86;
const CARD_EXCERPT_LIMIT = 185;

const postsQuery = `
  *[
    _type == "post" &&
    coalesce(isPublished, true) == true &&
    defined(slug.current)
  ] |
  order(
    coalesce(publishedAt, _createdAt) desc,
    _createdAt desc,
    _id desc
  ) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body,
    publishedAt,
    _createdAt,
    categories,
    authorName,
    "legacyPostType": postType,
    "legacyCategory": category->{title},
    isPinned,
    coverImage
  }
`;

function getLegacyPostTypeLabel(type?: string) {
  if (type === "seo") return "SEO Article";
  if (type === "social") return "Social Embed";
  if (type === "caseStudy") return "Case Study";
  if (type === "update") return "Update";

  return "";
}

function getPostCategories(post: Post): string[] {
  const customCategories = Array.isArray(
    post.categories,
  )
    ? post.categories
        .map((category) =>
          category.trim(),
        )
        .filter(Boolean)
    : [];

  if (customCategories.length > 0) {
    return Array.from(
      new Set(customCategories),
    );
  }

  return Array.from(
    new Set(
      [
        getLegacyPostTypeLabel(
          post.legacyPostType,
        ),
        post.legacyCategory?.title?.trim() ||
          "",
      ].filter(Boolean),
    ),
  );
}

function portableTextToPlainText(
  value: unknown,
): string {
  if (!Array.isArray(value)) {
    return "";
  }

  return value
    .map((block) => {
      if (
        !block ||
        typeof block !== "object"
      ) {
        return "";
      }

      const children = (
        block as {
          children?: unknown;
        }
      ).children;

      if (!Array.isArray(children)) {
        return "";
      }

      return children
        .map((child) => {
          if (
            !child ||
            typeof child !== "object"
          ) {
            return "";
          }

          const text = (
            child as {
              text?: unknown;
            }
          ).text;

          return typeof text === "string"
            ? text
            : "";
        })
        .join("");
    })
    .filter(Boolean)
    .join(" ");
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

function getBlogPageHref(
  page: number,
  category: string,
) {
  const params = new URLSearchParams();

  if (category) {
    params.set("category", category);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();

  return `/blog${
    query ? `?${query}` : ""
  }`;
}

export default async function BlogPage({
  searchParams,
}: BlogPageProps) {
  const resolvedSearchParams =
    await searchParams;

  const activeCategory =
    resolvedSearchParams?.category?.trim() ||
    "";

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

  const categoryOptions: CategoryFilterOption[] =
    Array.from(
      new Set(
        posts.flatMap((post) =>
          getPostCategories(post),
        ),
      ),
    )
      .sort((a, b) =>
        a.localeCompare(b, "ro"),
      )
      .map((category) => ({
        value: category,
        label: category,
        count: posts.filter((post) =>
          getPostCategories(
            post,
          ).includes(category),
        ).length,
      }));

  const filteredPosts = activeCategory
    ? posts.filter((post) =>
        getPostCategories(
          post,
        ).includes(activeCategory),
      )
    : posts;

  const latestPost = filteredPosts[0];

  const pinnedPost = filteredPosts.find(
    (post) => post.isPinned,
  );

  /*
   * Articolul pinned ocupă cardul mare.
   * Dacă nu există pinned, cardul mare este cel mai recent.
   */
  const heroPost =
    pinnedPost || latestPost;

  /*
   * Cardul mare este exclus din grila de jos.
   * Dacă pinned-ul nu este și cel mai recent,
   * articolul recent rămâne în listă cu iconița de recent.
   */
  const postsForList = heroPost
    ? filteredPosts.filter(
        (post) =>
          post._id !== heroPost._id,
      )
    : filteredPosts;

  const paginationSequence = heroPost
    ? [heroPost, ...postsForList]
    : postsForList;

  const totalPages = Math.max(
    getTotalPages(
      paginationSequence.length,
    ),
    1,
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages,
  );

  const paginatedPosts =
    getPostsForPage(
      paginationSequence,
      safeCurrentPage,
    );

  const otherPosts =
    safeCurrentPage === 1
      ? paginatedPosts.slice(1)
      : paginatedPosts;

  const paginationItems =
    activeCategory
      ? Array.from(
          { length: totalPages },
          (_, index) => index + 1,
        )
      : getPaginationItems(
          safeCurrentPage,
          totalPages,
        );

  const featuredTitle = heroPost
    ? truncateText(
        heroPost.title,
        FEATURED_TITLE_LIMIT,
      )
    : null;

  const featuredExcerpt = heroPost
    ? truncateText(
        heroPost.excerpt,
        FEATURED_EXCERPT_LIMIT,
      )
    : null;

  const searchPosts = filteredPosts.map(
    (post) => ({
      id: post._id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      body: portableTextToPlainText(
        post.body,
      ),
      category:
        getPostCategories(post).join(
          ", ",
        ),
      type:
        getPostCategories(post)[0] ||
        "Articol",
    }),
  );

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <FixedPageHero
        eyebrow="Webuilder Blog"
        title={
          <>
            Idei clare despre website-uri, SEO și prezență online.
          </>
        }
        description={
          <>
            Ghiduri practice pentru firme care vor un website mai clar, mai
            rapid și mai ușor de transformat în cereri reale.
          </>
        }
        bottom={
          <BlogHeroSearch
            posts={searchPosts}
          />
        }
        aside={
          heroPost &&
          featuredTitle &&
          featuredExcerpt ? (
            <Link
              href={`/blog/${encodeURIComponent(
                heroPost.slug,
              )}`}
              className="group relative isolate flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-[2rem] border border-amber-400/35 bg-[#11161D] shadow-2xl shadow-black/30 transition duration-500 [transform:translateZ(0)] hover:-translate-y-1 hover:border-amber-400/55"
            >
              <ArticleStatusBadge
                type={
                  heroPost.isPinned
                    ? "pinned"
                    : "recent"
                }
              />

              <div className="relative -mb-1 h-[269px] shrink-0 overflow-hidden bg-[#11161D] [transform:translateZ(0)]">
                {heroPost.coverImage ? (
                  <img
                    src={urlFor(
                      heroPost.coverImage,
                    )
                      .width(1200)
                      .height(700)
                      .url()}
                    alt={heroPost.title}
                    className="block h-full w-full object-cover object-center opacity-92 transition duration-500 [transform:translateZ(0)] group-hover:opacity-100"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:48px_48px]">
                    <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.24em] text-amber-300">
                      Webuilder
                    </span>
                  </div>
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#11161D] via-transparent to-transparent" />
              </div>

              <div className="relative z-10 flex min-h-0 flex-1 flex-col bg-[#11161D] p-6">
                <div className="min-h-0 overflow-hidden">
                  <div className="flex flex-wrap gap-2">
                    {getPostCategories(
                      heroPost,
                    )
                      .slice(0, 3)
                      .map(
                        (
                          category,
                          categoryIndex,
                        ) => (
                          <span
                            key={category}
                            className={
                              categoryIndex === 0
                                ? "rounded-full bg-amber-400 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-black"
                                : "rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-300"
                            }
                          >
                            {category}
                          </span>
                        ),
                      )}
                  </div>

                  <h2 className="mt-4 break-words text-[1.7rem] font-black leading-[1.02] tracking-[-0.04em] text-white [overflow-wrap:anywhere]">
                    {featuredTitle.value}
                  </h2>

                  {featuredExcerpt.value ? (
                    <p className="mt-3 break-words text-sm leading-6 text-gray-400 [overflow-wrap:anywhere]">
                      {featuredExcerpt.value}
                    </p>
                  ) : null}
                </div>

                <div className="mt-auto flex shrink-0 items-center justify-between gap-5 border-t border-white/10 pt-4">
                  <time className="text-xs font-medium text-gray-500">
                    {formatPostDate(
                      heroPost,
                    )}
                  </time>

                  <span className="inline-flex shrink-0 items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-amber-300 transition duration-300 group-hover:text-amber-200">
                    Citește articolul

                    <span className="inline-block text-lg leading-none transition duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ) : null
        }
      />

      <section className="bg-[#080B10] py-24">
        <Container>
          <ScrollReveal>
            <div className="relative z-50 mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-bold text-white">
                  {filteredPosts.length}{" "}
                  {filteredPosts.length === 1
                    ? "articol"
                    : "articole"}
                </p>

                <p className="mt-1 truncate text-sm text-gray-500">
                  {activeCategory
                    ? `Categorie activă: ${activeCategory}`
                    : "Sunt afișate toate articolele publicate."}
                </p>
              </div>

              <CategoryFilterMenu
                label="Filtrează articolele"
                activeValues={
                  activeCategory
                    ? [activeCategory]
                    : []
                }
                options={categoryOptions}
                clearLabel="Toate categoriile"
                closeOnSelect
                navigation={{
                  pathname: "/blog",
                  queryKey: "category",
                  mode: "single",
                  scroll: false,
                }}
              />
            </div>
          </ScrollReveal>

          {paginatedPosts.length > 0 ? (
            <div className="space-y-10">
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
                              <ArticleStatusBadge
                                type="pinned"
                                small
                              />
                            ) : post._id ===
                              latestPost?._id ? (
                              <ArticleStatusBadge
                                type="recent"
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
                                {getPostCategories(
                                  post,
                                )
                                  .slice(0, 3)
                                  .map(
                                    (
                                      category,
                                      categoryIndex,
                                    ) => (
                                      <span
                                        key={
                                          category
                                        }
                                        className={
                                          categoryIndex ===
                                          0
                                            ? "rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-black"
                                            : "rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400"
                                        }
                                      >
                                        {
                                          category
                                        }
                                      </span>
                                    ),
                                  )}
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
                                <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-amber-300 transition duration-300 group-hover:text-amber-200">
                                  Citește articolul

                                  <span className="inline-block text-lg leading-none transition duration-500 group-hover:translate-x-1">
                                    →
                                  </span>
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
                          activeCategory,
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
                            basePath="/blog"
                          />
                        ) : (
                          <Link
                            key={item}
                            href={getBlogPageHref(
                              item,
                              activeCategory,
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
                          activeCategory,
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
                  {activeCategory
                    ? "Nu există articole în această categorie."
                    : "Nu există articole publicate încă."}
                </h2>
              </div>
            </ScrollReveal>
          )}
        </Container>
      </section>
    </main>
  );
}

function ArticleStatusBadge({
  type,
  small = false,
}: {
  type: "pinned" | "recent";
  small?: boolean;
}) {
  const isPinned = type === "pinned";

  return (
    <div
      className={`absolute z-30 flex h-10 w-10 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/10 text-amber-300 ${
        small
          ? "right-4 top-4"
          : "right-5 top-5"
      }`}
      title={
        isPinned
          ? "Articol fixat"
          : "Cel mai recent"
      }
      aria-label={
        isPinned
          ? "Articol fixat"
          : "Cel mai recent"
      }
    >
      {isPinned ? (
        <Pin
          className="h-5 w-5"
          strokeWidth={2.4}
        />
      ) : (
        <Clock3
          className="h-5 w-5"
          strokeWidth={2.4}
        />
      )}
    </div>
  );
}
