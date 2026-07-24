"use client";

import { useEffect } from "react";
import type {
  MouseEvent,
  ReactNode,
} from "react";

type SmoothScrollLinkProps = {
  targetId: string;
  offset?: number;
  duration?: number;
  className?: string;
  resetScrollOnMount?: boolean;
  children: ReactNode;
};

let activeFrame: number | null = null;
let restoreScrollBehavior: (() => void) | null = null;

function cancelActiveScroll() {
  if (activeFrame !== null) {
    window.cancelAnimationFrame(activeFrame);
    activeFrame = null;
  }

  restoreScrollBehavior?.();
  restoreScrollBehavior = null;
}

function easeInOutCubic(progress: number) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

export function SmoothScrollLink({
  targetId,
  offset = 0,
  duration = 900,
  className,
  resetScrollOnMount = false,
  children,
}: SmoothScrollLinkProps) {
  useEffect(() => {
    if (!resetScrollOnMount) {
      return;
    }

    cancelActiveScroll();

    const html = document.documentElement;
    const body = document.body;

    const previousRestoration =
      window.history.scrollRestoration;

    const previousHtmlBehavior =
      html.style.scrollBehavior;

    const previousBodyBehavior =
      body.style.scrollBehavior;

    window.history.scrollRestoration = "manual";
    html.style.scrollBehavior = "auto";
    body.style.scrollBehavior = "auto";

    const resetScroll = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    };

    resetScroll();

    let secondFrame = 0;

    const firstFrame =
      window.requestAnimationFrame(() => {
        resetScroll();

        secondFrame =
          window.requestAnimationFrame(resetScroll);
      });

    const timeoutId = window.setTimeout(
      resetScroll,
      100,
    );

    return () => {
      window.cancelAnimationFrame(firstFrame);

      if (secondFrame) {
        window.cancelAnimationFrame(secondFrame);
      }

      window.clearTimeout(timeoutId);

      window.history.scrollRestoration =
        previousRestoration;

      html.style.scrollBehavior =
        previousHtmlBehavior;

      body.style.scrollBehavior =
        previousBodyBehavior;
    };
  }, [resetScrollOnMount]);

  useEffect(() => {
    function cancelBeforeRouteChange(event: Event) {
      const target =
        event.target instanceof Element
          ? event.target
          : null;

      const link = target?.closest("a[href]");

      if (!link) {
        return;
      }

      const href = link.getAttribute("href");

      // Linkurile locale de tip #section trebuie să păstreze animația.
      if (!href || href.startsWith("#")) {
        return;
      }

      const destination = new URL(
        href,
        window.location.href,
      );

      const staysOnSameDocument =
        destination.origin === window.location.origin &&
        destination.pathname === window.location.pathname &&
        destination.search === window.location.search &&
        Boolean(destination.hash);

      if (!staysOnSameDocument) {
        cancelActiveScroll();
      }
    }

    document.addEventListener(
      "pointerdown",
      cancelBeforeRouteChange,
      true,
    );

    window.addEventListener(
      "popstate",
      cancelActiveScroll,
    );

    window.addEventListener(
      "pagehide",
      cancelActiveScroll,
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        cancelBeforeRouteChange,
        true,
      );

      window.removeEventListener(
        "popstate",
        cancelActiveScroll,
      );

      window.removeEventListener(
        "pagehide",
        cancelActiveScroll,
      );
    };
  }, []);

  function handleClick(
    event: MouseEvent<HTMLAnchorElement>,
  ) {
    event.preventDefault();

    const target =
      document.getElementById(targetId);

    if (!target) {
      return;
    }

    cancelActiveScroll();

    const html = document.documentElement;
    const body = document.body;

    const oldHtmlScrollBehavior =
      html.style.scrollBehavior;

    const oldBodyScrollBehavior =
      body.style.scrollBehavior;

    // Evită ca un eventual scroll-behavior: smooth global
    // să dubleze animația controlată prin requestAnimationFrame.
    html.style.scrollBehavior = "auto";
    body.style.scrollBehavior = "auto";

    let restored = false;

    restoreScrollBehavior = () => {
      if (restored) {
        return;
      }

      restored = true;

      html.style.scrollBehavior =
        oldHtmlScrollBehavior;

      body.style.scrollBehavior =
        oldBodyScrollBehavior;
    };

    const startY = window.scrollY;

    const targetY = Math.max(
      0,
      target.getBoundingClientRect().top +
        startY -
        offset,
    );

    const distance = targetY - startY;

    if (
      duration <= 0 ||
      Math.abs(distance) < 1
    ) {
      window.scrollTo({
        top: targetY,
        left: 0,
        behavior: "auto",
      });

      restoreScrollBehavior?.();
      restoreScrollBehavior = null;
      return;
    }

    const startedAt = performance.now();

    function animate(now: number) {
      const progress = Math.min(
        (now - startedAt) / duration,
        1,
      );

      const eased = easeInOutCubic(progress);

      window.scrollTo({
        top: startY + distance * eased,
        left: 0,
        behavior: "auto",
      });

      if (progress < 1) {
        activeFrame =
          window.requestAnimationFrame(animate);
        return;
      }

      activeFrame = null;

      restoreScrollBehavior?.();
      restoreScrollBehavior = null;
    }

    activeFrame =
      window.requestAnimationFrame(animate);
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