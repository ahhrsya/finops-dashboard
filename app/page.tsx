"use client"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MoreHorizontal, Globe, Users, TrendingUp, TrendingDown, Info, ArrowUpRight, Zap, Target } from "lucide-react"
import {
    mockKpis,
    mockChartDataMonth,
    mockLocationData,
    mockMostPopular,
    mockStatistics
} from "@/lib/mock-data"
import { KpiCard } from "@/components/kpi-card"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, BarChart, Bar, Cell
} from 'recharts'
import { chartConfig } from "@/lib/chart-config"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
    const [activeTab, setActiveTab] = React.useState("Review")
    const tabs = ["Review", "Content", "Analytics", "Subscribers"]

    return (
        <div className="p-8 space-y-8 animate-fade-up max-w-[1600px] mx-auto overflow-hidden">

            {/* Header Controls */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-2.5 gap-3 shadow-inner">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-[12px] font-mono font-medium text-white/70">01.11.2026 - 30.11.2026</span>
                </div>

                <nav className="flex items-center bg-white/[0.02] border border-white/5 p-1.5 rounded-2xl">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "px-5 py-2 text-[11px] font-display font-bold uppercase tracking-widest rounded-xl transition-all",
                                activeTab === tab
                                    ? "bg-white/5 text-white shadow-lg shadow-white/5 border border-white/10"
                                    : "text-muted-foreground hover:text-white"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </header>

            <div className="grid grid-cols-12 gap-8 items-start">

                {/* Left Column - Main Analytics (3/4 width) */}
                <div className="col-span-12 lg:col-span-8 xl:col-span-9 space-y-8">

                    {/* Top KPI Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                        <KpiCard {...mockKpis[0]} />
                        <div className="glass-card rounded-[2rem] p-6 h-48 flex flex-col justify-between group overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/10 blur-[80px]" />
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60">Revenue Location</p>
                                    <h3 className="text-2xl font-display font-black tracking-tight text-white mt-2 flex items-center gap-2">
                                        <span className="text-muted-foreground/30">$</span>84,320
                                        <span className="text-[11px] font-mono text-neon-green ml-2 tracking-tighter self-center uppercase">+14% Growth</span>
                                    </h3>
                                </div>
                                <Globe className="h-4 w-4 text-neon-blue neon-glow-blue opacity-40" />
                            </div>

                            <div className="flex items-end justify-between mt-auto">
                                {mockLocationData.map((loc, i) => (
                                    <div key={i} className="flex flex-col gap-2 items-center text-center">
                                        <div className="h-10 w-10 flex items-center justify-center relative">
                                            <svg className="w-full h-full -rotate-90">
                                                <circle cx="20" cy="20" r="16" stroke="white" strokeWidth="2.5" fill="transparent" className="opacity-5" />
                                                <circle cx="20" cy="20" r="16" stroke={loc.color} strokeWidth="2.5" fill="transparent" strokeDasharray={100} strokeDashoffset={100 - loc.value} strokeLinecap="round" className="opacity-80 drop-shadow-[0_0_4px_rgba(0,0,0,0.5)]" />
                                            </svg>
                                            <span className="absolute text-[8px] font-bold text-white leading-none">{loc.value}%</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-display font-bold text-white leading-none">{loc.name}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Visits Chart Card - Wide (Reference Image 1) */}
                    <Card className="glass-card rounded-[2.5rem] border-white/5 overflow-hidden">
                        <CardContent className="p-8">
                            <div className="flex items-start justify-between mb-10">
                                <div>
                                    <h2 className="text-lg font-display font-black text-white flex items-center gap-2">
                                        Total Visits
                                        <Info className="h-3 w-3 text-muted-foreground/50 cursor-pointer" />
                                    </h2>
                                    <p className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground/50 mt-1">Provisions Month</p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="flex flex-col text-right">
                                        <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground leading-none">Monthly Average</span>
                                        <span className="text-xl font-display font-black text-white mt-1">2,458,124</span>
                                    </div>
                                    <div className="h-12 border-l border-white/5" />
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center bg-white/[0.03] border border-white/5 px-4 py-2 rounded-xl gap-2 cursor-pointer hover:bg-white/[0.06] transition-colors">
                                            <Calendar className="h-3 w-3 text-muted-foreground" />
                                            <span className="text-[11px] font-mono font-bold text-white/60">November 2026</span>
                                        </div>
                                        <MoreHorizontal className="h-4 w-4 text-muted-foreground hover:text-white cursor-pointer" />
                                    </div>
                                </div>
                            </div>

                            <div className="h-[320px] w-full relative">
                                <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-20" />
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={mockChartDataMonth}>
                                        <defs>
                                            <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#00C8FF" stopOpacity={0.4} />
                                                <stop offset="95%" stopColor="#00C8FF" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                                        <XAxis
                                            dataKey="day"
                                            stroke="rgba(255,255,255,0.15)"
                                            fontSize={9}
                                            tickLine={false}
                                            axisLine={false}
                                            dy={10}
                                            fontFamily="IBM Plex Mono"
                                        />
                                        <YAxis
                                            stroke="rgba(255,255,255,0.15)"
                                            fontSize={9}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(v) => `${v}K`}
                                            fontFamily="IBM Plex Mono"
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                background: 'rgba(0,0,0,0.95)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '16px',
                                                boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                                                backdropFilter: 'blur(20px)',
                                                padding: '12px 16px'
                                            }}
                                            itemStyle={{ fontSize: '11px', fontFamily: 'IBM Plex Mono', color: '#fff' }}
                                            labelStyle={{ fontSize: '10px', color: '#666', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '2px' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="visits"
                                            stroke="#00C8FF"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorVisits)"
                                            animationDuration={1500}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="revenue"
                                            stroke="#FF5C00"
                                            strokeWidth={2}
                                            strokeDasharray="5 5"
                                            fill="transparent"
                                            animationDuration={2000}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Bottom Audience Chart - High Contrast Bars (Reference Image 1) */}
                    <Card className="glass-card rounded-[2.5rem] border-white/5 overflow-hidden">
                        <CardContent className="p-8 py-10">
                            <div className="flex items-center justify-between mb-12">
                                <div>
                                    <h2 className="text-lg font-display font-black text-white">Audience Insights</h2>
                                </div>
                                <div className="flex items-center gap-2 bg-white/[0.03] border border-white/5 rounded-xl px-4 py-2">
                                    <span className="text-[11px] font-mono text-white/50">Year:</span>
                                    <span className="text-[11px] font-mono font-black text-white">2026</span>
                                    <span className="ml-2 text-[11px] opacity-20">▼</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-12 gap-10">
                                <div className="col-span-8 h-[240px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={[
                                            { m: 'Jan', s: 400, r: 240, o: 100 }, { m: 'Feb', s: 300, r: 139, o: 210 },
                                            { m: 'Mar', s: 200, r: 500, o: 150 }, { m: 'Apr', s: 278, r: 190, o: 170 },
                                            { m: 'May', s: 189, r: 480, o: 150 }, { m: 'Jun', s: 350, r: 380, o: 250 },
                                            { m: 'Jul', s: 239, r: 380, o: 120 }
                                        ]}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.02)" />
                                            <XAxis dataKey="m" axisLine={false} tickLine={false} stroke="rgba(255,255,255,0.2)" fontSize={9} dy={10} fontFamily="IBM Plex Mono" />
                                            <Bar dataKey="s" fill="#FF0080" radius={[4, 4, 0, 0]} barSize={8} />
                                            <Bar dataKey="r" fill="#00C8FF" radius={[4, 4, 0, 0]} barSize={8} />
                                            <Bar dataKey="o" fill="#FFD700" radius={[4, 4, 0, 0]} barSize={8} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="col-span-4 space-y-6 flex flex-col justify-center">
                                    {[
                                        { label: 'Search', val: '3,124,213', color: 'bg-neon-pink' },
                                        { label: 'Recommended', val: '1,523,151', color: 'bg-neon-blue' },
                                        { label: 'Other', val: '948,213', color: 'bg-neon-yellow' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex flex-col gap-1 pl-4 border-l-2 border-white/5 relative hover:border-white/20 transition-all cursor-default">
                                            <div className={cn("absolute -left-[2px] top-1 bottom-1 w-[2px]", item.color)} />
                                            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest leading-none">{item.label}</span>
                                            <span className="text-sm font-display font-black text-white">{item.val} <span className="text-[9px] font-normal text-muted-foreground/50 ml-1">users</span></span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Stats & Popular (1/4 width) */}
                <div className="col-span-12 lg:col-span-4 xl:col-span-3 space-y-8">

                    {/* Summary Circular Stats */}
                    <Card className="glass-card rounded-[2.5rem] border-white/5 p-8 space-y-10">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-display font-black text-white">Statistics</h2>
                            <Badge variant="outline" className="text-[9px] font-mono tracking-widest bg-white/[0.03] border-white/5 uppercase">Last 48h</Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            {mockStatistics.map((stat, i) => (
                                <div key={i} className="flex flex-col items-center text-center gap-4">
                                    <div className="h-20 w-20 relative flex items-center justify-center">
                                        <svg className="w-full h-full -rotate-90">
                                            <circle cx="40" cy="40" r="34" stroke="white" strokeWidth="5" fill="transparent" className="opacity-5" />
                                            <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="5" fill="transparent" strokeDasharray={214} strokeDashoffset={214 * 0.3} strokeLinecap="round" className={cn("neon-glow-pink transition-all duration-1000", stat.color)} />
                                        </svg>
                                        <span className={cn("absolute text-[11px] font-black", stat.color)}>{stat.change}</span>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                                        <p className="text-lg font-display font-black text-white">{stat.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="relative pt-6 border-t border-white/5">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground">Time View</span>
                                <span className="text-[10px] font-black text-white">2026 ▼</span>
                            </div>
                            <div className="h-[100px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={mockChartDataMonth}>
                                        <Line type="monotone" dataKey="visits" stroke="#FF0080" strokeWidth={2} dot={false} strokeDasharray="3 3" />
                                        <Line type="monotone" dataKey="revenue" stroke="#00C8FF" strokeWidth={2} dot={{ r: 2, fill: '#00C8FF' }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </Card>

                    {/* Most Popular List */}
                    <Card className="glass-card rounded-[2.5rem] border-white/5 p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-sm font-display font-black text-white">Most Popular</h2>
                            <span className="text-[10px] text-muted-foreground font-mono">1 Month ▼</span>
                        </div>

                        <div className="space-y-6">
                            {mockMostPopular.map((item, i) => (
                                <div key={i} className="flex items-center justify-between group cursor-pointer">
                                    <div className="max-w-[70%]">
                                        <p className="text-[11px] font-sans font-medium text-white/80 group-hover:text-white transition-colors truncate">{item.name}</p>
                                        <div className="h-1 w-0 group-hover:w-full bg-neon-blue transition-all duration-300 mt-1 opacity-40 shrink-0" />
                                    </div>
                                    <span className="text-[11px] font-mono font-black text-muted-foreground group-hover:text-neon-blue transition-colors">{item.views}</span>
                                </div>
                            ))}

                            <button className="w-full mt-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground hover:bg-white/5 hover:text-white transition-all">
                                See More
                            </button>
                        </div>
                    </Card>

                    {/* Footer Action Badges (Small) */}
                    <div className="flex flex-wrap gap-2">
                        {['Status', 'Help', 'Blog', 'Updates', 'About'].map((link) => (
                            <button key={link} className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-[9px] font-mono uppercase tracking-widest text-muted-foreground hover:text-white transition-colors">
                                {link}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}
