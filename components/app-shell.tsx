"use client"
import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isOnboarding = pathname === "/onboarding"

    if (isOnboarding) return <div className="bg-background text-foreground h-screen">{children}</div>

    return (
        <div className="flex h-screen bg-background overflow-hidden text-foreground">
            <Sidebar />
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                <TopNav />
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
