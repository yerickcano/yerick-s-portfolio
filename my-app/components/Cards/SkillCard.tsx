import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

interface SkillCardProps {
  category: {
    title: string;
    skills: Array<{ name: string; level: number }>;
  };
}

export default function SkillCard({ category }: SkillCardProps) {
  const locale = useLocale();
  const t = useTranslations('skills');

  return (
    <div className="glass-effect rounded-lg p-4 mb-4">
      <h4 className="text-lg font-semibold text-primary mb-3">{category.title}</h4>
      <div className="space-y-2 mb-3">
        {category.skills.slice(0, 3).map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-primary">{skill.name}</span>
              <span className="text-xs text-secondary">{skill.level}%</span>
            </div>
            <div className="w-full border border-theme rounded-full h-1.5" style={{ backgroundColor: 'var(--color-border)' }}>
              <div
                className="bg-primary h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <Link 
        href={`/${locale}/skills`}
        className="text-primary hover:text-primary-color text-xs font-medium inline-flex items-center gap-1"
      >
        View all →
      </Link>
    </div>
  );
}

