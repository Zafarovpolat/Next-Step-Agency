
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Rocket, Moon, Sun, Languages, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useLanguage } from '@/contexts/language-context';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import LeadCaptureCard from './lead-capture-card';
import { useScrollSmoother } from '@/contexts/gsap-provider';

export default function Header() {
  const { setTheme, theme } = useTheme();
  const { setLanguage, translations } = useLanguage();
  const { header: t } = translations;
  const smoother = useScrollSmoother();
  const pathname = usePathname();
  const router = useRouter();
  const isMainPage = pathname === '/';

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleScroll = (target: string) => {
    if (isMainPage) {
      smoother?.scrollTo(target, true);
    } else {
      router.push(target); // Next.js will navigate to home and scroll
    }
  };

  const handleMobileScroll = (target: string) => {
    setIsMobileMenuOpen(false);
    // Use a short delay to allow the menu to start closing before scroll/navigation
    setTimeout(() => {
      handleScroll(target);
    }, 150);
  }

  const navLinks = [
    { href: '/#pricing', label: t.nav.pricing },
    { href: '/#case-studies', label: t.nav.caseStudies },
    { href: '/#contact', label: t.nav.contact },
  ];

  const QuoteButton = () => {
    return (
      <Button onClick={() => handleScroll('/#contact')}>
        {t.getQuote}
      </Button>
    );
  }

  const MobileQuoteButton = () => {
    return (
        <Dialog onOpenChange={(open) => !open && setIsMobileMenuOpen(false)}>
            <DialogTrigger asChild>
                <Button className='w-full' onClick={() => {
                  if (isMainPage) {
                    setIsMobileMenuOpen(false);
                    smoother?.scrollTo("#contact", true);
                  }
                  // For non-main page, DialogTrigger handles opening the modal.
                  // No need to explicitly close menu, onOpenChange does it.
                }}>
                    {t.getQuote}
                </Button>
            </DialogTrigger>
            {!isMainPage && (
              <DialogContent className="p-0 border-none bg-transparent max-w-2xl">
                  <LeadCaptureCard showHeader={true}/>
              </DialogContent>
            )}
        </Dialog>
    )
  }

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
             <button
              key={link.href}
              onClick={() => handleScroll(link.href)}
              className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
            </button>
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
          <QuoteButton />
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
                           <button
                              key={link.href}
                              onClick={() => handleMobileScroll(link.href)}
                              className="text-lg font-medium text-foreground text-left"
                            >
                              {link.label}
                            </button>
                        ))}
                    </nav>
                    <div className="p-4 border-t space-y-4">
                        <MobileQuoteButton />
                        <div className="flex justify-around">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Languages className="h-[1.2rem] w-[1.2rem]" />
                                    <span className="sr-only">Change language</span>
                                </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => { setLanguage('en'); setIsMobileMenuOpen(false); }}>
                                    English
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => { setLanguage('ru'); setIsMobileMenuOpen(false); }}>
                                    Русский
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => { setLanguage('uz'); setIsMobileMenuOpen(false); }}>
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
