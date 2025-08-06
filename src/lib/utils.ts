/**
 * Utility function to combine and merge Tailwind CSS class names
 * Uses clsx for conditional classes and twMerge to resolve conflicts
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
