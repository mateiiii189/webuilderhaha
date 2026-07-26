"use client";

import {
  CheckCircle2,
  Eye,
  KeyRound,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SmoothScrollLink } from "@/components/ui/SmoothScrollLink";

const processMoments = [
  {
    number: "01",
    phase: "Înainte de execuție",
    title: "Știi exact ce aprobăm.",
    description:
      "Clarificăm scopul, structura și funcționalitățile înainte să intrăm în design și dezvoltare.",
    result: "Direcție confirmată",
    icon: CheckCircle2,
  },
  {
    number: "02",
    phase: "În timpul proiectului",
    title: "Vezi progresul pe parcurs.",
    description:
      "Primești actualizări și puncte clare de feedback, astfel încât deciziile importante să nu apară la final.",
    result: "Feedback la timp",
    icon: Eye,
  },
  {
    number: "03",
    phase: "După lansare",
    title: "Controlul rămâne la tine.",
    description:
      "Primești acces, structură clară și o bază pregătită pentru modificări, integrări și dezvoltări viitoare.",
    result: "Predare completă",
    icon: KeyRound,
  },
];

export function ProcessSection() {
  return (
    <section
      id="proces"
      className="border-y border-white/10 bg-[#0B0F14] py-24"
    >
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
              Cum lucrăm
            </p>

            <h2 className="mt-5 text-4xl font-black leading-[0.98] tracking-[-0.05em] text-white md:text-5xl">
              Procesul nu trebuie să fie o cutie neagră.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-400 md:text-lg">
              Ai vizibilitate înainte, în timpul și după lansare. Știi ce se
              decide, ce se construiește și ce primești la final.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {processMoments.map((moment, index) => {
            const Icon = moment.icon;

            return (
              <ScrollReveal
                key={moment.number}
                delay={index * 0.08}
              >
                <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 shadow-2xl shadow-black/20 transition duration-500 hover:-translate-y-1 hover:border-amber-400/35 hover:bg-white/[0.045]">
                  <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-amber-400/[0.055] blur-3xl transition duration-500 group-hover:bg-amber-400/[0.1]" />

                  <div className="relative flex items-start justify-between gap-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 text-amber-300 transition duration-500 group-hover:border-amber-400/50 group-hover:bg-amber-400/15">
                      <Icon
                        className="h-5 w-5"
                        strokeWidth={2.1}
                      />
                    </div>

                    <span className="text-sm font-black tracking-[0.22em] text-white/20 transition-colors duration-500 group-hover:text-amber-300/70">
                      {moment.number}
                    </span>
                  </div>

                  <div className="relative mt-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-400/80">
                      {moment.phase}
                    </p>

                    <h3 className="mt-4 text-2xl font-black leading-tight tracking-[-0.04em] text-white transition-colors duration-500 group-hover:text-amber-300">
                      {moment.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-gray-400">
                      {moment.description}
                    </p>
                  </div>

                  <div className="relative mt-auto pt-8">
                    <div className="border-t border-white/10 pt-5">
                      <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-bold text-gray-300 transition duration-300 group-hover:border-amber-400/30 group-hover:text-amber-300">
                        {moment.result}
                      </span>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.12}>
          <div className="mt-10 flex justify-end">
            <SmoothScrollLink
              href="/servicii"
              targetId="proces"
              offset={-40}
              duration={1100}
              className="group/cta inline-flex items-center gap-3 text-sm font-black text-amber-300 transition-colors duration-300 hover:text-amber-200"
            >
              <span className="inline-block transition-transform duration-300 group-hover/cta:-translate-y-0.5">
                Vezi procesul complet
              </span>

              <span className="inline-block text-lg leading-none transition-transform duration-300 group-hover/cta:translate-x-1 group-hover/cta:-translate-y-0.5">
                →
              </span>
            </SmoothScrollLink>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}