import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart, PenTool, Layers } from "lucide-react"

const tabs = [
    {
        id: "sales",
        label: "Sales",
        icon: BarChart,
        headline: "Automate lead gen and outreach so you can focus on closing.",
        color: "bg-blue-500"
    },
    {
        id: "marketing",
        label: "Marketing",
        icon: PenTool,
        headline: "Generate SEO blogs, social posts, and ad copy at scale.",
        color: "bg-purple-500"
    },
    {
        id: "operations",
        label: "Operations",
        icon: Layers,
        headline: "Summarize meetings, organize files, and manage data entry.",
        color: "bg-emerald-500"
    }
]

export function UseCaseTabs() {
    const [activeTab, setActiveTab] = useState(tabs[0])

    return (
        <section className="py-24 px-6 bg-white">
            <div className="container mx-auto max-w-5xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold tracking-tight text-slate-900">Built for every department.</h2>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Tabs Navigation */}
                    <div className="flex md:flex-col gap-2 md:w-1/3">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab)}
                                className={`flex items-center gap-4 p-4 rounded-xl transition-all text-left ${activeTab.id === tab.id
                                        ? "bg-slate-100 text-slate-900 font-medium scale-105"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activeTab.id === tab.id ? "bg-white shadow-sm" : "bg-slate-100"}`}>
                                    <tab.icon size={20} />
                                </div>
                                <span className="text-lg">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="md:w-2/3">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="h-full min-h-[300px] bg-slate-50 rounded-3xl p-8 md:p-12 flex items-center border border-slate-100"
                            >
                                <div>
                                    <h3 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
                                        "{activeTab.headline}"
                                    </h3>
                                    <div className={`h-2 w-24 rounded-full ${activeTab.color}`} />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    )
}
