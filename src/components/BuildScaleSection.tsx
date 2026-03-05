import { motion } from "framer-motion"
import { Rocket, Users, BarChart3, Zap, Shield, Globe } from "lucide-react"

export function BuildScaleSection() {
    const features = [
        {
            icon: Rocket,
            title: "Rapid Deployment",
            desc: "Launch AI agents in minutes with our intuitive builder and pre-configured templates",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            icon: Users,
            title: "Team Collaboration",
            desc: "Work together seamlessly with role-based access and real-time collaboration tools",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            icon: BarChart3,
            title: "Advanced Analytics",
            desc: "Track performance, measure ROI, and optimize your AI workforce with detailed insights",
            gradient: "from-orange-500 to-red-500"
        },
        {
            icon: Zap,
            title: "Auto-Scaling",
            desc: "Automatically scale your AI agents based on demand and workload requirements",
            gradient: "from-yellow-500 to-orange-500"
        },
        {
            icon: Shield,
            title: "Enterprise Security",
            desc: "Bank-level encryption, SOC 2 compliance, and granular permission controls",
            gradient: "from-green-500 to-emerald-500"
        },
        {
            icon: Globe,
            title: "Global Infrastructure",
            desc: "Deploy across multiple regions with 99.9% uptime SLA and low-latency performance",
            gradient: "from-indigo-500 to-purple-500"
        }
    ]

    return (
        <section className="py-32 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(147,51,234,0.15),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

            <div className="container mx-auto max-w-7xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-bold text-white mb-6 border border-white/20">
                        All-in-One Platform
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-6">
                        Build, scale and manage <br />your entire AI workforce <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-purple-400 to-pink-400">
                            with one platform
                        </span>
                    </h2>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        From deployment to management, NeuralForge gives you everything you need to run an AI-powered organization at scale.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {features.map((feature, i) => {
                        const Icon = feature.icon
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group relative"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-xl`} />
                                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300 h-full">
                                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg`}>
                                        <Icon size={28} className="text-white" />
                                    </div>
                                    <h3 className="text-2xl font-black mb-4">{feature.title}</h3>
                                    <p className="text-slate-300 leading-relaxed">{feature.desc}</p>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <button className="px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-xl hover:scale-105 transition-transform duration-300 shadow-xl shadow-purple-500/30">
                        Start Building Today
                    </button>
                </motion.div>
            </div>
        </section>
    )
}
