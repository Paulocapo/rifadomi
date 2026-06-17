import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Rifa Benéfica – Sorteo Cordero 🐑',
  description:
    'Participá en nuestra rifa benéfica. Elegí tu número, hacé la transferencia y esperá el sorteo del cordero. ¡Solo 100 números disponibles!',
  keywords: ['rifa', 'rifa benéfica', 'sorteo', 'cordero', 'números'],
  openGraph: {
    title: 'Rifa Benéfica – Sorteo Cordero 🐑',
    description: '¡Participá! 100 números disponibles para ganar un cordero.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={outfit.variable}>
      <body className="font-outfit antialiased">{children}</body>
    </html>
  );
}
