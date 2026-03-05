import * as React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "../../lib/utils"

interface CardProps extends HTMLMotionProps<"div"> {
    variant?: "glass" | "glass-dark" | "default" | "neobrutalism"
    hoverEffect?: "glow" | "lift" | "none"
    children?: React.ReactNode
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = "glass", hoverEffect = "none", children, ...props }, ref) => {

        const variants = {
            glass: "glass",
            "glass-dark": "glass-dark",
            default: "bg-white border border-slate-100 shadow-sm",
            neobrutalism: "bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        }

        const hoverEffects = {
            glow: "hover:shadow-lg hover:shadow-indigo-500/10 transition-shadow duration-500",
            lift: "hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 ease-out",
            none: "",
        }

        return (
            <motion.div
                ref={ref}
                className={cn("rounded-2xl p-6 relative overflow-hidden", variants[variant], hoverEffects[hoverEffect], className)}
                {...props}
            >
                {children}
                {/* Shine effect for glass cards */}
                {variant === "glass" && (
                    <div className="absolute inset-0 z-[-1] bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-30 pointer-events-none" />
                )}
            </motion.div>
        )
    }
)
Card.displayName = "Card"

export { Card }
