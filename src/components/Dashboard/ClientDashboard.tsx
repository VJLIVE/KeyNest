"use client";

import { useEffect, useState } from "react";
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
import Link from "next/link";

/**
 * User type
 */
interface User {
  name: string;
  email: string;
  role: string;
}

interface Project {
  id: string;
  name: string;
}

interface ClientDashboardProps {
  user: User;
}

/**
 * Dashboard component
 */
export default function ClientDashboard({ user }: ClientDashboardProps) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState("");
  const { status } = useSession();
  const router = useRouter();

  // Fetch projects on load
  useEffect(() => {
    if (status === "authenticated") {
      fetchProjects();
    }
  }, [status]);

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
  };

  const handleCreateProject = async () => {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newProjectName }),
    });
    if (res.ok) {
      setShowCreateModal(false);
      setNewProjectName("");
      fetchProjects();
    }
  };

  const handleLogout = async () => {
    setShowLogoutModal(false);
    await signOut({ callbackUrl: "/", redirect: false });
    window.location.href = "/";
  };

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-10">
      <section className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 space-y-6 border border-zinc-200 dark:border-zinc-700">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-foreground mb-2">
            Welcome, {user.name}
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your API keys and projects below.
          </p>
        </header>

        <div className="grid gap-2 text-sm sm:text-base">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-muted-foreground">Email</span>
            <span className="text-foreground">{user.email}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-muted-foreground">Role</span>
            <span className="capitalize text-foreground">{user.role}</span>
          </div>
        </div>

        {/* Projects List */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Your Projects</h2>
            <Button onClick={() => setShowCreateModal(true)}>+ New Project</Button>
          </div>
          {projects.length === 0 ? (
            <p className="text-muted-foreground">No projects yet.</p>
          ) : (
            <ul className="space-y-2">
              {projects.map((project) => (
                <li key={project.id} className="border p-3 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  <Link href={`/dashboard/project/${project.id}`} className="text-blue-600 dark:text-blue-400">
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Logout Button */}
        <Button variant="destructive" className="w-full mt-6" onClick={() => setShowLogoutModal(true)}>
          Logout
        </Button>
      </section>

      {/* Logout Modal */}
      <Dialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">Are you sure you want to log out?</p>
          <DialogFooter className="pt-4">
            <Button variant="ghost" onClick={() => setShowLogoutModal(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleLogout}>Logout</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Project Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
          </DialogHeader>
          <input
            type="text"
            placeholder="Project name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            className="w-full p-2 border rounded mt-2"
          />
          <DialogFooter className="pt-4">
            <Button variant="ghost" onClick={() => setShowCreateModal(false)}>Cancel</Button>
            <Button onClick={handleCreateProject} disabled={!newProjectName.trim()}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
