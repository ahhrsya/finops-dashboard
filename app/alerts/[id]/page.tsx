"use client"
import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import {
    ArrowLeft,
    AlertTriangle,
    Clock,
    Zap,
    Server,
    Globe,
    TrendingUp,
    ExternalLink,
    ChevronRight
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    ReferenceLine, ReferenceArea
} from 'recharts'
import { chartConfig } from "@/lib/chart-config"
import { formatCost, cn } from "@/lib/utils"
import { mockChartData } from "@/lib/mock-data"

export default function AnomalyDetailPage() {
    const params = useParams()
    const router = useRouter()

    return (
        <div className="p-6 space-y-6 max-w-[1440px] mx-auto animate-fade-up">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                <button onClick={() => router.back()} className="hover:text-primary transition-colors">Alerts</button>
                <ChevronRight className="h-3 w-3" />
                <span className="text-foreground">EC2 Spike · us-east-1</span>
            </div>

            {/* Hero Banner */}
            <div className="bg-red-500/10 border border-red-500/40 rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Badge variant="critical" className="h-10 w-10 flex items-center justify-center p-0 rounded-full shrink-0">
                        <AlertTriangle className="h-5 w-5" />
                    </Badge>
                    <div>
                        <h1 className="text-xl font-display font-bold text-red-400">EC2 Cost Spike Detected — us-east-1</h1>
                        <p className="text-sm font-sans text-muted-foreground">Detected Feb 13, 2025 at 14:32 UTC · Ongoing for 18 hours</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-secondary text-foreground text-sm font-sans font-medium rounded-md hover:bg-accent transition-colors border border-border">Snooze</button>
                    <button className="px-4 py-2 bg-red-500 text-white text-sm font-sans font-medium rounded-md hover:bg-red-600 transition-colors">Acknowledge</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart Area */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle className="font-display font-bold text-base">30-Day Cost Trend · EC2 · us-east-1</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[350px] pt-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={mockChartData}>
                                    <defs>
                                        <linearGradient id="colorNormal" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={chartConfig.colors.normal} stopOpacity={0.2} />
                                            <stop offset="95%" stopColor={chartConfig.colors.normal} stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorAnomaly" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={chartConfig.colors.anomaly} stopOpacity={0.4} />
                                            <stop offset="95%" stopColor={chartConfig.colors.anomaly} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid {...chartConfig.cartesianGrid} />
                                    <XAxis dataKey="day" {...chartConfig.xAxis} />
                                    <YAxis {...chartConfig.yAxis} tickFormatter={(v) => `$${v}`} />
                                    <Tooltip contentStyle={chartConfig.tooltip.contentStyle} />
                                    <ReferenceLine y={2800} stroke={chartConfig.colors.baseline} strokeDasharray="4 4" label={{ position: 'right', value: 'Baseline', fill: '#6B7280', fontSize: 10, fontFamily: 'var(--font-ibm-plex-mono)' }} />

                                    {/* Normal Period */}
                                    <Area
                                        type="monotone"
                                        dataKey="cost"
                                        stroke={chartConfig.colors.normal}
                                        fillOpacity={1}
                                        fill="url(#colorNormal)"
                                        strokeWidth={2}
                                        activeDot={{ r: 4 }}
                                    />

                                    {/* Anomaly Highlighting */}
                                    <ReferenceArea
                                        x1="Feb 13"
                                        x2="Feb 14"
                                        fill={chartConfig.colors.anomaly}
                                        fillOpacity={0.05}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle className="font-display font-bold text-base">Root Cause Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-sans text-muted-foreground">Confidence Score</span>
                                    <span className="text-sm font-mono text-primary">87%</span>
                                </div>
                                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full w-[87%]" />
                                </div>
                                <ul className="space-y-3 pt-2">
                                    {[
                                        "Unusual spike in spot instance termination in us-east-1a",
                                        "Auto-scaling group 'production-web' failed to stabilize",
                                        "847 new t3.medium instances launched within 45 minutes",
                                        "High cross-AZ data transfer detected between 14:00 and 15:00"
                                    ].map((factor, idx) => (
                                        <li key={idx} className="flex gap-3 text-sm font-sans items-start">
                                            <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">{factor}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-6">
                    <Card className="bg-card border-border">
                        <CardContent className="p-5">
                            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                {[
                                    { label: "Current/Day", value: "$6,340", bad: true },
                                    { label: "Baseline", value: "$1,890/d" },
                                    { label: "Total Overage", value: "$9,280", bad: true },
                                    { label: "Est. Monthly", value: "+$12,400", bad: true },
                                    { label: "Detected", value: "Feb 13" },
                                    { label: "Duration", value: "18 hrs" },
                                    { label: "Region", value: "us-east-1" },
                                    { label: "Instances", value: "847" },
                                ].map((stat, i) => (
                                    <div key={i}>
                                        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                                        <p className={cn(
                                            "text-lg font-display font-bold",
                                            stat.bad ? "text-red-400" : "text-foreground"
                                        )}>{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle className="font-display font-bold text-sm">Recommended Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-3 bg-secondary/50 rounded-md space-y-2 border border-border">
                                <div className="flex items-center justify-between">
                                    <Badge variant="critical">High Priority</Badge>
                                    <span className="text-[10px] font-mono text-muted-foreground">Estimate: -$4,200</span>
                                </div>
                                <p className="text-xs font-sans text-foreground font-medium">Terminate runaway ASG processes</p>
                                <button className="w-full py-1.5 bg-primary/10 text-primary border border-primary/20 rounded text-[10px] font-mono uppercase font-bold hover:bg-primary/20 transition-all">Execute Action</button>
                            </div>

                            <div className="p-3 bg-secondary/50 rounded-md space-y-2 border border-border">
                                <div className="flex items-center justify-between">
                                    <Badge variant="warning">Medium</Badge>
                                </div>
                                <p className="text-xs font-sans text-foreground font-medium">Revert 'web-v2.1.4' deployment</p>
                                <button className="w-full py-1.5 bg-secondary text-muted-foreground border border-border rounded text-[10px] font-mono uppercase font-bold hover:bg-accent transition-all">Create Ticket</button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
