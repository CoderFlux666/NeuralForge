import { motion } from "framer-motion"

export function FreeYourTeamSection() {
    return (
        <section className="py-20 px-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-white rounded-[3rem] p-10 md:p-16 border-4 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
                >
                    {/* Decorative dots */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 left-10 w-2 h-2 bg-black rounded-full" />
                        <div className="absolute top-20 right-20 w-2 h-2 bg-black rounded-full" />
                        <div className="absolute bottom-10 left-20 w-2 h-2 bg-black rounded-full" />
                        <div className="absolute bottom-20 right-10 w-2 h-2 bg-black rounded-full" />
                    </div>

                    <div className="relative z-10 text-center">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-black leading-tight mb-6">
                            Free your team. <br />
                            Build{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600">
                                your first AI agent
                            </span>{" "}
                            today!
                        </h2>

                        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
                            If you're exploring NeuralForge for the first time or discovering new features,
                            we'll quickly guide you to start doing great work immediately.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                            <button className="px-10 py-5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-lg rounded-full hover:scale-105 transition-transform duration-300 shadow-xl">
                                Try for free
                            </button>
                            <button className="px-10 py-5 bg-white text-black font-bold text-lg rounded-full border-2 border-black hover:scale-105 transition-transform duration-300">
                                Request Demo
                            </button>
                        </div>

                        <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-2">
                                <span className="text-purple-500">✓</span> Free plan
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="text-purple-500">✓</span> No card required
                            </span>
                        </div>
                    </div>

                    {/* Playful illustrations (placeholders) */}
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-300 to-blue-400 rounded-full opacity-20" />
                    <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full opacity-20" />
                </motion.div>
            </div>
        </section >
    )
}
