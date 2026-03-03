"use client"
import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    BellRing,
    ShieldAlert,
    Activity,
    Database,
    LineChart,
    Settings,
    Layers,
    FileText,
    User,
    LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/" },
    { icon: ShieldAlert, label: "Cost Alerts", href: "/alerts" },
    { icon: Activity, label: "Anomalies", href: "/anomalies" },
    { icon: Database, label: "Services", href: "/services" },
    { icon: LineChart, label: "Explorer", href: "/explorer" },
    { icon: Layers, label: "Budgets", href: "/budgets" },
    { icon: FileText, label: "Reports", href: "/reports" },
    { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className={cn(
            "hidden md:flex shrink-0 flex-col border-r border-white/5 bg-black w-16 xl:w-[240px] transition-all duration-300 relative z-20"
        )}>
            {/* Logo */}
            <Link href="/" className="h-20 flex items-center px-6 mb-6 mt-2 shrink-0 group">
                <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center mr-3 shrink-0 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                    <div className="h-3.5 w-3.5 bg-white rounded-sm" />
                </div>
                <span className="font-bold text-lg tracking-tight hidden xl:block text-white">FinOps</span>
            </Link>

            {/* Nav items */}
            <nav className="flex-1 px-3 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                                isActive
                                    ? "bg-blue-600/10 text-blue-400"
                                    : "text-muted-foreground hover:bg-white/[0.03] hover:text-foreground"
                            )}
                        >
                            <item.icon className={cn(
                                "h-[18px] w-[18px] shrink-0 transition-transform duration-200 group-hover:scale-110",
                                isActive ? "text-blue-500" : "text-muted-foreground group-hover:text-white"
                            )} />
                            <span className="hidden xl:block font-medium text-[13px] tracking-tight">{item.label}</span>
                            {isActive && (
                                <div className="absolute left-0 w-1 h-5 bg-blue-600 rounded-full xl:hidden shadow-glow" />
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* User profile bottom */}
            <div className="p-4 border-t border-white/5 bg-white/[0.01]">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="hidden xl:block overflow-hidden">
                        <p className="text-[12px] font-bold text-white truncate leading-none mb-1">Alex Rivera</p>
                        <p className="text-[10px] text-muted-foreground truncate uppercase font-medium tracking-tight">FinOps Lead</p>
                    </div>
                    <button className="ml-auto hidden xl:block p-1.5 hover:bg-white/5 rounded-lg text-muted-foreground hover:text-rose-400 transition-colors">
                        <LogOut className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </aside>
    )
}
