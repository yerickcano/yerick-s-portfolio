import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

interface ProjectCardProps {
  project: {
    id: number;
    slug: string;
    title: string;
    description: string;
    technologies: string[];
    images: Array<{ src: string; alt: string }>;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const locale = useLocale();

  return (
    <Link href={`/${locale}/projects#${project.slug}`}>
      <div className="glass-effect rounded-lg overflow-hidden mb-4 hover:shadow-lg transition-all cursor-pointer group">
        {project.images[0] && (
          <div className="relative w-full h-32 overflow-hidden">
            <Image
              src={project.images[0].src}
              alt={project.images[0].alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 20vw, 20vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-4">
          <h4 className="text-lg font-semibold text-primary mb-2">{project.title}</h4>
          <p className="text-secondary text-xs mb-3 line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs border border-theme text-secondary rounded"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 text-xs text-secondary">+{project.technologies.length - 3}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

