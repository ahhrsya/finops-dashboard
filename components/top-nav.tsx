"use client"
import * as React from "react"
import { Bell, Search, User, Menu, Settings2, Sparkles, Command } from "lucide-react"
import { cn } from "@/lib/utils"

export function TopNav() {
    const [scrolled, setScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header className={cn(
            "h-16 shrink-0 flex items-center px-8 gap-8 sticky top-0 z-30 transition-all duration-300",
            scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
        )}>
            <div className="flex items-center gap-2 md:hidden">
                <Menu className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="flex-1 flex items-center gap-3">
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 opacity-50">
                    Analytics
                </p>
                <span className="text-white/10 text-xl font-thin">/</span>
                <h1 className="text-[13px] font-bold text-white uppercase tracking-wider">
                    Overview
                </h1>
            </div>

            <div className="hidden lg:flex items-center bg-white/[0.03] hover:bg-white/[0.05] border border-white/5 rounded-xl px-4 py-2 w-72 h-9 gap-3 transition-all group focus-within:border-blue-500/30">
                <Search className="h-3.5 w-3.5 text-muted-foreground group-hover:text-white transition-colors" />
                <input
                    placeholder="Search..."
                    className="bg-transparent border-none outline-none text-[12px] w-full text-white placeholder:text-muted-foreground/60"
                />
                <div className="flex items-center gap-1 opacity-20">
                    <Command className="h-3 w-3" />
                    <span className="text-[10px] font-bold">K</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* AI Action Button */}
                <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/10 border border-blue-500/20 rounded-lg text-blue-400 hover:bg-blue-600 hover:text-white transition-all group">
                    <Sparkles className="h-3.5 w-3.5 group-hover:animate-pulse" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Ask AI</span>
                </button>

                <div className="flex items-center gap-1">
                    <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-muted-foreground hover:text-white transition-colors">
                        <Settings2 className="h-4 w-4" />
                    </button>
                    <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-muted-foreground hover:text-white transition-colors relative">
                        <Bell className="h-4 w-4" />
                        <span className="absolute top-2 right-2 h-1.5 w-1.5 bg-rose-500 rounded-full border border-black" />
                    </button>
                </div>

                <div className="flex items-center gap-3 pl-4 border-l border-white/10 h-8">
                    <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/10 cursor-pointer overflow-hidden active:scale-95 transition-transform">
                        <User className="h-4 w-4 text-white" />
                    </div>
                </div>
            </div>
        </header>
    )
}
