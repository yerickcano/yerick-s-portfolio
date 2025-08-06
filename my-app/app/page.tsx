import Link from 'next/link';
import {Button} from '@headlessui/react';
import { styles } from './staticStyles/app/page';
import ThemeToggle from '../components/ThemeToggle';


export default function HomePage() {
  return (
    <div className={styles.container}>
      {/* Theme Toggle */}
      <div className="mb-8 flex justify-end">
        <ThemeToggle />
      </div>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle} style={{ color: 'var(--color-text-primary)' }}>
          Hi, I'm <span style={{ color: 'var(--color-primary)' }}>Your Name</span>
        </h1>
        <p className={styles.heroDescription} style={{ color: 'var(--color-text-secondary)' }}>
          A passionate full-stack developer creating amazing web experiences with modern technologies.
        </p>
        <div className={styles.heroButtonContainer}>
        <Button
          as={Link}
          href="/projects"
          className='button-primary'
        >
          View My Work
        </Button>
          <Link
            href="/contact"
            className='button-secondary'
          >
            Get In Touch
          </Link>
        </div>
      </div>
      

      {/* Features Section */}
      <div className="py-16">
        <h2 className={styles.featuresTitle} style={{ color: 'var(--color-text-primary)' }}>What I Do</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featuresItem}>
            <div className={styles.featuresItemIcon}>
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className={styles.featuresItemTitle} style={{ color: 'var(--color-text-primary)' }}>Frontend Development</h3>
            <p className='text-gray-600'>
              Creating beautiful, responsive user interfaces with React, Next.js, and modern CSS frameworks.
            </p>
          </div>
          
          <div className={styles.featuresItem}>
            <div className={styles.featuresItemIcon}>
              <span className="text-2xl">⚙️</span>
            </div>
              <h3 className={styles.featuresItemTitle} style={{ color: 'var(--color-text-primary)' }}>Backend Development</h3>
            <p className='text-gray-600'>
              Building robust APIs and server-side applications with Node.js, databases, and cloud services.
            </p>
          </div>
          
          <div className={styles.featuresItem}>
            <div className={styles.featuresItemIcon}>
              <span className="text-2xl">📱</span>
            </div>
                         <h3 className={styles.featuresItemTitle} style={{ color: 'var(--color-text-primary)' }}>Full-Stack Solutions</h3>
            <p className='text-gray-600'>
              Delivering complete web applications from concept to deployment with modern best practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}