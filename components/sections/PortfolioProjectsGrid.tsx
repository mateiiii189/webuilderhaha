"use client";

import {
  useMemo,
  useState,
} from "react";
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
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const PROJECTS_PER_PAGE = 9;

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

  exit: {
    opacity: 0,
    y: 12,

    transition: {
      duration: 0.18,
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
    return [
      1,
      2,
      3,
      "...",
      totalPages,
    ];
  }

  if (
    currentPage >=
    totalPages - 2
  ) {
    return [
      1,
      "...",
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}

export function PortfolioProjectsGrid({
  projects,
}: {
  projects: PortfolioProjectCardData[];
}) {
  const [
    activeCategories,
    setActiveCategories,
  ] = useState<string[]>([]);

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  /*
   * Se schimbă la fiecare filtrare și intră în key-ul gridului.
   * Astfel, proiectele sunt remontate și animația rulează din nou
   * chiar dacă ele se aflau deja în viewport.
   */
  const [
    animationRevision,
    setAnimationRevision,
  ] = useState(0);

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
        a.localeCompare(
          b,
          "ro",
        ),
      ),
    [projects],
  );

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
    [
      activeCategories,
      projects,
    ],
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
    getPaginationItems(
      safeCurrentPage,
      totalPages,
    );

  function replayGridAnimation() {
    setAnimationRevision(
      (revision) => revision + 1,
    );
  }

  function toggleCategory(
    category: string,
  ) {
    setActiveCategories(
      (currentCategories) => {
        if (
          currentCategories.includes(
            category,
          )
        ) {
          return currentCategories.filter(
            (currentCategory) =>
              currentCategory !== category,
          );
        }

        return [
          ...currentCategories,
          category,
        ];
      },
    );

    setCurrentPage(1);
    replayGridAnimation();
  }

  function clearCategories() {
    setActiveCategories([]);
    setCurrentPage(1);
    replayGridAnimation();
  }

  function changePage(page: number) {
    setCurrentPage(page);
    replayGridAnimation();
  }

  const filterDescription =
    activeCategories.length === 0
      ? "Sunt afișate toate proiectele publicate."
      : activeCategories.length === 1
        ? `Categorie activă: ${activeCategories[0]}`
        : `${activeCategories.length} categorii active`;

  return (
    <div className="mt-12">
      <ScrollReveal>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
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
            options={
              categoryOptions
            }
            onToggle={
              toggleCategory
            }
            onClear={
              clearCategories
            }
          />
        </div>
      </ScrollReveal>

      <AnimatePresence
        mode="wait"
        initial={false}
      >
        <motion.div
          key={`${animationRevision}-${safeCurrentPage}`}
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
                className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
              >
                {visibleProjects.map(
                  (project) => (
                    <motion.div
                      key={`${animationRevision}-${project._id}`}
                      variants={
                        projectVariants
                      }
                      layout
                    >
                      <PortfolioProjectCard
                        project={project}
                        variant="grid"
                      />
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
                    delay: 0.32,
                    duration: 0.25,
                    ease: smoothEase,
                  }}
                  className="flex flex-wrap items-center justify-center gap-3 pt-12"
                >
                  <button
                    type="button"
                    onClick={() =>
                      changePage(
                        Math.max(
                          safeCurrentPage - 1,
                          1,
                        ),
                      )
                    }
                    disabled={
                      safeCurrentPage === 1
                    }
                    aria-label="Pagina anterioară"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm font-black text-white transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/40 hover:text-amber-300 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0"
                  >
                    ←
                  </button>

                  {paginationItems.map(
                    (item, index) => {
                      if (
                        typeof item !==
                        "number"
                      ) {
                        return (
                          <span
                            key={`dots-${index}`}
                            className="flex h-11 min-w-11 items-center justify-center px-2 text-sm font-black text-white/35"
                          >
                            …
                          </span>
                        );
                      }

                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() =>
                            changePage(item)
                          }
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
                        </button>
                      );
                    },
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      changePage(
                        Math.min(
                          safeCurrentPage + 1,
                          totalPages,
                        ),
                      )
                    }
                    disabled={
                      safeCurrentPage ===
                      totalPages
                    }
                    aria-label="Pagina următoare"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm font-black text-white transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/40 hover:text-amber-300 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0"
                  >
                    →
                  </button>
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

      {visibleProjects.length === 0 ? (
        <motion.div
          key={`empty-${animationRevision}`}
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
      ) : null}

      {totalPages > 1 ? (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-12">
          <button
            type="button"
            onClick={() =>
              changePage(
                Math.max(
                  safeCurrentPage - 1,
                  1,
                ),
              )
            }
            disabled={
              safeCurrentPage === 1
            }
            aria-label="Pagina anterioară"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm font-black text-white transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/40 hover:text-amber-300 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0"
          >
            ←
          </button>

          {paginationItems.map(
            (item, index) => {
              if (
                typeof item !== "number"
              ) {
                return (
                  <span
                    key={`dots-${index}`}
                    className="flex h-11 min-w-11 items-center justify-center px-2 text-sm font-black text-white/35"
                  >
                    …
                  </span>
                );
              }

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    changePage(item)
                  }
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
                </button>
              );
            },
          )}

          <button
            type="button"
            onClick={() =>
              changePage(
                Math.min(
                  safeCurrentPage + 1,
                  totalPages,
                ),
              )
            }
            disabled={
              safeCurrentPage ===
              totalPages
            }
            aria-label="Pagina următoare"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm font-black text-white transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/40 hover:text-amber-300 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0"
          >
            →
          </button>
        </div>
      ) : null}
    </div>
  );
}