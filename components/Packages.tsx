"use client";

import { motion } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";
import { useLang } from "@/context/LangContext";

type Package = {
  id: string;
  badge: string;
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  featured: boolean;
  bestFor: string;
  items: readonly string[];
};

type Addon = {
  name: string;
  desc: string;
  price: string;
};

const badgeClasses: Record<string, string> = {
  starter: "bg-green-100 text-green-800",
  growth: "bg-blue-100 text-blue-800",
  pro: "bg-amber-100 text-amber-800",
  scale: "bg-purple-100 text-purple-800",
};

export default function Packages() {
  const { tr } = useLang();
  const pk = tr.packages;

  return (
    <section id="packages" className="py-28 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-cr-red font-semibold text-xs tracking-[0.2em] uppercase mb-3">
            {pk.nav}
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-3">{pk.title}</h2>
          <p className="text-gray-500 text-base leading-relaxed max-w-xl mb-14">{pk.subtitle}</p>
        </motion.div>

        {/* Package cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {(pk.packages as unknown as Package[]).map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass rounded-2xl flex flex-col ${
                pkg.featured
                  ? "py-8 px-6 ring-2 ring-blue-400/60"
                  : "py-6 px-6"
              }`}
            >
              {/* Badge */}
              <span
                className={`self-start text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4 ${
                  badgeClasses[pkg.id] ?? "bg-gray-100 text-gray-800"
                }`}
              >
                {pkg.badge}
              </span>

              {/* Name + tagline */}
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{pkg.name}</h3>
              <p className="text-sm text-gray-500 italic leading-relaxed mb-5">{pkg.tagline}</p>

              {/* Price */}
              <p className="text-3xl font-bold text-gray-900 leading-none">{pkg.price}</p>
              <p className="text-xs text-gray-500 mt-1 mb-5">{pkg.priceNote}</p>

              {/* Divider */}
              <div className="border-t border-white/70 mb-5" />

              {/* Includes label */}
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                {pk.includes}
              </p>

              {/* Checklist */}
              <ul className="flex flex-col gap-2.5 mb-5 flex-1">
                {pkg.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check size={14} className="text-green-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Best for */}
              <div className="mb-5">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  {pk.bestFor}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">{pkg.bestFor}</p>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/50687571891?text=${encodeURIComponent(
                  `Hola Yerick, me interesa el paquete ${pkg.name}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-cr-red text-white text-sm font-semibold rounded-xl hover:bg-cr-red-dark transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-cr-red/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cr-red"
              >
                <MessageCircle size={15} />
                {pk.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Not sure? row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-500 mb-16"
        >
          <span>{pk.notSure}</span>
          <a
            href="https://wa.me/50687571891"
            target="_blank"
            rel="noopener noreferrer"
            className="py-1.5 font-semibold text-gray-600 underline underline-offset-2 hover:text-cr-red transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cr-red rounded"
          >
            {pk.notSureCta} ↗
          </a>
        </motion.div>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <p className="text-cr-red font-semibold text-xs tracking-[0.2em] uppercase mb-2">
            {pk.addonsTitle}
          </p>
          <p className="text-gray-500 text-sm mb-6">{pk.addonsSubtitle}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {(pk.addons as unknown as Addon[]).map((addon, i) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                className="glass-subtle rounded-xl px-5 py-4 flex justify-between items-center gap-4"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 leading-tight">{addon.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{addon.desc}</p>
                </div>
                <p className="text-sm font-semibold text-green-600 shrink-0">{addon.price}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
