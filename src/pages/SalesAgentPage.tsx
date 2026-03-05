import React, { useState, useRef, useEffect } from "react"
import { Navbar } from "../components/Navbar"
import { Send, Target, Zap, Copy, Check } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import SalesAgentImg from "../assets/agents/agent-4.png"

// --- Interfaces ---
interface Message {
    id: number
    text: string
    sender: 'user' | 'ai'
}

interface SalesData {
    strategy?: string
    pitch?: string
}

export function SalesAgentPage() {
    // --- State ---
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "I'm Leo. I can help you qualify leads and handle objections. Who are we selling to today?", sender: 'ai' }
    ])
    const [inputValue, setInputValue] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [salesData, setSalesData] = useState<SalesData | null>(null)
    const [copied, setCopied] = useState(false)

    const { user } = useAuth();
    const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;
    const initial = (user?.email?.[0] ?? '?').toUpperCase();

    // Stable session ID
    const sessionId = useRef('session-' + Math.floor(Math.random() * 1000000))

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }) }
    useEffect(() => { scrollToBottom() }, [messages])

    // --- Handle Copy ---
    const handleCopy = () => {
        if (salesData?.pitch) {
            navigator.clipboard.writeText(salesData.pitch)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

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
            const WEBHOOK_URL = `${N8N_BASE_URL}/webhook/sales-agent`

            const payload = {
                message: inputValue,
                sessionId: sessionId.current
            };

            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (!response.ok) throw new Error("Failed to fetch")
            const data = await response.json()

            // --- Parse Data ---
            if (data.strategy || data.pitch) {
                setSalesData({
                    strategy: data.strategy || "",
                    pitch: data.pitch || ""
                })
            } else if (data.sales_data) {
                setSalesData({
                    strategy: data.sales_data.strategy || "",
                    pitch: data.sales_data.pitch || ""
                })
            }

            const messageText = data.chat_response || "I've updated the strategy and pitch.";
            setMessages(prev => [...prev, { id: Date.now() + 1, text: messageText, sender: 'ai' }])

        } catch (error) {
            console.error(error)
            setMessages(prev => [...prev, { id: Date.now() + 1, text: "Connection error. Please try again.", sender: 'ai' }])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#F3F4F6] font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
            {/* Navbar (Fixed) */}
            <div className="z-50">
                <Navbar />
            </div>

            {/* Main Content Area */}
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-140px)] lg:h-[calc(100vh-140px)]">

                    {/* --- LEFT COLUMN: Chat --- */}
                    <div className="lg:col-span-4 flex flex-col h-full bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

                        {/* Chat Header */}
                        <div className="p-5 border-b border-slate-100 flex items-center gap-4 bg-white/80 backdrop-blur-sm sticky top-0 z-10 shrink-0">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-white shadow-sm overflow-hidden">
                                    <img src={SalesAgentImg} alt="Leo" className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                            </div>
                            <div>
                                <h2 className="font-bold text-slate-900 text-sm">Leo <span className="text-slate-400 font-normal">| Sales Closer</span></h2>
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
                                                <img src={SalesAgentImg} alt="Leo" className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-sm" />
                                            )}
                                        </div>

                                        {/* Bubble */}
                                        <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm border ${msg.sender === 'user'
                                            ? 'bg-white border-slate-200 text-slate-800 rounded-tr-none'
                                            : 'bg-white border-slate-200 text-slate-700 rounded-tl-none'
                                            }`}>
                                            {msg.text.split('\n').map((line, i) => (
                                                <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Loading Indicator */}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex gap-3 max-w-[90%]">
                                        <img src={SalesAgentImg} alt="Leo" className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-sm mt-1" />
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
                        <div className="p-5 bg-white border-t border-slate-100 shrink-0">
                            <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type your instruction..."
                                    className="w-full pl-5 pr-14 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all outline-none text-sm font-medium text-slate-700 placeholder:text-slate-400 shadow-sm"
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

                    {/* --- RIGHT COLUMN: Sales Command Center --- */}
                    <div className="lg:col-span-8 flex flex-col h-full bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">

                        {/* Decorative Header Bar */}
                        <div className="h-1 bg-gradient-to-r from-emerald-600 to-emerald-400"></div>

                        {/* CRM Header */}
                        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20 shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-slate-900 text-white rounded-lg shadow-sm">
                                    <Zap className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">SALES INTELLIGENCE & PITCH</h2>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Command Center</p>
                                </div>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto bg-[#FAFAFA] p-8">
                            <div className="relative z-10 w-full max-w-4xl mx-auto">
                                {!salesData ? (
                                    // EMPTY STATE
                                    <div className="flex flex-col items-center justify-center py-24 text-center opacity-70 h-full">
                                        <div className="w-20 h-20 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                            <Target className="w-8 h-8 text-slate-400" />
                                        </div>
                                        <div className="max-w-md space-y-2">
                                            <h3 className="text-lg font-bold text-slate-900">Awaiting Context</h3>
                                            <p className="text-slate-500 leading-relaxed text-sm">Provide details in the chat to generate a winning sales strategy and an automated pitch.</p>
                                        </div>
                                    </div>
                                ) : (
                                    // DATA STATE
                                    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-6">

                                        {/* Strategy Section */}
                                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
                                            <h4 className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                                                <Target className="w-4 h-4 text-emerald-500" /> Sales Angle / Strategy
                                            </h4>

                                            {/* Subtle highlight box */}
                                            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-5 relative">
                                                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-400 rounded-l-xl"></div>
                                                <p className="text-[15px] leading-relaxed text-emerald-900 font-medium pl-2">
                                                    {salesData.strategy || "No strategy defined yet."}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Pitch Section */}
                                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                                <h4 className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                    <Send className="w-4 h-4 text-emerald-500" /> Drafted Pitch
                                                </h4>

                                                {/* Action Buttons */}
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={handleCopy}
                                                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold transition-all"
                                                    >
                                                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                                                        {copied ? "Copied" : "Copy Pitch"}
                                                    </button>
                                                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#064E3B] hover:bg-[#022c22] text-white text-xs font-bold transition-all shadow-sm">
                                                        <Send className="w-3.5 h-3.5" />
                                                        Send to Prospect
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Pitch Presentation text */}
                                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 relative shadow-inner">
                                                <div className="whitespace-pre-wrap text-slate-800 text-[15px] leading-relaxed font-medium">
                                                    {salesData.pitch || "No pitch drafted yet."}
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
    )
}
