import Link from 'next/link';
import {useLocale} from 'next-intl';
import {Button} from '@headlessui/react';
import { styles } from '../../staticStyles/app/page';
import ThemeToggle from '../../components/ThemeToggle';
import {useTranslations} from 'next-intl';


export default function HomePage() {
  const t = useTranslations('homepage');
  const locale = useLocale();
  
  return (
    <div className={styles.container}>
      {/* Theme Toggle */}
      <div className="mb-8 flex justify-end">
        <ThemeToggle />
      </div>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <h1 className={`${styles.heroTitle} text-primary`}>
          {t('hero.greeting')} <span className="text-primary-color">{t('hero.name')}</span>
        </h1>
        <p className={`${styles.heroDescription} text-secondary`}>
          {t('hero.description')}
        </p>
        <div className={styles.heroButtonContainer}>
        <Button
          as={Link}
          href={`/${locale}/projects`}
          className='button-primary'
        >
          {t('hero.primaryButton')}
        </Button>
        <Button
          as={Link}
          href={`/${locale}/contact`}
          className='button-secondary'
        >
          {t('hero.secondaryButton')}
        </Button>
        </div>
      </div>
      

      {/* Features Section */}
      <div className="py-16">
        <h2 className={`${styles.featuresTitle} text-primary`}>{t('features.title')}</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featuresItem}>
            <div className={styles.featuresItemIcon}>
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className={`${styles.featuresItemTitle} text-primary`}>{t('features.frontend.title')}</h3>
            <p className='text-secondary'>
              {t('features.frontend.description')}
            </p>
          </div>
          
          <div className={styles.featuresItem}>
            <div className={styles.featuresItemIcon}>
              <span className="text-2xl">⚙️</span>
            </div>
              <h3 className={`${styles.featuresItemTitle} text-primary`}>{t('features.backend.title')}</h3>
            <p className='text-secondary'>
              {t('features.backend.description')}
            </p>
          </div>
          
          <div className={styles.featuresItem}>
            <div className={styles.featuresItemIcon}>
              <span className="text-2xl">📱</span>
            </div>
                         <h3 className={`${styles.featuresItemTitle} text-primary`}>{t('features.fullstack.title')}</h3>
            <p className='text-secondary'>
              {t('features.fullstack.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Case Study Section */}
      <div className={`${styles.caseStudySection} border-theme`}>
        <div className={styles.caseStudyContainer}>
          <h2 className={`${styles.caseStudyTitle} text-primary`}>
            Case Study: Building This Portfolio
          </h2>
          
          <div className={styles.caseStudyGrid}>
            <div>
              <h3 className={`${styles.caseStudySubtitle} text-primary`}>
                Tech Stack & Architecture
              </h3>
              <ul className={styles.caseStudyList}>
                <li className={styles.caseStudyListItem}>
                  <span className={`${styles.caseStudyBullet} bg-primary`}></span>
                  <span className="text-secondary">
                    <strong className="text-primary">Next.js 15</strong> with App Router for modern React development
                  </span>
                </li>
                <li className={styles.caseStudyListItem}>
                  <span className={`${styles.caseStudyBullet} bg-primary`}></span>
                  <span className="text-secondary">
                    <strong className="text-primary">TypeScript</strong> for type safety and better development experience
                  </span>
                </li>
                <li className={styles.caseStudyListItem}>
                  <span className={`${styles.caseStudyBullet} bg-primary`}></span>
                  <span className="text-secondary">
                    <strong className="text-primary">Tailwind CSS v4</strong> with CSS custom properties for theming
                  </span>
                </li>
                <li className={styles.caseStudyListItem}>
                  <span className={`${styles.caseStudyBullet} bg-primary`}></span>
                  <span className="text-secondary">
                    <strong className="text-primary">SCSS Modules</strong> for organized, component-scoped styling
                  </span>
                </li>
                <li className={styles.caseStudyListItem}>
                  <span className={`${styles.caseStudyBullet} bg-primary`}></span>
                  <span className="text-secondary">
                    <strong className="text-primary">Headless UI</strong> for accessible, unstyled components
                  </span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className={`${styles.caseStudySubtitle} text-primary`}>
                Key Features Implemented
              </h3>
              <div className={styles.caseStudyFeatures}>
                <div className={`${styles.caseStudyFeatureCard} bg-surface`}>
                  <h4 className={`${styles.caseStudyFeatureTitle} text-primary`}>
                    🎨 Dynamic Theme System
                  </h4>
                  <p className={`${styles.caseStudyFeatureDescription} text-secondary`}>
                    Custom theme management with CSS variables, supporting light, dark, and purple themes with SSR-safe implementation.
                  </p>
                </div>
                
                <div className={`${styles.caseStudyFeatureCard} bg-surface`}>
                  <h4 className={`${styles.caseStudyFeatureTitle} text-primary`}>
                    📱 Responsive Design
                  </h4>
                  <p className={`${styles.caseStudyFeatureDescription} text-secondary`}>
                    Mobile-first approach with Tailwind's responsive utilities, ensuring optimal experience across all devices.
                  </p>
                </div>
                
                <div className={`${styles.caseStudyFeatureCard} bg-surface`}>
                  <h4 className={`${styles.caseStudyFeatureTitle} text-primary`}>
                    🏗️ Scalable Architecture
                  </h4>
                  <p className={`${styles.caseStudyFeatureDescription} text-secondary`}>
                    Organized file structure with separated styles, reusable components, and TypeScript for maintainability.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.caseStudyFooter}>
            <p className={`${styles.caseStudyFooterText} text-secondary`}>
              This portfolio showcases modern web development practices and attention to user experience.
            </p>
            <div className={styles.caseStudyFooterButtons}>
              <Button
                as={Link}
                href="https://github.com"
                className="button-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Source Code
              </Button>
              <Button
                as={Link}
                href="/projects"
                className="button-secondary"
              >
                See More Projects
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}