"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

type PanelProps = {
  children: React.ReactNode;
  className?: string;
};

export function Panel({ children, className = "" }: PanelProps) {
  return (
    <ScrollReveal>
      <div
        className={`rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/[0.05] md:p-12 ${className}`}
      >
        {children}
      </div>
    </ScrollReveal>
  );
}