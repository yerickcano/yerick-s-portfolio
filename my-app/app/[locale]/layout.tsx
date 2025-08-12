import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import Navbar from '../../components/Header/Navbar';
import Footer from '../../components/Footer/Footer';
import { styles } from '../../staticStyles/app/layout';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className={styles.container}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}