import Link from 'next/link';
import {useLocale} from 'next-intl';
import {Button} from '@headlessui/react';
import { styles } from '../../staticStyles/app/page';

import {useTranslations} from 'next-intl';


export default function HomePage() {
  const t = useTranslations('homepage');
  const locale = useLocale();
  
  return (
    <div className={styles.container}>
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
              <span className="text-2xl">💻</span>
            </div>
            <h3 className={`${styles.featuresItemTitle} text-primary`}>{t('features.frontend.title')}</h3>
            <p className='text-secondary'>
              {t('features.frontend.description')}
            </p>
          </div>
          
          <div className={styles.featuresItem}>
            <div className={styles.featuresItemIcon}>
              <span className="text-2xl">🤖</span>
            </div>
              <h3 className={`${styles.featuresItemTitle} text-primary`}>{t('features.ai.title')}</h3>
            <p className='text-secondary'>
              {t('features.ai.description')}
            </p>
          </div>
          
          <div className={styles.featuresItem}>
            <div className={styles.featuresItemIcon}>
              <span className="text-2xl">🏗️</span>
            </div>
                         <h3 className={`${styles.featuresItemTitle} text-primary`}>{t('features.engineering.title')}</h3>
            <p className='text-secondary'>
              {t('features.engineering.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Case Study Section */}
      <div className={`${styles.caseStudySection} border-theme`}>
        <div className={styles.caseStudyContainer}>
          <h2 className={`${styles.caseStudyTitle} text-primary`}>
            {t('caseStudy.title')}
          </h2>
          
          <div className={styles.caseStudyGrid}>
            <div>
              <h3 className={`${styles.caseStudySubtitle} text-primary`}>
                {t('caseStudy.techStack.title')}
              </h3>
              <ul className={styles.caseStudyList}>
                <li className={styles.caseStudyListItem}>
                  <span className={`${styles.caseStudyBullet} bg-primary`}></span>
                  <span className="text-secondary">
                    {t('caseStudy.techStack.items.nextjs')}
                  </span>
                </li>
                <li className={styles.caseStudyListItem}>
                  <span className={`${styles.caseStudyBullet} bg-primary`}></span>
                  <span className="text-secondary">
                    {t('caseStudy.techStack.items.typescript')}
                  </span>
                </li>
                <li className={styles.caseStudyListItem}>
                  <span className={`${styles.caseStudyBullet} bg-primary`}></span>
                  <span className="text-secondary">
                    {t('caseStudy.techStack.items.tailwind')}
                  </span>
                </li>
                <li className={styles.caseStudyListItem}>
                  <span className={`${styles.caseStudyBullet} bg-primary`}></span>
                  <span className="text-secondary">
                    {t('caseStudy.techStack.items.scss')}
                  </span>
                </li>
                <li className={styles.caseStudyListItem}>
                  <span className={`${styles.caseStudyBullet} bg-primary`}></span>
                  <span className="text-secondary">
                    {t('caseStudy.techStack.items.headlessui')}
                  </span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className={`${styles.caseStudySubtitle} text-primary`}>
                {t('caseStudy.features.title')}
              </h3>
              <div className={styles.caseStudyFeatures}>
                <div className={`${styles.caseStudyFeatureCard} bg-surface`}>
                  <h4 className={`${styles.caseStudyFeatureTitle} text-primary`}>
                    {t('caseStudy.features.themeSystem.title')}
                  </h4>
                  <p className={`${styles.caseStudyFeatureDescription} text-secondary`}>
                    {t('caseStudy.features.themeSystem.description')}
                  </p>
                </div>
                
                <div className={`${styles.caseStudyFeatureCard} bg-surface`}>
                  <h4 className={`${styles.caseStudyFeatureTitle} text-primary`}>
                    {t('caseStudy.features.responsive.title')}
                  </h4>
                  <p className={`${styles.caseStudyFeatureDescription} text-secondary`}>
                    {t('caseStudy.features.responsive.description')}
                  </p>
                </div>
                
                <div className={`${styles.caseStudyFeatureCard} bg-surface`}>
                  <h4 className={`${styles.caseStudyFeatureTitle} text-primary`}>
                    {t('caseStudy.features.architecture.title')}
                  </h4>
                  <p className={`${styles.caseStudyFeatureDescription} text-secondary`}>
                    {t('caseStudy.features.architecture.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.caseStudyFooter}>
            <p className={`${styles.caseStudyFooterText} text-secondary`}>
              {t('caseStudy.footer.description')}
            </p>
            <div className={styles.caseStudyFooterButtons}>
              <Button
                as={Link}
                href="https://github.com/yerickcano/yerick-s-portfolio"
                className="button-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('caseStudy.footer.sourceButton')}
              </Button>
              <Button
                as={Link}
                href={`/${locale}/projects`}
                className="button-secondary"
              >
                {t('caseStudy.footer.projectsButton')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}