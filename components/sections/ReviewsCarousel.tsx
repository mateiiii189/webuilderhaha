"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export type Review = {
  _id: string;
  company: string;
  brandImageUrl?: string;
  project?: string;
  rating: number;
  text: string;
};

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
  active = false,
}: {
  rating?: number;
  active?: boolean;
}) {
  const safeRating = Math.min(Math.max(Math.round(rating), 0), 5);

  return (
    <div
      className={`flex items-center justify-center gap-1 ${
        active ? "text-xl" : "text-base"
      }`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={index < safeRating ? "text-amber-400" : "text-white/15"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function getOffset(index: number, activeIndex: number, total: number) {
  let offset = index - activeIndex;

  if (offset > total / 2) {
    offset -= total;
  }

  if (offset < -total / 2) {
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
      x: -390,
      y: 38,
      scale: 0.86,
      opacity: 0.55,
      zIndex: 20,
      filter: "brightness(0.72)",
      pointerEvents: "auto" as const,
    };
  }

  if (offset === 1) {
    return {
      x: 390,
      y: 38,
      scale: 0.86,
      opacity: 0.55,
      zIndex: 20,
      filter: "brightness(0.72)",
      pointerEvents: "auto" as const,
    };
  }

  return {
    x: offset < 0 ? -720 : 720,
    y: 52,
    scale: 0.8,
    opacity: 0,
    zIndex: 0,
    filter: "brightness(0.5)",
    pointerEvents: "none" as const,
  };
}

export function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  function selectReview(index: number) {
    setActiveIndex(index);
  }

  function goPrevious() {
    setActiveIndex((current) =>
      current === 0 ? reviews.length - 1 : current - 1
    );
  }

  function goNext() {
    setActiveIndex((current) =>
      current === reviews.length - 1 ? 0 : current + 1
    );
  }

  return (
    <div className="relative mt-12">
      <ScrollReveal delay={0.12}>
        <div className="relative mx-auto h-[430px] max-w-7xl overflow-visible">
          {reviews.length > 1 ? (
            <>
              <button
                type="button"
                onClick={goPrevious}
                aria-label="Review anterior"
                className="absolute left-0 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-amber-300 shadow-2xl shadow-black/30 transition duration-500 hover:-translate-y-[calc(50%+4px)] hover:border-amber-400/35 hover:bg-white/[0.06]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  <path
                    d="M15 6L9 12L15 18"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                onClick={goNext}
                aria-label="Review următor"
                className="absolute right-0 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-amber-300 shadow-2xl shadow-black/30 transition duration-500 hover:-translate-y-[calc(50%+4px)] hover:border-amber-400/35 hover:bg-white/[0.06]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  <path
                    d="M9 6L15 12L9 18"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          ) : null}

          {reviews.map((review, index) => {
            const offset = getOffset(index, activeIndex, reviews.length);
            const isActive = offset === 0;

            return (
              <motion.article
                key={review._id}
                animate={getCardAnimation(offset)}
                whileHover={
                  offset === 0
                    ? {
                        y: -6,
                        scale: 1.01,
                        filter: "brightness(1.05)",
                      }
                    : offset === -1 || offset === 1
                      ? {
                          y: 32,
                          scale: 0.88,
                          opacity: 0.68,
                          filter: "brightness(0.9)",
                        }
                      : undefined
                }
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => selectReview(index)}
                className={`group absolute left-1/2 top-0 flex cursor-pointer flex-col overflow-hidden border bg-[#11161D] text-center shadow-2xl shadow-black/30 transition-colors duration-500 hover:bg-[#151B23] ${
                isActive
                  ? "-ml-[220px] h-[410px] w-[440px] rounded-[2rem] border-amber-400/45 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.14),rgba(17,22,29,0.96)_42%,#11161D_100%)] p-7 shadow-amber-400/10"
                  : "-ml-[160px] h-[345px] w-[320px] rounded-[1.7rem] border-white/10 p-5 hover:border-amber-400/25"
                }`}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="flex flex-1 flex-col items-center">
                  {review.brandImageUrl ? (
                    <div
                      className={`overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20 ${
                        isActive ? "h-24 w-24" : "h-20 w-20"
                      }`}
                    >
                      <div
                        className="h-full w-full bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${review.brandImageUrl})`,
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      className={`flex items-center justify-center rounded-[1.5rem] border border-amber-400/35 bg-amber-400/10 font-black text-amber-300 shadow-2xl shadow-black/20 ${
                        isActive ? "h-24 w-24 text-3xl" : "h-20 w-20 text-2xl"
                      }`}
                    >
                      {getInitials(review.company)}
                    </div>
                  )}

                  <h3
                    className={`mt-5 max-w-full truncate font-black tracking-[-0.04em] text-white ${
                      isActive ? "text-2xl" : "text-xl"
                    }`}
                  >
                    {review.company}
                  </h3>

                  <p className="mt-1 text-xs font-medium text-gray-400">
                    {review.project || "Website"}
                  </p>

                  <div className="mt-4 h-px w-14 bg-amber-400/60" />

                  <p
                    className={`mx-auto mt-5 text-gray-300 ${
                      isActive
                        ? "max-w-[350px] flex-1 text-base"
                        : "max-w-[210px] text-sm"
                    }`}
                    style={
                      isActive
                        ? {
                            lineHeight: "1.50",
                          }
                        : {
                            lineHeight: "1.05",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }
                    }
                  >
                    „{review.text}”
                  </p>
                </div>

                <div className="mt-5 border-t border-white/10 pt-4">
                  <Stars rating={review.rating} active={isActive} />
                </div>
              </motion.article>
            );
          })}
        </div>
      </ScrollReveal>
    </div>
  );
}