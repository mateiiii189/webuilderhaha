"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function Card({ children, className = "", delay = 0 }: CardProps) {
  return (
    <ScrollReveal delay={delay} className="h-full">
      <div
        className={`h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/[0.05] ${className}`}
      >
        {children}
      </div>
    </ScrollReveal>
  );
}