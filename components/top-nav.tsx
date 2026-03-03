"use client"
import * as React from "react"
import { Bell, Search, User, Menu, Settings2, Moon, Sun, SearchIcon, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function TopNav() {
    const [scrolled, setScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header className={cn(
            "h-16 shrink-0 flex items-center px-8 gap-8 sticky top-0 z-30 transition-all duration-300",
            scrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
        )}>
            <div className="flex items-center gap-2 md:hidden">
                <Menu className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="flex-1 flex items-center gap-3">
                <p className="text-[11px] font-display font-medium text-muted-foreground uppercase tracking-widest flex items-center gap-1.5 opacity-60">
                    <span className="h-1 w-1 rounded-full bg-neon-pink shadow-glow" />
                    General
                </p>
                <span className="text-white/10 text-xl font-thin tracking-tighter">/</span>
                <h1 className="text-[13px] font-sans font-bold text-white uppercase tracking-wider items-center flex gap-2">
                    Dashboard Analytics
                </h1>
            </div>

            <div className="hidden lg:flex items-center bg-white/[0.03] hover:bg-white/[0.05] border border-white/5 rounded-2xl px-4 py-2 w-72 h-10 gap-3 transition-all group focus-within:w-80 focus-within:border-white/20">
                <Search className="h-4 w-4 text-muted-foreground group-hover:text-white transition-colors" />
                <input
                    placeholder="Command Palette (⌘K)"
                    className="bg-transparent border-none outline-none text-[12px] font-sans w-full text-white placeholder:text-muted-foreground tracking-tight"
                />
                <div className="flex items-center gap-1 opacity-40 group-focus-within:opacity-0 transition-opacity">
                    <span className="text-[10px] font-mono border border-white/10 px-1.5 py-0.5 rounded-md">⌘</span>
                    <span className="text-[10px] font-mono border border-white/10 px-1.5 py-0.5 rounded-md">K</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center bg-white/[0.02] border border-white/5 p-1 rounded-xl">
                    <button className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-white">
                        <Settings2 className="h-[14px] w-[14px]" />
                    </button>
                    <button className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-white relative">
                        <Bell className="h-[14px] w-[14px]" />
                        <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 bg-neon-pink rounded-full blur-[0.5px]" />
                    </button>
                </div>

                <div className="flex items-center gap-3 pl-4 border-l border-white/5 h-8">
                    <div className="flex flex-col items-end hidden sm:block">
                        <span className="text-[11px] font-bold text-white line-height-tight leading-none">Engineering</span>
                        <span className="text-[9px] font-mono text-neon-blue uppercase tracking-tighter">Pro Level</span>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple p-[1px] hover:scale-105 transition-transform cursor-pointer overflow-hidden shadow-lg shadow-neon-blue/20 group">
                        <div className="bg-black w-full h-full rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
