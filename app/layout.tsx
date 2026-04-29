// Root-Layout mit Fonts und Metadata

import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KI-Banner-Generator | Bachelor Thesis BFH',
  description:
    'Generiert KI-gestützte Werbebanner basierend auf demographischen Angaben. Bachelor-Thesis Berner Fachhochschule.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased bg-white text-neutral-900">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
