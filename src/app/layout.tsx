import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { RootProvider } from '@/components/providers/RootProvider';
import { cn } from '@/lib/utils';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Comfy Wish List',
  description: 'Created by Kyrylo Kumchenko',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body className={cn(inter.className, 'bg-blue-50 dark:bg-black')}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
