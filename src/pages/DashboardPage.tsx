import { useState } from "react"
import { Sidebar } from "../components/Sidebar"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import { ArrowUp, Sparkles, Copy, Download, ThumbsUp, ThumbsDown, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function DashboardPage() {
    const [query, setQuery] = useState("")
    const [hasSearched, setHasSearched] = useState(false)

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (!query.trim()) return
        setHasSearched(true)
    }

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-500/20 selection:text-indigo-600">
            <Sidebar />

            <main className="md:ml-64 min-h-screen flex flex-col">

                {/* Top Header (Mobile only or simple status) */}
                <header className="h-16 flex items-center justify-end px-6 border-b border-slate-100 md:border-none">
                    <Button variant="ghost" size="sm" className="hidden md:flex text-slate-500">
                        Feedback
                    </Button>
                    <Button variant="ghost" size="sm" className="hidden md:flex text-slate-500">
                        Help
                    </Button>
                </header>

                {/* Content Area */}
                <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 md:px-8 pb-10">

                    {/* Centered Search Interface */}
                    <div className={`transition-all duration-700 ease-in-out ${hasSearched ? "mt-4" : "mt-[20vh]"}`}>

                        {!hasSearched && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center mb-8"
                            >
                                <h1 className="text-3xl font-semibold mb-2 flex items-center justify-center gap-2">
                                    Good afternoon, Alex <span className="text-2xl">👋</span>
                                </h1>
                                <p className="text-slate-500">What would you like to build today?</p>
                            </motion.div>
                        )}

                        <form onSubmit={handleSearch} className="relative group z-20">
                            <div className="relative flex items-center">
                                <textarea
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSearch(e);
                                        }
                                    }}
                                    placeholder="Ask anything... e.g., 'Draft a cold email sequence for Series B SaaS founders'"
                                    className="w-full bg-white border border-slate-200 rounded-2xl shadow-lg shadow-slate-200/40 px-6 py-4 pr-16 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none min-h-[60px] max-h-[200px] overflow-hidden"
                                    style={{ height: '72px' }}
                                />
                                <div className="absolute right-3 bottom-3">
                                    <Button
                                        type="submit"
                                        size="icon"
                                        className={`rounded-xl transition-all ${query ? "bg-indigo-600 hover:bg-indigo-700" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}
                                        disabled={!query}
                                    >
                                        <ArrowUp size={20} />
                                    </Button>
                                </div>
                            </div>
                            {/* Suggested Prompts */}
                            {!hasSearched && (
                                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                                    {["Analyze competitor pricing", "Write a blog post", "Debug React component", "Generate logo concepts"].map((prompt, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => { setQuery(prompt); handleSearch({ preventDefault: () => { } } as any) }}
                                            className="px-4 py-2 bg-slate-50 hover:bg-white hover:shadow-md hover:border-indigo-100 border border-slate-100 rounded-xl text-sm text-slate-600 transition-all duration-200"
                                        >
                                            {prompt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Results Area */}
                    <AnimatePresence>
                        {hasSearched && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mt-12 space-y-8"
                            >
                                {/* AI Response Card */}
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-brand-gradient flex items-center justify-center text-white mt-1">
                                        <Sparkles size={16} />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div className="prose prose-slate max-w-none">
                                            <h3 className="text-xl font-semibold text-slate-900">Cold Email Strategy for Series B Founders</h3>
                                            <p className="text-slate-600 leading-relaxed">
                                                Here is a structured outreach sequence designed to resonate with Series B SaaS founders.
                                                The focus is on <strong>scaling efficiency</strong> and <strong>revenue operations</strong>.
                                            </p>

                                            <Card className="p-0 border border-slate-200 overflow-hidden my-6">
                                                <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between">
                                                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Email 1: The "Insight" Hook</span>
                                                    <Button variant="ghost" size="sm" className="h-6 text-xs text-slate-400">
                                                        <Copy size={12} className="mr-1" /> Copy
                                                    </Button>
                                                </div>
                                                <div className="p-6 font-mono text-sm text-slate-700 bg-white">
                                                    <p className="mb-4">Subject: Scaling {"{Company}"}'s RevOps layer</p>
                                                    <p>Hi {"{FirstName}"},</p>
                                                    <p className="mt-2">Noticed your recent funding round led by Sequoia. Typically at this stage, the friction shifts from "finding product-market fit" to "operationalizing scale".</p>
                                                    <p className="mt-4">...</p>
                                                </div>
                                            </Card>

                                            <p className="text-slate-600">
                                                This template uses a "soft assumption" pattern to demonstrate industry expertise without being presumptuous.
                                            </p>
                                        </div>

                                        {/* Action Bar */}
                                        <div className="flex items-center gap-2 pt-2">
                                            <Button variant="outline" size="sm" className="rounded-lg h-9 text-slate-600">
                                                <Copy size={14} className="mr-2" /> Copy Response
                                            </Button>
                                            <Button variant="outline" size="sm" className="rounded-lg h-9 text-slate-600">
                                                <Download size={14} className="mr-2" /> Export to Docs
                                            </Button>
                                            <div className="flex-1" />
                                            <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-indigo-600">
                                                <ThumbsUp size={16} />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-red-500">
                                                <ThumbsDown size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Related Follow-up */}
                                <div className="ml-12 pt-4 border-t border-slate-100">
                                    <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                                        <Zap size={14} />
                                        <span>Related follow-up questions</span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {["Can you make it shorter?", "Add a follow-up email", "Translate to Spanish", "Generate A/B test variants"].map((q, i) => (
                                            <button key={i} className="text-left px-4 py-3 rounded-xl bg-slate-50 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all text-sm text-slate-600">
                                                {q}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </main>
        </div>
    )
}
