import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function buildUrl(base: string, endpoint: string, params: Record<string, string | undefined>): string {
  const url = new URL(`${base}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
          url.searchParams.append(key, value);
      }
  });
  return url.toString();
}
