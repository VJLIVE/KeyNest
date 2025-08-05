'use client';

import { Menu, Shield } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { useSession } from 'next-auth/react';

interface SiteHeaderProps {
  showGetStarted?: boolean;
}

export function SiteHeader({ showGetStarted = false }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAuthenticated = status === 'authenticated';

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-background/80 backdrop-blur-md' : 'bg-transparent'
      )}
    >
      <div className="container flex h-20 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-8 w-8 bg-primary/90 flex items-center justify-center rounded-md">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold font-headline">Keynest</span>
        </Link>
        
        {showGetStarted && (
          <>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground text-white">
              <Link href="#" className="hover:text-foreground transition-colors">Features</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Docs</Link>

              {!isAuthenticated && (
                <Link href="/login" className="hover:text-foreground transition-colors">Sign In</Link>
              )}

              <Link href={isAuthenticated ? "/dashboard" : "/signup"} passHref>
                <Button size="sm">
                  {isAuthenticated ? "Dashboard" : "Get Started"}
                </Button>
              </Link>
            </nav>

            <div className="md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>
                      <Link href="/" className="flex items-center gap-3 mb-4">
                        <div className="h-8 w-8 bg-primary/90 flex items-center justify-center rounded-md">
                          <Shield className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="text-2xl font-bold font-headline text-white">Keynest</span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-6 text-lg font-medium mt-10 text-white">
                    <Link href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-foreground transition-colors">Features</Link>
                    <Link href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-foreground transition-colors">Docs</Link>

                    {!isAuthenticated && (
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="hover:text-foreground transition-colors">Sign In</Link>
                    )}

                    <Link href={isAuthenticated ? "/dashboard" : "/signup"} passHref>
                      <Button onClick={() => setMobileMenuOpen(false)}>
                        {isAuthenticated ? "Dashboard" : "Get Started"}
                      </Button>
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
