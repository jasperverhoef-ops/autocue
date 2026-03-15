import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'NachoTest - De ultieme nacho-gids van Nederland',
  description:
    'Vind de beste nacho restaurants in Nederland. Ontdek, beoordeel en deel de lekkerste nachos bij jou in de buurt.',
  openGraph: {
    title: 'NachoTest - De ultieme nacho-gids van Nederland',
    description: 'Vind de beste nacho restaurants in Nederland.',
    siteName: 'NachoTest',
    locale: 'nl_NL',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
