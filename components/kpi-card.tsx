import { Card, CardContent } from "@/components/ui/card"
import { cn, formatCost } from "@/lib/utils"

interface KpiCardProps {
    label: string
    value: string | number
    unit?: string
    change?: number | null
    status?: 'ok' | 'warning' | 'bad'
    className?: string
}

export function KpiCard({ label, value, unit, change, status, className }: KpiCardProps) {
    const isBad = status === 'bad'
    const isWarning = status === 'warning'

    return (
        <Card className={cn(
            "bg-card border-border hover:border-primary/40 hover:bg-accent/20 transition-all duration-150 cursor-default",
            className
        )}>
            <CardContent className="p-5">
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                    {label}
                </p>
                <div className="flex items-baseline gap-1">
                    <p className="text-2xl font-mono font-bold">
                        {typeof value === 'number' && unit !== '%' ? formatCost(value) : value}
                        {unit && <span className="text-sm font-sans ml-0.5 text-muted-foreground">{unit}</span>}
                    </p>
                </div>
                {change !== null && change !== undefined && (
                    <p className={cn(
                        "text-xs font-mono mt-1",
                        change > 0 ? "text-red-400" : "text-emerald-400"
                    )}>
                        {change > 0 ? '↑' : '↓'} {Math.abs(change)}% vs last month
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
