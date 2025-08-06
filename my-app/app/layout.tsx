import '../styles/global.scss';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer/Footer';
import { styles } from './staticStyles/app/layout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className={styles.container}>
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
