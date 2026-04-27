export type Demo = {
  title: string;
  description: { en: string; es: string };
  tags: string[];
  url: string;
  thumbnail?: string;
};

export const demos: Demo[] = [
  {
    title: "Clínica Dental Sonrisa",
    description: {
      en: "Demo for dental clinics and dentists. Showcases services, professional profile, testimonials, and appointment booking via WhatsApp.",
      es: "Demo para clínicas dentales y odontólogos. Muestra servicios, perfil profesional, testimonios y reserva de cita vía WhatsApp.",
    },
    tags: ["Dentista", "Profesional", "Salud"],
    url: "/demos/clinica-dental/",
  },
  {
    title: "Lic. Carlos Méndez — Abogado y Notario",
    description: {
      en: "Demo for general practice lawyers. Includes practice areas, work process, legal FAQ, and free initial consultation via WhatsApp.",
      es: "Demo para abogados generalistas. Incluye áreas de práctica, proceso de trabajo, FAQ legal y consulta inicial gratuita vía WhatsApp.",
    },
    tags: ["Abogado", "Profesional", "Servicios legales"],
    url: "/demos/abogado/",
  },
  {
    title: "Tico Wild Tours",
    description: {
      en: "Demo for tourism agencies and tour operators. Showcases experiences, gallery, verified reviews, and direct booking via WhatsApp.",
      es: "Demo para agencias de turismo y tours. Muestra experiencias, galería, reseñas verificadas y reserva directa por WhatsApp.",
    },
    tags: ["Turismo", "Tours", "Negocio local"],
    url: "/demos/tour-agency/",
  },
  {
    title: "Aura Studio CR",
    description: {
      en: "Demo for beauty brands and feminine products. Features collection, services, community, and a complete editorial brand identity.",
      es: "Demo para marcas de belleza y productos femeninos. Presenta colección, servicios, comunidad y una identidad de marca editorial completa.",
    },
    tags: ["Belleza", "Productos", "Negocio local"],
    url: "/demos/belleza/",
  },
];
