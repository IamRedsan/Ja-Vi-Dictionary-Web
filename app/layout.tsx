import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';

const roboto = Roboto({ subsets: ['vietnamese'], weight: '400' });

export const metadata: Metadata = {
  title: 'Gaku',
  description: 'Japanese Dictionary',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='vi' suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
