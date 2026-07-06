import type { Metadata } from "next";
import Link from "next/link";
import { cache } from "react";
import { redirect } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PortableTextRenderer } from "@/components/blog/PortableTextRenderer";
import { BlogShareButtons } from "@/components/blog/BlogShareButtons";

type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  seoDescription?: string;
  publishedAt: string;
  postType: string;
  coverImage?: unknown;
  body?: unknown[];
  category?: {
    title?: string;
  };
  author?: {
    name?: string;
    role?: string;
  };
};

type TocItem = {
  id: string;
  title: string;
  level: 2 | 3;
};

const postQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    seoDescription,
    publishedAt,
    postType,
    coverImage,
    body,
    category->{title},
    author->{name, role}
  }
`;

const recommendedPostsQuery = `
  *[
    _type == "post" &&
    defined(slug.current) &&
    postType == $postType &&
    slug.current != $slug
  ] | order(_updatedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    _updatedAt,
    postType,
    coverImage,
    category->{title}
  }
`;

const getPost = cache(async (slug: string) => {
  return client.fetch<Post | null>(
    postQuery,
    { slug },
    {
      next: {
        tags: ["posts"],
      },
    }
  );
});

const getRecommendedPosts = cache(async (postType: string, slug: string) => {
  return client.fetch<Post[]>(
    recommendedPostsQuery,
    {
      postType,
      slug,
    },
    {
      next: {
        tags: ["posts"],
      },
    }
  );
});

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getPostTypeLabel(type: string) {
  if (type === "seo") return "Ghid";
  if (type === "social") return "Social";
  if (type === "caseStudy") return "Studiu de caz";
  if (type === "update") return "Update";

  return "Articol";
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function blockToPlainText(block: any) {
  if (!block?.children) return "";

  return block.children
    .filter((child: any) => child?._type === "span")
    .map((child: any) => child.text)
    .join("");
}

function extractToc(body: any[] = []): TocItem[] {
  return body
    .filter(
      (block) =>
        block?._type === "block" &&
        (block?.style === "h2" || block?.style === "h3")
    )
    .map((block): TocItem => {
      const title = blockToPlainText(block);
      const level: 2 | 3 = block.style === "h3" ? 3 : 2;

      return {
        id: slugify(title),
        title,
        level,
      };
    })
    .filter((item) => item.title);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Articol inexistent",
    };
  }

  const description = post.seoDescription || post.excerpt || post.title;
  const imageUrl = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : undefined;

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: `${siteConfig.domain}/blog/${post.slug}`,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    redirect("/404");
  }

  const body = post.body || [];
  const toc = extractToc(body as any[]);
  const articleUrl = `${siteConfig.domain}/blog/${post.slug}`;
  const postTypeLabel = getPostTypeLabel(post.postType);
  const recommendedPosts = await getRecommendedPosts(post.postType, post.slug);

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      {/* hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0B0F14] pt-36 pb-20 md:pt-40 md:pb-24">
        {/* page grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:64px_64px] opacity-25" />

        {/* center amber glow */}
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-amber-400/15 blur-[90px]" />

        {/* darker side fade */}
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0B0F14] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#0B0F14] to-transparent" />

        <Container className="relative">
          <ScrollReveal>
            <article className="max-w-[980px]">
              <Link
                href="/blog"
                className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-gray-300 transition duration-500 hover:-translate-x-1 hover:text-amber-300"
              >
                <span className="text-lg leading-none">←</span>
                Înapoi la blog
              </Link>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="inline-flex h-10 items-center rounded-full bg-amber-400 px-5 text-xs font-black uppercase tracking-[0.18em] text-black shadow-[0_10px_30px_rgba(251,191,36,0.16)]">
                  {postTypeLabel}
                </span>

                {post.category?.title ? (
                  <span className="inline-flex h-10 items-center rounded-full border border-white/15 bg-white/[0.035] px-5 text-xs font-black uppercase tracking-[0.18em] text-white/90">
                    {post.category.title}
                  </span>
                ) : null}
              </div>

              <h1 className="mt-8 max-w-[980px] text-[54px] font-black leading-[0.94] tracking-[-0.075em] text-white md:text-[76px] lg:text-[88px] xl:text-[96px]">
                {post.title}
              </h1>

              {post.excerpt ? (
                <p className="mt-8 max-w-[720px] text-base leading-8 text-gray-300 md:text-lg md:leading-9">
                  {post.excerpt}
                </p>
              ) : null}

              <div className="mt-9 flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-amber-400/35 bg-amber-400/10 text-sm font-black text-amber-300">
                  W
                </span>

                <span className="inline-flex items-center gap-2 font-semibold text-white">
                  {post.author?.name || "Webuilder"}

                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#0095F6]">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5 text-white"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M7 12.5l3.2 3.2L17.5 8.5"
                        stroke="currentColor"
                        strokeWidth="2.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </span>

                <span className="hidden h-1 w-1 rounded-full bg-amber-400/60 sm:block" />

                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("ro-RO", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>

                <span className="hidden h-1 w-1 rounded-full bg-amber-400/60 sm:block" />

                <span>8 min citire</span>
              </div>

              <div className="mt-9 border-t border-white/10 pt-7">
                <BlogShareButtons url={articleUrl} title={post.title} />
              </div>
            </article>
          </ScrollReveal>
        </Container>
      </section>

      {/* content */}
      <section className="relative overflow-hidden bg-[#080B10] px-4 py-16 md:px-8 md:py-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] opacity-10" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-10 xl:grid-cols-[minmax(0,1fr)_330px] xl:items-start">
          <ScrollReveal>
            <article className="w-full min-w-0 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-black/30 md:p-10 xl:p-12">
              <PortableTextRenderer value={body} />
            </article>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <aside className="space-y-6 xl:sticky xl:top-28">
              {toc.length > 0 ? (
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 shadow-2xl shadow-black/20 transition duration-500 hover:-translate-y-1 hover:border-amber-400/35 hover:bg-white/[0.045]">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-3xl font-black tracking-tight text-amber-300">
                      Cuprins
                    </h3>

                    <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-black">
                      {toc.length}
                    </span>
                  </div>

                  <ol className="mt-6 space-y-4">
                    {toc.map((item, index) => (
                      <li
                        key={item.id}
                        className={item.level === 3 ? "pl-5" : ""}
                      >
                        <a
                          href={`#${item.id}`}
                          className="group flex items-start gap-4 text-[15px] leading-7 text-gray-300 transition duration-500 hover:translate-x-1 hover:text-white"
                        >
                          <span className="mt-[2px] min-w-5 font-semibold text-amber-400">
                            {index + 1}.
                          </span>

                          <span className="transition duration-500 group-hover:text-amber-300">
                            {item.title}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : null}

              <div className="rounded-[2rem] border border-amber-400/25 bg-amber-400/[0.06] p-7 shadow-2xl shadow-black/20">
                <div className="text-xs font-black uppercase tracking-[0.22em] text-amber-300">
                  Ai nevoie de website?
                </div>

                <p className="mt-4 text-sm leading-7 text-gray-300">
                  Construim website-uri rapide, curate și pregătite pentru
                  conversii.
                </p>

                <Link
                  href="/contact"
                  className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-amber-400 px-5 text-sm font-black text-black transition duration-500 hover:-translate-y-0.5 hover:bg-amber-300"
                >
                  Cere ofertă
                </Link>
              </div>
            </aside>
          </ScrollReveal>
        </div>
      </section>

      {/* recommended articles */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[#0B0F14] px-4 py-16 md:px-8 md:py-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] opacity-15" />
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-amber-400/10 blur-[90px]" />

        <div className="relative mx-auto w-full max-w-7xl">
          <ScrollReveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.35em] text-amber-300/80">
                  Recomandate
                </div>

                <h2 className="mt-4 max-w-3xl text-4xl font-black leading-[0.95] tracking-[-0.05em] text-white md:text-5xl">
                  Articole similare
                </h2>

                <p className="mt-4 max-w-2xl text-base leading-7 text-gray-400">
                  Ultimele articole publicate în aceeași categorie:{" "}
                  <span className="font-semibold text-amber-300">
                    {postTypeLabel}
                  </span>
                  .
                </p>
              </div>

              <Link
                href="/blog"
                className="inline-flex w-fit items-center justify-center rounded-full border border-amber-400/35 bg-amber-400/10 px-6 py-3 text-sm font-black text-amber-300 transition duration-500 hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-400 hover:text-black"
              >
                Vezi restul articolelor
              </Link>
            </div>
          </ScrollReveal>

          {recommendedPosts.length > 0 ? (
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {recommendedPosts.map((recommendedPost, index) => (
                <ScrollReveal key={recommendedPost._id} delay={index * 0.06}>
                  <Link
                    href={`/blog/${recommendedPost.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/20 transition duration-500 hover:-translate-y-1 hover:border-amber-400/35 hover:bg-white/[0.045]"
                  >
                    {recommendedPost.coverImage ? (
                      <div className="relative h-48 overflow-hidden border-b border-white/10 bg-[#10141C]">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                          style={{
                            backgroundImage: `url(${urlFor(
                              recommendedPost.coverImage
                            )
                              .width(700)
                              .height(420)
                              .url()})`,
                          }}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-[#0B0F14]/25 to-transparent" />
                      </div>
                    ) : (
                      <div className="relative h-48 overflow-hidden border-b border-white/10 bg-[#10141C]">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />
                        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/20 blur-3xl" />

                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/45 bg-amber-400/10 text-lg font-black text-amber-300">
                            W
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-amber-400 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-black">
                          {getPostTypeLabel(recommendedPost.postType)}
                        </span>

                        {recommendedPost.category?.title ? (
                          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-gray-300">
                            {recommendedPost.category.title}
                          </span>
                        ) : null}
                      </div>

                      <h3 className="mt-5 text-2xl font-black leading-[1.02] tracking-[-0.04em] text-white transition duration-500 group-hover:text-amber-300">
                        {recommendedPost.title}
                      </h3>

                      {recommendedPost.excerpt ? (
                        <p className="mt-4 line-clamp-3 text-sm leading-7 text-gray-400">
                          {recommendedPost.excerpt}
                        </p>
                      ) : null}

                      <div className="mt-auto pt-6">
                        <div className="inline-flex items-center gap-2 text-sm font-black text-amber-300">
                          Citește articolul
                          <span className="transition duration-500 group-hover:translate-x-1">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <ScrollReveal delay={0.06}>
              <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center shadow-2xl shadow-black/20 md:p-10">

                <h3 className="mt-6 text-2xl font-black tracking-[-0.04em] text-white">
                  :(
                </h3>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-400">
                  Momentan nu există alte articole publicate în această categorie.
                </p>

                <Link
                  href="/blog"
                  className="mt-7 inline-flex h-11 items-center justify-center rounded-full bg-amber-400 px-6 text-sm font-black text-black transition duration-500 hover:-translate-y-0.5 hover:bg-amber-300"
                >
                  Vezi restul articolelor
                </Link>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </main>
  );
}