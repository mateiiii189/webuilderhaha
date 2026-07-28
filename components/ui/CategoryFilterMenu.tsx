"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
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

type CategoryFilterNavigation = {
  pathname: string;
  queryKey?: string;
  mode?: "single" | "multiple";
  scroll?: boolean;
};

type CategoryFilterMenuProps = {
  label: string;
  activeValues: string[];
  options: CategoryFilterOption[];
  onToggle?: (value: string) => void;
  onClear?: () => void;
  clearLabel?: string;
  closeOnSelect?: boolean;
  navigation?: CategoryFilterNavigation;
};

type MenuPosition = {
  top: number;
  left: number;
  width: number;
};

export function CategoryFilterMenu({
  label,
  activeValues,
  options,
  onToggle,
  onClear,
  clearLabel = "Toate categoriile",
  closeOnSelect = false,
  navigation,
}: CategoryFilterMenuProps) {
  const router = useRouter();

  const [isMounted, setIsMounted] =
    useState(false);

  const [isOpen, setIsOpen] =
    useState(false);

  const [menuPosition, setMenuPosition] =
    useState<MenuPosition>({
      top: 0,
      left: 0,
      width: 368,
    });

  const buttonRef =
    useRef<HTMLButtonElement>(null);

  const menuRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const activeLabel = (() => {
    if (activeValues.length === 0) {
      return clearLabel;
    }

    if (activeValues.length === 1) {
      return (
        options.find(
          (option) =>
            option.value ===
            activeValues[0],
        )?.label || activeValues[0]
      );
    }

    return `${activeValues.length} categorii selectate`;
  })();

  const totalCount = options.reduce(
    (total, option) =>
      total + (option.count || 0),
    0,
  );

  const updateMenuPosition =
    useCallback(() => {
      const button = buttonRef.current;

      if (!button) {
        return;
      }

      const rect =
        button.getBoundingClientRect();

      const viewportPadding = 16;

      const width = Math.min(
        368,
        window.innerWidth -
          viewportPadding * 2,
      );

      const preferredLeft =
        rect.right - width;

      const left = Math.min(
        Math.max(
          preferredLeft,
          viewportPadding,
        ),
        window.innerWidth -
          width -
          viewportPadding,
      );

      setMenuPosition({
        top: rect.bottom + 12,
        left,
        width,
      });
    }, []);

  function toggleMenu() {
    if (!isOpen) {
      updateMenuPosition();
    }

    setIsOpen(
      (current) => !current,
    );
  }

  function navigateWithValues(
    values: string[],
  ) {
    if (!navigation) {
      return;
    }

    const params = new URLSearchParams();
    const queryKey =
      navigation.queryKey || "category";

    values.forEach((value) => {
      if (value) {
        params.append(queryKey, value);
      }
    });

    const query = params.toString();
    const href = `${navigation.pathname}${
      query ? `?${query}` : ""
    }`;

    router.push(href, {
      scroll: navigation.scroll ?? true,
    });
  }

  function selectOption(value: string) {
    if (navigation) {
      const mode =
        navigation.mode || "single";

      const nextValues =
        mode === "multiple"
          ? activeValues.includes(value)
            ? activeValues.filter(
                (activeValue) =>
                  activeValue !== value,
              )
            : [...activeValues, value]
          : activeValues.includes(value)
            ? []
            : [value];

      navigateWithValues(nextValues);
    } else {
      onToggle?.(value);
    }

    if (closeOnSelect) {
      setIsOpen(false);
    }
  }

  function clearSelection() {
    if (navigation) {
      navigateWithValues([]);
    } else {
      onClear?.();
    }

    if (closeOnSelect) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    updateMenuPosition();

    function handlePointerDown(
      event: PointerEvent,
    ) {
      const target =
        event.target as Node;

      if (
        buttonRef.current?.contains(
          target,
        ) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }

      setIsOpen(false);
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

      if (
        target instanceof Node &&
        menuRef.current?.contains(target)
      ) {
        return;
      }

      setIsOpen(false);
    }

    function handleResize() {
      setIsOpen(false);
    }

    document.addEventListener(
      "pointerdown",
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

    window.addEventListener(
      "resize",
      handleResize,
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
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

      window.removeEventListener(
        "resize",
        handleResize,
      );
    };
  }, [
    isOpen,
    updateMenuPosition,
  ]);

  const menu = (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          ref={menuRef}
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
          style={{
            top: menuPosition.top,
            left: menuPosition.left,
            width: menuPosition.width,
          }}
          className="fixed z-[9999] overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#11161D]/[0.98] p-2 shadow-2xl shadow-black/60 backdrop-blur-xl"
        >
          <div className="max-h-[390px] space-y-1 overflow-y-auto overflow-x-hidden p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              role="menuitemcheckbox"
              aria-checked={
                activeValues.length === 0
              }
              onClick={clearSelection}
              className={`flex w-full min-w-0 items-center justify-between overflow-hidden rounded-[1.15rem] px-3 py-2.5 text-left transition duration-300 ${
                activeValues.length === 0
                  ? "bg-amber-400/[0.08]"
                  : "hover:bg-white/[0.055]"
              }`}
            >
              <span className="flex min-w-0 flex-1 items-center gap-3 overflow-hidden">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition duration-300 ${
                    activeValues.length === 0
                      ? "border-amber-400/40 bg-amber-400/15 text-amber-300"
                      : "border-white/10 bg-white/[0.03] text-transparent"
                  }`}
                >
                  <Check className="h-4 w-4" />
                </span>

                <span
                  className={`min-w-0 flex-1 truncate text-sm font-bold ${
                    activeValues.length === 0
                      ? "text-amber-300"
                      : "text-gray-200"
                  }`}
                >
                  {clearLabel}
                </span>
              </span>

              <span
                className={`ml-4 shrink-0 rounded-full px-2.5 py-1 text-xs font-black ${
                  activeValues.length === 0
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
                    selectOption(
                      option.value,
                    )
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
  );

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleMenu}
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

      {isMounted
        ? createPortal(
            menu,
            document.body,
          )
        : null}
    </>
  );
}
