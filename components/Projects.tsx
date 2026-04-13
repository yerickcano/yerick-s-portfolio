"use client";

import { motion } from "framer-motion";
import { ExternalLink, Lock, Globe } from "lucide-react";

type Project = {
  title: string;
  tagline: string;
  description: string;
  link: string | null;
  linkLabel: string | null;
  tags: string[];
  featured: boolean;
  status: "live" | "private";
};

const projects: Project[] = [
  {
    title: "Fuller",
    tagline: "Delivery for Costa Rica's Caribbean coast",
    description:
      "An Uber Eats-like platform built from the ground up for a region where delivery services simply didn't exist. Fuller created a new local economy — connecting restaurants, drivers, and customers in a community that had never had access to on-demand delivery. A people's choice, built with purpose.",
    link: "https://fuller.express",
    linkLabel: "Visit fuller.express",
    tags: ["Full Stack", "React", "Node.js", "Mobile", "Costa Rica"],
    featured: true,
    status: "live",
  },
  {
    title: "SnowConvert",
    tagline: "Modernizing the world's data",
    description:
      "A professional-grade migration tool that helps enterprises convert their SQL codebases to Snowflake SQL. Used by companies worldwide to accelerate cloud data transformation at scale.",
    link: "https://docs.snowflake.com/en/migrations/snowconvert-docs/overview",
    linkLabel: "View docs",
    tags: ["JavaScript", "React", "SQL", "Snowflake", "Enterprise"],
    featured: false,
    status: "live",
  },
  {
    title: "ProCard",
    tagline: "Professional identity, online",
    description:
      "A polished personal website tailored for accountants and professionals. Clean, trustworthy, and conversion-focused — the digital business card for individuals who care about first impressions.",
    link: null,
    linkLabel: null,
    tags: ["Next.js", "Design", "Professional"],
    featured: false,
    status: "private",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.58, delay },
});

export default function Projects() {
  const featured = projects.find((p) => p.featured)!;
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-28 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp()}>
          <p className="text-cr-red font-semibold text-xs tracking-[0.2em] uppercase mb-3">
            Projects
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-14">
            Things I&apos;ve built
          </h2>
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
                    Featured
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                    <Globe size={11} /> Live
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {featured.title}
                </h3>
                <p className="text-cr-red font-medium text-sm mt-1">
                  {featured.tagline}
                </p>
              </div>
              {featured.link && (
                <a
                  href={featured.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-cr-red glass-subtle rounded-xl px-5 py-2.5 hover:shadow-md transition-all duration-200 shrink-0"
                >
                  {featured.linkLabel} <ExternalLink size={14} />
                </a>
              )}
            </div>
            <p className="text-gray-600 leading-[1.75] mb-6 max-w-2xl">
              {featured.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {featured.tags.map((tag) => (
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
            {others.map((project, i) => (
              <motion.div
                key={project.title}
                {...fadeUp(0.18 + i * 0.1)}
                className="glass rounded-2xl p-6 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {project.status === "live" ? (
                        <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                          <Globe size={11} /> Live
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold">
                          <Lock size={11} /> Private
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {project.title}
                    </h3>
                    <p className="text-cr-red font-medium text-sm mt-1">
                      {project.tagline}
                    </p>
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-gray-400 hover:text-cr-red hover:bg-cr-red/5 transition-colors"
                      aria-label={`Open ${project.title}`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
                <p className="text-gray-600 text-sm leading-[1.7] mb-5 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/80 border border-white/90 text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
