"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cream p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center bg-soft-white p-8 rounded-3xl shadow-xl border border-beige"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-coffee-light bg-cream p-4 rounded-full"
          >
            <AlertCircle size={48} strokeWidth={1.5} />
          </motion.div>
        </div>

        <h2 className="text-2xl font-semibold text-coffee mb-3">
          Oops! Something went wrong
        </h2>
        
        <p className="text-coffee/70 mb-8 leading-relaxed">
          We encountered a little hiccup while preparing your order. 
          Don't worry, we're on it! Please try refreshing the page.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => reset()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-coffee text-soft-white rounded-full font-medium transition-colors hover:bg-coffee-light shadow-lg"
        >
          <RefreshCcw size={18} />
          Try Again
        </motion.button>
        
        {error.digest && (
          <p className="mt-6 text-xs text-coffee/40 font-mono">
            Error ID: {error.digest}
          </p>
        )}
      </motion.div>
    </div>
  );
}
