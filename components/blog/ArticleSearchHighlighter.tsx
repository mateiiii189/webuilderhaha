"use client";

import { useEffect } from "react";

type ArticleSearchHighlighterProps = {
  query?: string;
  rootId: string;
};

type NormalizedText = {
  value: string;
  sourceIndexes: number[];
};

type TextRange = {
  start: number;
  end: number;
};

function normalizeCharacter(
  character: string,
) {
  if (/\s/.test(character)) {
    return " ";
  }

  return character
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("ro-RO");
}

function normalizeWithSourceMap(
  source: string,
): NormalizedText {
  let value = "";
  const sourceIndexes: number[] = [];
  let previousWasSpace = false;

  for (
    let sourceIndex = 0;
    sourceIndex < source.length;
    sourceIndex += 1
  ) {
    const normalizedCharacter =
      normalizeCharacter(
        source[sourceIndex],
      );

    for (
      let normalizedIndex = 0;
      normalizedIndex <
      normalizedCharacter.length;
      normalizedIndex += 1
    ) {
      const character =
        normalizedCharacter[
          normalizedIndex
        ];

      if (character === " ") {
        if (previousWasSpace) {
          continue;
        }

        previousWasSpace = true;
      } else {
        previousWasSpace = false;
      }

      value += character;
      sourceIndexes.push(sourceIndex);
    }
  }

  return {
    value,
    sourceIndexes,
  };
}

function normalizeQuery(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("ro-RO")
    .replace(/\s+/g, " ")
    .trim();
}

function getRanges(
  source: string,
  searchValues: string[],
): TextRange[] {
  const normalized =
    normalizeWithSourceMap(source);

  const ranges: TextRange[] = [];

  searchValues.forEach((searchValue) => {
    let fromIndex = 0;

    while (
      fromIndex < normalized.value.length
    ) {
      const matchIndex =
        normalized.value.indexOf(
          searchValue,
          fromIndex,
        );

      if (matchIndex < 0) {
        break;
      }

      const sourceStart =
        normalized.sourceIndexes[
          matchIndex
        ];

      const lastNormalizedIndex =
        matchIndex +
        searchValue.length -
        1;

      const sourceEndIndex =
        normalized.sourceIndexes[
          lastNormalizedIndex
        ];

      if (
        Number.isFinite(sourceStart) &&
        Number.isFinite(sourceEndIndex)
      ) {
        ranges.push({
          start: sourceStart,
          end: sourceEndIndex + 1,
        });
      }

      fromIndex =
        matchIndex +
        Math.max(searchValue.length, 1);
    }
  });

  return ranges
    .sort(
      (a, b) =>
        a.start - b.start ||
        a.end - b.end,
    )
    .reduce<TextRange[]>(
      (merged, range) => {
        const previous =
          merged[merged.length - 1];

        if (
          previous &&
          range.start <= previous.end
        ) {
          previous.end = Math.max(
            previous.end,
            range.end,
          );
        } else {
          merged.push({
            ...range,
          });
        }

        return merged;
      },
      [],
    );
}

function shouldIgnoreTextNode(
  node: Text,
) {
  const parent = node.parentElement;

  if (!parent) {
    return true;
  }

  if (
    parent.closest(
      [
        "script",
        "style",
        "noscript",
        "textarea",
        "input",
        "select",
        "option",
        "button",
        "[data-search-ignore]",
        "mark[data-blog-search-highlight]",
      ].join(","),
    )
  ) {
    return true;
  }

  return !node.data.trim();
}

function collectTextNodes(
  root: HTMLElement,
) {
  const nodes: Text[] = [];
  const scopes = root.querySelectorAll(
    "[data-search-highlight-scope]",
  );

  scopes.forEach((scope) => {
    const walker =
      document.createTreeWalker(
        scope,
        NodeFilter.SHOW_TEXT,
      );

    let current =
      walker.nextNode();

    while (current) {
      const textNode = current as Text;

      if (
        !shouldIgnoreTextNode(textNode)
      ) {
        nodes.push(textNode);
      }

      current = walker.nextNode();
    }
  });

  return nodes;
}

function wrapMatches(
  node: Text,
  ranges: TextRange[],
) {
  if (ranges.length === 0) {
    return [] as HTMLElement[];
  }

  const fragment =
    document.createDocumentFragment();

  const marks: HTMLElement[] = [];
  let cursor = 0;

  ranges.forEach((range) => {
    if (range.start > cursor) {
      fragment.append(
        node.data.slice(
          cursor,
          range.start,
        ),
      );
    }

    const mark =
      document.createElement("mark");

    mark.dataset.blogSearchHighlight =
      "true";

    mark.textContent = node.data.slice(
      range.start,
      range.end,
    );

    mark.style.backgroundColor =
      "transparent";
    mark.style.color = "#facc15";
    mark.style.textShadow =
      "0 0 16px rgba(250, 204, 21, 0.34)";
    mark.style.transition =
      "color 700ms ease, text-shadow 700ms ease";

    fragment.append(mark);
    marks.push(mark);
    cursor = range.end;
  });

  if (cursor < node.data.length) {
    fragment.append(
      node.data.slice(cursor),
    );
  }

  node.replaceWith(fragment);

  return marks;
}

function unwrapMark(mark: HTMLElement) {
  const parent = mark.parentNode;

  if (!parent) {
    return;
  }

  parent.replaceChild(
    document.createTextNode(
      mark.textContent || "",
    ),
    mark,
  );

  parent.normalize();
}

function smoothScrollToElement(
  element: HTMLElement,
  duration = 1100,
) {
  const startY = window.scrollY;
  const elementRect =
    element.getBoundingClientRect();

  const unclampedTarget =
    startY +
    elementRect.top -
    Math.max(
      112,
      (window.innerHeight -
        elementRect.height) /
        2,
    );

  const maxScrollY = Math.max(
    0,
    document.documentElement
      .scrollHeight -
      window.innerHeight,
  );

  const targetY = Math.min(
    Math.max(0, unclampedTarget),
    maxScrollY,
  );

  const distance = targetY - startY;

  if (Math.abs(distance) < 2) {
    return () => {};
  }

  let animationFrame = 0;
  let cancelled = false;
  const startedAt =
    performance.now();

  function easeOutQuint(
    progress: number,
  ) {
    return (
      1 -
      Math.pow(1 - progress, 5)
    );
  }

  function step(now: number) {
    if (cancelled) {
      return;
    }

    const progress = Math.min(
      (now - startedAt) / duration,
      1,
    );

    window.scrollTo(
      0,
      startY +
        distance *
          easeOutQuint(progress),
    );

    if (progress < 1) {
      animationFrame =
        window.requestAnimationFrame(
          step,
        );
    }
  }

  animationFrame =
    window.requestAnimationFrame(step);

  return () => {
    cancelled = true;
    window.cancelAnimationFrame(
      animationFrame,
    );
  };
}

export function ArticleSearchHighlighter({
  query = "",
  rootId,
}: ArticleSearchHighlighterProps) {
  useEffect(() => {
    const normalizedPhrase =
      normalizeQuery(query);

    if (
      normalizedPhrase.length < 2
    ) {
      return;
    }

    const root =
      document.getElementById(rootId);

    if (!root) {
      return;
    }

    const textNodes =
      collectTextNodes(root);

    const phraseExists =
      textNodes.some((node) =>
        normalizeWithSourceMap(
          node.data,
        ).value.includes(
          normalizedPhrase,
        ),
      );

    const searchValues = phraseExists
      ? [normalizedPhrase]
      : Array.from(
          new Set(
            normalizedPhrase
              .split(" ")
              .filter(
                (term) =>
                  term.length >= 2,
              ),
          ),
        );

    if (searchValues.length === 0) {
      return;
    }

    const createdMarks: HTMLElement[] =
      [];

    textNodes.forEach((node) => {
      if (createdMarks.length >= 30) {
        return;
      }

      const remaining =
        30 - createdMarks.length;

      const marks = wrapMatches(
        node,
        getRanges(
          node.data,
          searchValues,
        ).slice(0, remaining),
      );

      createdMarks.push(...marks);
    });

    const firstMark =
      createdMarks[0];

    if (!firstMark) {
      return;
    }

    let cancelSmoothScroll =
      () => {};

    const scrollTimer =
      window.setTimeout(() => {
        cancelSmoothScroll =
          smoothScrollToElement(
            firstMark,
            1150,
          );
      }, 700);

    const fadeTimer =
      window.setTimeout(() => {
        createdMarks.forEach((mark) => {
          const parentColor =
            mark.parentElement
              ? window.getComputedStyle(
                  mark.parentElement,
                ).color
              : "inherit";

          mark.style.color =
            parentColor;
          mark.style.textShadow =
            "none";
        });
      }, 5000);

    const cleanupTimer =
      window.setTimeout(() => {
        createdMarks.forEach(
          unwrapMark,
        );
      }, 5800);

    return () => {
      window.clearTimeout(
        scrollTimer,
      );
      cancelSmoothScroll();
      window.clearTimeout(
        fadeTimer,
      );
      window.clearTimeout(
        cleanupTimer,
      );

      createdMarks.forEach((mark) => {
        if (mark.isConnected) {
          unwrapMark(mark);
        }
      });
    };
  }, [query, rootId]);

  return null;
}