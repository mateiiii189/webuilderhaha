import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articole, ghiduri și noutăți despre website-uri, SEO, design web și prezență online pentru firme.",
};

type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
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

const POSTS_PER_PAGE = 7;

const postsQuery = `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
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

function getPaginationItems(currentPage: number, totalPages: number) {
  const items: Array<number | "..."> = [];

  if (totalPages <= 5) {
    for (let page = 1; page <= totalPages; page += 1) {
      items.push(page);
    }

    return items;
  }

  if (currentPage <= 3) {
    items.push(1, 2, 3, "...", totalPages);
    return items;
  }

  if (currentPage >= totalPages - 2) {
    items.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    return items;
  }

  items.push(1, currentPage - 1, currentPage, currentPage + 1, "...", totalPages);

  return items;
}

function PaginationDotsPanel({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pages = Array.from({ length: totalPages }).map((_, index) => index + 1);

  return (
    <div className="group relative">
      <button
        type="button"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm font-black text-gray-400 transition duration-500 md:cursor-default md:group-hover:-translate-y-0.5 md:group-hover:border-amber-400/40 md:group-hover:text-amber-300"
        aria-label="Arată toate paginile"
      >
        ...
      </button>

      <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-[86vw] max-w-[620px] -translate-x-1/2 translate-y-2 rounded-[1.5rem] border border-white/10 bg-[#0B0F14]/95 p-3 opacity-0 shadow-2xl shadow-black/40 backdrop-blur-xl transition duration-300 after:absolute after:left-0 after:top-full after:h-3 after:w-full after:content-[''] max-md:group-focus-within:pointer-events-auto max-md:group-focus-within:translate-y-0 max-md:group-focus-within:opacity-100 md:w-auto md:min-w-[520px] md:group-hover:pointer-events-auto md:group-hover:translate-y-0 md:group-hover:opacity-100">
        <div className="flex gap-2 overflow-x-auto pb-1 md:grid md:max-h-[260px] md:grid-cols-10 md:overflow-visible md:pb-0">
          {pages.map((page) => (
            <Link
              key={page}
              href={page === 1 ? "/blog" : `/blog?page=${page}`}
              className={`flex h-10 min-w-10 shrink-0 items-center justify-center rounded-full border text-xs font-black transition duration-300 hover:-translate-y-0.5 ${
                page === currentPage
                  ? "border-amber-400 bg-amber-400 text-black"
                  : "border-white/10 bg-white/[0.03] text-white hover:border-amber-400/40 hover:text-amber-300"
              }`}
            >
              {page}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Math.max(Number(resolvedSearchParams?.page || 1), 1);

  const posts = await client.fetch<Post[]>(
    postsQuery,
    {},
    {
      next: {
        tags: ["posts"],
      },
    }
  );

  const pinnedPost = posts.find((post) => post.isPinned);
  const sortedPosts = pinnedPost
    ? [pinnedPost, ...posts.filter((post) => post._id !== pinnedPost._id)]
    : posts;

  const totalPages = Math.max(Math.ceil(sortedPosts.length / POSTS_PER_PAGE), 1);
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = sortedPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  const featuredPost = paginatedPosts[0];

  const otherPosts = featuredPost
    ? paginatedPosts.filter((post) => post._id !== featuredPost._id)
    : [];

  const paginationItems = getPaginationItems(safeCurrentPage, totalPages);

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0B0F14] pt-40 pb-20">
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
              {featuredPost ? (
                <ScrollReveal>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="group relative grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/30 transition duration-500 hover:-translate-y-1 hover:border-amber-400/35 hover:bg-white/[0.055] md:grid-cols-[1.1fr_0.9fr]"
                  >
                    {featuredPost.isPinned ? <PinnedArticleBadge /> : null}

                    <div className="relative min-h-[340px] overflow-hidden bg-[#11161D] md:min-h-[460px]">
                      {featuredPost.coverImage ? (
                        <img
                          src={urlFor(featuredPost.coverImage)
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

                    <div className="flex flex-col justify-between p-7 md:p-10">
                      <div>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-black">
                            {getPostTypeLabel(featuredPost.postType)}
                          </span>

                          {featuredPost.category?.title ? (
                            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-gray-300">
                              {featuredPost.category.title}
                            </span>
                          ) : null}
                        </div>

                        <h2 className="mt-6 text-4xl font-black leading-[1] tracking-tight text-white md:text-5xl">
                          {featuredPost.title}
                        </h2>

                        <p className="mt-5 text-base leading-8 text-gray-400">
                          {featuredPost.excerpt}
                        </p>
                      </div>

                      <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                        <time className="text-sm font-medium text-gray-500">
                          {new Date(
                            featuredPost.publishedAt
                          ).toLocaleDateString("ro-RO", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </time>

                        <span className="text-sm font-black uppercase tracking-[0.16em] text-amber-300 transition duration-300 group-hover:text-amber-200">
                          Citește →
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ) : null}

              {otherPosts.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-3">
                  {otherPosts.map((post, index) => (
                    <ScrollReveal key={post._id} delay={index * 0.08}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group relative block h-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/20 transition duration-500 hover:-translate-y-1 hover:border-amber-400/35 hover:bg-white/[0.055]"
                      >
                        {post.isPinned ? <PinnedArticleBadge small /> : null}

                        <div className="relative h-56 overflow-hidden bg-[#11161D]">
                          {post.coverImage ? (
                            <img
                              src={urlFor(post.coverImage)
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

                        <div className="p-6">
                          <div className="flex flex-wrap gap-2">
                            <span className="rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-black">
                              {getPostTypeLabel(post.postType)}
                            </span>

                            {post.category?.title ? (
                              <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400">
                                {post.category.title}
                              </span>
                            ) : null}
                          </div>

                          <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight text-white">
                            {post.title}
                          </h2>

                          <p className="mt-4 text-sm leading-7 text-gray-400">
                            {post.excerpt}
                          </p>

                          <p className="mt-6 text-sm font-black uppercase tracking-[0.14em] text-amber-300 transition duration-300 group-hover:text-amber-200">
                            Citește articolul →
                          </p>
                        </div>
                      </Link>
                    </ScrollReveal>
                  ))}
                </div>
              ) : null}

              {totalPages > 1 ? (
                <ScrollReveal delay={0.12}>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
                    {safeCurrentPage > 1 ? (
                      <Link
                        href={`/blog?page=${safeCurrentPage - 1}`}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm font-black text-white transition duration-500 hover:-translate-y-0.5 hover:border-amber-400/40 hover:text-amber-300"
                        aria-label="Pagina anterioară"
                      >
                        ←
                      </Link>
                    ) : null}

                    {paginationItems.map((item, index) =>
                      item === "..." ? (
                        <PaginationDotsPanel
                          key={`dots-${index}`}
                          currentPage={safeCurrentPage}
                          totalPages={totalPages}
                        />
                      ) : (
                        <Link
                          key={item}
                          href={item === 1 ? "/blog" : `/blog?page=${item}`}
                          className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-black transition duration-500 hover:-translate-y-0.5 ${
                            item === safeCurrentPage
                              ? "border-amber-400 bg-amber-400 text-black"
                              : "border-white/10 bg-white/[0.03] text-white hover:border-amber-400/40 hover:text-amber-300"
                          }`}
                        >
                          {item}
                        </Link>
                      )
                    )}

                    {safeCurrentPage < totalPages ? (
                      <Link
                        href={`/blog?page=${safeCurrentPage + 1}`}
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

function PinnedArticleBadge({ small = false }: { small?: boolean }) {
  return (
    <div
      className={`absolute z-30 cursor-pointer rounded-full border border-amber-400/40 bg-[#0B0F14]/95 font-black uppercase tracking-[0.18em] text-amber-300 shadow-lg shadow-black/30 transition duration-500 hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-400 hover:text-black ${
        small
          ? "right-4 top-4 px-3 py-1.5 text-[10px]"
          : "right-5 top-5 px-4 py-2 text-xs"
      }`}
    >
      Pinned
    </div>
  );
}