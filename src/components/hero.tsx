'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export function Hero() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };
  
  return (
    <motion.section
      className="container mx-auto px-4 py-16 sm:py-24 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          <Lock className="h-4 w-4" />
          Secure API Key Management
        </div>
      </motion.div>
      <motion.h1
        className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-headline tracking-tighter text-foreground mb-6"
        variants={itemVariants}
      >
        Secure Your <span className="text-primary">API Keys</span>
        <br />
        Like Never Before
      </motion.h1>
      <motion.p
        className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10"
        variants={itemVariants}
      >
        Store, and manage API keys with enterprise-grade security. Built for developers who demand both simplicity and robust protection.
      </motion.p>
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Link href={isAuthenticated ? "/dashboard" : "/signup"} passHref>
          <Button size="lg" className="bg-primary/90 hover:bg-primary text-white w-full sm:w-auto">
            Start Building
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
        <Link href="#" passHref>
          <Button size="lg" variant="outline" className="w-full sm:w-auto bg-background/50 border-white/20 hover:bg-white/10 hover:text-white">
            View Documentation
          </Button>
        </Link>
      </motion.div>
    </motion.section>
  );
}