import Link from 'next/link';
import { Rocket } from 'lucide-react';
import { Button } from './ui/button';

const navLinks = [
    { href: '#pricing', label: 'Pricing' },
    { href: '#case-studies', label: 'Case Studies' },
    { href: '#contact', label: 'Contact' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between mx-auto px-4">
        <Link href="/" className="flex items-center gap-2">
          <Rocket className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Next Step Agency</span>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
            </Link>
          ))}
        </nav>
        <Button asChild>
            <Link href="#contact">Get a Free Quote</Link>
        </Button>
      </div>
    </header>
  );
}
