import { motion } from "framer-motion"
import { Card } from "./ui/Card"
import { Mail, Globe, Shield, DollarSign } from "lucide-react"

const agents = [
    {
        title: "Cold Email Architect",
        description: "Generates personalized outreach at scale using hyper-customized data signals.",
        icon: Mail,
        color: "bg-purple-100 text-purple-600",
    },
    {
        title: "Market Scout",
        description: "Autonomous web research agent that builds comprehensive competitor reports.",
        icon: Globe,
        color: "bg-blue-100 text-blue-600",
    },
    {
        title: "Support Sentinel",
        description: "24/7 intelligent customer support that learns from your documentation.",
        icon: Shield,
        color: "bg-emerald-100 text-emerald-600",
    },
    {
        title: "Sales Closer",
        description: "Analyzes deal stages and recommends the perfect closing strategy.",
        icon: DollarSign,
        color: "bg-orange-100 text-orange-600",
    },
]

export function AgentWorkflow() {
    return (
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-4">

                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        Your Digital Workforce
                    </h2>
                    <p className="text-slate-500 text-lg">
                        Deploy specialized autonomous agents that integrate seamlessly into your existing tools.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {agents.map((agent, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card variant="default" hoverEffect="lift" className="h-full flex flex-col items-start p-8">
                                <div className={`w-12 h-12 rounded-xl ${agent.color} flex items-center justify-center mb-6`}>
                                    <agent.icon size={24} />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{agent.title}</h3>
                                <p className="text-slate-500 leading-relaxed text-sm">
                                    {agent.description}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}
