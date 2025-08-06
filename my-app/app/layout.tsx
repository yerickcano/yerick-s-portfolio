import '../styles/global.scss';
import styles from './styles/layout.module.scss';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer/Footer';

export const metadata = {
  title: 'Your Portfolio',
  description: 'A modern portfolio built with Next.js and Tailwind CSS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className={`${styles.container} min-h-screen flex flex-col`}>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
