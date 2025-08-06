/**
 * Signup API Route for KeyNest
 * Handles user registration with validation and password hashing
 */
import prisma from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Parse request body
    const { name, email, password, role } = await req.json();
    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash password and create user
    const hashed = await hash(password, 10);
    await prisma.user.create({
      data: { name, email, password: hashed, role },
    });

    return NextResponse.json({ message: 'User created' }, { status: 201 });
  } catch (err) {
    // Log error for debugging
    console.error('Signup error:', err);
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
  }
}
