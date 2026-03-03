"use client"
import * as React from "react"
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
    mockServiceBreakdown,
    mockChartData
} from "@/lib/mock-data"
import { chartConfig } from "@/lib/chart-config"
import { formatCost, cn } from "@/lib/utils"

export default function ServicesPage() {
    return (
        <div className="p-6 space-y-6 max-w-[1440px] mx-auto animate-fade-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display font-bold">Service Breakdown</h1>
                    <p className="text-sm font-sans text-muted-foreground">Allocation and month-over-month trends by cloud service.</p>
                </div>
                <div className="flex bg-secondary p-1 rounded-md border border-border">
                    {["7D", "30D", "90D"].map((p) => (
                        <button key={p} className={cn(
                            "px-3 py-1 text-[10px] font-mono font-bold rounded",
                            p === "30D" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                        )}>{p}</button>
                    ))}
                </div>
            </div>

            <Card className="bg-card border-border">
                <CardHeader>
                    <CardTitle className="font-display font-bold text-base">Cost Distribution by Service</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px] pt-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={mockServiceBreakdown} layout="vertical" margin={{ left: 40 }}>
                            <CartesianGrid {...chartConfig.cartesianGrid} horizontal={false} />
                            <XAxis type="number" {...chartConfig.xAxis} tickFormatter={(v) => `$${v / 1000}k`} />
                            <YAxis
                                type="category"
                                dataKey="service"
                                {...chartConfig.yAxis}
                                width={80}
                            />
                            <Tooltip
                                contentStyle={chartConfig.tooltip.contentStyle}
                                formatter={(v: any) => formatCost(v)}
                            />
                            <Bar
                                dataKey="cost"
                                fill={chartConfig.colors.normal}
                                radius={[0, 4, 4, 0]}
                                barSize={20}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="bg-card border-border">
                <CardContent className="p-0">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border bg-popover">
                                <th className="px-6 py-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Service</th>
                                <th className="px-6 py-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Provider</th>
                                <th className="px-6 py-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest text-right">MTD Cost</th>
                                <th className="px-6 py-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest text-right">% Total</th>
                                <th className="px-6 py-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest text-right">vs Last Month</th>
                                <th className="px-6 py-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest ">Budget Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockServiceBreakdown.map((item, idx) => (
                                <tr key={idx} className="border-b border-border/40 hover:bg-white/[0.01]">
                                    <td className="px-6 py-4 font-sans font-medium">{item.service}</td>
                                    <td className="px-6 py-4">
                                        <Badge variant={item.provider.toLowerCase() as any}>{item.provider}</Badge>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-right">{formatCost(item.cost)}</td>
                                    <td className="px-6 py-4 font-mono text-right text-muted-foreground">{item.pct}%</td>
                                    <td className="px-6 py-4 text-right font-mono">
                                        <span className={cn(
                                            item.change > 15 ? "text-red-400" : "text-emerald-400"
                                        )}>
                                            {item.change > 0 ? '↑' : '↓'} {item.change}%
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden min-w-[100px]">
                                                <div
                                                    className={cn(
                                                        "h-full rounded-full",
                                                        (item.cost / item.budget) > 0.9 ? "bg-red-500" :
                                                            (item.cost / item.budget) > 0.7 ? "bg-yellow-500" : "bg-emerald-500"
                                                    )}
                                                    style={{ width: `${Math.min((item.cost / item.budget) * 100, 100)}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-mono text-muted-foreground">
                                                {Math.round((item.cost / item.budget) * 100)}%
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    )
}
