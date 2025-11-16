import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">{t('title')}</h1>
        <p className="text-xl text-secondary max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-6">{t('myStory')}</h2>
          <div className="space-y-4 text-secondary">
            <p>{t('story.paragraph1')}</p>
            <p>{t('story.paragraph2')}</p>
            <p>{t('story.paragraph3')}</p>
          </div>
        </div>

        <div className="softCard p-8 rounded-lg">
          <h3 className="text-xl font-semibold text-primary mb-4">{t('quickFacts')}</h3>
          <ul className="space-y-3 text-secondary mb-6">
            {t.raw('facts').map((fact: string, index: number) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                {fact}
              </li>
            ))}
          </ul>
          
          {/* CV Download Button */}
          <a
            href="/cv/Yerick_Cano_CV.pdf"
            download="Yerick_Cano_CV.pdf"
            className="inline-flex items-center justify-center w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-hover transition-colors group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {t('downloadCV')}
          </a>
        </div>
      </div>
    </div>
  );
}
