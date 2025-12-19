"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const directions = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.5,
  direction = "up",
  className = "",
  once = true,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  const initialPosition = directions[direction] || directions.up;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...initialPosition }}
      animate={
        isInView
          ? { opacity: 1, y: 0, x: 0 }
          : { opacity: 0, ...initialPosition }
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
