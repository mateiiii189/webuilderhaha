"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <ScrollReveal>
      <div
        className={
          align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
        }
      >
        {eyebrow ? (
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-amber-400">
            {eyebrow}
          </p>
        ) : null}

        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
          {title}
        </h2>

        {description ? (
          <p className="mt-5 text-base leading-8 text-gray-400 md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </ScrollReveal>
  );
}