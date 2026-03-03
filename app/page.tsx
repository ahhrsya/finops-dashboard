"use client"
import React from "react"
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
    Filter,
    MoreHorizontal,
    Plus,
    ArrowRight
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
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
                        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-1">Overview</h1>
                        <p className="text-sm text-muted-foreground font-medium">Monitoring efficiency across all cloud resources.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" className="h-10 bg-white/[0.03] border-white/10 text-white/70 hover:text-white rounded-xl">
                            <Calendar className="h-4 w-4 mr-2" />
                            Feb 2026
                        </Button>
                        <Button size="sm" className="h-10 bg-blue-600 hover:bg-blue-700 font-bold px-6 rounded-xl shadow-lg shadow-blue-500/20">
                            <Plus className="h-4 w-4 mr-2" />
                            New Report
                        </Button>
                    </div>
                </div>

                {/* AI Insight banner - Refined with shadcn style */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl opacity-10 group-hover:opacity-20 transition duration-500" />
                    <div className="relative bg-[#080808]/90 backdrop-blur-xl p-6 rounded-2xl border border-white/5 flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-6">
                            <div className="h-14 w-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0 shadow-inner">
                                <Sparkles className="h-7 w-7 text-blue-500 animate-pulse" />
                            </div>
                            <div className="space-y-1.5 text-center lg:text-left">
                                <div className="flex items-center justify-center lg:justify-start gap-2">
                                    <Badge variant="info" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[10px] font-bold px-2.5">AI COPILOT</Badge>
                                    <span className="text-[11px] text-white/40 font-bold uppercase tracking-widest">Savings Opportunity</span>
                                </div>
                                <p className="text-[15px] text-white/90 leading-relaxed font-semibold">
                                    I discovered <span className="text-emerald-400">$1,240/mo</span> in savings. <span className="text-white/40 font-medium">8 idle EC2 instances detected in us-east-1.</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 w-full lg:w-auto">
                            <Button variant="ghost" className="flex-1 lg:flex-none h-11 px-8 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 rounded-xl">Ignore</Button>
                            <Button className="flex-1 lg:flex-none h-11 px-8 bg-white text-black hover:bg-white/90 text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all active:scale-95">Analyze & Fix</Button>
                        </div>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <TabsList className="bg-transparent h-auto p-0 gap-8">
                        <TabsTrigger value="overview" className="bg-transparent p-0 pb-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none text-sm font-bold opacity-40 data-[state=active]:opacity-100 transition-all uppercase tracking-widest">Overview</TabsTrigger>
                        <TabsTrigger value="services" className="bg-transparent p-0 pb-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none text-sm font-bold opacity-40 data-[state=active]:opacity-100 transition-all uppercase tracking-widest">Services</TabsTrigger>
                        <TabsTrigger value="reports" className="bg-transparent p-0 pb-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none text-sm font-bold opacity-40 data-[state=active]:opacity-100 transition-all uppercase tracking-widest">Reports</TabsTrigger>
                    </TabsList>
                    <Button variant="ghost" size="sm" className="h-8 gap-2 text-white/40 hover:text-white">
                        <Filter className="h-3.5 w-3.5" />
                        Filters
                    </Button>
                </div>

                <TabsContent value="overview" className="space-y-8 m-0 outline-none">
                    {/* KPI Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {mockKpis.map((kpi, i) => (
                            <KpiCard key={i} {...kpi} />
                        ))}
                    </div>

                    <div className="grid grid-cols-12 gap-8 items-stretch">

                        {/* Main Cost Outlook Section */}
                        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                            <Card className="glass-card flex-1 shadow-2xl">
                                <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-white/5 mb-6">
                                    <div className="space-y-1">
                                        <CardTitle className="text-base font-bold">Daily Spend Performance</CardTitle>
                                        <p className="text-xs text-muted-foreground font-medium">Historical trend vs efficiency goals.</p>
                                    </div>
                                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest opacity-40">
                                        <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> Current</div>
                                        <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full border border-white/20" /> Planned</div>
                                    </div>
                                </CardHeader>
                                <CardContent className="h-[400px] pt-2 pr-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={mockChartData}>
                                            <defs>
                                                <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                                                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.02)" />
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
                                                    background: '#0a0a0a',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    borderRadius: '12px',
                                                    boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                                                }}
                                                itemStyle={{ fontSize: '13px', fontWeight: 'bold' }}
                                                labelStyle={{ fontSize: '10px', color: '#666', marginBottom: '4px', fontWeight: 'bold' }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="cost"
                                                stroke="#2563eb"
                                                strokeWidth={3}
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
                                <Card className="glass-card shadow-lg">
                                    <CardHeader className="pb-4 flex flex-row items-center justify-between border-b border-white/5 mb-4">
                                        <CardTitle className="text-sm font-bold uppercase tracking-wider opacity-60">Top Contributors</CardTitle>
                                        <Button variant="ghost" size="sm" className="h-6 text-[11px] font-bold text-blue-400 hover:bg-blue-400/10">ALL SERVICES</Button>
                                    </CardHeader>
                                    <CardContent className="space-y-6 pt-0">
                                        {mockServiceBreakdown.slice(0, 3).map((service, i) => (
                                            <div key={i} className="flex flex-col gap-2.5">
                                                <div className="flex justify-between text-xs items-center font-bold">
                                                    <span className="text-white/80">{service.service}</span>
                                                    <span className="text-white/40">{formatCost(service.cost)}</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-blue-500/60 rounded-full transition-all duration-1000"
                                                        style={{ width: `${service.pct}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                <Card className="bg-emerald-500/[0.03] border-emerald-500/10 p-7 flex flex-col justify-between h-full group">
                                    <div className="space-y-5">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 bg-emerald-500/10 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors shadow-inner">
                                                <TrendingDown className="h-5 w-5 text-emerald-400" />
                                            </div>
                                            <h3 className="text-[15px] font-bold text-white tracking-tight">Efficiency Insight</h3>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                                            Cloud compute clusters are currently <span className="text-white">58% underutilized</span>. Automated rightsizing could save <span className="text-emerald-400 font-bold">$420/mo</span> starting today.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 mt-8">
                                        <Button variant="secondary" size="sm" className="flex-1 h-10 text-[11px] bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 font-extrabold uppercase tracking-widest border border-emerald-500/10 rounded-xl">Details</Button>
                                        <Button variant="ghost" size="sm" className="h-10 text-[11px] font-extrabold uppercase tracking-widest text-white/20 hover:text-white rounded-xl">Dismiss</Button>
                                    </div>
                                </Card>
                            </div>
                        </div>

                        {/* Action Center - Active Alerts */}
                        <div className="col-span-12 lg:col-span-4 h-full">
                            <Card className="glass-card border-rose-500/10 flex flex-col h-full bg-gradient-to-b from-rose-500/[0.04] to-transparent shadow-xl">
                                <CardHeader className="flex flex-row items-center justify-between pb-6 border-b border-white/5 mb-4">
                                    <div className="space-y-1">
                                        <CardTitle className="text-base font-bold flex items-center gap-2">
                                            <AlertCircle className="h-4 w-4 text-rose-500" />
                                            Critical Actions
                                        </CardTitle>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">Immediate Attention</p>
                                    </div>
                                    <Badge variant="critical" className="bg-rose-500 text-white border-none shadow-lg shadow-rose-500/20 text-[10px] font-bold px-2 py-0.5">
                                        {mockAlerts.length} OPEN
                                    </Badge>
                                </CardHeader>
                                <CardContent className="space-y-4 flex-1 pt-0">
                                    {mockAlerts.map((alert) => (
                                        <div key={alert.id} className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all flex flex-col gap-4 group hover:bg-white/[0.05]">
                                            <div className="flex justify-between items-start">
                                                <Badge variant="outline" className="text-[9px] font-black text-white/30 border-white/10 uppercase tracking-widest px-2">{alert.provider} · {alert.region}</Badge>
                                                <span className="text-[11px] text-white/20 font-medium italic">{alert.detected}</span>
                                            </div>
                                            <div>
                                                <h4 className="text-[15px] font-bold text-white mb-1 group-hover:text-blue-400 transition-colors leading-tight">{alert.description}</h4>
                                                <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5 mt-2">
                                                    <TrendingDown className="h-3 w-3 text-rose-400" />
                                                    Impact: <span className="text-rose-400 font-bold">{formatCost(alert.impact)}</span> over baseline
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Link href={`/alerts/${alert.id}`} className="flex-1">
                                                    <Button variant="outline" size="sm" className="w-full h-10 border-white/10 bg-white/5 hover:bg-blue-600 hover:text-white hover:border-blue-600 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl">
                                                        Investigate
                                                    </Button>
                                                </Link>
                                                <Button variant="outline" size="sm" className="h-10 px-4 border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all rounded-xl">
                                                    <CheckCircle2 className="h-4.5 w-4.5" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="flex-1 flex flex-col items-center justify-center py-10 opacity-10 select-none pointer-events-none border border-dashed border-white/5 rounded-2xl">
                                        <CheckCircle2 className="h-12 w-12 mb-4" />
                                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-center">System Clean</p>
                                    </div>

                                    <Button variant="ghost" className="w-full py-7 bg-white/[0.02] border border-dashed border-white/10 text-xs font-bold uppercase tracking-widest text-white/30 hover:text-white hover:border-white/20 rounded-2xl">
                                        View Complete History
                                        <ArrowRight className="h-3.5 w-3.5 ml-2" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="services" className="m-0 outline-none">
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">Service Breakdown</CardTitle>
                            <p className="text-sm text-muted-foreground">Detailed cost and usage analysis per service.</p>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader className="border-b-2 border-white/5">
                                    <TableRow className="hover:bg-transparent border-white/5">
                                        <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Service</TableHead>
                                        <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Provider</TableHead>
                                        <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Cost</TableHead>
                                        <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Change</TableHead>
                                        <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Utilization</TableHead>
                                        <TableHead className="text-right"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockServiceBreakdown.map((service, i) => (
                                        <TableRow key={i} className="border-white/5 hover:bg-white/[0.02]">
                                            <TableCell className="font-bold text-white py-4">{service.service}</TableCell>
                                            <TableCell>
                                                <Badge variant={service.provider.toLowerCase() as any} className="text-[10px]">{service.provider}</Badge>
                                            </TableCell>
                                            <TableCell className="font-mono text-white/70">{formatCost(service.cost)}</TableCell>
                                            <TableCell>
                                                <span className={cn(
                                                    "text-[11px] font-bold px-2 py-0.5 rounded",
                                                    service.change > 10 ? "text-rose-400 bg-rose-400/10" : "text-emerald-400 bg-emerald-400/10"
                                                )}>
                                                    {service.change > 0 ? '+' : ''}{service.change}%
                                                </span>
                                            </TableCell>
                                            <TableCell className="w-48">
                                                <div className="space-y-1.5">
                                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-blue-500/50 rounded-full"
                                                            style={{ width: `${service.pct}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-[10px] text-white/30 font-bold">{service.pct}%</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-white/30 hover:text-white">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
