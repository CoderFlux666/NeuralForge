import { motion } from "framer-motion"
import { Button } from "./ui/Button"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { StickerText } from "./StickerText"

export function Hero() {
    return (
        <section className="relative min-h-[85vh] flex items-center justify-center bg-white pt-20 overflow-hidden">

            <div className="container mx-auto px-6 text-center z-10">

                {/* Announcement Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-slate-600 text-xs sm:text-sm font-medium transition-colors hover:bg-slate-100 cursor-pointer">
                        <span className="font-semibold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full text-[10px] sm:text-xs">New: AI Brainstorm</span>
                        <span>Learn more</span>
                        <ArrowRight size={14} className="text-slate-400" />
                    </div>
                </motion.div>

                {/* Main Headline - 2 lines */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-5xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-8xl font-black tracking-tight text-black leading-[0.95] md:leading-[0.9] mb-8 md:mb-10 w-full max-w-[1400px] mx-auto"
                >
                    "Turn Chaos into<br className="hidden md:block" /> Completed Tasks<br className="hidden md:block" /> with <StickerText className="text-[#d4ff4e]">AI Agents</StickerText>."
                </motion.h1>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
                >
                    <Link to="/signup" className="w-full sm:w-auto">
                        <Button className="bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-900 rounded-full px-8 py-4 md:px-12 md:py-6 text-base md:text-lg font-bold transition-all shadow-sm hover:shadow-md w-full">
                            Book a Demo
                        </Button>
                    </Link>
                    <Link to="/signup" className="w-full sm:w-auto">
                        <Button className="bg-[#B593FF] hover:bg-[#a37aff] text-black rounded-full px-10 py-5 md:px-14 md:py-7 text-base md:text-lg font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full">
                            Try for free
                        </Button>
                    </Link>
                </motion.div>

                {/* Social Proof Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex items-center justify-center gap-4 w-full max-w-4xl mx-auto mb-12"
                >
                    <div className="h-[1px] bg-slate-200 flex-1"></div>
                    <p className="text-sm text-slate-600 whitespace-nowrap">
                        Over <span className="font-semibold text-slate-900">400+ creative teams</span> use NeuralForge to deploy their digital workforce.
                    </p>
                    <div className="h-[1px] bg-slate-200 flex-1"></div>
                </motion.div>

                {/* Logo Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="w-full max-w-[1400px] mx-auto px-8"
                >
                    <div className="flex items-center justify-center lg:justify-between flex-wrap gap-8 lg:gap-0 opacity-90">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-xl md:text-2xl">Redactify</span>
                        </div>
                        <span className="font-bold text-2xl md:text-3xl tracking-tight">AKQA</span>
                        <span className="font-medium text-xl md:text-2xl">Linktree</span>
                        <span className="font-bold text-2xl md:text-3xl">27b</span>
                        <span className="font-bold text-xl md:text-2xl">Ogilvy</span>
                        <div className="flex items-center gap-1">
                            <span className="font-bold text-xl md:text-2xl"></span>
                            <span className="font-bold text-xl md:text-2xl">Webflow</span>
                        </div>
                        <span className="font-black text-2xl md:text-3xl tracking-wider">TBWA</span>
                    </div>
                </motion.div>
            </div >
        </section >
    )
}
