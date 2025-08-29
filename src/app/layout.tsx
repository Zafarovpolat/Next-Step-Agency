
"use client";

import { useState, useEffect } from 'react';
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/contexts/language-context';
import { GSAPProvider } from '@/contexts/gsap-provider';
import Preloader from '@/components/preloader';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // This effect ensures we only trigger the loading sequence once on the client
    // The onComplete callback in the Preloader will set the isLoaded state.
  }, []);


  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
        <title>Next Step Agency</title>
        <meta name="description" content="Driving Growth Through Technology" />
      </head>
      <body className="font-body antialiased">
        <Preloader onComplete={() => setIsLoaded(true)} />
        <div style={{ visibility: isLoaded ? 'visible' : 'hidden' }}>
            <LanguageProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <GSAPProvider>
                  {children}
                </GSAPProvider>
                <Toaster />
              </ThemeProvider>
            </LanguageProvider>
        </div>
      </body>
    </html>
  );
}
