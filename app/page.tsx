"use client"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Calendar,
    ChevronRight,
    ArrowUpRight,
    AlertCircle,
    Activity,
    Zap,
    Filter,
    MoreVertical,
    CheckCircle2,
    Clock
} from "lucide-react"
import {
    mockKpis,
    mockChartData,
    mockAlerts,
    mockServiceBreakdown
} from "@/lib/mock-data"
import { KpiCard } from "@/components/kpi-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { cn, formatCost } from "@/lib/utils"
import Link from "next/link"

export default function DashboardPage() {
    return (
        <div className="p-8 space-y-8 animate-fade-up max-w-[1600px] mx-auto">

            {/* Header Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Financial Operations</h1>
                    <p className="text-sm text-muted-foreground">Monitor cloud efficiency and resolve cost anomalies across all regions.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/5 rounded-lg text-xs font-semibold hover:bg-white/5 transition-colors">
                        <Calendar className="h-3.5 w-3.5" />
                        Last 30 Days
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-shadow shadow-lg shadow-blue-500/20">
                        Generate Report
                    </button>
                </div>
            </div>

            {/* Primary KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {mockKpis.map((kpi, i) => (
                    <KpiCard key={i} {...kpi} />
                ))}
            </div>

            <div className="grid grid-cols-12 gap-8">

                {/* Main Cost Trend (Focus on Goal 1) */}
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    <Card className="glass-card border-white/5">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div>
                                <CardTitle className="text-base font-bold">Daily Cost Outlook</CardTitle>
                                <p className="text-xs text-muted-foreground mt-1">Real-time spending vs historical baseline.</p>
                            </div>
                            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                                <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> Cost</div>
                                <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full border border-white/20" /> Baseline</div>
                            </div>
                        </CardHeader>
                        <CardContent className="h-[380px] pt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={mockChartData}>
                                    <defs>
                                        <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.02)" />
                                    <XAxis
                                        dataKey="day"
                                        stroke="rgba(255,255,255,0.1)"
                                        fontSize={10}
                                        hide
                                    />
                                    <YAxis
                                        stroke="rgba(255,255,255,0.1)"
                                        fontSize={10}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(v) => `$${v}`}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            background: '#0D0D0D',
                                            border: '1px solid rgba(255,255,255,0.05)',
                                            borderRadius: '8px',
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                                            padding: '12px'
                                        }}
                                        itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                                        labelStyle={{ fontSize: '10px', color: '#666', marginBottom: '4px' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="cost"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorCost)"
                                        activeDot={{ r: 4, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="baseline"
                                        stroke="rgba(255,255,255,0.1)"
                                        strokeWidth={1}
                                        strokeDasharray="4 4"
                                        fill="transparent"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Service Allocation (Simplified Breakdown) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="glass-card">
                            <CardHeader>
                                <CardTitle className="text-sm">Service Distribution</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {mockServiceBreakdown.slice(0, 4).map((service, i) => (
                                    <div key={i} className="space-y-1.5">
                                        <div className="flex justify-between text-xs">
                                            <span className="font-semibold text-white/80">{service.service}</span>
                                            <span className="font-mono text-muted-foreground">{formatCost(service.cost)}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-500/60 rounded-full"
                                                style={{ width: `${service.pct}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="glass-card flex flex-col justify-center p-6 text-center space-y-4">
                            <div className="h-12 w-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto">
                                <Zap className="h-6 w-6 text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white">Efficiency Guard</h3>
                                <p className="text-xs text-muted-foreground mt-1 px-4">You have 12 underutilized instances in us-east-1. Potential savings: $1,240/mo.</p>
                            </div>
                            <button className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest">Optimize Now →</button>
                        </Card>
                    </div>
                </div>

                {/* Action Center - Active Alerts (Goal 2) */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    <Card className="glass-card border-blue-500/10 h-full">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-base font-bold flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 text-rose-500" />
                                Action Center
                            </CardTitle>
                            <Badge variant="outline" className="text-[10px] bg-rose-500/5 text-rose-400 border-rose-500/20 uppercase font-bold">
                                {mockAlerts.filter(a => a.severity === 'critical').length} Critical
                            </Badge>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            {mockAlerts.map((alert) => (
                                <div key={alert.id} className="group p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all relative overflow-hidden">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className={cn(
                                                "h-2 w-2 rounded-full",
                                                alert.severity === 'critical' ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" : "bg-amber-500"
                                            )} />
                                            <span className="text-[10px] font-bold text-white/50 uppercase tracking-tighter">{alert.provider} · {alert.region || 'Global'}</span>
                                        </div>
                                        <span className="text-[10px] text-muted-foreground font-mono">{alert.detected}</span>
                                    </div>
                                    <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors mb-1">{alert.description}</h3>
                                    <p className="text-xs text-muted-foreground line-clamp-1 mb-4">Estimated Impact: {formatCost(alert.impact)}</p>

                                    <div className="flex gap-2">
                                        <Link href={`/alerts/${alert.id}`} className="flex-1">
                                            <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors">
                                                Investigate
                                            </button>
                                        </Link>
                                        <button className="px-3 bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-colors border border-emerald-500/20">
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <button className="w-full py-3 mt-2 border border-dashed border-white/10 rounded-xl text-xs text-muted-foreground hover:border-white/20 hover:text-white transition-all">
                                View Alert History
                            </button>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    )
}
