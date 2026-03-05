import * as React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "../../lib/utils"
import { Loader2 } from "lucide-react"

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "default" | "outline" | "ghost" | "secondary" | "link"
    size?: "default" | "sm" | "lg" | "icon"
    isLoading?: boolean
    children?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", isLoading, children, ...props }, ref) => {

        // Base styles
        const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"

        // Variants
        const variants = {
            default: "bg-brand-gradient text-white shadow-md hover:shadow-lg hover:shadow-indigo-500/20 border-0",
            outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900",
            ghost: "hover:bg-slate-100 text-slate-600 hover:text-slate-900",
            secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
            link: "text-indigo-600 underline-offset-4 hover:underline",
        }

        // Sizes
        const sizes = {
            default: "h-10 px-6 py-2",
            sm: "h-8 rounded-md px-3 text-xs",
            lg: "h-12 rounded-md px-8 text-lg",
            icon: "h-10 w-10",
        }

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </motion.button>
        )
    }
)
Button.displayName = "Button"

export { Button }
