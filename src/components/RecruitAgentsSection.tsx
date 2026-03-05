import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Sparkles, Shield, Search, Zap, Code, ArrowRight } from "lucide-react"

export function RecruitAgentsSection() {
    const [activeTab, setActiveTab] = useState("Agents")
    const [currentSlide, setCurrentSlide] = useState(0)

    // Auto-play interval
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide()
        }, 5000)
        return () => clearInterval(timer)
    }, [currentSlide])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % agentCards.length)
    }

    const tabs = [
        { name: "Agents", icon: Sparkles },
        { name: "Assistant", icon: Zap },
        { name: "Search", icon: Search },
        { name: "Protect", icon: Shield },
        { name: "APIs", icon: Code }
    ]

    const agentCards = [
        {
            icon: "📊",
            title: "Research Analyst",
            desc: "Deep-dive research on any topic with comprehensive analysis",
            user: "Alex Johnson",
            color: "bg-blue-100 text-blue-600",
            cursorColor: "#2563EB"
        },
        {
            icon: "📝",
            title: "Meeting Prep",
            desc: "Synthesize attendees, agendas, and historical context",
            user: "Robert Smith",
            color: "bg-purple-100 text-purple-600",
            cursorColor: "#9333EA"
        },
        {
            icon: "💡",
            title: "Deal Loss Insights",
            desc: "Analyze lost opportunities and extract actionable insights",
            user: "Aaron Sharma",
            color: "bg-orange-100 text-orange-600",
            cursorColor: "#EA580C"
        },
        {
            icon: "💬",
            title: "Customer Insights",
            desc: "Understand customer behavior and motivations deeply",
            user: "Robin Ostrowski",
            color: "bg-green-100 text-green-600",
            cursorColor: "#16A34A"
        }
    ]

    return (
        <section className="py-24 px-6 bg-white relative overflow-hidden">

            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Tabs */}
                <div className="flex justify-center gap-2 mb-20 flex-wrap">
                    {tabs.map((tab) => {
                        const Icon = tab.icon
                        const isActive = activeTab === tab.name
                        return (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-200 flex items-center gap-2 border ${isActive
                                    ? "bg-[#6C5CE7] text-white border-[#6C5CE7] shadow-lg shadow-purple-200 transform scale-105"
                                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                                    }`}
                            >
                                <Icon size={16} className={isActive ? "text-white" : "text-slate-400"} />
                                {tab.name}
                            </button>
                        )
                    })}
                </div>

                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Left Content */}
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="z-20"
                    >
                        <div className="inline-block px-3 py-1 bg-purple-100 rounded-md text-xs font-bold text-purple-700 mb-6 uppercase tracking-wider">
                            Enterprise-Grade AI
                        </div>

                        <h2 className="text-6xl md:text-7xl font-black tracking-tighter text-black leading-[1] mb-8 relative">
                            Create powerful AI agents to{" "}
                            <span className="relative inline-block">
                                <span className="relative z-10 text-[#6C5CE7]">automate</span>
                                {/* Scribble Underline */}
                                <svg className="absolute w-full h-3 -bottom-1 left-0 z-0 text-purple-200" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                                </svg>
                            </span>
                            <br />
                            work at scale
                        </h2>

                        <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-lg">
                            Recruit enterprise-grade AI agents today—fully customizable to your team's unique workflows,
                            compliance requirements, and business objectives. Deploy in minutes, scale to thousands.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button className="px-8 py-4 bg-[#6C5CE7] text-white font-bold rounded-xl hover:bg-[#5a4ad1] transition-colors shadow-xl shadow-purple-200 flex items-center gap-2">
                                Explore AI Agents
                                <ArrowRight size={18} />
                            </button>
                            <button className="px-8 py-4 bg-white text-black font-bold rounded-xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all">
                                View Demo
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Visuals - Card Stack Carousel */}
                    <div className="relative h-[600px] w-full flex items-center justify-center -ml-12 perspective-1000">
                        {/* Background Blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-tr from-purple-100/30 to-blue-100/30 rounded-full blur-3xl -z-10" />

                        <div className="relative w-full max-w-xl h-[400px]">
                            <AnimatePresence mode="popLayout">
                                {agentCards.map((agent, index) => {
                                    // Calculate relative index for stack effect
                                    const offset = (index - currentSlide + agentCards.length) % agentCards.length

                                    // Only render the top 3 cards for performance and visual clarity
                                    if (offset > 2) return null

                                    return (
                                        <motion.div
                                            key={agent.title}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                                            animate={{
                                                opacity: offset === 0 ? 1 : 1 - offset * 0.3,
                                                scale: 1 - offset * 0.05,
                                                y: offset * 20,
                                                zIndex: agentCards.length - offset,
                                                rotate: offset === 0 ? 0 : offset % 2 === 0 ? 2 : -2 // Slight rotation for stack messiness
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 1.1,
                                                y: -100,
                                                rotate: -10,
                                                transition: { duration: 0.4 }
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 260,
                                                damping: 20
                                            }}
                                            className="absolute top-0 left-0 w-full bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-purple-900/10 border border-slate-100 flex flex-col justify-center h-full origin-bottom"
                                            style={{
                                                backdropFilter: "blur(10px)",
                                            }}
                                        >
                                            {/* Cursor Element - Only visible on top card */}
                                            {offset === 0 && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 20, y: 20 }}
                                                    animate={{ opacity: 1, x: 0, y: 0 }}
                                                    transition={{ delay: 0.3, type: "spring" }}
                                                    className="absolute -right-8 -top-8 z-30 drop-shadow-2xl"
                                                    style={{ color: agent.cursorColor }}
                                                >
                                                    <svg width="56" height="56" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.5 28L25.5 21L18.5 16L24.5 9L20.5 5L12.5 11L7.5 2V28Z" fill="currentColor" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                                                    </svg>
                                                    <div className="absolute left-10 top-10 px-4 py-2 bg-inherit text-white text-sm font-bold rounded-full whitespace-nowrap shadow-lg" style={{ backgroundColor: agent.cursorColor }}>
                                                        {agent.user}
                                                    </div>
                                                </motion.div>
                                            )}

                                            <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-5xl mb-8 ${agent.color} shadow-inner`}>
                                                {agent.icon}
                                            </div>

                                            <h3 className="font-bold text-slate-900 text-4xl mb-4 tracking-tight">{agent.title}</h3>
                                            <p className="text-slate-500 text-xl leading-relaxed font-medium">{agent.desc}</p>
                                        </motion.div>
                                    )
                                })}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
