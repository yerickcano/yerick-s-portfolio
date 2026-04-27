"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Monitor } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { demos } from "@/lib/demos";
import type { Demo } from "@/lib/demos";
import type { Lang } from "@/lib/i18n";
import DemoModal from "@/components/DemoModal";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.58, delay },
});

export default function Demos() {
  const { lang, tr } = useLang();
  const dm = tr.demos;
  const [activeDemo, setActiveDemo] = useState<Demo | null>(null);

  return (
    <>
    <DemoModal demo={activeDemo} onClose={() => setActiveDemo(null)} />
    <section id="demos" className="py-28 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp()}>
          <p className="text-cr-red font-semibold text-xs tracking-[0.2em] uppercase mb-3">
            {dm.eyebrow}
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-3">{dm.heading}</h2>
          <p className="text-gray-500 mb-14">{dm.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo, i) => (
            <motion.div
              key={demo.title}
              {...fadeUp(0.1 + i * 0.1)}
              className="glass rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
            >
              {/* Thumbnail */}
              <div className="h-40 bg-gradient-to-br from-indigo-50 via-white to-cr-red/5 flex items-center justify-center border-b border-white/60 relative overflow-hidden">
                {demo.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={demo.thumbnail}
                    alt={demo.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Monitor size={36} className="text-gray-200" />
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{demo.title}</h3>
                <p className="text-gray-600 text-sm leading-[1.7] mb-4 flex-1">
                  {demo.description[lang as Lang]}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {demo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/80 border border-white/90 text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setActiveDemo(demo)}
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-600 hover:text-cr-red glass-subtle rounded-xl px-5 py-2.5 hover:shadow-md transition-all duration-200 w-full"
                >
                  {dm.cta} →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
