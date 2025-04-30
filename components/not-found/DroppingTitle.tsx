"use client";

import cn from "@yeahx4/cn";
import { motion } from "framer-motion";

export default function DroppingTitle() {
  return (
    <motion.h1
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={cn(
        "text-6xl font-extrabold mb-4",
        "text-neutral-900 dark:text-neutral-100"
      )}
    >
      404
    </motion.h1>
  );
}
