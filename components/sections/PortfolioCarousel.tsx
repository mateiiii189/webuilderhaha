"use client";

import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

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

function getVisibleIndexes(activeIndex: number) {
  const total = demos.length;

  return [
    (activeIndex - 1 + total) % total,
    activeIndex,
    (activeIndex + 1) % total,
  ];
}

export function PortfolioCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const visibleIndexes = useMemo(
    () => getVisibleIndexes(activeIndex),
    [activeIndex]
  );

  function scrollCarouselIntoView() {
    window.setTimeout(() => {
      carouselRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 80);
  }

  function selectDemo(index: number) {
    setActiveIndex(index);
    scrollCarouselIntoView();
  }

  function goPrevious() {
    setActiveIndex((current) =>
      current === 0 ? demos.length - 1 : current - 1
    );

    scrollCarouselIntoView();
  }

  function goNext() {
    setActiveIndex((current) =>
      current === demos.length - 1 ? 0 : current + 1
    );

    scrollCarouselIntoView();
  }

  return (
    <div ref={carouselRef} className="relative mt-14 scroll-mt-32">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {demos.map((demo, index) => (
            <button
              key={demo.title}
              type="button"
              onClick={() => selectDemo(index)}
              aria-label={`Vezi demo ${demo.title}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-amber-400"
                  : "w-2.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goPrevious}
            aria-label="Demo anterior"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/30 hover:bg-white/[0.06]"
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
            aria-label="Demo următor"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/30 hover:bg-white/[0.06]"
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
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleIndexes.map((demoIndex) => {
            const demo = demos[demoIndex];
            const isActive = demoIndex === activeIndex;

            return (
              <motion.article
                key={demo.title}
                layout
                initial={{ opacity: 0, y: 34, scale: 0.94 }}
                animate={{
                  opacity: isActive ? 1 : 0.55,
                  y: isActive ? -8 : 0,
                  scale: isActive ? 1 : 0.94,
                }}
                exit={{ opacity: 0, y: 34, scale: 0.94 }}
                transition={{
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group relative overflow-hidden rounded-[2rem] border bg-white/[0.03] p-5 shadow-2xl shadow-black/30 transition duration-500 hover:-translate-y-1 hover:bg-white/[0.05] ${
                  isActive
                    ? "border-amber-400/35 lg:-mt-6"
                    : "border-white/10"
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
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-gray-300 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/30 hover:bg-amber-400/10 hover:text-amber-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
        </AnimatePresence>
      </div>
    </div>
  );
}