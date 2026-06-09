"use client";

import { motion } from "motion/react";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: false,
        amount: 0.18,
      }}
      transition={{
        duration: 1.15,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}