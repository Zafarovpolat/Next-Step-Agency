
"use client";

import { useState, useEffect } from 'react';
import { Send, Instagram, Phone } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/contexts/language-context';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const { translations } = useLanguage();
  const { footer: t } = translations;
  const { resolvedTheme } = useTheme();
  const [logoSrc, setLogoSrc] = useState('/logo.png');

  useEffect(() => {
    setLogoSrc(resolvedTheme === 'dark' ? '/logo2.png' : '/logo.png');
  }, [resolvedTheme]);

  const socialLinks = [
    { icon: Phone, href: `tel:${t.phone.replace(/\s/g, '')}`, name: 'Phone' },
    { icon: Send, href: '#', name: 'Telegram' },
    { icon: Instagram, href: 'https://www.instagram.com/nextstep__agency?igsh=Yjc5NTAzc3l5Y2c1&utm_source=qr', name: 'Instagram' },
  ];

  return (
    <footer className="bg-card py-8 border-t">
      <div className="container mx-auto px-4 footer-content">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          <div className="flex items-center gap-2">
            <Image src={logoSrc} alt="Next Step Agency Logo" width={150} height={38} key={logoSrc} loading="lazy" />
          </div>
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.name === 'Phone' ? '_self' : '_blank'}
                rel="noopener noreferrer"
                aria-label={link.name}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:[filter:drop-shadow(0_0_3px_hsl(var(--primary)))]"
              >
                <link.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} {t.copyright}</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary transition-colors">{t.privacyPolicy}</Link>
            <Link href="#" className="hover:text-primary transition-colors">{t.termsOfService}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
