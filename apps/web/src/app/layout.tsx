import type { Metadata } from 'next';
import { Bodoni_Moda, Jost } from 'next/font/google';
import type { ReactNode } from 'react';
import { SiteFooter } from '@/shared/layout/site-footer';
import { SiteHeader } from '@/shared/layout/site-header';
import './globals.css';

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-bodoni',
});
const jost = Jost({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-jost' });

export const metadata: Metadata = {
  title: {
    default: 'Celebre Wedding & Festas',
    template: '%s | Celebre Wedding & Festas',
  },
  description:
    'Encontre profissionais para o seu casamento ou festa de debutante, inscreva-se nos eventos e confirme sua presença em um só lugar.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${bodoni.variable} ${jost.variable}`}>
      <body className="flex min-h-screen flex-col bg-cream font-sans text-ink antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
