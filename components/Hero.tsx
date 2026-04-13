"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLang } from "@/context/LangContext";

export default function Hero() {
  const { tr } = useLang();
  const h = tr.hero;

  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-blue-200/25 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-cr-red/[0.04] rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-1/3 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl w-full mx-auto px-5 sm:px-8 flex flex-col lg:flex-row items-center gap-14 lg:gap-8">
        {/* — Text — */}
        <div className="flex-1 order-2 lg:order-1 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-cr-red font-semibold text-xs tracking-[0.2em] uppercase mb-5"
          >
            {h.role}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-6xl sm:text-7xl font-bold text-gray-900 leading-[1.05] mb-6"
          >
            Yerick
            <br />
            <span className="text-cr-red">Cano</span>
          </motion.h1>

          <motion.blockquote
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="inline-flex items-center gap-3 text-gray-500 text-lg font-light italic mb-7 lg:justify-start justify-center"
          >
            <span className="w-0.5 h-6 bg-cr-red rounded-full shrink-0" />
            &ldquo;{h.quote}&rdquo;
          </motion.blockquote>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45 }}
            className="text-gray-500 text-lg leading-relaxed mb-10 max-w-md mx-auto lg:mx-0"
          >
            {h.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55 }}
            className="flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cr-red text-white text-sm font-semibold rounded-xl hover:bg-cr-red-dark transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-cr-red/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cr-red"
            >
              {h.cta_projects} <ArrowRight size={15} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 glass text-sm font-semibold text-gray-700 rounded-xl hover:text-cr-red transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cr-red"
            >
              {h.cta_contact}
            </a>
          </motion.div>
        </div>

        {/* — Photo — */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="order-1 lg:order-2 flex-shrink-0 flex justify-center"
        >
          <div className="relative">
            {/* Outer glass frame */}
            <div className="glass rounded-3xl p-2.5 shadow-2xl shadow-black/10">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <Image
                  src="/pfp.jpg"
                  alt="Yerick Cano — Full Stack Software Engineer"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 256px, 288px"
                />
              </div>
            </div>

            {/* Floating location badge */}
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.9 }}
              className="absolute -bottom-4 -right-4 glass-subtle rounded-xl px-4 py-2.5 shadow-lg"
            >
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{h.based_in_label}</p>
              <p className="font-bold text-gray-900 text-sm leading-tight">{h.based_in}</p>
            </motion.div>

            {/* Decorative dot grid — top left */}
            <div
              className="absolute -top-4 -left-4 w-20 h-20 opacity-20 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, #CE1126 1px, transparent 1px)",
                backgroundSize: "8px 8px",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-400"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
