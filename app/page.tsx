"use client"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Calendar,
    ArrowUpRight,
    AlertCircle,
    Zap,
    CheckCircle2,
    Sparkles,
    ChevronRight,
    TrendingDown,
    Info
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
        <div className="p-8 space-y-8 animate-fade-up max-w-[1400px] mx-auto">

            {/* Header section with AI Insights */}
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Financial Operations</h1>
                        <p className="text-sm text-muted-foreground">Focusing on your primary goals: <span className="text-white">Cost Efficiency</span> & <span className="text-white">Anomaly Resolution</span>.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/5 rounded-lg text-xs font-semibold hover:bg-white/5 transition-colors">
                            <Calendar className="h-3.5 w-3.5" />
                            Feb 1 - Feb 28, 2026
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-shadow shadow-lg shadow-blue-500/20">
                            Generate PDF
                        </button>
                    </div>
                </div>

                {/* AI Insight Card - Replaces extra general stats */}
                <div className="p-1 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-transparent border border-white/5 overflow-hidden group">
                    <div className="bg-black/40 backdrop-blur-xl p-5 rounded-[0.9rem] flex flex-col md:flex-row items-center justify-between gap-6 transition-colors group-hover:bg-black/60">
                        <div className="flex items-center gap-5">
                            <div className="h-12 w-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                                <Sparkles className="h-6 w-6 text-blue-400 animate-pulse" />
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                                    AI RECOMMENDATION
                                    <span className="text-[10px] font-black bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded leading-none">NEW</span>
                                </h2>
                                <p className="text-sm text-white/70 leading-relaxed">
                                    You can save <span className="text-emerald-400 font-bold">$1,240/mo</span> by rightsizing <span className="text-white underline decoration-white/20 underline-offset-4">8 idle instances</span> in <span className="text-white">us-east-1</span>.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <button className="flex-1 md:flex-none px-5 py-2.5 rounded-xl text-xs font-bold text-blue-400 border border-blue-500/20 hover:bg-blue-500/10 transition-colors">View Details</button>
                            <button className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">Apply Fix Now</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Primary KPI Grid (Spend, Forecast, Anomalies, Score) */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {mockKpis.map((kpi, i) => (
                    <KpiCard key={i} {...kpi} />
                ))}
            </div>

            <div className="grid grid-cols-12 gap-8 items-stretch">

                {/* Main Cost Outlook Section */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
                    <Card className="glass-card flex-1">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-base font-bold">Daily Spend Performance</CardTitle>
                                <p className="text-xs text-muted-foreground mt-1">Goal: Keep daily overage below <span className="text-white">$200</span>.</p>
                            </div>
                            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest opacity-60">
                                <div className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Current Spend</div>
                                <div className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full border border-white/20" /> Planned Baseline</div>
                            </div>
                        </CardHeader>
                        <CardContent className="h-[400px] pt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={mockChartData}>
                                    <defs>
                                        <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.02)" />
                                    <XAxis
                                        dataKey="day"
                                        stroke="rgba(255,255,255,0.15)"
                                        fontSize={10}
                                        tickLine={false}
                                        axisLine={false}
                                        dy={10}
                                    />
                                    <YAxis
                                        stroke="rgba(255,255,255,0.15)"
                                        fontSize={10}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(v) => `$${v}`}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            background: '#0a0a0a',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '12px',
                                            boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
                                        }}
                                        itemStyle={{ fontSize: '13px', fontWeight: 'bold' }}
                                        cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="cost"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorCost)"
                                        activeDot={{ r: 5, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="glass-card">
                            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                                <CardTitle className="text-sm font-bold">Top Cost Contributors</CardTitle>
                                <Link href="/services" className="text-[10px] font-bold text-blue-400 hover:underline transition-all">VIEW ALL</Link>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-2">
                                {mockServiceBreakdown.slice(0, 3).map((service, i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <div className="flex justify-between text-xs items-center">
                                            <span className="font-semibold text-white/80">{service.service}</span>
                                            <span className="font-mono text-muted-foreground">{formatCost(service.cost)}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-500/40 rounded-full transition-all duration-1000"
                                                style={{ width: `${service.pct}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="bg-emerald-500/[0.03] border border-emerald-500/10 p-6 flex flex-col justify-center gap-4 text-center md:text-left h-full">
                            <div className="flex items-center gap-4 justify-center md:justify-start">
                                <div className="h-10 w-10 bg-emerald-500/10 rounded-xl flex items-center justify-center shrink-0">
                                    <TrendingDown className="h-5 w-5 text-emerald-400" />
                                </div>
                                <h3 className="text-sm font-bold text-white">Efficiency Insight</h3>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Your current EKS cluster utilization is at <span className="text-white">42%</span>. Rightsizing pods could reduce monthly waste by approximately <span className="text-emerald-400 font-bold">$420</span>.
                            </p>
                            <div className="flex flex-col md:flex-row gap-2 mt-auto">
                                <button className="flex-1 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20 hover:bg-emerald-500/20 transition-all">Learn More</button>
                                <button className="flex-1 py-2 rounded-lg bg-white/[0.03] text-white/40 text-[10px] font-bold uppercase tracking-widest border border-white/5 disabled opacity-50">Dismiss</button>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Action Center - Active Alerts (High Visibility) */}
                <div className="col-span-12 lg:col-span-4 h-full">
                    <Card className="glass-card border-rose-500/10 flex flex-col h-full">
                        <CardHeader className="flex flex-row items-center justify-between pb-6">
                            <div>
                                <CardTitle className="text-base font-bold flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 text-rose-500" />
                                    Critical Actions
                                </CardTitle>
                                <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest">Require immediate response</p>
                            </div>
                            <Badge className="bg-rose-500 text-white border-none shadow-lg shadow-rose-500/20 text-[10px] px-2 py-0.5">
                                {mockAlerts.length} OPEN
                            </Badge>
                        </CardHeader>
                        <CardContent className="space-y-4 flex-1">
                            {mockAlerts.map((alert) => (
                                <div key={alert.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all flex flex-col gap-3 group">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold text-muted-foreground uppercase">{alert.provider} · {alert.region}</span>
                                        </div>
                                        <span className="text-[10px] text-muted-foreground italic">{alert.detected}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white mb-0.5">{alert.description}</h4>
                                        <p className="text-xs text-muted-foreground">Impact: <span className="text-rose-400 font-bold">{formatCost(alert.impact)}</span> over baseline</p>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Link href={`/alerts/${alert.id}`} className="flex-1">
                                            <button className="w-full py-2 rounded-lg bg-white/5 hover:bg-blue-600 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-all">
                                                Investigate
                                            </button>
                                        </Link>
                                        <button className="px-3 bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-colors border border-emerald-500/20">
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className="flex-1 flex flex-col items-center justify-center py-10 opacity-30 group cursor-default">
                                <CheckCircle2 className="h-12 w-12 text-muted-foreground mb-4 group-hover:text-white transition-colors" />
                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-center">No other critical alerts</p>
                            </div>

                            <button className="w-full py-3 bg-white/[0.02] border border-dashed border-white/10 rounded-xl text-xs font-semibold text-muted-foreground hover:text-white hover:border-white/20 transition-all">
                                View Alert History
                            </button>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    )
}
