import Link from 'next/link';
import { Rocket } from 'lucide-react';
import { Button } from './ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Rocket className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Next Step Agency</span>
        </Link>
        <nav className="flex items-center gap-4">
            <Button asChild>
                <Link href="#contact">Get a Free Quote</Link>
            </Button>
        </nav>
      </div>
    </header>
  );
}
