"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { useLang } from "@/context/LangContext";
import type { Demo } from "@/lib/demos";

type Props = {
  demo: Demo | null;
  onClose: () => void;
};

export default function DemoModal({ demo, onClose }: Props) {
  const { lang } = useLang();

  useEffect(() => {
    if (!demo) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [demo, onClose]);

  return (
    <AnimatePresence>
      {demo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex flex-col bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Top bar */}
          <motion.div
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.22, delay: 0.05 }}
            className="flex items-center justify-between px-5 py-3 bg-white/95 backdrop-blur border-b border-gray-200 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-semibold text-gray-900 text-sm">{demo.title}</span>
            <div className="flex items-center gap-2">
              <a
                href={demo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-cr-red px-3 py-1.5 rounded-lg hover:bg-cr-red/5 transition-all duration-200"
              >
                <ExternalLink size={13} />
                {lang === "es" ? "Abrir en nueva pestaña" : "Open in new tab"}
              </a>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-500 hover:text-cr-red hover:bg-cr-red/5 transition-all duration-200"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </motion.div>

          {/* iframe */}
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.28, delay: 0.08 }}
            className="flex-1 bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={demo.url}
              title={demo.title}
              className="w-full h-full border-0"
              loading="lazy"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
