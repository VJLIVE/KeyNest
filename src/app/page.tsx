'use client';

import { Features } from '@/components/features';
import { Hero } from '@/components/hero';
import { SiteHeader } from '@/components/site-header';
import { Footer } from '@/components/footer';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900/40 via-gray-900/20 to-blue-900/10 z-0"></div>
       <div className="absolute top-[-20%] left-[10%] w-[40%] h-[40%] bg-blue-500/30 rounded-full blur-[120px] -z-10" />
      <SiteHeader showGetStarted />
      <main className="flex-1 relative z-10">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
