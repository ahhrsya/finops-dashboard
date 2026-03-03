"use client"
import * as React from "react"
import Link from "next/link"
import { Search, Filter, ArrowUpDown, ChevronRight, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { mockAlerts } from "@/lib/mock-data"
import { formatCost, cn } from "@/lib/utils"

export default function AlertsListPage() {
    return (
        <div className="p-6 space-y-6 max-w-[1440px] mx-auto animate-fade-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display font-bold">Cost Alerts</h1>
                    <p className="text-sm font-sans text-muted-foreground">Monitor and manage real-time cloud spend anomalies.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 bg-secondary border border-border rounded-md text-sm font-sans hover:bg-accent transition-all">
                        <Download className="h-4 w-4" />
                        <span>Export CSV</span>
                    </button>
                    <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-sans font-bold rounded-md hover:opacity-90 transition-all">
                        + New Alert Rule
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: "Critical", count: 3, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
                    { label: "Warning", count: 5, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
                    { label: "Resolved", count: 12, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
                ].map((stat, i) => (
                    <Card key={i} className={cn("bg-card", stat.border)}>
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                                <p className={cn("text-2xl font-display font-bold", stat.color)}>{stat.count}</p>
                            </div>
                            <div className={cn("h-10 w-10 rounded-full flex items-center justify-center font-mono text-xs", stat.bg, stat.color)}>
                                {stat.label[0]}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 bg-secondary/30 p-2 rounded-lg border border-border">
                <div className="flex items-center bg-input border border-border rounded px-3 py-1.5 flex-1 min-w-[200px] gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <input placeholder="Search alerts..." className="bg-transparent border-none outline-none text-xs font-sans w-full" />
                </div>
                <select className="bg-input border border-border rounded px-3 py-1.5 text-xs font-sans outline-none focus:ring-1 focus:ring-primary/40">
                    <option>All Severities</option>
                    <option>Critical</option>
                    <option>Warning</option>
                </select>
                <select className="bg-input border border-border rounded px-3 py-1.5 text-xs font-sans outline-none focus:ring-1 focus:ring-primary/40">
                    <option>All Providers</option>
                    <option>AWS</option>
                    <option>GCP</option>
                    <option>Azure</option>
                </select>
                <button className="p-2 hover:bg-accent rounded-md border border-transparent hover:border-border transition-all">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                </button>
            </div>

            {/* Alert Table */}
            <Card className="bg-card border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border bg-popover">
                                <th className="px-4 py-3 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Severity</th>
                                <th className="px-4 py-3 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Service</th>
                                <th className="px-4 py-3 text-[10px] font-mono text-muted-foreground uppercase tracking-widest ">Description</th>
                                <th className="px-4 py-3 text-[10px] font-mono text-muted-foreground uppercase tracking-widest text-right">Impact</th>
                                <th className="px-4 py-3 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Detected</th>
                                <th className="px-4 py-3 text-[10px] font-mono text-muted-foreground uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockAlerts.map((alert) => (
                                <tr key={alert.id} className="border-b border-border/40 hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-4 py-4">
                                        <Badge variant={alert.severity as any}>{alert.severity}</Badge>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-2">
                                            <Badge variant={alert.provider.toLowerCase() as any} className="px-1 py-0">{alert.provider}</Badge>
                                            <span className="text-sm font-sans font-medium">{alert.service}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm font-sans text-muted-foreground">{alert.description}</td>
                                    <td className="px-4 py-4 text-sm font-mono text-right text-red-400">{formatCost(alert.impact)}</td>
                                    <td className="px-4 py-4 text-xs font-mono text-muted-foreground">{alert.detected} ago</td>
                                    <td className="px-4 py-4 text-right">
                                        <Link
                                            href={`/alerts/${alert.id}`}
                                            className="inline-flex items-center gap-1 text-xs font-sans text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            View Details
                                            <ChevronRight className="h-3 w-3" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}
