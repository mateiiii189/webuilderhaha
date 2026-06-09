"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const pathname = usePathname();

function handleLogoClick(event: React.MouseEvent<HTMLAnchorElement>) {
  if (pathname === "/") {
    event.preventDefault();
    smoothScrollToTop(1100);
  }
}

function smoothScrollToTop(duration = 1000) {
  const start = window.scrollY;
  const startTime = performance.now();

  let animationFrameId: number;
  let cancelled = false;

  function cancelAnimation() {
    cancelled = true;
    cancelAnimationFrame(animationFrameId);

    window.removeEventListener("wheel", cancelAnimation);
    window.removeEventListener("touchstart", cancelAnimation);
    window.removeEventListener("keydown", cancelAnimation);
  }

  window.addEventListener("wheel", cancelAnimation, { passive: true });
  window.addEventListener("touchstart", cancelAnimation, { passive: true });
  window.addEventListener("keydown", cancelAnimation);

  function easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
  }

  function cleanup() {
    window.removeEventListener("wheel", cancelAnimation);
    window.removeEventListener("touchstart", cancelAnimation);
    window.removeEventListener("keydown", cancelAnimation);
  }

  function animate(currentTime: number) {
    if (cancelled) {
      cleanup();
      return;
    }

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);

    window.scrollTo(0, start * (1 - easedProgress));

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      cleanup();
    }
  }

  animationFrameId = requestAnimationFrame(animate);
}

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#0B0F14]/80 backdrop-blur-xl">
      <Container>
        <div className="flex h-20 items-center justify-between">
            <Link
            href="/"
            onClick={handleLogoClick}
            className="group flex items-center gap-2 transition duration-300 hover:-translate-y-0.5"
            >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-400/40 bg-amber-400/10 text-sm font-bold text-amber-300 transition duration-300 group-hover:border-amber-400/70 group-hover:bg-amber-400 group-hover:text-black group-hover:shadow-lg group-hover:shadow-amber-400/20">
              W
            </span>

            <span className="text-base font-semibold tracking-tight text-white transition duration-300 group-hover:text-amber-300">
              Webuilder.ro
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {siteConfig.nav.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition duration-300 hover:-translate-y-0.5 hover:text-amber-300 ${
                    isActive ? "text-amber-300" : "text-gray-300"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <Button href="/contact">Cere ofertă</Button>
          </div>
        </div>
      </Container>
    </header>
  );
}