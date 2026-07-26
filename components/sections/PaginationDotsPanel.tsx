"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

type PaginationDotsPanelProps = {
  currentPage: number;
  totalPages: number;
  basePath?: string;
};

type PanelPosition = {
  top: number;
  left: number;
};

function getPageHref(
  basePath: string,
  page: number,
) {
  return page === 1
    ? basePath
    : `${basePath}?page=${page}`;
}

export function PaginationDotsPanel({
  currentPage,
  totalPages,
  basePath = "/blog",
}: PaginationDotsPanelProps) {
  const [mounted, setMounted] =
    useState(false);

  const [clickOpen, setClickOpen] =
    useState(false);

  const [hoverOpen, setHoverOpen] =
    useState(false);

  const [position, setPosition] =
    useState<PanelPosition>({
      top: 0,
      left: 0,
    });

  const wrapperRef =
    useRef<HTMLDivElement | null>(null);

  const buttonRef =
    useRef<HTMLButtonElement | null>(null);

  const panelRef =
    useRef<HTMLDivElement | null>(null);

  const closeTimerRef =
    useRef<ReturnType<
      typeof setTimeout
    > | null>(null);

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  const isOpen = clickOpen || hoverOpen;

  function deviceHasHover() {
    return window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
  }

  function cancelScheduledClose() {
    if (!closeTimerRef.current) {
      return;
    }

    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  }

  function updatePanelPosition() {
    if (!buttonRef.current) {
      return;
    }

    const rect =
      buttonRef.current.getBoundingClientRect();

    setPosition({
      /*
       * Wrapperul transparent se suprapune ușor peste buton,
       * iar panoul vizibil rămâne mai sus. Astfel nu există
       * nicio zonă moartă când muți cursorul între ele.
       */
      top: Math.max(24, rect.top + 6),
      left:
        rect.left + rect.width / 2,
    });
  }

  function openFromButton() {
    if (!deviceHasHover()) {
      return;
    }

    cancelScheduledClose();
    updatePanelPosition();
    setHoverOpen(true);
  }

  function keepPanelOpen() {
    cancelScheduledClose();
  }

  function scheduleHoverClose() {
    if (!deviceHasHover()) {
      return;
    }

    cancelScheduledClose();

    closeTimerRef.current =
      setTimeout(() => {
        setHoverOpen(false);
        closeTimerRef.current = null;
      }, 110);
  }

  function handleDotsClick() {
    cancelScheduledClose();
    updatePanelPosition();

    setClickOpen((current) => !current);
  }

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(
      event: PointerEvent,
    ) {
      const target = event.target as Node;

      const clickedWrapper =
        wrapperRef.current?.contains(
          target,
        );

      const clickedPanel =
        panelRef.current?.contains(
          target,
        );

      if (
        clickedWrapper ||
        clickedPanel
      ) {
        return;
      }

      cancelScheduledClose();
      setClickOpen(false);
      setHoverOpen(false);
    }

    document.addEventListener(
      "pointerdown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleClickOutside,
      );

      cancelScheduledClose();
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePositionUpdate() {
      updatePanelPosition();
    }

    window.addEventListener(
      "scroll",
      handlePositionUpdate,
      true,
    );

    window.addEventListener(
      "resize",
      handlePositionUpdate,
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handlePositionUpdate,
        true,
      );

      window.removeEventListener(
        "resize",
        handlePositionUpdate,
      );
    };
  }, [isOpen]);

  const panel =
    mounted
      ? createPortal(
          <div
            ref={panelRef}
            onPointerEnter={keepPanelOpen}
            onPointerLeave={scheduleHoverClose}
            style={{
              top: position.top,
              left: position.left,
              transform: isOpen
                ? "translate(-50%, -100%) translateY(0) scale(1)"
                : "translate(-50%, -100%) translateY(8px) scale(0.97)",
            }}
            className={`fixed z-[100] w-[calc(100vw-32px)] max-w-[620px] origin-bottom pb-[18px] transition-[opacity,transform] duration-200 ease-out md:w-auto md:min-w-[520px] ${
              isOpen
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            <div className="rounded-[1.5rem] border border-white/10 bg-[#0B0F14]/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <div className="flex gap-2 overflow-x-auto scroll-smooth px-4 [scrollbar-width:none] [-ms-overflow-style:none] md:grid md:max-h-[260px] md:grid-cols-10 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
                {pages.map((page) => (
                  <Link
                    key={page}
                    href={getPageHref(
                      basePath,
                      page,
                    )}
                    className={`flex h-10 min-w-10 shrink-0 items-center justify-center rounded-full border text-xs font-black transition-colors duration-300 ${
                      page === currentPage
                        ? "border-amber-400 bg-amber-400 text-black"
                        : "border-white/10 bg-white/[0.03] text-white hover:border-amber-400/40 hover:text-amber-300"
                    }`}
                  >
                    {page}
                  </Link>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div
        ref={wrapperRef}
        className="relative"
        onPointerEnter={openFromButton}
        onPointerLeave={scheduleHoverClose}
      >
        <button
          ref={buttonRef}
          type="button"
          onClick={handleDotsClick}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm font-black text-gray-400 transition-colors duration-300 hover:border-amber-400/40 hover:text-amber-300"
          aria-label="Arată toate paginile"
          aria-expanded={isOpen}
        >
          ...
        </button>
      </div>

      {panel}
    </>
  );
}