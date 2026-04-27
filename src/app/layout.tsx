import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Provider from '@/common/components/Provider';
import ClientWrapper from '@/common/components/ClientWrapper';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'KanFlow — Kanban Board',
  description: 'A sleek, modern kanban board for managing your tasks efficiently.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="h-full flex flex-col overflow-hidden antialiased">
        <Provider>
          <ClientWrapper>{children}</ClientWrapper>
        </Provider>
      </body>
    </html>
  );
}
