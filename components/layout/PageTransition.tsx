"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";

type PageTransitionProps = {
  children: React.ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  const hasOwnRevealAnimation =
    pathname === "/blog" || pathname.startsWith("/blog/");

  return (
    <motion.div
      key={pathname}
      initial={
        hasOwnRevealAnimation
          ? false
          : {
              opacity: 0,
              y: 56,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 1.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        willChange: hasOwnRevealAnimation
          ? undefined
          : "opacity, transform",
      }}
    >
      {children}
    </motion.div>
  );
}