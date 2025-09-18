// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility to merge Tailwind CSS class names conditionally.
 * - Removes conflicting classes (e.g., "p-2" vs "p-4")
 * - Makes conditional className composition easier
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Capitalize the first letter of a string
 */
export function capitalize(str: string) {
  if (!str) return ""
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Truncate long strings with ellipsis
 */
export function truncate(str: string, maxLength: number) {
  if (!str) return ""
  return str.length > maxLength ? str.slice(0, maxLength) + "…" : str
}

/**
 * Format a date to readable string
 */
export function formatDate(date: Date | string, locale = "en-US") {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}
