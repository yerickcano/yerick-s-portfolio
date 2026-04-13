export type Lang = "en" | "es";

export const t = {
  en: {
    nav: {
      links: [
        { href: "#about", label: "About" },
        { href: "#experience", label: "Experience" },
        { href: "#projects", label: "Projects" },
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
      bio1: "I'm a Full Stack Software Engineer from Costa Rica with 4 years of experience turning complex problems into tools that genuinely help people. I've worked at the intersection of data migration, delivery logistics, and professional services — always aiming for the same north star:",
      quote: "Do what is right!",
      bio2: "From building the first food delivery platform for Costa Rica's Caribbean coast, to helping enterprises modernize petabytes of data at Snowflake — I look for the projects where the work creates real opportunity.",
      values: [
        { label: "People-first", desc: "Every line of code should serve a human purpose" },
        { label: "Impact-driven", desc: "Build where the work creates real opportunity" },
        { label: "Craftsmanship", desc: "Excellence through clean, thoughtful engineering" },
      ],
    },
    experience: {
      eyebrow: "Experience",
      heading: "Career timeline",
      descriptions: [
        "Developed software that helps users manage the migration of their SQL code to Snowflake SQL. Contributed to the SnowConvert toolchain used by enterprises worldwide to accelerate cloud data transformation.",
        "Developed tooling to help users migrate SQL codebases to Snowflake SQL. Transitioned into Snowflake as part of the team acquisition, carrying the same product forward.",
        "Started my professional journey contributing to SQL migration tooling, learning modern engineering practices in a fast-moving product environment.",
      ],
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
            "An Uber Eats-like platform built from the ground up for a region where delivery services simply didn't exist. Fuller created a new local economy — connecting restaurants, drivers, and customers in a community that had never had access to on-demand delivery. A people's choice, built with purpose.",
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
        { href: "#experience", label: "Experiencia" },
        { href: "#projects", label: "Proyectos" },
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
      bio1: "Soy un Ingeniero de Software Full Stack de Costa Rica con 4 años de experiencia convirtiendo problemas complejos en herramientas que realmente ayudan a las personas. He trabajado en la intersección de la migración de datos, la logística de entregas y los servicios profesionales — siempre apuntando al mismo norte:",
      quote: "¡Haz lo correcto!",
      bio2: "Desde construir la primera plataforma de delivery para la costa caribeña de Costa Rica, hasta ayudar a empresas a modernizar petabytes de datos en Snowflake — busco los proyectos donde el trabajo crea oportunidades reales.",
      values: [
        { label: "Las personas primero", desc: "Cada línea de código debe tener un propósito humano" },
        { label: "Orientado al impacto", desc: "Construir donde el trabajo crea oportunidades reales" },
        { label: "Excelencia técnica", desc: "Calidad a través de una ingeniería limpia y reflexiva" },
      ],
    },
    experience: {
      eyebrow: "Experiencia",
      heading: "Trayectoria profesional",
      descriptions: [
        "Desarrollé software que ayuda a los usuarios a gestionar la migración de su código SQL a Snowflake SQL. Contribuí al conjunto de herramientas SnowConvert utilizado por empresas de todo el mundo para acelerar la transformación de datos en la nube.",
        "Desarrollé herramientas para ayudar a los usuarios a migrar bases de código SQL a Snowflake SQL. Me integré a Snowflake como parte de la adquisición del equipo, continuando el mismo producto.",
        "Inicié mi carrera profesional contribuyendo a herramientas de migración SQL, aprendiendo prácticas modernas de ingeniería en un entorno de producto ágil.",
      ],
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
            "Una plataforma similar a Uber Eats construida desde cero para una región donde los servicios de entrega simplemente no existían. Fuller creó una nueva economía local — conectando restaurantes, conductores y clientes en una comunidad que nunca había tenido acceso al delivery bajo demanda. Una opción del pueblo, construida con propósito.",
          linkLabel: "Visitar fuller.express",
        },
        {
          tagline: "Modernizando los datos del mundo",
          description:
            "Una herramienta de migración de nivel profesional que ayuda a las empresas a convertir sus bases de código SQL a Snowflake SQL. Utilizada por empresas de todo el mundo para acelerar la transformación de datos en la nube a gran escala.",
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
