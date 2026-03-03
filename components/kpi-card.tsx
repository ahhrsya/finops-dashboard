"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn, formatCost } from "@/lib/utils"

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
        ok: "text-emerald-400",
        warning: "text-amber-400",
        bad: "text-rose-400",
        info: "text-blue-400"
    }

    const indicatorColors = {
        ok: "bg-emerald-500",
        warning: "bg-amber-500",
        bad: "bg-rose-500",
        info: "bg-blue-500"
    }

    const currentColor = statusColors[status || 'info']
    const currentIndicator = indicatorColors[status || 'info']

    return (
        <Card className={cn(
            "glass-card overflow-hidden relative transition-all duration-300 hover:border-white/10 group",
            className
        )}>
            <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{label}</span>
                    {status && (
                        <div className={cn("h-1.5 w-1.5 rounded-full animate-alert-pulse", currentIndicator)} />
                    )}
                </div>

                <div className="flex flex-col gap-4">
                    <div>
                        <div className="flex items-baseline gap-1">
                            {unit === '$' && <span className="text-xl font-medium text-white/30">$</span>}
                            <span className="text-3xl font-bold tracking-tight text-white leading-none">
                                {value}
                            </span>
                            {unit && unit !== '$' && <span className="text-xs text-muted-foreground ml-1 font-medium">{unit}</span>}
                        </div>

                        {change !== undefined && change !== null && (
                            <div className="flex items-center gap-1.5 mt-2.5">
                                <span className={cn(
                                    "text-[11px] font-bold py-0.5 px-1.5 rounded bg-white/[0.03] border border-white/5",
                                    change > 0 ? "text-rose-400" : "text-emerald-400"
                                )}>
                                    {change > 0 ? '+' : ''}{change}%
                                </span>
                                <span className="text-[10px] font-medium text-muted-foreground">vs last period</span>
                            </div>
                        )}
                    </div>

                    {percentage !== undefined && (
                        <div className="space-y-2 mt-1">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                                <span className="text-muted-foreground/60">{percentage}% Utilized</span>
                                <span className={cn("opacity-80", currentColor)}>{status?.toUpperCase()}</span>
                            </div>
                            <Progress value={percentage} className="h-1 bg-white/[0.05]" indicatorClassName={currentIndicator} />
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
