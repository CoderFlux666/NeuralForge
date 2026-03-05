import { motion } from "framer-motion"

export function TestimonialSection() {
    return (
        <section className="py-20 px-6 bg-gradient-to-br from-yellow-50 via-purple-50 to-blue-50">
            <div className="container mx-auto max-w-5xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black leading-tight mb-8">
                        "We couldn't believe you can create such polished agents in{" "}
                        <span className="relative inline-block">
                            <span className="relative z-10">no time</span>
                            <motion.svg
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)]"
                                viewBox="0 0 200 60"
                                fill="none"
                            >
                                <motion.path
                                    d="M10,30 Q50,10 100,30 T190,30"
                                    stroke="#FFEB3B"
                                    strokeWidth="12"
                                    strokeLinecap="round"
                                    fill="none"
                                />
                                <motion.path
                                    d="M10,30 Q50,10 100,30 T190,30"
                                    stroke="#7B1FA2"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    fill="none"
                                    strokeDasharray="4 8"
                                />
                            </motion.svg>
                        </span>
                        {" "}at all."
                    </h2>

                    <div className="flex items-center justify-center gap-4 mt-12">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 border-4 border-black" />
                        <div className="text-left">
                            <p className="font-bold text-lg text-black">Sarah Chen</p>
                            <p className="text-slate-600">Product Designer, Acme Corp</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
