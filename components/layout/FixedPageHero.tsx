"use client";

import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type FixedPageHeroProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  description: ReactNode;
  bottom?: ReactNode;
  aside?: ReactNode;
};

/*
 * Contract fix pentru toate hero-urile:
 * - secțiunea păstrează limita originală de 500px pe desktop;
 * - conținutul este coborât cu 4px;
 * - aside-ul și elementele de jos se termină la aceeași linie;
 * - conținutul din interior nu modifică dimensiunile hero-ului.
 */
export function FixedPageHero({
  eyebrow,
  title,
  description,
  bottom,
  aside,
}: FixedPageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 pb-20 pt-36 md:pb-24 md:pt-40">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
      <div className="absolute left-1/2 top-0 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-amber-400/15 blur-[120px]" />
      <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0B0F14] to-transparent" />
      <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#0B0F14] to-transparent" />

      <Container className="relative">
        <div className="grid gap-12 xl:h-[500px] xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-stretch">
          <ScrollReveal>
            <div className="flex min-w-0 flex-col xl:h-[500px] xl:translate-y-1">
              <div className="min-w-0 shrink-0">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
                  {eyebrow}
                </p>

                <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.94] tracking-[-0.06em] text-white md:text-7xl">
                  {title}
                </h1>

                <div className="mt-5 max-w-xl text-sm leading-7 text-gray-300 md:text-base">
                  {description}
                </div>
              </div>

              {bottom ? (
                <div className="mt-10 shrink-0 xl:mt-auto xl:translate-y-8">
                  {bottom}
                </div>
              ) : null}
            </div>
          </ScrollReveal>

          {aside ? (
            <ScrollReveal delay={0.1}>
              <div className="min-w-0 xl:h-[532px] xl:translate-y-1">
                {aside}
              </div>
            </ScrollReveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}