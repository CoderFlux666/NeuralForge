import React, { useState, useRef, useEffect } from "react"
import { Navbar } from "../components/Navbar"
import { Send, Target, TrendingUp, AlertCircle, BrainCircuit, ArrowRight, PieChart, Activity, Layers } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import ConsultantAgentImg from "../assets/agents/agent-8.png"

// --- Interfaces ---
interface Message {
    id: number
    text: string
    sender: 'user' | 'ai'
}

interface StrategyData {
    analysis_type?: string
    key_findings?: string[]
    recommended_steps?: string[]
    success_probability?: string
}

export function ConsultantAgentPage() {
    // --- State ---
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hello! I'm Maya. Describe your business challenge, and I will generate a strategic roadmap on your dashboard.", sender: 'ai' }
    ])
    const [inputValue, setInputValue] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [strategyData, setStrategyData] = useState<StrategyData | null>(null)

    const { user } = useAuth();
    const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;
    const initial = (user?.email?.[0] ?? '?').toUpperCase();

    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }) }
    useEffect(() => { scrollToBottom() }, [messages])

    // --- Handle Send ---
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputValue.trim()) return

        const userMsg: Message = { id: Date.now(), text: inputValue, sender: 'user' }
        setMessages(prev => [...prev, userMsg])
        setInputValue("")
        setIsLoading(true)

        try {
            // Placeholder Webhook - Verify this matches your n8n URL
            const N8N_BASE_URL = import.meta.env.VITE_N8N_BASE_URL || 'http://localhost:5678';
            const WEBHOOK_URL = `${N8N_BASE_URL}/webhook/consultant-agent`

            const payload = {
                prompt: inputValue,
                sessionId: 'session-' + Math.floor(Math.random() * 1000000),
                userName: "Founder",
                userRole: "CEO"
            };

            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (!response.ok) throw new Error("Failed to fetch response")
            const data = await response.json()

            // --- DATA PARSING & SAFETY CHECK ---
            if (data.consultant_data) {
                console.log("Strategy Data Received:", data.consultant_data); // Debugging
                setStrategyData({
                    analysis_type: data.consultant_data.analysis_type || "Strategic Analysis",
                    key_findings: data.consultant_data.key_findings || [],
                    recommended_steps: data.consultant_data.recommended_steps || [],
                    success_probability: data.consultant_data.success_probability || "Calculated upon review"
                })
            }

            const messageText = data.chat_response || "Strategy generated. Check the dashboard.";
            setMessages(prev => [...prev, { id: Date.now() + 1, text: messageText, sender: 'ai' }])

        } catch (error) {
            console.error(error)
            setMessages(prev => [...prev, { id: Date.now() + 1, text: "Connection error. Please try again.", sender: 'ai' }])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
            {/* Navbar (Fixed) */}
            <div className="z-50">
                <Navbar />
            </div>

            {/* Main Content Area 
                - pt-40: roughly 160px (120px navbar + 40px gap) 
                - h-[calc(100vh-180px)]: Leaves space at bottom 
                - No separate scrollbar on body, inner boxes scroll
            */}
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-140px)] lg:h-[calc(100vh-140px)]">

                    {/* --- LEFT BOX: CHAT (Rounded Card) --- */}
                    <div className="lg:col-span-4 flex flex-col h-full bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                        {/* Chat Header */}
                        <div className="p-5 border-b border-slate-100 flex items-center gap-4 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-white shadow-sm overflow-hidden ring-1 ring-slate-100">
                                    <img src={ConsultantAgentImg} alt="Maya" className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-sm"></div>
                            </div>
                            <div>
                                <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">Maya <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wide border border-emerald-100">Consultant</span></h2>
                                <p className="text-xs text-slate-400 mt-0.5">Strategy & Operations</p>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-50/50">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`flex gap-3 max-w-[90%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

                                        {/* Avatar */}
                                        <div className="flex-shrink-0 mt-1">
                                            {msg.sender === 'user' ? (
                                                <div className="relative">
                                                    {avatarUrl ? (
                                                        <img src={avatarUrl} alt="User" className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-sm" />
                                                    ) : (
                                                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-[10px] border border-slate-300 shadow-sm font-black">
                                                            {initial}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <img src={ConsultantAgentImg} alt="Maya" className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-sm" />
                                            )}
                                        </div>

                                        {/* Bubble */}
                                        <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm border ${msg.sender === 'user'
                                            ? 'bg-slate-900 border-slate-900 text-white rounded-tr-none'
                                            : 'bg-white border-slate-200 text-slate-700 rounded-tl-none'
                                            }`}>
                                            {msg.text.split('\n').map((line, i) => (
                                                <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Typing Indicator */}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex gap-3 max-w-[90%]">
                                        <img src={ConsultantAgentImg} alt="Maya" className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-sm mt-1" />
                                        <div className="p-4 rounded-2xl bg-white border border-slate-200 rounded-tl-none shadow-sm flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-5 bg-white border-t border-slate-100">
                            <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Describe your business goal..."
                                    className="w-full pl-5 pr-14 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all outline-none text-sm font-medium text-slate-700 placeholder:text-slate-400"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isLoading}
                                    className="absolute right-2 p-2 bg-slate-900 hover:opacity-90 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* --- RIGHT BOX: STRATEGY BOARD (Rounded Card) --- */}
                    <div className="lg:col-span-8 flex flex-col h-full bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">
                        {/* Interactive Header */}
                        <div className="border-b border-slate-100 bg-white sticky top-0 z-20 flex items-center justify-between px-6 py-4">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-slate-900 text-white rounded-lg shadow-sm">
                                    <Layers className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                                        Strategy Board
                                        {strategyData?.analysis_type && (
                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                                                {strategyData.analysis_type}
                                            </span>
                                        )}
                                    </h2>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Live Workspace</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                                    <Activity className="w-4 h-4" />
                                </button>
                                <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                                    <PieChart className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto bg-[#FAFAFA]">
                            <div className="p-6 md:p-8">
                                {/* Background Details */}
                                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none"></div>

                                <div className="relative z-10 w-full max-w-5xl mx-auto">
                                    {!strategyData ? (
                                        // EMPTY STATE
                                        <div className="flex flex-col items-center justify-center py-20 text-center">
                                            <div className="relative mb-6 group">
                                                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
                                                <div className="relative w-24 h-24 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-sm">
                                                    <BrainCircuit className="w-10 h-10 text-slate-300 group-hover:text-emerald-500 transition-colors duration-500" />
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to Strategize</h3>
                                            <p className="text-slate-500 max-w-md mx-auto leading-relaxed text-sm">
                                                Awaiting your business input. Share your goals to generate a comprehensive diagnostic report and roadmap.
                                            </p>
                                        </div>
                                    ) : (
                                        // DATA STATE
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

                                            {/* 1. FEASIBILITY SCORE CARD (Dark Mode) */}
                                            <div className="md:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group border border-slate-700">
                                                {/* Ambient Background */}
                                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-1000"></div>

                                                <div className="relative z-10 h-full flex flex-col justify-between">
                                                    <div className="flex justify-between items-start mb-6">
                                                        <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm border border-white/5">
                                                            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                                                            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-50">Feasibility</span>
                                                        </div>
                                                        <Activity className="w-5 h-5 text-slate-600 group-hover:text-emerald-500 transition-colors" />
                                                    </div>

                                                    <div className="mb-4">
                                                        <div className="text-6xl font-bold tracking-tighter text-white mb-1">
                                                            {strategyData.success_probability}
                                                        </div>
                                                        <p className="text-slate-400 text-sm font-medium">Predicted Success Rate</p>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <div className="flex justify-between text-xs font-medium text-slate-400 uppercase tracking-widest">
                                                            <span>Risk Analysis</span>
                                                            <span className="text-white">Low</span>
                                                        </div>
                                                        <div className="h-1.5 w-full bg-slate-700/50 rounded-full overflow-hidden">
                                                            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-[85%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* 2. DIAGNOSIS (Key Findings) */}
                                            <div className="md:col-span-7 space-y-4">
                                                <h4 className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
                                                    <AlertCircle className="w-4 h-4" /> Strategic Diagnosis
                                                </h4>
                                                {(strategyData.key_findings || []).map((finding, idx) => (
                                                    <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group flex gap-4 items-start">
                                                        <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                                            <Target className="w-3.5 h-3.5" />
                                                        </div>
                                                        <p className="text-sm text-slate-700 font-medium leading-relaxed group-hover:text-slate-900">
                                                            {finding}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* 3. ROADMAP (Timeline Visualization) */}
                                            <div className="md:col-span-12 mt-4">
                                                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                                                    <div className="flex items-center justify-between mb-8">
                                                        <h4 className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                            <Layers className="w-4 h-4" /> Execution Roadmap
                                                        </h4>
                                                        <span className="text-xs font-medium text-slate-400">Step-by-Step Plan</span>
                                                    </div>

                                                    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                                                        {(strategyData.recommended_steps || []).map((step, idx) => (
                                                            <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">

                                                                {/* Icon / Marker */}
                                                                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-100 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 group-hover:bg-slate-900 group-hover:text-white transition-colors relative z-10">
                                                                    <span className="font-bold text-sm">{idx + 1}</span>
                                                                </div>

                                                                {/* Content Card */}
                                                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-xl border border-slate-100 bg-slate-50 shadow-sm hover:shadow-md hover:bg-white hover:border-slate-200 transition-all">
                                                                    <div className="flex items-center justify-between mb-1">
                                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phase {idx + 1}</span>
                                                                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                                                    </div>
                                                                    <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900 leading-relaxed">
                                                                        {step}
                                                                    </p>
                                                                </div>

                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}