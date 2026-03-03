"use client"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface KpiCardProps {
    label: string
    value: string | number
    unit?: string
    change?: number | null
    status?: 'ok' | 'warning' | 'bad' | 'info'
    className?: string
    percentage?: number // For circular progress
}

export function KpiCard({ label, value, unit, change, status, className, percentage = 68 }: KpiCardProps) {
    const isBad = status === 'bad'
    const isWarning = status === 'warning'

    // Color mapping for neon aesthetic
    const colors: Record<string, string> = {
        ok: "text-neon-green stroke-neon-green",
        warning: "text-neon-yellow stroke-neon-yellow",
        bad: "text-neon-pink stroke-neon-pink",
        info: "text-neon-blue stroke-neon-blue"
    }

    const currentColor = colors[status || 'info'] || colors.info
    const radius = 32;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <Card className={cn(
            "glass-card hover:bg-white/[0.04] transition-all duration-300 group overflow-hidden relative border-white/5 h-48",
            className
        )}>
            {/* Decorative background glow */}
            <div className={cn(
                "absolute -top-12 -right-12 w-24 h-24 blur-[60px] opacity-20 transition-opacity group-hover:opacity-40",
                currentColor.split(' ')[0].replace('text-', 'bg-')
            )} />

            <CardContent className="p-6 h-full flex items-center justify-between">
                <div className="flex flex-col h-full justify-between py-1">
                    <div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60 mb-1 leading-none">
                            {label}
                        </p>
                        <div className="flex items-baseline gap-1 mt-3">
                            <p className="text-3xl font-display font-black tracking-tight text-white group-hover:scale-105 origin-left transition-transform">
                                {unit === '$' && <span className="text-lg opacity-40 mr-1">$</span>}
                                {value}
                                {unit && unit !== '$' && <span className="text-sm ml-1 opacity-40 font-mono tracking-tighter">{unit}</span>}
                            </p>
                        </div>
                    </div>

                    {change !== null && change !== undefined && (
                        <div className="flex items-center gap-2 mt-4">
                            <div className={cn(
                                "h-5 w-5 rounded-full flex items-center justify-center text-[10px]",
                                change > 0 ? "bg-neon-pink/10 text-neon-pink" : "bg-neon-green/10 text-neon-green"
                            )}>
                                {change > 0 ? '↑' : '↓'}
                            </div>
                            <p className={cn(
                                "text-[10px] font-bold uppercase tracking-widest",
                                change > 0 ? "text-neon-pink" : "text-neon-green"
                            )}>
                                {Math.abs(change)}% <span className="text-muted-foreground/30 ml-1 font-normal">MTD</span>
                            </p>
                        </div>
                    )}
                </div>

                {/* Circular Progress from reference image */}
                <div className="relative h-24 w-24 flex items-center justify-center shrink-0">
                    <svg className="transform -rotate-90 w-full h-full">
                        <circle
                            cx="48"
                            cy="48"
                            r={radius}
                            stroke="white"
                            strokeWidth="5"
                            fill="transparent"
                            className="opacity-[0.03]"
                        />
                        <circle
                            cx="48"
                            cy="48"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="5"
                            strokeDasharray={circumference}
                            style={{ strokeDashoffset: offset }}
                            strokeLinecap="round"
                            fill="transparent"
                            className={cn("transition-all duration-1000 ease-out", currentColor.split(' ')[1])}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[11px] font-display font-bold text-white leading-none">{percentage}%</span>
                        <span className="text-[7px] font-mono text-muted-foreground uppercase tracking-widest leading-none mt-1">CAP</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
