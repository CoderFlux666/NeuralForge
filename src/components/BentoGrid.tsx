import { motion } from "framer-motion"
import { Mail, Shield, Search } from "lucide-react"

export function BentoGrid() {
    return (
        <section className="py-24 px-6 bg-slate-50/50">
            <div className="container mx-auto max-w-6xl">

                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
                        Intelligence, on demand.
                    </h2>
                    <p className="text-lg text-slate-500">
                        Select the specialist you need, when you need it.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">

                    {/* Card 1: Sales Specialist (Large - Spans 2 cols? Or just first large card) */}
                    {/* User asked for "Large Card", "Medium", "Medium". Let's make Sales span 2 cols or be prominent. */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                    >
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                                    <Mail size={24} />
                                </div>
                                <h3 className="text-2xl font-semibold text-slate-900 mb-2">Cold Email Architect</h3>
                                <p className="text-slate-500 max-w-md">Crafts hyper-personalized outreach campaigns that actually get replies. Connects directly to your CRM.</p>
                            </div>

                            {/* Visual Placeholder */}
                            <div className="absolute right-0 bottom-0 w-1/2 h-full bg-indigo-50/50 rounded-tl-full translate-y-12 translate-x-12 group-hover:translate-x-8 transition-transform" />
                        </div>
                    </motion.div>

                    {/* Card 2: Support Sentinel */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                    >
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                            <Shield size={24} />
                        </div>
                        <h3 className="text-2xl font-semibold text-slate-900 mb-2">Auto-Support Agent</h3>
                        <p className="text-slate-500">Resolves 80% of customer queries instantly, 24/7.</p>
                    </motion.div>

                    {/* Card 3: The Researcher */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                    >
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                            <Search size={24} />
                        </div>
                        <h3 className="text-2xl font-semibold text-slate-900 mb-2">Deep Research Scout</h3>
                        <p className="text-slate-500">Scours the web to build detailed briefs on companies or topics in seconds.</p>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
