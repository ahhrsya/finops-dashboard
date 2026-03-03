"use client"
import Link from "next/link"
import { mockKpis, mockAlerts, mockServiceBreakdown, mockChartData } from "@/lib/mock-data"
import { KpiCard } from "@/components/kpi-card"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts'
import { chartConfig } from "@/lib/chart-config"
import { formatCost, cn } from "@/lib/utils"

export default function DashboardPage() {
    return (
        <div className="p-6 space-y-6 max-w-[1440px] mx-auto animate-fade-up">
            {/* KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockKpis.map((kpi, i) => (
                    <KpiCard
                        key={i}
                        label={kpi.label}
                        value={kpi.value}
                        change={kpi.change}
                        unit={kpi.unit}
                        status={kpi.status as any}
                    />
                ))}
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 bg-card border-border">
                    <CardHeader>
                        <CardTitle className="font-display font-bold text-base">Cost Trend</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] w-full pt-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={mockChartData}>
                                <CartesianGrid {...chartConfig.cartesianGrid} />
                                <XAxis
                                    dataKey="day"
                                    {...chartConfig.xAxis}
                                />
                                <YAxis
                                    {...chartConfig.yAxis}
                                    tickFormatter={(v) => `$${v / 1000}k`}
                                />
                                <Tooltip
                                    contentStyle={chartConfig.tooltip.contentStyle}
                                    formatter={(v: any) => [formatCost(v), 'Cost']}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="cost"
                                    stroke={chartConfig.colors.normal}
                                    strokeWidth={2}
                                    dot={(props: any) => {
                                        if (props.payload.anomaly) {
                                            return <circle cx={props.cx} cy={props.cy} r={4} fill={chartConfig.colors.anomaly} stroke="none" />
                                        }
                                        return null as any
                                    }}
                                    activeDot={{ r: 4, strokeWidth: 0 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="baseline"
                                    stroke={chartConfig.colors.baseline}
                                    strokeDasharray="4 4"
                                    strokeWidth={1}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="bg-card border-border">
                    <CardHeader>
                        <CardTitle className="font-display font-bold text-base">Budget Allocation</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] flex flex-col items-center justify-center pt-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={mockServiceBreakdown}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="cost"
                                >
                                    {mockServiceBreakdown.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={Object.values(chartConfig.colors)[index + 3] || chartConfig.colors.other} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={chartConfig.tooltip.contentStyle}
                                    formatter={(v: any) => formatCost(v)}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-2xl font-display font-bold">71.1%</span>
                            <span className="text-[10px] font-mono text-muted-foreground uppercase">Used</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Active Alerts */}
            <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="font-display font-bold text-base">Active Alerts</CardTitle>
                    <Badge variant="critical">3 Critical</Badge>
                </CardHeader>
                <CardContent>
                    <div className="space-y-1">
                        {mockAlerts.slice(0, 3).map((alert) => (
                            <div key={alert.id} className="flex items-center justify-between p-3 rounded-md hover:bg-white/[0.02] border border-transparent hover:border-border/40 transition-all group">
                                <div className="flex items-center gap-4">
                                    <Badge variant={alert.severity as any}>{alert.severity}</Badge>
                                    <div>
                                        <p className="text-sm font-sans font-medium">{alert.service} Spike detected in {alert.region || 'global'}</p>
                                        <p className="text-xs font-mono text-muted-foreground">{alert.description} · impact: {formatCost(alert.impact)}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-mono text-muted-foreground">{alert.detected} ago</p>
                                    <Link
                                        href={`/alerts/${alert.id}`}
                                        className="text-xs font-sans text-primary opacity-0 group-hover:opacity-100 transition-opacity hover:underline"
                                    >
                                        Investigate →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
