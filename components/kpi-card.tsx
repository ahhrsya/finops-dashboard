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
    percentage?: number
}

export function KpiCard({ label, value, unit, change, status, className, percentage }: KpiCardProps) {

    const statusColors = {
        ok: "text-emerald-400 bg-emerald-400/10",
        warning: "text-amber-400 bg-amber-400/10",
        bad: "text-rose-400 bg-rose-400/10",
        info: "text-blue-400 bg-blue-400/10"
    }

    const currentColor = statusColors[status || 'info']

    return (
        <Card className={cn(
            "glass-card overflow-hidden relative transition-all duration-300",
            className
        )}>
            <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
                    {status && (
                        <div className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase", currentColor)}>
                            {status}
                        </div>
                    )}
                </div>

                <div className="flex items-end justify-between gap-4">
                    <div>
                        <div className="flex items-baseline gap-1">
                            {unit === '$' && <span className="text-xl font-medium text-muted-foreground/50">$</span>}
                            <span className="text-3xl font-bold tracking-tight text-white font-mono">
                                {value}
                            </span>
                            {unit && unit !== '$' && <span className="text-xs text-muted-foreground ml-1">{unit}</span>}
                        </div>

                        {change !== undefined && change !== null && (
                            <div className="flex items-center gap-1.5 mt-2">
                                <span className={cn(
                                    "text-[11px] font-semibold flex items-center",
                                    change > 0 ? "text-rose-400" : "text-emerald-400"
                                )}>
                                    {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
                                </span>
                                <span className="text-[10px] text-muted-foreground">vs last month</span>
                            </div>
                        )}
                    </div>

                    {percentage !== undefined && (
                        <div className="flex flex-col items-end gap-1">
                            <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className={cn("h-full rounded-full transition-all duration-1000", currentColor.split(' ')[1])}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                            <span className="text-[10px] font-mono text-muted-foreground opacity-60">{percentage}% utilized</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
