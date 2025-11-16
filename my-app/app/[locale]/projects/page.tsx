import { useTranslations } from 'next-intl';
import ImageCarousel from '../../../components/ImageCarousel';

export default function ProjectsPage() {
  const t = useTranslations('projects');
  const projectsData = t.raw('projectsList');
  
  const projects = [
    {
      id: 1,
      slug: 'bds',
      title: projectsData.bds.title,
      description: projectsData.bds.description,
      technologies: projectsData.bds.technologies,
      images: [
        { src: "/images/projects/bds/bds1.jpg", alt: projectsData.bds.images.alt1 },
        { src: "/images/projects/bds/bds2.jpg", alt: projectsData.bds.images.alt2 },
      ],
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      id: 2,
      slug: 'sc',
      title: projectsData.sc.title,
      description: projectsData.sc.description,
      technologies: projectsData.sc.technologies,
      images: [
        { src: "/images/projects/sc/sc0.png", alt: projectsData.sc.images.alt1 },
        { src: "/images/projects/sc/sc1.png", alt: projectsData.sc.images.alt2 },
        { src: "/images/projects/sc/sc2.png", alt: projectsData.sc.images.alt3 },
      ],
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      id: 3,
      slug: 'case',
      title: projectsData.case.title,
      description: projectsData.case.description,
      technologies: projectsData.case.technologies,
      images: [
        { src: "/images/projects/case/case1.png", alt: projectsData.case.images.alt1 },
        { src: "/images/projects/case/case2.png", alt: projectsData.case.images.alt2 },
      ],
      github: "https://github.com",
      demo: "https://demo.com"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">{t('title')}</h1>
        <p className="text-xl text-secondary max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} id={project.slug} className="softCard rounded-lg overflow-hidden transition-all">
            <ImageCarousel 
              images={project.images} 
              projectTitle={project.title}
            />
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-primary mb-2">{project.title}</h3>
              <p className="text-secondary mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-3 py-1 border border-theme text-primary text-sm rounded-full"
                    style={{ backgroundColor: 'var(--color-chip)' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}