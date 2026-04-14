export type Lang = "en" | "es";

export const t = {
  en: {
    nav: {
      links: [
        { href: "#about", label: "About" },
        { href: "#projects", label: "Projects" },
        { href: "#experience", label: "Experience" },
        { href: "#contact", label: "Contact" },
      ],
    },
    hero: {
      role: "Full Stack Software Engineer",
      quote: "Do what is right!",
      bio: "Building software that creates real opportunities for people. 4 years crafting impactful digital products from Costa Rica.",
      cta_projects: "View Projects",
      cta_contact: "Get in touch",
      based_in_label: "Based in",
      based_in: "Costa Rica",
    },
    about: {
      eyebrow: "About",
      heading: "Who I am",
      bio1: "I'm a Full Stack Software Engineer from Costa Rica, building software that serves people and creates real opportunity — always guided by the same principle:",
      quote: "Do what is right!",
      values: [
        { label: "People-first", desc: "Every line of code should serve a human purpose" },
        { label: "Impact-driven", desc: "Build where the work creates real opportunity" },
        { label: "Craftsmanship", desc: "Excellence through clean, thoughtful engineering" },
      ],
    },
    experience: {
      eyebrow: "Experience",
      heading: "Career timeline",
    },
    skills: {
      eyebrow: "Skills",
      groupLabels: ["Frontend", "Backend", "Tools"],
    },
    projects: {
      eyebrow: "Projects",
      heading: "Things I've built",
      featured: "Featured",
      live: "Live",
      private: "Private",
      items: [
        {
          tagline: "Delivery for Costa Rica's Caribbean coast",
          description:
            "An Uber Eats-like platform for Costa Rica's Caribbean coast — a region where delivery services didn't exist. Fuller created a new local economy, connecting restaurants, drivers, and customers.",
          linkLabel: "Visit fuller.express",
        },
        {
          tagline: "Modernizing the world's data",
          description:
            "A professional-grade migration tool that helps enterprises convert their SQL codebases to Snowflake SQL. Used by companies worldwide to accelerate cloud data transformation at scale.",
          linkLabel: "View docs",
        },
        {
          tagline: "Professional identity, online",
          description:
            "A polished personal website tailored for accountants and professionals. Clean, trustworthy, and conversion-focused — the digital business card for individuals who care about first impressions.",
          linkLabel: null,
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      heading: "Let's connect",
      bio: "Open to interesting projects and conversations. Reach out through any channel below.",
    },
    footer: {
      rights: "All rights reserved.",
      built: "Built with",
      deployed: "Deployed on",
    },
  },

  es: {
    nav: {
      links: [
        { href: "#about", label: "Sobre mí" },
        { href: "#projects", label: "Proyectos" },
        { href: "#experience", label: "Experiencia" },
        { href: "#contact", label: "Contacto" },
      ],
    },
    hero: {
      role: "Ingeniero de Software Full Stack",
      quote: "¡Haz lo correcto!",
      bio: "Construyendo software que crea oportunidades reales para las personas. 4 años creando productos digitales de impacto desde Costa Rica.",
      cta_projects: "Ver proyectos",
      cta_contact: "Contáctame",
      based_in_label: "Ubicado en",
      based_in: "Costa Rica",
    },
    about: {
      eyebrow: "Sobre mí",
      heading: "Quién soy",
      bio1: "Soy un Ingeniero de Software Full Stack de Costa Rica, construyendo software que sirve a las personas y crea oportunidades reales — siempre guiado por el mismo principio:",
      quote: "¡Haz lo correcto!",
      values: [
        { label: "Las personas primero", desc: "Cada línea de código debe tener un propósito humano" },
        { label: "Orientado al impacto", desc: "Construir donde el trabajo crea oportunidades reales" },
        { label: "Excelencia técnica", desc: "Calidad a través de una ingeniería limpia y reflexiva" },
      ],
    },
    experience: {
      eyebrow: "Experiencia",
      heading: "Trayectoria profesional",
    },
    skills: {
      eyebrow: "Habilidades",
      groupLabels: ["Frontend", "Backend", "Herramientas"],
    },
    projects: {
      eyebrow: "Proyectos",
      heading: "Lo que he construido",
      featured: "Destacado",
      live: "En vivo",
      private: "Privado",
      items: [
        {
          tagline: "Delivery para la costa caribeña de Costa Rica",
          description:
            "Plataforma tipo Uber Eats para la costa caribeña de Costa Rica — donde el delivery no existía. Fuller creó una nueva economía local conectando restaurantes, conductores y clientes.",
          linkLabel: "Visitar fuller.express",
        },
        {
          tagline: "Modernizando los datos del mundo",
          description:
            "Una herramienta de migración de nivel profesional que ayuda a empresas a convertir su código SQL a Snowflake SQL. Usada mundialmente para acelerar la transformación de datos en la nube.",
          linkLabel: "Ver documentación",
        },
        {
          tagline: "Identidad profesional, en línea",
          description:
            "Un sitio web personal refinado diseñado para contadores y profesionales. Limpio, confiable y orientado a la conversión — la tarjeta de presentación digital para personas que cuidan su primera impresión.",
          linkLabel: null,
        },
      ],
    },
    contact: {
      eyebrow: "Contacto",
      heading: "Conectemos",
      bio: "Abierto a proyectos interesantes y conversaciones. Escríbeme por cualquier canal.",
    },
    footer: {
      rights: "Todos los derechos reservados.",
      built: "Construido con",
      deployed: "Desplegado en",
    },
  },
} as const;
