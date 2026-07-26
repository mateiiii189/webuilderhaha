"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Check,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
} from "motion/react";

export type CategoryFilterOption = {
  value: string;
  label: string;
  count?: number;
};

type CategoryFilterMenuProps = {
  label: string;
  activeValues: string[];
  options: CategoryFilterOption[];
  onToggle: (value: string) => void;
  onClear: () => void;
};

export function CategoryFilterMenu({
  label,
  activeValues,
  options,
  onToggle,
  onClear,
}: CategoryFilterMenuProps) {
  const [isOpen, setIsOpen] =
    useState(false);

  const wrapperRef =
    useRef<HTMLDivElement>(null);

  const activeLabel = (() => {
    if (activeValues.length === 0) {
      return "Toate categoriile";
    }

    if (activeValues.length === 1) {
      return (
        options.find(
          (option) =>
            option.value ===
            activeValues[0],
        )?.label ||
        activeValues[0]
      );
    }

    return `${activeValues.length} categorii selectate`;
  })();

  const totalCount = options.reduce(
    (total, option) =>
      total + (option.count || 0),
    0,
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(
      event: MouseEvent,
    ) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target as Node,
        )
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    function handleScroll(
        event: Event,
        ) {
        const target = event.target;

        /*
        * Permitem scroll în interiorul listei
        * de categorii fără să închidem meniul.
        */
        if (
            target instanceof Node &&
            wrapperRef.current?.contains(target)
        ) {
            return;
        }

        setIsOpen(false);
        }

    document.addEventListener(
      "mousedown",
      handlePointerDown,
    );

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    window.addEventListener(
    "scroll",
    handleScroll,
    true,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handlePointerDown,
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    window.removeEventListener(
    "scroll",
    handleScroll,
    true,
    );  
    };
  }, [isOpen]);

  return (
    <div
      ref={wrapperRef}
      className="relative z-40 w-full min-w-0 sm:w-auto"
    >
      <button
        type="button"
        onClick={() =>
          setIsOpen((current) => !current)
        }
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="group flex min-h-12 w-full min-w-0 max-w-full items-center gap-3 overflow-hidden rounded-full border border-white/10 bg-white/[0.035] px-5 text-left transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/35 hover:bg-white/[0.06] sm:w-auto sm:max-w-[360px]"
      >
        <SlidersHorizontal className="h-4 w-4 shrink-0 text-amber-300" />

        <span className="shrink-0 text-sm font-bold text-white">
          {label}
        </span>

        <span className="min-w-0 flex-1 truncate text-sm text-gray-500">
          {activeLabel}
        </span>

        <ChevronDown
          className={`h-4 w-4 shrink-0 text-gray-500 transition duration-300 group-hover:text-amber-300 ${
            isOpen
              ? "rotate-180"
              : "rotate-0"
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{
              opacity: 0,
              y: -8,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -8,
              scale: 0.98,
            }}
            transition={{
              duration: 0.22,
              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
            role="menu"
            className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-[min(23rem,calc(100vw-2rem))] overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#11161D]/98 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl"
          >
            <div className="max-h-[390px] space-y-1 overflow-y-auto overflow-x-hidden p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <button
                type="button"
                role="menuitemcheckbox"
                aria-checked={
                  activeValues.length === 0
                }
                onClick={onClear}
                className={`flex w-full min-w-0 items-center justify-between overflow-hidden rounded-[1.15rem] px-3 py-2.5 text-left transition duration-300 ${
                  activeValues.length === 0
                    ? "bg-amber-400/[0.08]"
                    : "hover:bg-white/[0.055]"
                }`}
              >
                <span className="flex min-w-0 flex-1 items-center gap-3 overflow-hidden">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition duration-300 ${
                      activeValues.length ===
                      0
                        ? "border-amber-400/40 bg-amber-400/15 text-amber-300"
                        : "border-white/10 bg-white/[0.03] text-transparent"
                    }`}
                  >
                    <Check className="h-4 w-4" />
                  </span>

                  <span
                    className={`min-w-0 flex-1 truncate text-sm font-bold ${
                      activeValues.length ===
                      0
                        ? "text-amber-300"
                        : "text-gray-200"
                    }`}
                  >
                    Toate proiectele
                  </span>
                </span>

                <span
                  className={`ml-4 shrink-0 rounded-full px-2.5 py-1 text-xs font-black ${
                    activeValues.length ===
                    0
                      ? "bg-amber-400 text-black"
                      : "bg-white/[0.05] text-gray-500"
                  }`}
                >
                  {totalCount}
                </span>
              </button>

              {options.map((option) => {
                const isActive =
                  activeValues.includes(
                    option.value,
                  );

                return (
                  <button
                    key={option.value}
                    type="button"
                    role="menuitemcheckbox"
                    aria-checked={isActive}
                    onClick={() =>
                      onToggle(option.value)
                    }
                    className={`flex w-full min-w-0 items-center justify-between overflow-hidden rounded-[1.15rem] px-3 py-2.5 text-left transition duration-300 ${
                      isActive
                        ? "bg-amber-400/[0.08]"
                        : "hover:bg-white/[0.055]"
                    }`}
                  >
                    <span className="flex min-w-0 flex-1 items-center gap-3 overflow-hidden">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition duration-300 ${
                          isActive
                            ? "border-amber-400/40 bg-amber-400/15 text-amber-300"
                            : "border-white/10 bg-white/[0.03] text-transparent"
                        }`}
                      >
                        <Check className="h-4 w-4" />
                      </span>

                      <span
                        className={`min-w-0 flex-1 truncate text-sm font-bold ${
                          isActive
                            ? "text-amber-300"
                            : "text-gray-200"
                        }`}
                      >
                        {option.label}
                      </span>
                    </span>

                    {typeof option.count ===
                    "number" ? (
                      <span
                        className={`ml-4 shrink-0 rounded-full px-2.5 py-1 text-xs font-black ${
                          isActive
                            ? "bg-amber-400 text-black"
                            : "bg-white/[0.05] text-gray-500"
                        }`}
                      >
                        {option.count}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}