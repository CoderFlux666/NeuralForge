import { motion } from "framer-motion"

export function FeatureShowcase() {
    return (
        <>
            {/* Section 1: Motion Design Made Simple */}
            <section className="py-32 px-6 bg-gradient-to-br from-slate-50 to-white">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-16">
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Create faster</p>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tight text-black leading-tight">
                            Motion design <br />made simple
                        </h2>
                        <p className="text-xl text-slate-600 mt-6 max-w-2xl mx-auto">
                            AI doesn't have to be hard. With NeuralForge, any designer can create professional agents in minutes, no matter their experience.
                        </p>
                    </div>

                    {/* Large Visual Mockup */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="bg-gradient-to-br from-purple-100 to-blue-50 rounded-3xl p-12 md:p-20 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                            <div className="bg-white rounded-2xl p-8 border-2 border-black">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 border-2 border-black" />
                                        <div className="h-6 w-48 bg-slate-200 rounded" />
                                    </div>
                                    <div className="h-4 w-full bg-slate-100 rounded" />
                                    <div className="h-4 w-3/4 bg-slate-100 rounded" />
                                    <div className="mt-6 flex gap-3">
                                        <div className="h-10 w-32 bg-yellow-300 rounded-lg border-2 border-black" />
                                        <div className="h-10 w-32 bg-blue-400 rounded-lg border-2 border-black" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Section 2: Built for Teams */}
            <section className="py-32 px-6 bg-white">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Create faster</p>
                            <h2 className="text-5xl md:text-6xl font-black tracking-tight text-black leading-tight mb-6">
                                Built for teams who move fast
                            </h2>
                            <p className="text-xl text-slate-600 leading-relaxed">
                                NeuralForge is designed for speed — everything, from navigating the tool to deploying agents, is lightning-fast.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {/* Visual Cards */}
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: -2 }}
                                className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] aspect-square flex items-center justify-center"
                            >
                                <div className="text-center">
                                    <div className="text-4xl font-black text-white mb-2">∞</div>
                                    <p className="text-sm font-bold text-white">Infinite canvas</p>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05, rotate: 2 }}
                                className="bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-2xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] aspect-square flex items-center justify-center"
                            >
                                <div className="text-center">
                                    <div className="text-4xl font-black text-black mb-2">⚡</div>
                                    <p className="text-sm font-bold text-black">Lightning fast</p>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05, rotate: 2 }}
                                className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] aspect-square flex items-center justify-center"
                            >
                                <div className="text-center">
                                    <div className="text-4xl font-black text-white mb-2">🎨</div>
                                    <p className="text-sm font-bold text-white">Beautiful UI</p>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05, rotate: -2 }}
                                className="bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] aspect-square flex items-center justify-center"
                            >
                                <div className="text-center">
                                    <div className="text-4xl font-black text-white mb-2">🚀</div>
                                    <p className="text-sm font-bold text-white">Ship faster</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
