import {
  ExternalLink,
} from "lucide-react";

export type PortfolioProjectCardData = {
  _id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  href: string;
  previewImageUrl?: string;
  isPinned?: boolean;
};

type PortfolioProjectCardProps = {
  project: PortfolioProjectCardData;
  variant?: "hero" | "carousel" | "grid";
  topBadge?: string;
  emphasized?: boolean;
  actionsVisible?: boolean;
  className?: string;
};

export function PortfolioProjectCard({
  project,
  variant = "grid",
  topBadge,
  emphasized = false,
  actionsVisible = true,
  className = "",
}: PortfolioProjectCardProps) {
  const isHero =
    variant === "hero";

  const isCarousel =
    variant === "carousel";

  const imageHeight = isHero
    ? "h-[300px]"
    : isCarousel
      ? "h-[280px]"
      : "h-[260px]";

  const contentPadding = isHero
    ? "p-5"
    : "p-6";

  const titleClass = isHero
    ? "text-3xl leading-[1] tracking-[-0.045em]"
    : "text-2xl leading-[1.05] tracking-[-0.035em]";

  const descriptionClass = isHero
    ? "line-clamp-2 min-h-[56px]"
    : "line-clamp-3 min-h-[84px]";

  const buttonHeight = isHero
    ? "h-12"
    : "h-11";

  return (
    <article
      className={`group relative isolate flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-[2rem] border bg-[#11161D] shadow-2xl shadow-black/25 transition duration-500 [transform:translateZ(0)] hover:-translate-y-1 ${
        emphasized
          ? "border-amber-400/40 hover:border-amber-400/60"
          : "border-white/10 hover:border-amber-400/35"
      } ${className}`}
    >
      <div
        className={`relative -mb-1 shrink-0 overflow-hidden bg-[#0B0F14] [transform:translateZ(0)] ${imageHeight}`}
      >
        {project.previewImageUrl ? (
          <img
            src={
              project.previewImageUrl
            }
            alt={project.title}
            className="block h-full w-full object-cover object-top opacity-95 transition duration-700 [transform:translateZ(0)] group-hover:scale-[1.018] group-hover:opacity-100"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:44px_44px]">
            <div className="w-full max-w-[280px] rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition duration-500 group-hover:border-amber-400/25">
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
                  <div className="h-11 rounded-xl border border-white/10 bg-white/[0.03]" />

                  <div className="h-11 rounded-xl border border-white/10 bg-white/[0.03]" />

                  <div className="h-11 rounded-xl border border-white/10 bg-white/[0.03]" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#11161D] via-transparent to-transparent" />

        {topBadge ? (
          <span
            className={`absolute right-5 top-5 z-20 max-w-[calc(100%-2.5rem)] truncate rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] shadow-lg shadow-black/20 backdrop-blur-md ${
              emphasized
                ? "border-amber-400/40 bg-[#11161D]/90 text-amber-300"
                : "border-white/15 bg-[#11161D]/85 text-gray-300"
            }`}
          >
            {topBadge}
          </span>
        ) : null}
      </div>

      <div
        className={`relative z-10 flex min-h-0 flex-1 flex-col bg-[#11161D] ${contentPadding}`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="truncate text-sm font-semibold text-amber-300">
            {project.category}
          </p>

          <h3
            className={`mt-4 line-clamp-2 break-words font-black text-white [overflow-wrap:anywhere] ${titleClass}`}
          >
            {project.title}
          </h3>

          <p
            className={`mt-4 break-words text-sm leading-7 text-gray-400 [overflow-wrap:anywhere] ${descriptionClass}`}
          >
            {project.description}
          </p>
        </div>

        {project.tags.length > 0 ? (
          <div className="mt-4 flex min-h-[42px] max-h-[82px] flex-wrap gap-2.5 overflow-visible py-1">
            {project.tags
              .slice(0, 4)
              .map((tag) => (
                <span
                  key={tag}
                  title={tag}
                  className="max-w-[155px] cursor-default truncate rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-gray-300 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/40 hover:bg-amber-400/[0.09] hover:text-amber-200"
                >
                  {tag}
                </span>
              ))}

            {project.tags.length > 4 ? (
              <span className="shrink-0 cursor-default rounded-full border border-amber-400/20 bg-amber-400/[0.07] px-3.5 py-2 text-xs font-black text-amber-300 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/45 hover:bg-amber-400/[0.13] hover:text-amber-200">
                +{project.tags.length - 4}
              </span>
            ) : null}
          </div>
        ) : null}

        <div
          className={`mt-auto pt-5 transition duration-300 ${
            actionsVisible
              ? "visible translate-y-0 opacity-100"
              : "pointer-events-none invisible translate-y-2 opacity-0"
          }`}
        >
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) =>
              event.stopPropagation()
            }
            className={`group/live inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-400 px-5 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-amber-300 ${buttonHeight}`}
          >
            Vezi proiectul live

            <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
}