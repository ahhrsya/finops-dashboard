"use client"
import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isOnboarding = pathname === "/onboarding"

    if (isOnboarding) return <div className="bg-black text-foreground min-h-screen selection:bg-primary/30 selection:text-white">{children}</div>

    return (
        <div className="flex h-screen bg-black overflow-hidden text-foreground selection:bg-primary/30 selection:text-white relative">
            <div className="bg-bloom" />
            <Sidebar />
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative z-10">
                <TopNav />
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
