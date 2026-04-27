export type Demo = {
  title: string;
  description: { en: string; es: string };
  tags: string[];
  url: string;
  thumbnail?: string;
};

export const demos: Demo[] = [
  {
    title: "Clínica Dra. Mora",
    description: {
      en: "Professional page for a general practitioner — services, location, and one-tap WhatsApp contact.",
      es: "Página profesional para médica general — servicios, ubicación y contacto por WhatsApp con un toque.",
    },
    tags: ["Médico", "Profesional"],
    url: "#",
  },
  {
    title: "Soda Don Carlos",
    description: {
      en: "Menu and contact page for a local Costa Rican soda — looks great on any phone.",
      es: "Menú y contacto para una soda local — se ve bien en cualquier celular.",
    },
    tags: ["Restaurante", "Negocio local"],
    url: "#",
  },
  {
    title: "Contaduría Vargas & Asoc.",
    description: {
      en: "Credibility-focused site for an accounting firm — services, credentials, and easy appointment scheduling.",
      es: "Sitio enfocado en credibilidad para firma contable — servicios, credenciales y citas fáciles.",
    },
    tags: ["Contador", "Profesional"],
    url: "#",
  },
];
