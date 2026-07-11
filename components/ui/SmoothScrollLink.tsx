"use client";

import type { MouseEvent, ReactNode } from "react";

type SmoothScrollLinkProps = {
  targetId: string;
  children: ReactNode;
  className?: string;
  offset?: number;
  duration?: number;
  onScrollEnd?: () => void;
};

export function SmoothScrollLink({
  targetId,
  children,
  className = "",
  offset = 100,
  duration = 1000,
  onScrollEnd,
}: SmoothScrollLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    const startPosition = window.scrollY;
    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - offset;

    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    let animationFrameId = 0;
    let cancelled = false;

    function easeOutCubic(progress: number) {
      return 1 - Math.pow(1 - progress, 3);
    }

    function cancelScroll() {
      cancelled = true;
      cancelAnimationFrame(animationFrameId);
      cleanup();
    }

    function cleanup() {
      window.removeEventListener("wheel", cancelScroll);
      window.removeEventListener("touchstart", cancelScroll);
      window.removeEventListener("keydown", cancelScroll);
    }

    function animate(currentTime: number) {
      if (cancelled) {
        return;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      window.scrollTo(0, startPosition + distance * easedProgress);

        if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
        } else {
        cleanup();
        onScrollEnd?.();
        }
    }

    window.addEventListener("wheel", cancelScroll, { passive: true });
    window.addEventListener("touchstart", cancelScroll, { passive: true });
    window.addEventListener("keydown", cancelScroll);

    animationFrameId = requestAnimationFrame(animate);
  }

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}