import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/contexts/language-context';
import { GSAPProvider } from '@/contexts/gsap-provider';

export const metadata: Metadata = {
  title: 'Next Step Agency',
  description: 'Driving Growth Through Technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <GSAPProvider>
              <div id="smooth-wrapper">
                <div id="smooth-content">
                  {children}
                  <Toaster />
                </div>
              </div>
            </GSAPProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
