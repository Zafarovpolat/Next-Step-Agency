
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Rocket, Moon, Sun, Languages, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useLanguage } from '@/contexts/language-context';
import { useScrollSmoother } from '@/contexts/gsap-provider';

export default function Header() {
  const { setTheme, theme } = useTheme();
  const { setLanguage, translations } = useLanguage();
  const { header: t } = translations;
  const smoother = useScrollSmoother();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    if (smoother) {
        smoother.scrollTo(target, true);
    }
  }

  const handleMobileLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    handleScroll(e, target);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '#pricing', label: t.nav.pricing },
    { href: '#case-studies', label: t.nav.caseStudies },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between mx-auto px-4">
        <Link href="/" className="flex items-center gap-2">
          <Rocket className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">{t.agencyName}</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Languages className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('ru')}>
                Русский
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('uz')}>
                O'zbek
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button asChild>
              <a href="#contact" onClick={(e) => handleScroll(e, "#contact")}>{t.getQuote}</a>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[340px] flex flex-col p-0">
                    <div className="flex items-center gap-2 p-4 border-b">
                         <Rocket className="h-6 w-6 text-primary" />
                         <span className="font-bold text-lg">{t.agencyName}</span>
                    </div>
                    <nav className="flex flex-col gap-4 p-4 flex-grow">
                        {navLinks.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              onClick={(e) => handleMobileLinkClick(e, link.href)}
                              className="text-lg font-medium text-foreground"
                            >
                              {link.label}
                            </a>
                        ))}
                    </nav>
                    <div className="p-4 border-t space-y-4">
                        <Button asChild className='w-full'>
                            <a href="#contact" onClick={(e) => handleMobileLinkClick(e, "#contact")}>{t.getQuote}</a>
                        </Button>
                        <div className="flex justify-around">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Languages className="h-[1.2rem] w-[1.2rem]" />
                                    <span className="sr-only">Change language</span>
                                </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setLanguage('en')}>
                                    English
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setLanguage('ru')}>
                                    Русский
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setLanguage('uz')}>
                                    O'zbek
                                </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>

      </div>
    </header>
  );
}
