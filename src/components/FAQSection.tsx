import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const faqs = [
        {
            question: "What is an AI Workforce?",
            answer: "An AI Workforce is a collection of intelligent AI agents that work alongside your team to automate tasks, analyze data, and make decisions. Each agent is specialized for specific roles like sales, support, research, or operations—working 24/7 to boost productivity and efficiency."
        },
        {
            question: "How do I build an agent?",
            answer: "Building an agent is simple: choose from our expert-designed templates or start from scratch, customize the agent's behavior and knowledge base, connect your data sources and tools, test and refine the agent's responses, then deploy it across your organization. The entire process takes just minutes with our intuitive builder."
        },
        {
            question: "What are tools?",
            answer: "Tools are integrations that give your AI agents the ability to take actions and access information. This includes connecting to your CRM, email, calendar, databases, APIs, and third-party services. Agents use these tools to automate workflows, retrieve data, and execute tasks on your behalf."
        },
        {
            question: "How does NeuralForge protect my privacy?",
            answer: "We take privacy seriously. All data is encrypted in transit and at rest with bank-level security. We're SOC 2 compliant, never train our models on your data, offer granular access controls and permissions, support on-premise deployment for sensitive data, and provide full audit logs for compliance. Your data is yours—we never share it with third parties."
        },
        {
            question: "Can I integrate with my existing tools?",
            answer: "Yes! NeuralForge integrates with 100+ popular tools including Salesforce, HubSpot, Slack, Microsoft Teams, Google Workspace, Notion, and more. We also provide a robust API and webhooks for custom integrations with your proprietary systems."
        },
        {
            question: "What kind of support do you offer?",
            answer: "We offer 24/7 email support for all plans, priority support with dedicated Slack channel for Pro and Enterprise, onboarding assistance and training sessions, comprehensive documentation and video tutorials, and a community forum for peer-to-peer help. Enterprise customers get a dedicated success manager."
        }
    ]

    return (
        <section className="py-20 px-6 bg-white">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <div className="inline-block px-4 py-1.5 bg-slate-100 rounded-full text-sm font-bold text-slate-700 mb-6">
                        FAQ
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black leading-tight mb-6">
                        Frequently asked questions
                    </h2>
                    <p className="text-xl text-slate-600">
                        Everything you need to know about NeuralForge and AI agents
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-4"
                >
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden hover:border-slate-300 transition-colors duration-300"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors duration-200"
                            >
                                <span className="text-lg font-bold text-black pr-8">
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex-shrink-0"
                                >
                                    <ChevronDown size={24} className="text-slate-400" />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-8 pb-6 text-slate-600 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-16 text-center p-8 bg-gradient-to-br from-slate-50 to-white rounded-2xl border-2 border-slate-200"
                >
                    <h3 className="text-2xl font-bold text-black mb-3">Still have questions?</h3>
                    <p className="text-slate-600 mb-6">Can't find the answer you're looking for? Our team is here to help.</p>
                    <button className="px-8 py-4 bg-black text-white font-bold rounded-xl hover:scale-105 transition-transform duration-300">
                        Contact Support
                    </button>
                </motion.div>
            </div>
        </section>
    )
}
