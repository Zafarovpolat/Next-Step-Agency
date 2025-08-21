
"use client";

import { Rocket, Send, Instagram } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const { translations } = useLanguage();
  const { footer: t } = translations;

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
    { icon: Instagram, href: '#', name: 'Instagram' },
  ];

  return (
    <footer className="bg-card py-8 border-t">
      <div className="container mx-auto px-4 footer-content">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Rocket className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-card-foreground">{t.agencyName}</span>
          </div>
          <div className="text-center md:text-left text-muted-foreground">
            <p>{t.address}</p>
            <p>{t.contact}</p>
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
