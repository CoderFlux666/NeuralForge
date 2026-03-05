import { motion } from "framer-motion"
import { TrendingUp, Megaphone, Settings, Users, Briefcase, Code } from "lucide-react"

export function WhosItForSection() {
    const teams = [
        {
            icon: TrendingUp,
            title: "Sales Teams",
            desc: "Automate lead qualification, personalized outreach, and follow-up sequences. Close deals faster with AI-powered insights.",
            gradient: "from-blue-500 to-cyan-500",
            features: ["Lead scoring", "Email automation", "Deal insights"]
        },
        {
            icon: Megaphone,
            title: "Marketing",
            desc: "Generate content at scale, optimize campaigns, and analyze customer behavior. Drive growth with data-driven decisions.",
            gradient: "from-purple-500 to-pink-500",
            features: ["Content generation", "Campaign optimization", "Analytics"]
        },
        {
            icon: Settings,
            title: "Operations",
            desc: "Streamline workflows, automate repetitive tasks, and improve efficiency. Scale operations without scaling headcount.",
            gradient: "from-orange-500 to-red-500",
            features: ["Workflow automation", "Process optimization", "Resource management"]
        }
    ]

    return (
        <section className="py-20 px-6 bg-gradient-to-b from-white to-slate-50">
            <div className="container mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <div className="inline-block px-4 py-1.5 bg-blue-100 rounded-full text-sm font-bold text-blue-700 mb-6">
                        Who's it for
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight text-black leading-tight mb-6">
                        Built for ops teams. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Subject-matter experts
                        </span>{" "}
                        can use it
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                        No technical background required. Design powerful AI agents without relying on developer resources.
                        Scale excellence across every area with your intelligent, purpose-built AI workforce.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {teams.map((team, i) => {
                        const Icon = team.icon
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
                                <div className={`absolute inset-0 bg-gradient-to-br ${team.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl blur-xl`} />
                                <div className="relative bg-white rounded-3xl p-8 border-2 border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${team.gradient} mb-6 shadow-lg`}>
                                        <Icon size={32} className="text-white" />
                                    </div>
                                    <h3 className="text-2xl font-black text-black mb-4">{team.title}</h3>
                                    <p className="text-slate-600 leading-relaxed mb-6">{team.desc}</p>
                                    <div className="space-y-2">
                                        {team.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-sm text-slate-500">
                                                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${team.gradient}`} />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Additional roles */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="grid md:grid-cols-3 gap-6"
                >
                    {[
                        { icon: Users, title: "HR & Recruiting", color: "from-green-500 to-emerald-500" },
                        { icon: Briefcase, title: "Customer Success", color: "from-indigo-500 to-purple-500" },
                        { icon: Code, title: "Product & Engineering", color: "from-pink-500 to-rose-500" }
                    ].map((role, i) => {
                        const Icon = role.icon
                        return (
                            <div key={i} className="flex items-center gap-4 p-6 bg-white rounded-xl border-2 border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300">
                                <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center shadow-md`}>
                                    <Icon size={24} className="text-white" />
                                </div>
                                <span className="font-bold text-black">{role.title}</span>
                            </div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}
