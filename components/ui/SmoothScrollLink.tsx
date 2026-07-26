"use client";

import { useEffect } from "react";
import type {
  MouseEvent,
  ReactNode,
} from "react";
import {
  usePathname,
  useRouter,
} from "next/navigation";

type SmoothScrollLinkProps = {
  targetId: string;
  href?: string;
  offset?: number;
  duration?: number;
  delayAfterNavigation?: number;
  autoScrollOnMount?: boolean;
  className?: string;
  resetScrollOnMount?: boolean;
  children: ReactNode;
};

type StoredScrollRequest = {
  id: string;
  targetId: string;
  pathname: string;
  search: string;
  offset: number;
  duration: number;
  delay: number;
};

const SCROLL_REQUEST_KEY =
  "webuilder:smooth-scroll-request";

let activeFrame: number | null = null;
let restoreScrollBehavior:
  | (() => void)
  | null = null;

function cancelActiveScroll() {
  if (activeFrame !== null) {
    window.cancelAnimationFrame(
      activeFrame,
    );

    activeFrame = null;
  }

  restoreScrollBehavior?.();
  restoreScrollBehavior = null;
}

function easeInOutCubic(
  progress: number,
) {
  return progress < 0.5
    ? 4 *
        progress *
        progress *
        progress
    : 1 -
        Math.pow(
          -2 * progress + 2,
          3,
        ) /
          2;
}

function runSmoothScroll({
  targetId,
  offset,
  duration,
}: {
  targetId: string;
  offset: number;
  duration: number;
}) {
  const target =
    document.getElementById(
      targetId,
    );

  if (!target) {
    return false;
  }

  cancelActiveScroll();

  const html =
    document.documentElement;

  const body = document.body;

  const oldHtmlScrollBehavior =
    html.style.scrollBehavior;

  const oldBodyScrollBehavior =
    body.style.scrollBehavior;

  html.style.scrollBehavior =
    "auto";

  body.style.scrollBehavior =
    "auto";

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
    target.getBoundingClientRect()
      .top +
      startY -
      offset,
  );

  const distance =
    targetY - startY;

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

    return true;
  }

  const startedAt =
    performance.now();

  function animate(now: number) {
    const progress = Math.min(
      (now - startedAt) /
        duration,
      1,
    );

    const eased =
      easeInOutCubic(progress);

    window.scrollTo({
      top:
        startY +
        distance * eased,
      left: 0,
      behavior: "auto",
    });

    if (progress < 1) {
      activeFrame =
        window.requestAnimationFrame(
          animate,
        );

      return;
    }

    activeFrame = null;

    restoreScrollBehavior?.();
    restoreScrollBehavior = null;
  }

  activeFrame =
    window.requestAnimationFrame(
      animate,
    );

  return true;
}

export function SmoothScrollLink({
  targetId,
  href,
  offset = 0,
  duration = 900,
  delayAfterNavigation = 1000,
  autoScrollOnMount = false,
  className,
  resetScrollOnMount = false,
  children,
}: SmoothScrollLinkProps) {
  const router = useRouter();
  const pathname = usePathname();


  useEffect(() => {
    if (!resetScrollOnMount) {
      return;
    }

    cancelActiveScroll();

    const html =
      document.documentElement;

    const body = document.body;

    const previousHtmlBehavior =
      html.style.scrollBehavior;

    const previousBodyBehavior =
      body.style.scrollBehavior;

    html.style.scrollBehavior =
      "auto";

    body.style.scrollBehavior =
      "auto";

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
      window.requestAnimationFrame(
        () => {
          resetScroll();

          secondFrame =
            window.requestAnimationFrame(
              resetScroll,
            );
        },
      );

    const timeoutId =
      window.setTimeout(
        resetScroll,
        100,
      );

    return () => {
      window.cancelAnimationFrame(
        firstFrame,
      );

      if (secondFrame) {
        window.cancelAnimationFrame(
          secondFrame,
        );
      }

      window.clearTimeout(
        timeoutId,
      );

      html.style.scrollBehavior =
        previousHtmlBehavior;

      body.style.scrollBehavior =
        previousBodyBehavior;
    };
  }, [resetScrollOnMount]);

  useEffect(() => {
    if (!autoScrollOnMount) {
      return;
    }

    const rawRequest =
      sessionStorage.getItem(
        SCROLL_REQUEST_KEY,
      );

    if (!rawRequest) {
      return;
    }

    let request:
      | StoredScrollRequest
      | null = null;

    try {
      request =
        JSON.parse(rawRequest);
    } catch {
      sessionStorage.removeItem(
        SCROLL_REQUEST_KEY,
      );

      return;
    }

    if (
      !request ||
      request.targetId !==
        targetId ||
      request.pathname !==
        window.location.pathname ||
      request.search !==
        window.location.search
    ) {
      return;
    }

    /*
     * Markerul rămâne în sessionStorage până când scroll-ul începe.
     * În React Strict Mode primul timeout este anulat la cleanup,
     * iar a doua montare poate programa din nou animația.
     */
    const timeoutId =
      window.setTimeout(() => {
        const currentRequest =
          sessionStorage.getItem(
            SCROLL_REQUEST_KEY,
          );

        if (currentRequest) {
          try {
            const parsed =
              JSON.parse(
                currentRequest,
              ) as StoredScrollRequest;

            if (
              parsed.id ===
              request?.id
            ) {
              sessionStorage.removeItem(
                SCROLL_REQUEST_KEY,
              );
            }
          } catch {
            sessionStorage.removeItem(
              SCROLL_REQUEST_KEY,
            );
          }
        }

        const requestedTargetId =
          request?.targetId ||
          targetId;

        const requestedOffset =
          request?.offset ??
          offset;

        const requestedDuration =
          request?.duration ??
          duration;

        let attempts = 0;

        const tryScroll = () => {
          const didStart =
            runSmoothScroll({
              targetId:
                requestedTargetId,
              offset:
                requestedOffset,
              duration:
                requestedDuration,
            });

          if (
            didStart ||
            attempts >= 20
          ) {
            return;
          }

          attempts += 1;

          window.setTimeout(
            tryScroll,
            50,
          );
        };

        tryScroll();
      }, request.delay);

    return () => {
      window.clearTimeout(
        timeoutId,
      );
    };
  }, [
    autoScrollOnMount,
    duration,
    offset,
    pathname,
    targetId,
  ]);

  useEffect(() => {
    function cancelBeforeRouteChange(
      event: Event,
    ) {
      const target =
        event.target instanceof
        Element
          ? event.target
          : null;

      const link =
        target?.closest(
          "a[href]",
        );

      if (!link) {
        return;
      }

      const nextHref =
        link.getAttribute("href");

      if (
        !nextHref ||
        nextHref.startsWith("#")
      ) {
        return;
      }

      const destination =
        new URL(
          nextHref,
          window.location.href,
        );

      const staysOnSameDocument =
        destination.origin ===
          window.location.origin &&
        destination.pathname ===
          window.location.pathname &&
        destination.search ===
          window.location.search &&
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
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const destination =
      new URL(
        href || `#${targetId}`,
        window.location.href,
      );

    const sameDocument =
      destination.origin ===
        window.location.origin &&
      destination.pathname ===
        window.location.pathname &&
      destination.search ===
        window.location.search;

    if (sameDocument) {
      event.preventDefault();

      runSmoothScroll({
        targetId,
        offset,
        duration,
      });

      return;
    }

    if (
      destination.origin !==
      window.location.origin
    ) {
      return;
    }

    event.preventDefault();

    cancelActiveScroll();

    const request:
      StoredScrollRequest = {
        id: `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}`,
        targetId,
        pathname:
          destination.pathname,
        search:
          destination.search,
        offset,
        duration,
        delay:
          delayAfterNavigation,
      };

    sessionStorage.setItem(
      SCROLL_REQUEST_KEY,
      JSON.stringify(request),
    );

    router.push(
      `${destination.pathname}${destination.search}`,
    );
  }

  return (
    <a
      href={
        href ||
        `#${targetId}`
      }
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}