"use client"
import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    BellRing,
    ShieldAlert,
    Activity,
    Layers,
    LineChart,
    Settings,
    Database,
    FileText,
    User,
    LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/" },
    { icon: BellRing, label: "Notifications", href: "/notifications" },
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
            "hidden md:flex shrink-0 flex-col border-r border-white/5 bg-black/40 backdrop-blur-3xl w-16 xl:w-[220px] transition-all duration-300 relative z-20"
        )}>
            {/* Logo */}
            <Link href="/" className="h-16 flex items-center px-4 mb-4 mt-2 shrink-0 group">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-neon-pink to-neon-purple flex items-center justify-center mr-3 shrink-0 shadow-lg shadow-neon-pink/20 group-hover:scale-105 transition-transform">
                    <div className="h-3 w-3 bg-white transform rotate-45" />
                </div>
                <span className="font-display font-black text-xl tracking-tighter hidden xl:block bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40">FINOPS</span>
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
                                "flex items-center gap-4 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                                isActive
                                    ? "bg-white/5 text-white"
                                    : "text-muted-foreground hover:bg-white/[0.03] hover:text-foreground"
                            )}
                        >
                            <item.icon className={cn(
                                "h-[18px] w-[18px] shrink-0 transition-transform duration-200 group-hover:scale-110",
                                isActive ? "text-neon-pink neon-glow-pink" : "text-muted-foreground group-hover:text-neon-blue"
                            )} />
                            <span className="hidden xl:block font-sans text-[13px] font-medium tracking-wide">{item.label}</span>
                            {isActive && (
                                <div className="absolute left-0 w-1 h-4 bg-neon-pink rounded-full blur-[2px] xl:hidden" />
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* User avatar bottom */}
            <div className="p-4 border-t border-white/5 mt-auto bg-white/[0.02]">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#1E2330] to-black border border-white/10 flex items-center justify-center shrink-0 overflow-hidden shadow-inner group cursor-pointer">
                        <User className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors" />
                    </div>
                    <div className="hidden xl:block overflow-hidden">
                        <p className="text-[12px] font-sans font-bold text-white truncate">Engineer One</p>
                        <p className="text-[10px] font-mono text-muted-foreground truncate uppercase tracking-tighter opacity-70">Admin Access</p>
                    </div>
                    <button className="ml-auto hidden xl:block p-1.5 hover:bg-white/5 rounded-lg text-muted-foreground hover:text-red-400 transition-colors">
                        <LogOut className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </aside>
    )
}
