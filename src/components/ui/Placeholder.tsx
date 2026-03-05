import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

interface PlaceholderProps {
    type?: "video" | "3d-render" | "image"
    className?: string
    label?: string
}

const Placeholder: React.FC<PlaceholderProps> = ({ type = "image", className, label }) => {
    return (
        <div className={cn("relative w-full h-full bg-muted/30 overflow-hidden rounded-xl group", className)}>
            {/* Background Animation */}
            <div className="absolute inset-0 opacity-20">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-gray-300/20 to-transparent"
                    animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "linear"
                    }}
                    style={{ backgroundSize: "200% 200%" }}
                />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-muted-foreground z-10">
                {type === "video" && (
                    <motion.div
                        className="w-16 h-16 rounded-full border-2 border-current flex items-center justify-center mb-4 opacity-50 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.1 }}
                    >
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-current border-b-[8px] border-b-transparent ml-1" />
                    </motion.div>
                )}

                {type === "3d-render" && (
                    <motion.div
                        className="w-16 h-16 border border-current/30 rounded-lg mb-4 flex items-center justify-center"
                        animate={{ rotateY: 180 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="w-8 h-8 bg-current/10 rounded-full blur-sm" />
                    </motion.div>
                )}

                {label && <span className="text-xs font-medium tracking-widest uppercase opacity-70">{label}</span>}
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            {/* Helper text for development */}
            <div className="absolute bottom-2 right-2 text-[10px] text-muted-foreground/40 font-mono">
                {type.toUpperCase()}_PLACEHOLDER
            </div>
        </div>
    )
}

export { Placeholder }
