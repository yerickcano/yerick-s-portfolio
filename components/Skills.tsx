"use client";

import { motion } from "framer-motion";

const groups = [
  {
    label: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML & CSS"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "REST APIs", "PostgreSQL", "SQL", "Snowflake SQL"],
  },
  {
    label: "Tools",
    skills: ["Git", "GitHub", "Vercel", "Snowflake", "Bun"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-12 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="glass rounded-2xl p-8"
        >
          <p className="text-cr-red font-semibold text-xs tracking-[0.2em] uppercase mb-6">
            Skills
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {groups.map(({ label, skills }, gi) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: gi * 0.08 + 0.1 }}
              >
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                  {label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, si) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.88 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.28, delay: gi * 0.08 + si * 0.04 + 0.15 }}
                      className="text-sm font-medium px-3 py-1.5 rounded-lg bg-white/70 border border-white/90 text-gray-700 hover:border-cr-red/25 hover:text-cr-red transition-colors duration-200 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
