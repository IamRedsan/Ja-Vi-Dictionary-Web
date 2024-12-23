import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { AuthProvider } from '@/context/auth-context';
import { Toaster } from '@/components/ui/toaster';
import { CompositionProvider } from '@/context/composition-context';
import { WordProvider } from '@/context/word-context';

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
          <AuthProvider>
            <CompositionProvider>
              <WordProvider>{children}</WordProvider>
            </CompositionProvider>
          </AuthProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
