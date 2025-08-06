import Link from 'next/link';
import { styles } from './staticStyles/app/page';

export default function HomePage() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>
          Hi, I'm <span className="text-blue-600">Your Name</span>
        </h1>
        <p className={styles.heroDescription}>
          A passionate full-stack developer creating amazing web experiences with modern technologies.
        </p>
        <div className={styles.heroButtonContainer}>
          <Link
            href="/projects"
            className={styles.heroButton}
          >
            View My Work
          </Link>
          <Link
            href="/contact"
            className={styles.heroButtonSecondary}
          >
            Get In Touch
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <h2 className={styles.featuresTitle}>What I Do</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featuresItem}>
            <div className={styles.featuresItemIcon}>
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className={styles.featuresItemTitle}>Frontend Development</h3>
            <p className='text-gray-600'>
              Creating beautiful, responsive user interfaces with React, Next.js, and modern CSS frameworks.
            </p>
          </div>
          
          <div className={styles.featuresItem}>
            <div className={styles.featuresItemIcon}>
              <span className="text-2xl">⚙️</span>
            </div>
              <h3 className={styles.featuresItemTitle}>Backend Development</h3>
            <p className='text-gray-600'>
              Building robust APIs and server-side applications with Node.js, databases, and cloud services.
            </p>
          </div>
          
          <div className={styles.featuresItem}>
            <div className={styles.featuresItemIcon}>
              <span className="text-2xl">📱</span>
            </div>
            <h3 className={styles.featuresItemTitle}>Full-Stack Solutions</h3>
            <p className='text-gray-600'>
              Delivering complete web applications from concept to deployment with modern best practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}