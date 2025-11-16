import { useTranslations } from 'next-intl';

export default function SkillsPage() {
  const t = useTranslations('skills');
  
  const skillCategories = [
    {
      title: t('categories.frontend'),
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
      title: t('categories.backend'),
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
      title: t('categories.tools'),
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
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">{t('title')}</h1>
        <p className="text-xl text-secondary max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="softCard p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-primary mb-6 text-center">
              {category.title}
            </h2>
            
            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-primary">{skill.name}</span>
                    <span className="text-sm text-secondary">{skill.level}%</span>
                  </div>
                  <div className="w-full border border-theme rounded-full h-2" style={{ backgroundColor: 'var(--color-border)' }}>
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Skills Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center text-primary mb-8">
          {t('otherSkills')}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {t.raw('additionalSkills').map((skill: string, index: number) => (
            <div
              key={index}
              className="softCard text-center py-3 px-4 rounded-lg text-sm font-medium text-primary transition-all"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      {/* Learning Section */}
      <div className="mt-16 softCard p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-center text-primary mb-4">
          {t('currentlyLearning')}
        </h2>
        <p className="text-center text-secondary mb-6">
          {t('learningDescription')}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {t.raw('learningTech').map((tech: string, index: number) => (
            <span
              key={index}
              className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}