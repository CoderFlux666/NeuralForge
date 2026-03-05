import { motion } from "framer-motion"

export function TemplatesSection() {
    const templates = [
        "Sales Specialist",
        "Support Sentinel",
        "Research Scout",
        "Content Creator",
        "Data Analyst",
        "Marketing Maven"
    ]

    return (
        <section className="py-20 px-6 bg-white">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight text-black leading-tight mb-6">
                        Get started right now with our{" "}
                        <span className="relative inline-block">
                            expert-designed
                            <motion.span
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="absolute bottom-2 left-0 right-0 h-4 bg-blue-300 -z-10"
                            />
                        </span>
                        {" "}templates
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Choose from our library of pre-built AI agents, customize them to your needs, and deploy in minutes.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4"
                >
                    {templates.map((template, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 3 : -3 }}
                            className="px-8 py-4 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full border-3 border-black font-bold text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                        >
                            {template}
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <button className="px-10 py-5 bg-black text-white font-bold text-lg rounded-full hover:scale-105 transition-transform duration-300 shadow-xl">
                        Browse all templates
                    </button>
                </motion.div>
            </div>
        </section>
    )
}
