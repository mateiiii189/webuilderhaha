"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "motion/react";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  const isInView = useInView(ref, {
    amount: 0.04,
    margin: "0px 0px 18% 0px",
    once: false,
  });

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 1.15,
          delay,
          ease: [0.16, 1, 0.3, 1],
        },
      });
    } else {
      controls.start({
        opacity: 0,
        y: 56,
        transition: {
          duration: 0.45,
          ease: [0.16, 1, 0.3, 1],
        },
      });
    }
  }, [isInView, controls, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 56,
      }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}