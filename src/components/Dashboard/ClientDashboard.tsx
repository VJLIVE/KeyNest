"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * Props for ClientDashboard component
 */
interface User {
  name: string;
  email: string;
  role: string;
}

interface ClientDashboardProps {
  user: User;
}

/**
 * Dashboard for authenticated users
 * Shows user info and logout modal
 */
export default function ClientDashboard({ user }: ClientDashboardProps) {
  const [showModal, setShowModal] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  // Handle logout and force full reload to clear cache
  const handleLogout = async () => {
    setShowModal(false);
    await signOut({ callbackUrl: "/", redirect: false });
    window.location.href = "/";
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <section className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 space-y-6 border border-zinc-200 dark:border-zinc-700">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-foreground mb-2">
            Welcome, {user.name}
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your API keys and settings here.
          </p>
        </header>
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
      </section>
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
