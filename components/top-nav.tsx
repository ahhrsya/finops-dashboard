"use client"
import * as React from "react"
import { Bell, Search, User, Menu } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function TopNav() {
    return (
        <header className="h-14 shrink-0 border-b border-border bg-card/80 backdrop-blur-sm flex items-center px-6 gap-4 sticky top-0 z-10">
            <div className="flex items-center gap-2 md:hidden">
                <Menu className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="flex-1 flex items-center gap-2">
                <span className="text-sm font-sans text-muted-foreground">Overview</span>
                <span className="text-muted-foreground">/</span>
                <span className="text-sm font-sans font-medium">Main Dashboard</span>
            </div>

            <div className="hidden lg:flex items-center bg-input border border-border rounded-md px-3 py-1.5 w-64 gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                    placeholder="Search..."
                    className="bg-transparent border-none outline-none text-xs font-sans w-full"
                />
            </div>

            <div className="flex items-center gap-2">
                <button className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-accent transition-colors relative">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 bg-red-500 rounded-full" />
                </button>
                <div className="h-8 w-8 rounded-full bg-secondary border border-border flex items-center justify-center cursor-pointer overflow-hidden">
                    <User className="h-4 w-4 text-muted-foreground" />
                </div>
            </div>
        </header>
    )
}
