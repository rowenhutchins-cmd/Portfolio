import '@/styles/tailwind.css';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';
import { Plus_Jakarta_Sans } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import ToasterContext from '../context/ToastContext';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={plusJakarta.className}>
      <body>
        <div className='isolate'>
          <NextTopLoader
            color='#5ed29c'
            crawlSpeed={300}
            showSpinner={false}
            shadow='none'
          />

          <Header />
          {children}
          <Footer />

          <ToasterContext />
        </div>

        <ScrollToTop />
      </body>
    </html>
  );
}
