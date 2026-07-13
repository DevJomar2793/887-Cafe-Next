"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "none";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  distance?: number;
  duration?: number;
  eager?: boolean;
};

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
};

type FloatProps = {
  children: ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
};

const offsets: Record<Direction, (distance: number) => { x: number; y: number }> = {
  up: (distance) => ({ x: 0, y: distance }),
  down: (distance) => ({ x: 0, y: -distance }),
  left: (distance) => ({ x: distance, y: 0 }),
  right: (distance) => ({ x: -distance, y: 0 }),
  none: () => ({ x: 0, y: 0 }),
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 24,
  duration = 0.6,
  eager = false,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const offset = offsets[direction](distance);
  const hidden = reduceMotion ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset };
  const visible = { opacity: 1, x: 0, y: 0 };
  const transition = reduceMotion ? { duration: 0 } : { duration, delay, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <motion.div
      className={className}
      initial={hidden}
      animate={eager ? visible : undefined}
      whileInView={eager ? undefined : visible}
      viewport={eager ? undefined : { once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className, delay = 0.08, stagger = 0.08 }: StaggerProps) {
  const reduceMotion = useReducedMotion();
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: reduceMotion ? { duration: 0 } : { delayChildren: delay, staggerChildren: stagger },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  const variants: Variants = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion ? { duration: 0 } : { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

export function Float({ children, className, distance = 8, duration = 5 }: FloatProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      animate={reduceMotion ? undefined : { y: [0, -distance, 0] }}
      transition={
        reduceMotion
          ? undefined
          : { duration, repeat: Infinity, ease: "easeInOut" }
      }
    >
      {children}
    </motion.div>
  );
}
