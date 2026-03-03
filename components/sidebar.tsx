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
    User
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/" },
    { icon: BellRing, label: "Notifications", href: "/notifications" },
    { icon: ShieldAlert, label: "Cost Alerts", href: "/alerts" },
    { icon: Activity, label: "Anomalies", href: "/anomalies" },
    { icon: Database, label: "Services", href: "/services" },
    { icon: LineChart, label: "Cost Explorer", href: "/explorer" },
    { icon: Layers, label: "Budget Caps", href: "/budgets" },
    { icon: FileText, label: "Reports", href: "/reports" },
    { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className={cn(
            "hidden md:flex shrink-0 flex-col border-r border-border bg-card w-14 xl:w-[200px] transition-all duration-200"
        )}>
            {/* Logo */}
            <div className="h-14 flex items-center px-4 border-b border-border shrink-0">
                <div className="h-6 w-6 rounded bg-primary flex items-center justify-center mr-3 shrink-0">
                    <div className="h-3 w-3 bg-primary-foreground transform rotate-45" />
                </div>
                <span className="font-display font-bold text-primary hidden xl:block">FinOps</span>
            </div>

            {/* Nav items */}
            <nav className="flex-1 p-2 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                                isActive
                                    ? "bg-primary/10 text-primary border-l-2 border-primary rounded-l-none"
                                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            )}
                        >
                            <item.icon className="h-4 w-4 shrink-0" />
                            <span className="hidden xl:block font-sans text-sm">{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* User avatar bottom */}
            <div className="p-3 border-t border-border mt-auto">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-secondary border border-border flex items-center justify-center shrink-0">
                        <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="hidden xl:block overflow-hidden">
                        <p className="text-xs font-sans font-medium truncate">Engineer One</p>
                        <p className="text-[10px] font-mono text-muted-foreground truncate">one@finops.app</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}
