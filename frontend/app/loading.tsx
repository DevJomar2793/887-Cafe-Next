"use client";

import { motion } from "framer-motion";
import { Coffee } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative flex items-center justify-center"
      >
        {/* Pulsing background glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-24 h-24 bg-coffee-light rounded-full blur-3xl"
        />
        
        {/* Animated Coffee Cup */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-10 text-coffee"
        >
          <Coffee size={64} strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-center"
      >
        <h2 className="text-xl font-medium text-coffee-light italic">
          Brewing your experience...
        </h2>
        <p className="text-sm text-coffee/60 mt-2">
          Please wait a moment while we prepare everything.
        </p>
      </motion.div>

      {/* Bottom loading bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-beige">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="h-full bg-coffee-light"
        />
      </div>
    </div>
  );
}
