// src/app/login/page.tsx
'use client';

import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/dashboard');
    }
  }, [status, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res?.ok) {
      router.push('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required className="w-full p-2 border rounded" />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}
