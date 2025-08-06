'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function ClientDashboard({ user }: { user: { name: string; email: string; role: string } }) {
  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    setShowModal(false);
    await signOut({ callbackUrl: '/', redirect: true });
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 space-y-6 border border-zinc-200 dark:border-zinc-700">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-foreground mb-2">
            Welcome, {user.name}
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your API keys and settings here.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 text-sm sm:text-base">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-medium text-muted-foreground">Email</span>
            <span className="text-foreground">{user.email}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-medium text-muted-foreground">Role</span>
            <span className="capitalize text-foreground">{user.role}</span>
          </div>
        </div>

        <Button variant="destructive" className="w-full" onClick={() => setShowModal(true)}>
          Logout
        </Button>
      </div>

      {/* Logout Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">Are you sure you want to log out?</p>
          <DialogFooter className="pt-4">
            <Button variant="ghost" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
