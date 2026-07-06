"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const demos = [
  {
    title: "Fitness Studio",
    category: "Website de prezentare",
    description:
      "Demo pentru sală de fitness sau studio premium: servicii, abonamente, program și cereri rapide.",
    tags: ["Fitness", "Servicii", "Lead-uri"],
    href: "https://demo-fitness.webuilder.ro",
  },
  {
    title: "Dental Clinic",
    category: "Website cu programări",
    description:
      "Demo pentru clinică stomatologică: servicii medicale, încredere, programări și local SEO.",
    tags: ["Medical", "Programări", "Local SEO"],
    href: "https://demo-dental.webuilder.ro",
  },
  {
    title: "Logistics Company",
    category: "Website B2B",
    description:
      "Demo pentru firmă de transport/logistică: servicii B2B, rute, ofertare și credibilitate.",
    tags: ["Transport", "B2B", "Ofertare"],
    href: "https://demo-logistics.webuilder.ro",
  },
  {
    title: "Restaurant Premium",
    category: "Website local business",
    description:
      "Demo pentru restaurant: meniu, rezervări, galerie, Google Maps și pagini optimizate local.",
    tags: ["Restaurant", "Rezervări", "Local"],
    href: "https://demo-restaurant.webuilder.ro",
  },
  {
    title: "Real Estate Agency",
    category: "Website imobiliare",
    description:
      "Demo pentru agenție imobiliară: listări, proprietăți, cereri de vizionare și pagini de zone.",
    tags: ["Imobiliare", "Listări", "SEO"],
    href: "https://demo-realestate.webuilder.ro",
  },
  {
    title: "Beauty Salon",
    category: "Website cu programări",
    description:
      "Demo pentru salon de beauty: servicii, prețuri, programări, testimoniale și galerie.",
    tags: ["Beauty", "Programări", "Servicii"],
    href: "https://demo-beauty.webuilder.ro",
  },
  {
    title: "Auto Service",
    category: "Website servicii auto",
    description:
      "Demo pentru service auto: servicii, cereri ofertă, programări și pagini pentru reparații.",
    tags: ["Auto", "Service", "Contact rapid"],
    href: "https://demo-auto.webuilder.ro",
  },
];

function getOffset(index: number, activeIndex: number) {
  const total = demos.length;
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
      x: -455,
      y: 22,
      scale: 0.92,
      opacity: 0.55,
      zIndex: 20,
      filter: "brightness(0.72)",
      pointerEvents: "auto" as const,
    };
  }

  if (offset === 1) {
    return {
      x: 455,
      y: 22,
      scale: 0.92,
      opacity: 0.55,
      zIndex: 20,
      filter: "brightness(0.72)",
      pointerEvents: "auto" as const,
    };
  }

  return {
    x: offset < 0 ? -720 : 720,
    y: 42,
    scale: 0.86,
    opacity: 0,
    zIndex: 0,
    filter: "brightness(0.55)",
    pointerEvents: "none" as const,
  };
}

export function PortfolioCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  function selectDemo(index: number) {
    setActiveIndex(index);
  }

  function goPrevious() {
    setActiveIndex((current) =>
      current === 0 ? demos.length - 1 : current - 1
    );
  }

  function goNext() {
    setActiveIndex((current) =>
      current === demos.length - 1 ? 0 : current + 1
    );
  }

  return (
    <div className="relative mt-14">
      <div className="mb-10 flex items-center justify-between gap-4">
        <ScrollReveal>
          <div className="flex items-center gap-2">
            {demos.map((demo, index) => (
              <button
                key={demo.title}
                type="button"
                onClick={() => selectDemo(index)}
                aria-label={`Vezi demo ${demo.title}`}
                className={`h-2.5 cursor-pointer rounded-full transition-all duration-500 hover:-translate-y-0.5 ${
                  index === activeIndex
                    ? "w-8 bg-amber-400"
                    : "w-2.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goPrevious}
              aria-label="Demo anterior"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition duration-500 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/[0.06] hover:text-amber-300"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
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
              aria-label="Demo următor"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition duration-500 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/[0.06] hover:text-amber-300"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
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
        <div className="relative mx-auto h-[620px] max-w-7xl overflow-visible">
          {demos.map((demo, index) => {
            const offset = getOffset(index, activeIndex);
            const isActive = offset === 0;

            return (
              <motion.article
                key={demo.title}
                animate={getCardAnimation(offset)}
                whileHover={
                  offset === 0
                    ? {
                        y: -8,
                        scale: 1.015,
                        filter: "brightness(1.06)",
                      }
                    : offset === -1 || offset === 1
                      ? {
                          y: 10,
                          scale: 0.94,
                          opacity: 0.72,
                          filter: "brightness(0.95)",
                        }
                      : undefined
                }
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => selectDemo(index)}
                className={`group absolute left-1/2 top-0 -ml-[210px] h-[580px] w-[420px] cursor-pointer overflow-hidden rounded-[2rem] border bg-[#11161D] p-5 shadow-2xl shadow-black/30 transition-colors duration-500 hover:bg-[#151B23] ${
                  isActive
                    ? "border-amber-400/35"
                    : "border-white/10 hover:border-amber-400/25"
                }`}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="mb-6 flex h-52 items-center justify-center rounded-3xl border border-white/10 bg-[#080B10]">
                  <div className="w-full max-w-[250px] rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition duration-500 group-hover:border-amber-400/20">
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

                <p className="text-sm font-medium text-amber-300">
                  {demo.category}
                </p>

                <h2 className="mt-3 text-2xl font-semibold text-white">
                  {demo.title}
                </h2>

                <p className="mt-4 min-h-[84px] text-sm leading-7 text-gray-400">
                  {demo.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {demo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-gray-300 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/40 hover:bg-white/[0.05]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  className="mt-8 flex flex-col gap-3 sm:flex-row"
                  onClick={(event) => event.stopPropagation()}
                >
                  <Link
                    href={demo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-amber-400 px-6 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-amber-300"
                  >
                    Vezi demo live
                  </Link>

                  <Button href="/contact" variant="secondary">
                    Vreau similar
                  </Button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </ScrollReveal>
    </div>
  );
}