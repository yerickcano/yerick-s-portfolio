"use client";

import { motion } from "framer-motion";
import { Heart, Globe, Cpu } from "lucide-react";
import { useLang } from "@/context/LangContext";

const icons = [Heart, Globe, Cpu];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.58, delay },
});

export default function About() {
  const { tr } = useLang();
  const a = tr.about;

  return (
    <section id="about" className="py-28 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp()}>
          <p className="text-cr-red font-semibold text-xs tracking-[0.2em] uppercase mb-3">
            {a.eyebrow}
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-14">{a.heading}</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Bio card — spans 3 cols */}
          <motion.div
            {...fadeUp(0.12)}
            className="lg:col-span-3 glass rounded-2xl p-8 flex flex-col gap-5"
          >
            <p className="text-gray-600 leading-[1.75] text-base">{a.bio1}</p>

            <blockquote className="border-l-[3px] border-cr-red pl-5 py-1">
              <p className="text-2xl font-semibold text-gray-900 leading-snug">
                &ldquo;{a.quote}&rdquo;
              </p>
            </blockquote>
          </motion.div>

          {/* Values — spans 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {a.values.map(({ label, desc }, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={label}
                  {...fadeUp(0.2 + i * 0.1)}
                  className="glass rounded-xl p-5 flex items-start gap-4 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-9 h-9 rounded-lg bg-cr-red/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-cr-red" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-0.5">{label}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
