
"use client";

import { useState, useEffect } from 'react';
import { Send, Instagram } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/contexts/language-context';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const { translations } = useLanguage();
  const { footer: t } = translations;
  const { resolvedTheme } = useTheme();
  const [logoSrc, setLogoSrc] = useState('/logo.png');

  useEffect(() => {
    setLogoSrc(resolvedTheme === 'dark' ? '/logo2.png' : '/logo.png');
  }, [resolvedTheme]);

  useGSAP(() => {
    gsap.from(".footer-content", {
      scrollTrigger: {
        trigger: ".footer-content",
        start: "top 95%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  const socialLinks = [
    { icon: Send, href: '#', name: 'Telegram' },
    { icon: Instagram, href: 'https://www.instagram.com/nextstep__agency?igsh=Yjc5NTAzc3l5Y2c1&utm_source=qr', name: 'Instagram' },
  ];

  return (
    <footer className="bg-card py-8 border-t">
      <div className="container mx-auto px-4 footer-content">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          <div className="flex items-center gap-2">
            <Image src={logoSrc} alt="Next Step Agency Logo" width={150} height={38} key={logoSrc} />
          </div>
          <div className="text-center text-muted-foreground">
            <p>{t.phone}</p>
          </div>
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
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
