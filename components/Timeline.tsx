"use client";

import { motion } from "framer-motion";
import { MapPin, CalendarDays, Briefcase } from "lucide-react";

const experiences = [
  {
    company: "Snowflake",
    role: "Software Engineer",
    type: "Full-time · Hybrid",
    period: "Feb 2023 – Jul 2025",
    duration: "2 yrs 6 mos",
    location: "San José, Costa Rica",
    description:
      "Developed software that helps users manage the migration of their SQL code to Snowflake SQL. Contributed to the SnowConvert toolchain used by enterprises worldwide to accelerate cloud data transformation.",
    tags: ["JavaScript", "React", "TypeScript", "SQL", "Snowflake"],
  },
  {
    company: "Mobilize.Net",
    role: "Software Engineer",
    type: "Full-time · Remote",
    period: "Jul 2022 – Feb 2023",
    duration: "8 mos",
    location: "San José, Costa Rica",
    description:
      "Developed tooling to help users migrate SQL codebases to Snowflake SQL. Transitioned into Snowflake as part of the team acquisition, carrying the same product forward.",
    tags: ["JavaScript", "React", "SQL"],
  },
  {
    company: "Mobilize.Net",
    role: "Software Engineer Intern",
    type: "Internship · Remote",
    period: "Feb 2022 – Jul 2022",
    duration: "6 mos",
    location: "San José, Costa Rica",
    description:
      "Started my professional journey contributing to SQL migration tooling, learning modern engineering practices in a fast-moving product environment.",
    tags: ["JavaScript", "React"],
  },
];

export default function Timeline() {
  return (
    <section id="experience" className="py-28 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.58 }}
        >
          <p className="text-cr-red font-semibold text-xs tracking-[0.2em] uppercase mb-3">
            Experience
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-14">
            Career timeline
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical guide line */}
          <div className="absolute left-[18px] sm:left-[26px] top-3 bottom-3 w-px bg-gradient-to-b from-cr-red via-cr-red/30 to-transparent" />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${exp.role}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.12,
                  ease: "easeOut",
                }}
                className="relative pl-11 sm:pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-2 sm:left-[18px] top-7 w-5 h-5 -translate-x-1/2 rounded-full bg-cr-red border-4 border-white/90 shadow-md shadow-cr-red/20 ring-2 ring-cr-red/10" />

                <div className="glass rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">
                        {exp.role}
                      </h3>
                      <p className="text-cr-red font-semibold text-sm mt-0.5">
                        {exp.company}
                      </p>
                    </div>
                    <span className="glass-subtle text-xs font-semibold text-gray-500 px-3 py-1 rounded-full shrink-0">
                      {exp.duration}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-400 mb-4">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={12} />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={12} />
                      {exp.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={12} />
                      {exp.type}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm leading-[1.7] mb-5">
                    {exp.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-2.5 py-1 rounded-lg bg-cr-red/[0.07] text-cr-red"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
