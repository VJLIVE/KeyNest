export const runtime = 'nodejs';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 space-y-6 border border-zinc-200 dark:border-zinc-700">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-foreground mb-2">
            Welcome, {user?.name}
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your API keys and settings here.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 text-sm sm:text-base">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-medium text-muted-foreground">Email</span>
            <span className="text-foreground">{user?.email}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-medium text-muted-foreground">Role</span>
            <span className="capitalize text-foreground">{user?.role}</span>
          </div>
        </div>

        <form action="/api/auth/signout" method="POST" className="pt-4 border-t">
          <Button type="submit" variant="destructive" className="w-full">
            Logout
          </Button>
        </form>
      </div>
    </main>
  );
}
