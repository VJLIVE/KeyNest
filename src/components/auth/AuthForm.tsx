'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AuthFormProps {
  type: 'login' | 'signup';
}

export function AuthForm({ type }: AuthFormProps) {
  const [loading, setLoading] = useState(false);
  const isLogin = type === 'login';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Handle auth logic here
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <motion.div
      className="mx-auto max-w-md w-full bg-background/50 p-8 rounded-xl shadow-md border border-white/10 backdrop-blur"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-white">
        {isLogin ? 'Sign In to Keynest' : 'Create Your Keynest Account'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <>
            <Label htmlFor="name" className="text-white">Name</Label>
            <Input id="name" type="text" required />
          </>
        )}
        <Label htmlFor="email" className="text-white">Email</Label>
        <Input id="email" type="email" required />
        <Label htmlFor="password" className="text-white">Password</Label>
        <Input id="password" type="password" required />

        <Button type="submit" className="w-full mt-4" disabled={loading}>
          {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
        </Button>
      </form>
      <p className="text-center text-sm text-muted-foreground mt-4">
        {isLogin ? (
          <>Don’t have an account?{' '}
            <Link href="/signup" className="text-primary hover:underline">Sign up</Link>
          </>
        ) : (
          <>Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline">Sign in</Link>
          </>
        )}
      </p>
    </motion.div>
  );
}
