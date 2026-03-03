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
    Info,
    Download,
    Filter
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
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { cn, formatCost } from "@/lib/utils"
import Link from "next/link"

export default function DashboardPage() {
    return (
        <div className="p-8 space-y-8 animate-fade-up max-w-[1400px] mx-auto">

            {/* Page Header */}
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Financial Operations</h1>
                        <p className="text-sm text-muted-foreground font-medium">Monitoring your primary goals: <span className="text-white">Efficiency</span> & <span className="text-white">Cost Control</span>.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-9 gap-2 bg-white/[0.02] border-white/5 text-white/60 hover:text-white">
                            <Calendar className="h-3.5 w-3.5" />
                            Feb 1 - Feb 28
                        </Button>
                        <Button size="sm" className="h-9 gap-2 bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-500/20">
                            <Download className="h-3.5 w-3.5" />
                            Export
                        </Button>
                    </div>
                </div>

                {/* AI Insight banner using refined design */}
                <div className="p-px rounded-2xl bg-gradient-to-r from-blue-500/30 via-transparent to-transparent border border-white/5 overflow-hidden">
                    <div className="bg-[#050505]/80 backdrop-blur-xl p-5 rounded-[0.95rem] flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="h-12 w-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                                <Sparkles className="h-5 w-5 text-blue-500 animate-pulse" />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black bg-blue-600/10 text-blue-400 px-1.5 py-0.5 rounded uppercase tracking-wider">AI Recommendation</span>
                                    <span className="h-1 w-1 rounded-full bg-white/20" />
                                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Efficiency Insight</span>
                                </div>
                                <p className="text-[13px] text-white/80 leading-relaxed font-medium">
                                    Potential savings detected: <span className="text-emerald-400 font-bold">$1,240/mo</span> in us-east-1. <span className="text-white/40 font-normal">8 instances are underutilized.</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 w-full lg:w-auto">
                            <Button variant="ghost" className="flex-1 lg:flex-none h-11 px-6 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5">Analyze</Button>
                            <Button className="flex-1 lg:flex-none h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all">Apply Fix</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* KPI Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {mockKpis.map((kpi, i) => (
                    <KpiCard key={i} {...kpi} />
                ))}
            </div>

            {/* Main Content Areas */}
            <div className="grid grid-cols-12 gap-8 items-stretch">

                {/* Cost Outlook with shadcn Tabs */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                    <Card className="glass-card flex-1">
                        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
                            <div>
                                <CardTitle className="text-base font-bold">Daily Spend Performance</CardTitle>
                                <p className="text-xs text-muted-foreground mt-1 font-medium">Comparing current spend against optimized baseline.</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest opacity-40 mr-4">
                                    <div className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Current</div>
                                    <div className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full border border-white/20" /> Planned</div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="h-[380px] pt-6 pr-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={mockChartData}>
                                    <defs>
                                        <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(255,255,255,0.03)" />
                                    <XAxis
                                        dataKey="day"
                                        stroke="rgba(255,255,255,0.2)"
                                        fontSize={10}
                                        tickLine={false}
                                        axisLine={false}
                                        dy={10}
                                    />
                                    <YAxis
                                        stroke="rgba(255,255,255,0.2)"
                                        fontSize={10}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(v) => `$${v}`}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            background: '#050505',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '12px',
                                            boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                                        }}
                                        itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                                        labelStyle={{ fontSize: '10px', color: '#666', marginBottom: '4px', fontWeight: 'bold' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="cost"
                                        stroke="#2563eb"
                                        strokeWidth={2.5}
                                        fillOpacity={1}
                                        fill="url(#colorCost)"
                                        activeDot={{ r: 6, fill: '#2563eb', stroke: '#fff', strokeWidth: 2 }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="baseline"
                                        stroke="rgba(255,255,255,0.15)"
                                        strokeWidth={1.5}
                                        strokeDasharray="6 6"
                                        fill="transparent"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="glass-card">
                            <CardHeader className="pb-4 flex flex-row items-center justify-between">
                                <CardTitle className="text-sm font-bold uppercase tracking-wider opacity-60">Top Contributors</CardTitle>
                                <Button variant="ghost" size="sm" className="h-6 text-[10px] font-bold text-blue-400">VIEW ALL</Button>
                            </CardHeader>
                            <CardContent className="space-y-5 pt-0">
                                {mockServiceBreakdown.slice(0, 3).map((service, i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <div className="flex justify-between text-xs items-center font-bold">
                                            <span className="text-white/80">{service.service}</span>
                                            <span className="font-mono text-white/40">{formatCost(service.cost)}</span>
                                        </div>
                                        <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-500/50 rounded-full transition-all duration-1000"
                                                style={{ width: `${service.pct}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="bg-emerald-500/[0.02] border-emerald-500/10 p-6 flex flex-col justify-between h-full group">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 bg-emerald-500/10 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                                        <TrendingDown className="h-4 w-4 text-emerald-400" />
                                    </div>
                                    <h3 className="text-sm font-bold text-white">Efficiency Insight</h3>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                                    Your EKS clusters are currently over-provisioned. Rightsizing pods could save <span className="text-emerald-400 font-bold">$420/mo</span>.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 mt-6">
                                <Button variant="outline" size="sm" className="flex-1 h-9 text-[10px] border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/10 font-bold uppercase tracking-widest">Details</Button>
                                <Button variant="ghost" size="sm" className="h-9 text-[10px] font-bold uppercase tracking-widest text-white/30">Dismiss</Button>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Action Center - Active Alerts */}
                <div className="col-span-12 lg:col-span-4 h-full">
                    <Card className="glass-card border-rose-500/10 flex flex-col h-full bg-gradient-to-b from-rose-500/[0.02] to-transparent">
                        <CardHeader className="flex flex-row items-center justify-between pb-6">
                            <div className="space-y-1">
                                <CardTitle className="text-base font-bold flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 text-rose-500" />
                                    Critical Actions
                                </CardTitle>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">Requires Response</p>
                            </div>
                            <Badge variant="critical" className="bg-rose-500 text-white border-none shadow-lg shadow-rose-500/20 text-[10px] font-bold px-2 py-0.5">
                                {mockAlerts.length} OPEN
                            </Badge>
                        </CardHeader>
                        <CardContent className="space-y-4 flex-1">
                            {mockAlerts.map((alert) => (
                                <div key={alert.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all flex flex-col gap-3 group">
                                    <div className="flex justify-between items-start">
                                        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{alert.provider} · {alert.region}</span>
                                        <span className="text-[10px] text-white/30 font-medium italic">{alert.detected}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white mb-0.5 group-hover:text-blue-400 transition-colors">{alert.description}</h4>
                                        <p className="text-xs text-muted-foreground font-medium">Potential Impact: <span className="text-rose-400 font-bold">{formatCost(alert.impact)}</span></p>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Link href={`/alerts/${alert.id}`} className="flex-1">
                                            <Button variant="secondary" size="sm" className="w-full h-8 bg-white/5 hover:bg-blue-600 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-all">
                                                Investigate
                                            </Button>
                                        </Link>
                                        <Button variant="outline" size="sm" className="h-8 px-3 border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/20 transition-all">
                                            <CheckCircle2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            <div className="flex-1 flex flex-col items-center justify-center py-10 opacity-20 select-none pointer-events-none">
                                <CheckCircle2 className="h-10 w-10 mb-3" />
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-center">No other critical items</p>
                            </div>

                            <Button variant="ghost" className="w-full py-6 bg-white/[0.02] border border-dashed border-white/10 text-xs font-bold uppercase tracking-widest text-white/30 hover:text-white hover:border-white/20">
                                View Complete History
                            </Button>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    )
}
