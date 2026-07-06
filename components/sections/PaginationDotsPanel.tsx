"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function PaginationDotsPanel({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const [clickOpen, setClickOpen] = useState(false);
  const [hoverOpen, setHoverOpen] = useState(false);
  const [panelTop, setPanelTop] = useState(0);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const pages = Array.from({ length: totalPages }).map((_, index) => index + 1);
  const isOpen = clickOpen || hoverOpen;

  function deviceHasHover() {
    if (typeof window === "undefined") return false;

    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }

  function updatePanelPosition() {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    setPanelTop(Math.max(16, rect.top - 12));
  }

  function handleMouseEnter() {
    if (deviceHasHover()) {
      updatePanelPosition();
      setHoverOpen(true);
    }
  }

  function handleMouseLeave() {
    if (deviceHasHover()) {
      setHoverOpen(false);
    }
  }

  function handleDotsClick() {
    updatePanelPosition();

    if (!deviceHasHover()) {
      setClickOpen((current) => !current);
    }
  }

  useEffect(() => {
    function handleClickOutside(event: PointerEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setClickOpen(false);
        setHoverOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    function handleUpdatePosition() {
      updatePanelPosition();
    }

    window.addEventListener("scroll", handleUpdatePosition, true);
    window.addEventListener("resize", handleUpdatePosition);

    return () => {
      window.removeEventListener("scroll", handleUpdatePosition, true);
      window.removeEventListener("resize", handleUpdatePosition);
    };
  }, [isOpen]);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={handleDotsClick}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm font-black text-gray-400 transition duration-500 hover:-translate-y-0.5 hover:border-amber-400/40 hover:text-amber-300"
        aria-label="Arată toate paginile"
      >
        ...
      </button>

      <div
        style={{
          top: panelTop,
          left: "50%",
        }}
        className={`fixed z-50 w-[calc(100vw-32px)] max-w-[620px] -translate-x-1/2 -translate-y-full rounded-[1.5rem] border border-white/10 bg-[#0B0F14]/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl transition duration-300 md:w-auto md:min-w-[520px] ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex gap-2 overflow-x-auto scroll-smooth px-4 [scrollbar-width:none] [-ms-overflow-style:none] md:grid md:max-h-[260px] md:grid-cols-10 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
          {pages.map((page) => (
            <Link
              key={page}
              href={page === 1 ? "/blog" : `/blog?page=${page}`}
              className={`flex h-10 min-w-10 shrink-0 items-center justify-center rounded-full border text-xs font-black transition duration-300 hover:-translate-y-0.5 ${
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
    </div>
  );
}