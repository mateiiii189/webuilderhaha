"use client";

import { useMemo } from "react";
import { Clock3, Pin } from "lucide-react";
import Link from "next/link";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  PortfolioProjectCard,
  type PortfolioProjectCardData,
} from "@/components/portfolio/PortfolioProjectCard";
import {
  CategoryFilterMenu,
  type CategoryFilterOption,
} from "@/components/ui/CategoryFilterMenu";
import { PaginationDotsPanel } from "@/components/sections/PaginationDotsPanel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type PortfolioGridProject =
  PortfolioProjectCardData & {
    isRecent?: boolean;
  };

const PROJECTS_PER_PAGE = 6;

const smoothEase = [
  0.16,
  1,
  0.3,
  1,
] as const;

const gridVariants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,

    transition: {
      staggerChildren: 0.065,
      delayChildren: 0.03,
    },
  },
};

const projectVariants = {
  hidden: {
    opacity: 0,
    y: 34,
    scale: 0.985,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.52,
      ease: smoothEase,
    },
  },
};

function getPaginationItems(
  currentPage: number,
  totalPages: number,
) {
  const items: Array<number | "..."> = [];

  if (totalPages <= 7) {
    for (
      let page = 1;
      page <= totalPages;
      page += 1
    ) {
      items.push(page);
    }

    return items;
  }

  if (currentPage <= 4) {
    return [
      1,
      2,
      3,
      4,
      "...",
      totalPages,
    ];
  }

  if (
    currentPage >=
    totalPages - 3
  ) {
    return [
      1,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}

function getPageHref(
  pathname: string,
  page: number,
  categories: string[],
) {
  const params = new URLSearchParams();

  categories.forEach((category) => {
    params.append("category", category);
  });

  if (page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();

  return `${pathname}${
    query ? `?${query}` : ""
  }`;
}

function ProjectStatusBadge({
  type,
}: {
  type: "pinned" | "recent";
}) {
  const isPinned = type === "pinned";

  return (
    <span
      className="absolute right-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-xl border border-amber-400/40 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.24),rgba(17,22,29,0.96)_72%)] text-amber-300 shadow-lg shadow-black/30 backdrop-blur-md"
      title={
        isPinned
          ? "Proiect fixat"
          : "Cel mai recent"
      }
      aria-label={
        isPinned
          ? "Proiect fixat"
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
    </span>
  );
}

export function PortfolioProjectsGrid({
  projects,
}: {
  projects: PortfolioGridProject[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          projects.map(
            (project) =>
              project.category,
          ),
        ),
      ).sort((a, b) =>
        a.localeCompare(b, "ro"),
      ),
    [projects],
  );

  const activeCategories = useMemo(
    () =>
      searchParams
        .getAll("category")
        .filter((category) =>
          categories.includes(category),
        ),
    [categories, searchParams],
  );

  const requestedPage = Number(
    searchParams.get("page") || 1,
  );

  const currentPage =
    Number.isFinite(requestedPage) &&
    requestedPage > 0
      ? Math.floor(requestedPage)
      : 1;

  const categoryOptions =
    useMemo<CategoryFilterOption[]>(
      () =>
        categories.map(
          (category) => ({
            value: category,
            label: category,
            count: projects.filter(
              (project) =>
                project.category ===
                category,
            ).length,
          }),
        ),
      [categories, projects],
    );

  const filteredProjects = useMemo(
    () => {
      if (
        activeCategories.length === 0
      ) {
        return projects;
      }

      return projects.filter(
        (project) =>
          activeCategories.includes(
            project.category,
          ),
      );
    },
    [activeCategories, projects],
  );

  const totalPages = Math.max(
    Math.ceil(
      filteredProjects.length /
        PROJECTS_PER_PAGE,
    ),
    1,
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages,
  );

  const startIndex =
    (safeCurrentPage - 1) *
    PROJECTS_PER_PAGE;

  const visibleProjects =
    filteredProjects.slice(
      startIndex,
      startIndex +
        PROJECTS_PER_PAGE,
    );

  const paginationItems =
    activeCategories.length > 0
      ? Array.from(
          { length: totalPages },
          (_, index) => index + 1,
        )
      : getPaginationItems(
          safeCurrentPage,
          totalPages,
        );

  function updateCategories(
    nextCategories: string[],
  ) {
    const params = new URLSearchParams(
      searchParams.toString(),
    );

    params.delete("category");
    params.delete("page");

    nextCategories.forEach(
      (category) => {
        params.append(
          "category",
          category,
        );
      },
    );

    const query = params.toString();

    router.push(
      `${pathname}${
        query ? `?${query}` : ""
      }`,
      {
        scroll: false,
      },
    );

  }

  function toggleCategory(
    category: string,
  ) {
    const nextCategories =
      activeCategories.includes(category)
        ? activeCategories.filter(
            (currentCategory) =>
              currentCategory !== category,
          )
        : [
            ...activeCategories,
            category,
          ];

    updateCategories(nextCategories);
  }

  function clearCategories() {
    updateCategories([]);
  }

  const filterDescription =
    activeCategories.length === 0
      ? "Sunt afișate toate proiectele publicate."
      : activeCategories.length === 1
        ? `Categorie activă: ${activeCategories[0]}`
        : `${activeCategories.length} categorii active`;

  const animationKey = `${activeCategories.join(
    "|",
  )}-${safeCurrentPage}`;

  return (
    <div className="mt-12">
      <ScrollReveal>
        <div className="relative z-50 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-bold text-white">
              {filteredProjects.length}{" "}
              {filteredProjects.length ===
              1
                ? "proiect"
                : "proiecte"}
            </p>

            <p className="mt-1 truncate text-sm text-gray-500">
              {filterDescription}
            </p>
          </div>

          <CategoryFilterMenu
            label="Filtrează proiectele"
            activeValues={
              activeCategories
            }
            options={categoryOptions}
            onToggle={toggleCategory}
            onClear={clearCategories}
          />
        </div>
      </ScrollReveal>

      <AnimatePresence
        mode="wait"
        initial={false}
      >
        <motion.div
          key={animationKey}
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 10,
          }}
          transition={{
            duration: 0.24,
            ease: smoothEase,
          }}
        >
          {visibleProjects.length > 0 ? (
            <>
              <motion.div
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
              >
                {visibleProjects.map(
                  (project) => (
                    <motion.div
                      key={project._id}
                      variants={
                        projectVariants
                      }
                      className="relative"
                    >
                      <PortfolioProjectCard
                        project={{
                          ...project,
                          isPinned: false,
                        }}
                        variant="grid"
                      />

                      {project.isPinned ? (
                        <ProjectStatusBadge type="pinned" />
                      ) : project.isRecent ? (
                        <ProjectStatusBadge type="recent" />
                      ) : null}
                    </motion.div>
                  ),
                )}
              </motion.div>

              {totalPages > 1 ? (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.28,
                    duration: 0.25,
                    ease: smoothEase,
                  }}
                  className="relative z-30 flex flex-wrap items-center justify-center gap-3 pt-12"
                >
                  {safeCurrentPage > 1 ? (
                    <Link
                      href={getPageHref(
                        pathname,
                        safeCurrentPage - 1,
                        activeCategories,
                      )}
                      scroll
                      aria-label="Pagina anterioară"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm font-black text-white transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/40 hover:text-amber-300"
                    >
                      ←
                    </Link>
                  ) : null}

                  {paginationItems.map(
                    (item, index) => {
                      if (
                        typeof item !==
                        "number"
                      ) {
                        return (
                          <PaginationDotsPanel
                            key={`dots-${index}`}
                            currentPage={
                              safeCurrentPage
                            }
                            totalPages={
                              totalPages
                            }
                            basePath={pathname}
                                                      />
                        );
                      }

                      return (
                        <Link
                          key={item}
                          href={getPageHref(
                            pathname,
                            item,
                            activeCategories,
                          )}
                          scroll
                          aria-current={
                            item ===
                            safeCurrentPage
                              ? "page"
                              : undefined
                          }
                          className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-black transition duration-300 hover:-translate-y-0.5 ${
                            item ===
                            safeCurrentPage
                              ? "border-amber-400 bg-amber-400 text-black"
                              : "border-white/10 bg-white/[0.03] text-white hover:border-amber-400/40 hover:text-amber-300"
                          }`}
                        >
                          {item}
                        </Link>
                      );
                    },
                  )}

                  {safeCurrentPage <
                  totalPages ? (
                    <Link
                      href={getPageHref(
                        pathname,
                        safeCurrentPage + 1,
                        activeCategories,
                      )}
                      scroll
                      aria-label="Pagina următoare"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm font-black text-white transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/40 hover:text-amber-300"
                    >
                      →
                    </Link>
                  ) : null}
                </motion.div>
              ) : null}
            </>
          ) : (
            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                ease: smoothEase,
              }}
              className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 text-center"
            >
              <p className="text-lg font-bold text-white">
                Nu există proiecte în categoriile selectate.
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
