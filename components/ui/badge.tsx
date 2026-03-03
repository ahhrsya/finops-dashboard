import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-mono uppercase tracking-wide font-semibold",
    {
        variants: {
            variant: {
                default: "bg-primary/10 text-primary border-primary/40",
                critical: "bg-red-500/15 text-red-400 border-red-500/40 animate-alert-pulse",
                warning: "bg-yellow-500/15 text-yellow-400 border-yellow-500/40",
                info: "bg-blue-500/15 text-blue-400 border-blue-500/40",
                ok: "bg-emerald-500/15 text-emerald-400 border-emerald-500/40",
                aws: "bg-orange-500/15 text-orange-400 border-orange-500/40",
                gcp: "bg-blue-500/15 text-blue-400 border-blue-500/40",
                azure: "bg-sky-500/15 text-sky-400 border-sky-500/40",
                outline: "border-border text-muted-foreground bg-transparent",
                secondary: "bg-secondary text-secondary-foreground border-transparent",
            }
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
