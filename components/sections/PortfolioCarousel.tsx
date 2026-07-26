"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export type PortfolioDemo = {
  _id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  href: string;
  slug?: string;
  previewImageUrl?: string;
  projectKind?: "demo" | "client";
};

function getOffset(
  index: number,
  activeIndex: number,
  total: number,
) {
  if (total <= 1) {
    return 0;
  }

  let offset = index - activeIndex;
  const half = total / 2;

  if (offset > half) {
    offset -= total;
  }

  if (offset < -half) {
    offset += total;
  }

  return offset;
}

function getCardAnimation(offset: number) {
  if (offset === 0) {
    return {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      zIndex: 30,
      filter: "brightness(1)",
      pointerEvents: "auto" as const,
    };
  }

  if (offset === -1) {
    return {
      x: -455,
      y: 28,
      scale: 0.91,
      opacity: 0.42,
      zIndex: 20,
      filter: "brightness(0.58)",
      pointerEvents: "auto" as const,
    };
  }

  if (offset === 1) {
    return {
      x: 455,
      y: 28,
      scale: 0.91,
      opacity: 0.42,
      zIndex: 20,
      filter: "brightness(0.58)",
      pointerEvents: "auto" as const,
    };
  }

  return {
    x: offset < 0 ? -900 : 900,
    y: 40,
    scale: 0.86,
    opacity: 0,
    zIndex: 0,
    filter: "brightness(0.4)",
    pointerEvents: "none" as const,
  };
}

export function PortfolioCarousel({
  demos,
}: {
  demos: PortfolioDemo[];
}) {
  const [activeIndex, setActiveIndex] =
    useState(0);

  if (demos.length === 0) {
    return null;
  }

  const safeActiveIndex =
    activeIndex >= demos.length
      ? 0
      : activeIndex;

  /*
   * Randăm numai:
   * - proiectul anterior
   * - proiectul activ
   * - proiectul următor
   *
   * Cardurile ghost -2 și +2 nu mai sunt randate.
   */
  const renderedDemos = demos
    .map((demo, index) => ({
      demo,
      index,
      offset: getOffset(
        index,
        safeActiveIndex,
        demos.length,
      ),
    }))
    .filter(
      ({ offset }) =>
        Math.abs(offset) <= 1,
    );

  function selectDemo(index: number) {
    setActiveIndex(index);
  }

  function goPrevious() {
    setActiveIndex((current) => {
      const safeCurrent =
        current >= demos.length
          ? 0
          : current;

      return safeCurrent === 0
        ? demos.length - 1
        : safeCurrent - 1;
    });
  }

  function goNext() {
    setActiveIndex((current) => {
      const safeCurrent =
        current >= demos.length
          ? 0
          : current;

      return safeCurrent ===
        demos.length - 1
        ? 0
        : safeCurrent + 1;
    });
  }

  return (
    <div className="relative mt-14 overflow-x-clip">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-5">
        <ScrollReveal>
          <div className="flex items-center gap-5">
            <p className="min-w-[72px] text-sm font-black tabular-nums text-white">
              {String(
                safeActiveIndex + 1,
              ).padStart(2, "0")}

              <span className="mx-2 text-white/25">
                /
              </span>

              <span className="text-gray-500">
                {String(
                  demos.length,
                ).padStart(2, "0")}
              </span>
            </p>

            <div className="flex items-center gap-2">
              {demos.map(
                (demo, index) => {
                  const isActive =
                    index ===
                    safeActiveIndex;

                  return (
                    <button
                      key={demo._id}
                      type="button"
                      onClick={() =>
                        selectDemo(index)
                      }
                      aria-label={`Vezi proiectul ${demo.title}`}
                      aria-current={
                        isActive
                          ? "true"
                          : undefined
                      }
                      className={`h-2.5 cursor-pointer rounded-full transition-all duration-500 hover:-translate-y-0.5 ${
                        isActive
                          ? "w-8 bg-amber-400"
                          : "w-2.5 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  );
                },
              )}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goPrevious}
              aria-label="Proiect anterior"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition duration-300 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/[0.06] hover:text-amber-300"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M15 6L9 12L15 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Proiect următor"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition duration-300 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/[0.06] hover:text-amber-300"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9 6L15 12L9 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.12}>
        <div className="relative mx-auto h-[620px] w-full max-w-[1440px] overflow-x-clip">
          {renderedDemos.map(
            ({
              demo,
              index,
              offset,
            }) => {
              const isActive =
                offset === 0;

              return (
                <motion.article
                  key={demo._id}
                  initial={false}
                  animate={getCardAnimation(
                    offset,
                  )}
                  transition={{
                    duration: 0.58,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }}
                  whileHover={
                    isActive
                      ? {
                          y: -7,
                          scale: 1.012,
                          filter:
                            "brightness(1.05)",
                        }
                      : {
                          y: 18,
                          scale: 0.925,
                          opacity: 0.58,
                          filter:
                            "brightness(0.72)",
                        }
                  }
                  onClick={() =>
                    selectDemo(index)
                  }
                  className={`group absolute left-1/2 top-0 -ml-[210px] flex h-[580px] w-[420px] cursor-pointer flex-col overflow-hidden rounded-[2rem] border bg-[#11161D] p-5 shadow-2xl shadow-black/30 transition-colors duration-500 ${
                    isActive
                      ? "border-amber-400/35 hover:bg-[#151B23]"
                      : "border-white/10"
                  }`}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                  <div className="h-52 shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-[#080B10]">
                    {demo.previewImageUrl ? (
                      <div
                        className="h-full w-full bg-cover bg-top transition duration-700 group-hover:scale-[1.025]"
                        style={{
                          backgroundImage: `url(${demo.previewImageUrl})`,
                        }}
                        role="img"
                        aria-label={`Previzualizare ${demo.title}`}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <div className="w-full max-w-[250px] rounded-2xl border border-white/10 bg-white/[0.04] p-4">
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
                              <div className="h-12 rounded-xl border border-white/10 bg-white/[0.03]" />

                              <div className="h-12 rounded-xl border border-white/10 bg-white/[0.03]" />

                              <div className="h-12 rounded-xl border border-white/10 bg-white/[0.03]" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex min-h-0 flex-1 flex-col">
                    <div className="flex items-center justify-between gap-4">
                      <p className="truncate text-sm font-semibold text-amber-300">
                        {demo.category}
                      </p>

                      <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-gray-400">
                        {demo.projectKind ===
                        "client"
                          ? "Client"
                          : "Demo"}
                      </span>
                    </div>

                    <h3 className="mt-5 line-clamp-2 text-2xl font-black leading-[1.05] tracking-[-0.035em] text-white">
                      {demo.title}
                    </h3>

                    <p className="mt-4 line-clamp-3 min-h-[84px] text-sm leading-7 text-gray-400">
                      {demo.description}
                    </p>

                    <div className="mt-5 flex h-[30px] flex-wrap gap-2 overflow-hidden">
                      {demo.tags
                        .slice(0, 4)
                        .map((tag) => (
                          <span
                            key={tag}
                            className="h-fit rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>

                    <div
                      className={`mt-auto flex gap-3 pt-6 transition duration-300 ${
                        isActive
                          ? "translate-y-0 opacity-100"
                          : "pointer-events-none translate-y-3 opacity-0"
                      }`}
                      onClick={(event) =>
                        event.stopPropagation()
                      }
                    >
                      {demo.slug ? (
                        <Link
                          href={`/portofoliu/${demo.slug}`}
                          className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-amber-400 px-5 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-amber-300"
                        >
                          Vezi proiectul
                        </Link>
                      ) : null}

                      <Link
                        href={demo.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-12 flex-1 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/35 hover:bg-white/[0.07] hover:text-amber-300"
                      >
                        {demo.projectKind ===
                        "client"
                          ? "Website live"
                          : "Demo live"}
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            },
          )}
        </div>
      </ScrollReveal>
    </div>
  );
}