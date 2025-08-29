
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Moon, Sun, Languages, Menu } from 'lucide-react';
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
import { useScrollSmoother } from '@/contexts/gsap-provider';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Header() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const { setLanguage, translations } = useLanguage();
  const { header: t } = translations;
  const smoother = useScrollSmoother();
  const pathname = usePathname();
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoSrc, setLogoSrc] = useState('/logo.png');

  useEffect(() => {
    setLogoSrc(resolvedTheme === 'dark' ? '/logo2.png' : '/logo.png');
  }, [resolvedTheme]);
  
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
  
    const scrollToAction = () => {
      const targetElement = document.querySelector(targetId);
      if (!targetElement) {
        console.warn(`Element with ID ${targetId} not found`);
        return;
      }
  
      if (smoother) {
        smoother.scrollTo(targetElement, true, 'top top');
      } else {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
  
    // Если меню открыто, закрываем его и ждем завершения анимации
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      setTimeout(() => {
        // Если не на главной странице, выполняем навигацию и скролл
        if (pathname !== '/') {
          router.push('/');
          setTimeout(scrollToAction, 500); // Задержка для завершения навигации
        } else {
          scrollToAction(); // Прямой скролл, если уже на главной
        }
      }, 400); // Увеличенная задержка для завершения анимации Sheet
    } else {
      // Если меню закрыто, обрабатываем навигацию и скролл
      if (pathname !== '/') {
        router.push('/');
        setTimeout(scrollToAction, 500); // Задержка для завершения навигации
      } else {
        scrollToAction(); // Прямой скролл, если уже на главной
      }
    }
  };

  const navLinks = [
    { target: '#pricing', label: t.nav.pricing },
    { target: '#case-studies', label: t.nav.caseStudies },
    { target: '#contact', label: t.nav.contact },
  ];

  const linkClassName = "px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary relative group no-underline";

  const QuoteButton = () => (
    <Button asChild>
      <a href="#contact" onClick={(e) => handleScroll(e, "#contact")}>{t.getQuote}</a>
    </Button>
  );

  const MobileQuoteButton = () => (
    <Button className='w-full' asChild>
      <a href="#contact" onClick={(e) => handleScroll(e, "#contact")}>{t.getQuote}</a>
    </Button>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/90 backdrop-blur-sm">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between mx-auto px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logoSrc} alt="Next Step Agency Logo" width={120} height={30} key={logoSrc} priority />
        </Link>
        
        <nav className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
             <a key={link.target} href={link.target} onClick={(e) => handleScroll(e, link.target)} className={cn(linkClassName, 'inline-block')}>
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
          <QuoteButton />
        </div>

        <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent 
                    side="right" 
                    className="w-[300px] sm:w-[340px] flex flex-col p-0"
                    style={{ 
                      willChange: 'transform',
                      transform: 'translate3d(0, 0, 0)' // Принудительное включение аппаратного ускорения
                    }}
                >
                    <div className="flex items-center gap-2 p-4 border-b">
                         <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                            <Image src={logoSrc} alt="Next Step Agency Logo" width={120} height={30} key={logoSrc + 'mobile'} priority />
                         </Link>
                    </div>
                    <div className='flex flex-col gap-4 p-4'>
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                               <a
                                  key={link.target}
                                  href={link.target}
                                  className="text-lg font-medium text-foreground text-left justify-start p-2 rounded-md hover:bg-accent"
                                  onClick={(e) => handleScroll(e, link.target)}
                                >
                                   {link.label}
                                </a>
                            ))}
                        </nav>
                        <div className="mt-6 space-y-4">
                            <MobileQuoteButton />
                            <div className="flex justify-around pt-6 border-t">
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
                    </div>
                </SheetContent>
            </Sheet>
        </div>

      </div>
    </header>
  );
}
