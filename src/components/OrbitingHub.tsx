import { motion } from "framer-motion"
import { Bot, Mail, MessageSquare, FileText, Code } from "lucide-react"

export function OrbitingHub() {
    return (
        <div className="relative w-full h-[500px] flex items-center justify-center">

            {/* Central Hub */}
            <div className="relative z-20 w-32 h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center border border-slate-100">
                <div className="absolute inset-0 bg-brand-gradient opacity-10 blur-xl rounded-full" />
                <Bot className="w-12 h-12 text-indigo-600" />
            </div>

            {/* Orbit Track (Visual only) */}
            <div className="absolute w-[400px] h-[400px] border border-slate-200/50 rounded-full z-0 opacity-50" />

            {/* Orbiting Satellites Container */}
            <motion.div
                className="absolute w-[400px] h-[400px] z-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
                {/* Satellite 1: Email */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                        className="w-16 h-16 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    >
                        <Mail className="w-6 h-6 text-purple-500" />
                    </motion.div>
                </div>

                {/* Satellite 2: Chat */}
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2">
                    <motion.div
                        className="w-16 h-16 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    >
                        <MessageSquare className="w-6 h-6 text-indigo-500" />
                    </motion.div>
                </div>

                {/* Satellite 3: Docs */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                    <motion.div
                        className="w-16 h-16 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    >
                        <FileText className="w-6 h-6 text-pink-500" />
                    </motion.div>
                </div>

                {/* Satellite 4: Code */}
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                        className="w-16 h-16 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    >
                        <Code className="w-6 h-6 text-cyan-500" />
                    </motion.div>
                </div>
            </motion.div>

            {/* Connecting Lines (Pulsing) */}
            <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-visible">
                <motion.circle
                    cx="50%" cy="50%" r="200"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="1"
                    strokeDasharray="10 10"
                    animate={{ strokeDashoffset: -100 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="opacity-20"
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                </defs>
            </svg>

        </div>
    )
}
