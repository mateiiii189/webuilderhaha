"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Search,
} from "lucide-react";

export type BlogSearchPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  body?: string;
  category?: string;
  type: string;
};

type BlogHeroSearchProps = {
  posts: BlogSearchPost[];
};

type HighlightRange = {
  start: number;
  end: number;
};

type SearchResult = {
  post: BlogSearchPost;
  preview: string;
  score: number;
};

function normalizeSearchValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("ro-RO")
    .replace(/\s+/g, " ")
    .trim();
}

function getArticleHref(
  post: BlogSearchPost,
  query: string,
) {
  const params = new URLSearchParams();
  const highlight = query.trim();

  if (highlight) {
    params.set("highlight", highlight);
  }

  params.set("post", post.id);

  const cleanSlug = post.slug.trim();
  const routeSegment =
    cleanSlug && !cleanSlug.includes("/")
      ? cleanSlug
      : post.id.replace(/^drafts\./, "");

  return `/blog/${encodeURIComponent(
    routeSegment,
  )}?${params.toString()}`;
}

function getSearchTerms(query: string) {
  return Array.from(
    new Set(
      normalizeSearchValue(query)
        .split(" ")
        .map((term) => term.trim())
        .filter(Boolean),
    ),
  );
}

function buildNormalizedIndex(value: string) {
  let normalized = "";
  const sourceIndexes: number[] = [];

  Array.from(value).forEach(
    (character, sourceIndex) => {
      const normalizedCharacter =
        normalizeSearchValue(character);

      for (
        let index = 0;
        index <
        normalizedCharacter.length;
        index += 1
      ) {
        normalized +=
          normalizedCharacter[index];
        sourceIndexes.push(sourceIndex);
      }
    },
  );

  return {
    normalized,
    sourceIndexes,
  };
}

function getHighlightRanges(
  value: string,
  terms: string[],
): HighlightRange[] {
  if (!value || terms.length === 0) {
    return [];
  }

  const {
    normalized,
    sourceIndexes,
  } = buildNormalizedIndex(value);

  const ranges: HighlightRange[] = [];

  terms.forEach((term) => {
    let searchFrom = 0;

    while (searchFrom < normalized.length) {
      const matchIndex =
        normalized.indexOf(
          term,
          searchFrom,
        );

      if (matchIndex < 0) {
        break;
      }

      const sourceStart =
        sourceIndexes[matchIndex];

      const lastNormalizedIndex =
        matchIndex + term.length - 1;

      const sourceEnd =
        sourceIndexes[
          lastNormalizedIndex
        ] + 1;

      if (
        Number.isFinite(sourceStart) &&
        Number.isFinite(sourceEnd)
      ) {
        ranges.push({
          start: sourceStart,
          end: sourceEnd,
        });
      }

      searchFrom =
        matchIndex +
        Math.max(term.length, 1);
    }
  });

  return ranges
    .sort(
      (a, b) =>
        a.start - b.start ||
        a.end - b.end,
    )
    .reduce<HighlightRange[]>(
      (merged, range) => {
        const previous =
          merged[merged.length - 1];

        if (
          previous &&
          range.start <= previous.end
        ) {
          previous.end = Math.max(
            previous.end,
            range.end,
          );
        } else {
          merged.push({
            ...range,
          });
        }

        return merged;
      },
      [],
    );
}

function getFirstMatchIndex(
  value: string,
  terms: string[],
) {
  const normalizedValue =
    normalizeSearchValue(value);

  const indexes = terms
    .map((term) =>
      normalizedValue.indexOf(term),
    )
    .filter((index) => index >= 0);

  return indexes.length > 0
    ? Math.min(...indexes)
    : -1;
}

function buildPreview(
  value: string,
  terms: string[],
) {
  const cleanValue = value
    .replace(/\s+/g, " ")
    .trim();

  if (!cleanValue) {
    return "";
  }

  const {
    normalized,
    sourceIndexes,
  } = buildNormalizedIndex(cleanValue);

  const matchIndexes = terms
    .map((term) => ({
      term,
      index: normalized.indexOf(term),
    }))
    .filter(
      (match) => match.index >= 0,
    );

  if (matchIndexes.length === 0) {
    return cleanValue.length > 180
      ? `${cleanValue.slice(0, 177).trimEnd()}...`
      : cleanValue;
  }

  const firstMatch =
    matchIndexes.sort(
      (a, b) => a.index - b.index,
    )[0];

  const originalMatchIndex =
    sourceIndexes[firstMatch.index] ?? 0;

  const words = Array.from(
    cleanValue.matchAll(/\S+/g),
  );

  const matchedWordIndex = Math.max(
    0,
    words.findIndex((word) => {
      const start = word.index ?? 0;
      const end =
        start + word[0].length;

      return (
        originalMatchIndex >= start &&
        originalMatchIndex < end
      );
    }),
  );

  const startWord = Math.max(
    0,
    matchedWordIndex - 8,
  );

  const endWord = Math.min(
    words.length,
    matchedWordIndex + 13,
  );

  const startIndex =
    words[startWord]?.index ?? 0;

  const lastWord =
    words[endWord - 1];

  const endIndex = lastWord
    ? (lastWord.index ?? 0) +
      lastWord[0].length
    : cleanValue.length;

  const preview =
    cleanValue
      .slice(startIndex, endIndex)
      .trim();

  return `${startIndex > 0 ? "... " : ""}${preview}${
    endIndex < cleanValue.length
      ? " ..."
      : ""
  }`;
}

function getBestPreviewSource(
  post: BlogSearchPost,
  terms: string[],
) {
  const candidates = [
    post.excerpt,
    post.body,
    post.title,
    post.category,
    post.type,
  ].filter(
    (value): value is string =>
      Boolean(value?.trim()),
  );

  return (
    candidates
      .map((value, index) => {
        const normalizedValue =
          normalizeSearchValue(value);

        const matchedTerms =
          terms.filter((term) =>
            normalizedValue.includes(term),
          ).length;

        const phraseMatch =
          normalizedValue.includes(
            terms.join(" "),
          );

        return {
          value,
          matchedTerms,
          phraseMatch,
          priority:
            candidates.length - index,
        };
      })
      .sort(
        (a, b) =>
          Number(b.phraseMatch) -
            Number(a.phraseMatch) ||
          b.matchedTerms -
            a.matchedTerms ||
          b.priority - a.priority,
      )[0]?.value || post.title
  );
}

function scorePost(
  post: BlogSearchPost,
  terms: string[],
) {
  const fields = [
    {
      value: post.title,
      weight: 70,
    },
    {
      value: post.excerpt || "",
      weight: 45,
    },
    {
      value: post.body || "",
      weight: 30,
    },
    {
      value: post.category || "",
      weight: 20,
    },
    {
      value: post.type,
      weight: 15,
    },
  ];

  const phrase = terms.join(" ");
  let score = 0;

  fields.forEach(({ value, weight }) => {
    const normalizedValue =
      normalizeSearchValue(value);

    if (
      phrase &&
      normalizedValue.includes(phrase)
    ) {
      score += weight * 2;
    }

    terms.forEach((term) => {
      if (normalizedValue.includes(term)) {
        score += weight;
      }
    });
  });

  return score;
}

function HighlightedText({
  value,
  terms,
}: {
  value: string;
  terms: string[];
}) {
  const ranges =
    getHighlightRanges(value, terms);

  if (ranges.length === 0) {
    return <>{value}</>;
  }

  const parts: React.ReactNode[] = [];
  let cursor = 0;

  ranges.forEach((range, index) => {
    if (range.start > cursor) {
      parts.push(
        value.slice(cursor, range.start),
      );
    }

    parts.push(
      <mark
        key={`${range.start}-${range.end}-${index}`}
        className="rounded bg-amber-400/15 px-0.5 font-black text-amber-300"
      >
        {value.slice(
          range.start,
          range.end,
        )}
      </mark>,
    );

    cursor = range.end;
  });

  if (cursor < value.length) {
    parts.push(value.slice(cursor));
  }

  return <>{parts}</>;
}

export function BlogHeroSearch({
  posts,
}: BlogHeroSearchProps) {
  const router = useRouter();
  const rootRef =
    useRef<HTMLDivElement>(null);
  const [query, setQuery] =
    useState("");
  const [isFocused, setIsFocused] =
    useState(false);

  const terms = useMemo(
    () => getSearchTerms(query),
    [query],
  );

  const results = useMemo<
    SearchResult[]
  >(() => {
    if (
      normalizeSearchValue(query).length <
      2
    ) {
      return [];
    }

    return posts
      .filter((post) => {
        const searchable =
          normalizeSearchValue(
            [
              post.title,
              post.excerpt,
              post.body,
              post.category,
              post.type,
            ]
              .filter(Boolean)
              .join(" "),
          );

        return terms.every((term) =>
          searchable.includes(term),
        );
      })
      .map((post) => {
        const previewSource =
          getBestPreviewSource(
            post,
            terms,
          );

        return {
          post,
          preview: buildPreview(
            previewSource,
            terms,
          ),
          score: scorePost(
            post,
            terms,
          ),
        };
      })
      .sort(
        (a, b) =>
          b.score - a.score ||
          getFirstMatchIndex(
            a.post.title,
            terms,
          ) -
            getFirstMatchIndex(
              b.post.title,
              terms,
            ),
      )
      .slice(0, 5);
  }, [posts, query, terms]);

  const showPanel =
    isFocused &&
    normalizeSearchValue(query).length >=
      2;

  useEffect(() => {
    function handlePointerDown(
      event: PointerEvent,
    ) {
      if (
        rootRef.current &&
        !rootRef.current.contains(
          event.target as Node,
        )
      ) {
        setIsFocused(false);
      }
    }

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        setIsFocused(false);
      }
    }

    document.addEventListener(
      "pointerdown",
      handlePointerDown,
    );
    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, []);

  function openPost(
    post: BlogSearchPost,
  ) {
    setIsFocused(false);
    router.push(
      getArticleHref(post, query),
    );
  }

  return (
    <div
      ref={rootRef}
      className="relative max-w-xl xl:translate-y-3"
    >
      <AnimatePresence initial={false}>
        {showPanel ? (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 6,
            }}
            transition={{
              duration: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute bottom-[calc(100%+0.75rem)] left-0 z-30 max-h-[22rem] w-full overflow-x-hidden overflow-y-auto rounded-[1.35rem] border border-white/10 bg-[#10151C]/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl [overscroll-behavior:contain] [scrollbar-color:rgba(250,204,21,0.48)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-amber-400/35 hover:[&::-webkit-scrollbar-thumb]:bg-amber-400/55"
          >
            <motion.div
              key={normalizeSearchValue(query)}
              initial={{
                opacity: 0.45,
                y: 4,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.12,
                ease: "easeOut",
              }}
            >
              {results.length > 0 ? (
                <div className="space-y-1">
                  {results.map(
                    ({ post, preview }) => (
                      <Link
                        key={post.slug}
                        href={getArticleHref(
                          post,
                          query,
                        )}
                        onClick={() =>
                          setIsFocused(false)
                        }
                        className="group/result flex w-full min-w-0 items-start justify-between gap-4 overflow-hidden rounded-[1rem] px-4 py-3 text-left transition duration-300 hover:bg-white/[0.06]"
                      >
                        <span className="min-w-0 flex-1 overflow-hidden">
                          <span className="block break-words text-sm font-black leading-5 text-white [overflow-wrap:anywhere]">
                            <HighlightedText
                              value={post.title}
                              terms={terms}
                            />
                          </span>

                          <span className="mt-1.5 block break-words text-xs leading-5 text-gray-400 [overflow-wrap:anywhere]">
                            <HighlightedText
                              value={preview}
                              terms={terms}
                            />
                          </span>

                          <span className="mt-1.5 block truncate text-[10px] font-bold uppercase tracking-[0.14em] text-gray-600">
                            {post.category ||
                              post.type}
                          </span>
                        </span>

                        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-amber-300 transition duration-300 group-hover/result:translate-x-0.5 group-hover/result:-translate-y-0.5" />
                      </Link>
                    ),
                  )}
                </div>
              ) : (
                <p className="px-4 py-5 text-sm text-gray-400">
                  Nu am găsit articole pentru „
                  {query.trim()}”.
                </p>
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div
        className={`group/search flex h-14 items-center rounded-full border px-2 transition duration-500 hover:-translate-y-1 hover:border-amber-400/40 hover:bg-white/[0.055] hover:shadow-xl hover:shadow-black/25 ${
          query.trim()
            ? "-translate-y-1 border-amber-400/55 bg-white/[0.055] shadow-xl shadow-black/25"
            : "border-white/10 bg-white/[0.035] shadow-lg shadow-black/0"
        }`}
      >
        <Search
          className={`ml-3 h-5 w-5 shrink-0 text-amber-300 transition duration-500 group-hover/search:scale-110 ${
            query.trim()
              ? "scale-110"
              : ""
          }`}
        />

        <input
          type="text"
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          onFocus={() =>
            setIsFocused(true)
          }
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              results[0]
            ) {
              event.preventDefault();
              openPost(
                results[0].post,
              );
            }
          }}
          placeholder="Caută articole despre SEO, website-uri, design..."
          aria-label="Caută în articole"
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent px-4 text-sm font-semibold text-white outline-none placeholder:text-gray-500"
        />
      </div>

      <p className="mt-2 pl-5 text-xs text-gray-500">
        Caută după titlu, descriere,
        categorie sau conținutul
        articolului.
      </p>
    </div>
  );
}