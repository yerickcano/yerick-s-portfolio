"use client";

import { motion } from "framer-motion";
import { ExternalLink, Lock, Globe } from "lucide-react";
import { useLang } from "@/context/LangContext";

const projectsMeta = [
  {
    title: "Fuller",
    link: "https://fuller.express",
    tags: ["Full Stack", "React", "Node.js", "Mobile", "Costa Rica"],
    featured: true,
    status: "live" as const,
  },
  {
    title: "SnowConvert",
    link: "https://docs.snowflake.com/en/migrations/snowconvert-docs/overview",
    tags: ["JavaScript", "React", "SQL", "Snowflake", "Enterprise"],
    featured: false,
    status: "live" as const,
  },
  {
    title: "ProCard",
    link: null,
    tags: ["Next.js", "Design", "Professional"],
    featured: false,
    status: "private" as const,
  },
  {
    title: "BusCaribe",
    link: "https://buscaribe.vercel.app/",
    tags: ["Next.js", "Community", "Public Service", "Costa Rica"],
    featured: false,
    status: "live" as const,
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.58, delay },
});

export default function Projects() {
  const { tr } = useLang();
  const pr = tr.projects;

  const featuredMeta = projectsMeta[0];
  const featuredTr = pr.items[0];
  const othersMeta = projectsMeta.slice(1);

  return (
    <section id="projects" className="py-28 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp()}>
          <p className="text-cr-red font-semibold text-xs tracking-[0.2em] uppercase mb-3">
            {pr.eyebrow}
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-14">{pr.heading}</h2>
        </motion.div>

        <div className="flex flex-col gap-6">
          {/* Featured project */}
          <motion.div
            {...fadeUp(0.1)}
            className="glass rounded-2xl p-8 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-cr-red uppercase tracking-widest px-2.5 py-1 rounded-full bg-cr-red/[0.07]">
                    {pr.featured}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                    <Globe size={11} /> {pr.live}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{featuredMeta.title}</h3>
                <p className="text-cr-red font-medium text-sm mt-1">{featuredTr.tagline}</p>
              </div>
              {featuredMeta.link && (
                <a
                  href={featuredMeta.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-cr-red glass-subtle rounded-xl px-5 py-2.5 hover:shadow-md transition-all duration-200 shrink-0"
                >
                  {featuredTr.linkLabel} <ExternalLink size={14} />
                </a>
              )}
            </div>
            <p className="text-gray-600 leading-[1.75] mb-6 max-w-2xl">{featuredTr.description}</p>
            <div className="flex flex-wrap gap-2">
              {featuredMeta.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1 rounded-lg bg-white/80 border border-white/90 text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Other projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {othersMeta.map((meta, i) => {
              const item = pr.items[i + 1];
              return (
                <motion.div
                  key={meta.title}
                  {...fadeUp(0.18 + i * 0.1)}
                  className="glass rounded-2xl p-6 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {meta.status === "live" ? (
                          <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                            <Globe size={11} /> {pr.live}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold">
                            <Lock size={11} /> {pr.private}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{meta.title}</h3>
                      <p className="text-cr-red font-medium text-sm mt-1">{item.tagline}</p>
                    </div>
                    {meta.link && (
                      <a
                        href={meta.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-gray-400 hover:text-cr-red hover:bg-cr-red/5 transition-colors"
                        aria-label={`Open ${meta.title}`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm leading-[1.7] mb-5 flex-1">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {meta.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/80 border border-white/90 text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
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
