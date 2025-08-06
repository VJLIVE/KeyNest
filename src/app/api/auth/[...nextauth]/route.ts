/**
 * NextAuth API Route for KeyNest
 * Handles authentication requests using configured authOptions
 */
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);

// Export GET and POST handlers for Next.js API route
export { handler as GET, handler as POST };
