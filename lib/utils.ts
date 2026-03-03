import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Budget color helper
export const getBudgetColor = (pct: number) => {
    if (pct >= 90) return { text: 'text-red-400', bar: '[&>div]:bg-red-500', badge: 'critical' as const }
    if (pct >= 70) return { text: 'text-yellow-400', bar: '[&>div]:bg-yellow-500', badge: 'warning' as const }
    return { text: 'text-emerald-400', bar: '[&>div]:bg-emerald-500', badge: 'ok' as const }
}

// Format currency
export const formatCost = (n: number) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(n)

// Format change %
export const formatChange = (pct: number) => ({
    label: `${pct > 0 ? '+' : ''}${pct.toFixed(1)}%`,
    className: pct > 0 ? 'text-red-400' : 'text-emerald-400'  // cost up = bad (red)
})

// Provider badge variant
export const getProviderVariant = (provider: string) => {
    const mapping: Record<string, string> = { AWS: 'aws', GCP: 'gcp', Azure: 'azure' }
    return mapping[provider] ?? 'outline'
}
