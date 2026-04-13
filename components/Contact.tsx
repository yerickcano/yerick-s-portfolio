"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import type { IconType } from "react-icons";
import { useLang } from "@/context/LangContext";

type ContactLink = {
  icon: IconType;
  label: string;
  handle: string;
  href: string;
  hoverClass: string;
};

const links: ContactLink[] = [
  {
    icon: FaGithub,
    label: "GitHub",
    handle: "@yerickcano",
    href: "https://github.com/yerickcano",
    hoverClass: "hover:text-gray-900",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    handle: "in/yerickcano",
    href: "https://www.linkedin.com/in/yerickcano",
    hoverClass: "hover:text-[#0A66C2]",
  },
  {
    icon: MdOutlineEmail,
    label: "Email",
    handle: "yerickcanogarcia@gmail.com",
    href: "mailto:yerickcanogarcia@gmail.com",
    hoverClass: "hover:text-cr-red",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    handle: "+506 8757 1891",
    href: "https://wa.me/50687571891",
    hoverClass: "hover:text-[#25D366]",
  },
];

export default function Contact() {
  const { tr } = useLang();
  const ct = tr.contact;

  return (
    <section id="contact" className="py-28 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.58 }}
          className="text-center mb-12"
        >
          <p className="text-cr-red font-semibold text-xs tracking-[0.2em] uppercase mb-3">
            {ct.eyebrow}
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{ct.heading}</h2>
          <p className="text-gray-500 text-base leading-relaxed max-w-sm mx-auto">{ct.bio}</p>
        </motion.div>

        {/* Links card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.58, delay: 0.1 }}
          className="glass rounded-2xl p-8 max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {links.map(({ icon: Icon, label, handle, href, hoverClass }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.18 + i * 0.07 }}
                className={`flex items-center gap-4 p-4 rounded-xl bg-white/50 border border-white/80 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group text-gray-500 ${hoverClass}`}
              >
                <div className="w-10 h-10 rounded-lg glass flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
                  <Icon size={17} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">
                    {label}
                  </p>
                  <p className="text-sm font-semibold truncate text-gray-700 group-hover:text-current transition-colors">
                    {handle}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
