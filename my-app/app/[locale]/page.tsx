'use client';

import {useLocale} from 'next-intl';
import {useTranslations} from 'next-intl';
import {useState} from 'react';
import SideNavigator from '../../components/SideNavigator/SideNavigator';
import AboutCard from '../../components/Cards/AboutCard';
import ProjectCard from '../../components/Cards/ProjectCard';
import SkillCard from '../../components/Cards/SkillCard';
import ContactCard from '../../components/Cards/ContactCard';

export default function HomePage() {
  const t = useTranslations('homepage');
  const projectsT = useTranslations('projects');
  const skillsT = useTranslations('skills');
  const locale = useLocale();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Get projects data
  const projectsData = projectsT.raw('projectsList');
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
    }
  ];

  // Get skills data
  const skillCategories = [
    {
      title: skillsT('categories.frontend'),
      skills: [
        { name: "React", level: 85 },
        { name: "Next.js", level: 75 },
        { name: "TypeScript", level: 80 },
        { name: "Tailwind CSS", level: 70 },
        { name: "JavaScript", level: 75 },
        { name: "HTML5/CSS3", level: 80 }
      ]
    },
    {
      title: skillsT('categories.backend'),
      skills: [
        { name: "Node.js", level: 70 },
        { name: "Express.js", level: 35 },
        { name: "PostgreSQL", level: 50 },
        { name: "MongoDB", level: 50 },
        { name: "REST APIs", level: 50 },
        { name: "Snowflake", level: 65 }
      ]
    },
    {
      title: skillsT('categories.tools'),
      skills: [
        { name: "Git", level: 90 },
        { name: "Docker", level: 70 },
        { name: "AWS", level: 25 },
        { name: "Cursor", level: 60 },
        { name: "Figma", level: 25 },
        { name: "VS Code", level: 80 }
      ]
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Mobile Breadcrumb Button */}
      <div className="lg:hidden fixed top-32 left-4 z-40">
        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="glass-effect rounded-lg p-3 shadow-lg"
          aria-label="Toggle navigation"
        >
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileNavOpen && (
        <>
          <div 
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
            onClick={() => setIsMobileNavOpen(false)}
          />
          <div className="lg:hidden fixed top-40 left-4 z-40 w-64">
            <SideNavigator onLinkClick={() => setIsMobileNavOpen(false)} />
          </div>
        </>
      )}

      {/* Main Content - 5 Column Layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
          {/* Column 1: Side Navigator (Desktop) */}
          <div className="hidden lg:block">
            <SideNavigator />
          </div>

          {/* Column 2: About Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary mb-4 sticky top-28 glass-effect rounded-lg p-3">
              About
            </h2>
            <AboutCard />
            {/* Add more about cards here as needed */}
          </div>

          {/* Column 3: Projects Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary mb-4 sticky top-28 glass-effect rounded-lg p-3">
              Projects
            </h2>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Column 4: Skills Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary mb-4 sticky top-28 glass-effect rounded-lg p-3">
              Skills
            </h2>
            {skillCategories.map((category, index) => (
              <SkillCard key={index} category={category} />
            ))}
          </div>

          {/* Column 5: Contact Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary mb-4 sticky top-28 glass-effect rounded-lg p-3">
              Contact
            </h2>
            <ContactCard type="email" />
            <ContactCard type="linkedin" />
            <ContactCard type="github" />
            <ContactCard type="availability" />
          </div>
        </div>
      </div>
    </div>
  );
}