"use client"
import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Cloud, Zap, Shield, ArrowRight, Check } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const providers = [
    { id: 'aws', name: 'AWS', icon: Cloud, color: 'text-orange-400' },
    { id: 'gcp', name: 'GCP', icon: zap => <Zap className="h-4 w-4" />, color: 'text-blue-400' },
    { id: 'azure', name: 'Azure', icon: Shield, color: 'text-sky-400' },
]

export default function OnboardingPage() {
    const [step, setStep] = React.useState(1)
    const [connected, setConnected] = React.useState<string[]>([])
    const router = useRouter()

    const handleConnect = (id: string) => {
        if (!connected.includes(id)) {
            setConnected([...connected, id])
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0A0C10] animate-fade-up">
            <div className="w-full max-w-[480px] space-y-8">
                <div className="flex flex-col items-center text-center space-y-2">
                    <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center mb-2">
                        <div className="h-5 w-5 bg-primary-foreground transform rotate-45" />
                    </div>
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">Step {step} of 3</p>
                    <h1 className="text-3xl font-display font-bold">Connect your cloud accounts</h1>
                    <p className="text-sm font-sans text-muted-foreground max-w-[320px]">
                        Monitor spend across providers in real-time. Setup takes under 2 minutes.
                    </p>
                </div>

                <Card className="bg-[#111318] border-[#1E2330] shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-secondary">
                        <div className="h-full bg-primary transition-all duration-500" style={{ width: `${connected.length > 0 ? 66 : 33}%` }} />
                    </div>

                    <CardHeader className="pt-8">
                        <CardTitle className="font-display font-bold text-base">Select Provider</CardTitle>
                        <CardDescription className="text-xs">Connect your infrastructure to start the analysis.</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        {providers.map((p) => {
                            const isConnected = connected.includes(p.id)
                            return (
                                <button
                                    key={p.id}
                                    onClick={() => handleConnect(p.id)}
                                    className={cn(
                                        "w-full flex items-center justify-between p-4 rounded-md border transition-all h-16 group",
                                        isConnected
                                            ? "border-primary bg-primary/5 cursor-default"
                                            : "border-[#1E2330] bg-[#161A22] hover:border-[#3A4050] hover:bg-[#1E2330]"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={cn("h-8 w-8 rounded flex items-center justify-center bg-black/20", p.color)}>
                                            {typeof p.icon === 'function' ? p.icon({}) : <p.icon className="h-4 w-4" />}
                                        </div>
                                        <span className="font-sans font-medium">{p.name} {isConnected && "Account"}</span>
                                    </div>
                                    {isConnected ? (
                                        <Badge variant="ok" className="gap-1 animate-fade-up"><Check className="h-3 w-3" /> Connected</Badge>
                                    ) : (
                                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                    )}
                                </button>
                            )
                        })}

                        <div className="pt-6 flex flex-col gap-3">
                            <button
                                onClick={() => router.push('/')}
                                disabled={connected.length === 0}
                                className={cn(
                                    "w-full py-3 rounded-md font-sans font-bold transition-all flex items-center justify-center gap-2",
                                    connected.length > 0
                                        ? "bg-primary text-primary-foreground hover:opacity-90"
                                        : "bg-secondary text-muted-foreground cursor-not-allowed"
                                )}
                            >
                                Continue <ArrowRight className="h-4 w-4" />
                            </button>
                            <Link href="/" className="text-xs font-mono text-muted-foreground hover:text-foreground text-center transition-colors">
                                Skip for now
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <p className="text-[10px] font-mono text-muted-foreground text-center uppercase tracking-widest">
                    Trusted by 500+ DevOps Teams
                </p>
            </div>
        </div>
    )
}

// Helper icons specifically for this page if needed
function ChevronRight(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    )
}

import { cn } from "@/lib/utils"
