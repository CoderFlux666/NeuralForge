import React, { useState, useRef, useEffect } from "react"
import { Navbar } from "../components/Navbar"
import { Send, Search, Download, Sparkles, AlertCircle, Check, Copy } from 'lucide-react'
import { useAuth } from "../context/AuthContext"
import ResearchAgentImg from "../assets/agents/agent-10.png"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// --- Interfaces ---
interface Message {
    id: number
    text: string
    sender: 'user' | 'ai'
    isError?: boolean
}

// Robust Interface with all optional fields
interface ResearchData {
    title?: string
    report?: string
}

export function ResearchAgentPage() {
    // --- State ---
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Greetings. I'm Nina, your Research Specialist. What topic or question would you like me to investigate for you today?", sender: 'ai' }
    ])
    const [inputValue, setInputValue] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [researchData, setResearchData] = useState<ResearchData | null>(null)
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
        if (researchData?.report) {
            navigator.clipboard.writeText(
                `${researchData.title ? researchData.title + '\n\n' : ''}${researchData.report} `
            )
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
            // Webhook for Research Agent
            const N8N_BASE_URL = import.meta.env.VITE_N8N_BASE_URL || 'http://localhost:5678';
            const WEBHOOK_URL = `${N8N_BASE_URL}/webhook/research-agent`

            const payload = {
                message: inputValue,
                sessionId: sessionId.current
            };

            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (!response.ok) throw new Error("Failed to fetch response")

            // Robust parsing
            let data: any = {};
            try {
                data = await response.json()
            } catch (jsonError) {
                throw new Error("Invalid JSON response")
            }

            // --- DEEP PARSING & SAFETY CHECK ---
            let finalTitle = "Untitled Research";
            let finalReport = "No content generated.";

            const attemptExtraction = (payload: any) => {
                // If it's a string, try to parse JSON out of it
                if (typeof payload === 'string') {
                    const match = payload.match(/\{[\s\S]*\}/);
                    if (match) {
                        try {
                            const parsed = JSON.parse(match[0]);
                            if (parsed.title) finalTitle = parsed.title;
                            if (parsed.report) finalReport = parsed.report;
                            return true;
                        } catch { }
                    }
                } else if (payload && typeof payload === 'object') {
                    // It's an object, just grab keys directly
                    if (payload.title && finalTitle === "Untitled Research") finalTitle = payload.title;
                    if (payload.report && finalReport === "No content generated.") finalReport = payload.report;

                    // If it has research_data, grab from there
                    if (payload.research_data) {
                        if (payload.research_data.title || payload.research_data.topic)
                            finalTitle = payload.research_data.title || payload.research_data.topic;
                        if (payload.research_data.report || payload.research_data.executive_summary)
                            finalReport = payload.research_data.report || payload.research_data.executive_summary;
                    }

                    // The 'Error parsing research data' happens when n8n's title expression fails, but puts JSON in report
                    if (typeof payload.report === 'string' && payload.report.includes('{') && payload.report.includes('}')) {
                        const match = payload.report.match(/\{[\s\S]*\}/);
                        if (match) {
                            try {
                                const parsedInside = JSON.parse(match[0]);
                                if (parsedInside.title) finalTitle = parsedInside.title;
                                if (parsedInside.report) finalReport = parsedInside.report;
                            } catch { }
                        }
                    }
                }
                return false;
            };

            attemptExtraction(data);

            // Ultimate fallback clean: manually strip { } and quotes if parser failed, but string looks like raw JSON
            if (finalTitle === "Error parsing research data." || finalTitle.includes("Error parsing")) {
                finalTitle = "Research Intelligence Brief"; // Better fallback than an error
            }

            if (typeof finalReport === 'string') {
                finalReport = finalReport.replace(/^[\s\n]*\{[\s\S]*"report"\s*:\s*"/, '').replace(/"[\s\S]*\}[\s\n]*$/, '');
                // Replace escaped newlines if they exist
                finalReport = finalReport.replace(/\\n/g, '\n');
            }

            setResearchData({
                title: finalTitle,
                report: finalReport
            });

            const messageText = data?.chat_response || "I've compiled the research report for you. Please review the Intelligence Dossier on the right.";
            setMessages(prev => [...prev, { id: Date.now() + 1, text: messageText, sender: 'ai' }])

        } catch (error) {
            console.error("Research Agent Error:", error)
            // Show error in chat without crashing
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "I encountered a connection error while accessing the archives. Please try again.",
                sender: 'ai',
                isError: true
            }])
        } finally {
            setIsLoading(false)
        }
    }

    // --- Handle Download / Print ---
    const handleDownloadPDF = () => {
        setTimeout(() => {
            window.print();
        }, 100);
    };

    return (
        <div className="min-h-screen bg-[#F3F4F6] font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
            {/* Print Styles */}
            <style>
                {`
@media print {
    @page { margin: 0; size: auto; }
                    body { margin: 0; padding: 0; background: white; }
    body * {
        visibility: hidden;
    }
    #report - container, #report - container * {
        visibility: visible;
    }
    #report - container {
        position: absolute;
        left: 0;
        top: 0;
        width: 100 %;
        height: auto;
        margin: 0;
        padding: 0;
        background: white;
        border: none;
        box - shadow: none;
        overflow: visible;
    }
    #report - content {
        overflow: visible!important;
        height: auto!important;
    }
                    /* Hide scrollbars and UI elements inside report container during print if needed */
                    .no - print {
        display: none!important;
    }
}
`}
            </style>

            {/* Navbar (Fixed) - Hidden on Print */}
            <div className="z-50 no-print">
                <Navbar />
            </div>

            {/* Main Content Area */}
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-4 no-print">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-140px)] lg:h-[calc(100vh-140px)]">

                    {/* --- LEFT BOX: CHAT (Nina) --- */}
                    <div className="lg:col-span-4 flex flex-col h-full bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                        {/* Chat Header */}
                        <div className="p-5 border-b border-slate-100 flex items-center gap-4 bg-white/80 backdrop-blur-sm sticky top-0 z-10 shrink-0">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center border border-white shadow-sm overflow-hidden">
                                    <img src={ResearchAgentImg} alt="Nina" className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-indigo-500 border-2 border-white rounded-full"></div>
                            </div>
                            <div>
                                <h2 className="font-bold text-slate-900 text-sm">Nina <span className="text-slate-400 font-normal">| Research Specialist</span></h2>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-50/50">
                            {messages.map((msg) => (
                                <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
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
                                                <img src={ResearchAgentImg} alt="Nina" className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-sm" />
                                            )}
                                        </div>

                                        {/* Bubble */}
                                        <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm border ${msg.sender === 'user'
                                            ? 'bg-white border-slate-200 text-slate-800 rounded-tr-none'
                                            : msg.isError
                                                ? 'bg-red-50 border-red-200 text-red-700 rounded-tl-none'
                                                : 'bg-white border-slate-200 text-slate-700 rounded-tl-none'
                                            }`}>
                                            {msg.text.split('\n').map((line, i) => (
                                                <p key={i} className={i > 0 ? 'mt-2' : ''}>
                                                    {msg.isError && i === 0 && <AlertCircle className="w-4 h-4 inline-block mr-1 -mt-0.5" />}
                                                    {line}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Typing Indicator */}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex gap-3 max-w-[90%]">
                                        <img src={ResearchAgentImg} alt="Nina" className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-sm mt-1" />
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
                                    placeholder="Ask for research on a topic..."
                                    className="w-full pl-5 pr-14 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-900 focus:border-transparent transition-all outline-none text-sm font-medium text-slate-700 placeholder:text-slate-400"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isLoading}
                                    className="absolute right-2 p-2 bg-indigo-900 hover:opacity-90 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* --- RIGHT BOX: RESEARCH DOSSIER (DARK PRESENTATION UX) --- */}
                    <div id="report-container" className="lg:col-span-8 flex flex-col h-full bg-[#0B0F19] rounded-[2rem] shadow-2xl border border-slate-700/60 overflow-hidden relative">

                        {/* Atmospheric Glows */}
                        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none"></div>
                        <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                        <div className="absolute top-64 -left-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                        {/* Board Header integrated with decorative top */}
                        <div className="flex-1 overflow-y-auto" id="report-content">
                            <div className="border-b border-white/5 bg-[#0B0F19]/60 backdrop-blur-xl px-6 py-4 sticky top-0 z-30 flex items-center justify-between shadow-sm shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.3)] border border-indigo-400/30">
                                        <Sparkles className="w-5 h-5 text-indigo-50" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-black text-white tracking-widest font-sans uppercase bg-gradient-to-r from-indigo-200 to-white bg-clip-text text-transparent drop-shadow-sm">INTELLIGENCE DOSSIER</h2>
                                        <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-[0.2em] mt-0.5 font-sans">Executive Presentation</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 font-sans no-print z-40">
                                    {researchData && (
                                        <>
                                            <button
                                                onClick={handleCopy}
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-600 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-all shadow-sm bg-slate-900/50 backdrop-blur-md"
                                            >
                                                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                                {copied ? "Copied" : "Copy"}
                                            </button>
                                            <button
                                                onClick={handleDownloadPDF}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-bold tracking-wide rounded-lg transition-all shadow-[0_0_10px_rgba(99,102,241,0.3)] active:scale-95 border border-indigo-400/50"
                                            >
                                                <Download className="w-3.5 h-3.5" />
                                                PDF
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* --- CONTENT AREA (The 'Presentation') --- */}
                            <div className="p-6 md:p-12 font-sans text-slate-200 min-h-full pb-20 flex flex-col items-center relative z-10">

                                {!researchData ? (
                                    // EMPTY STATE
                                    <div className="flex flex-col items-center justify-center py-32 text-center opacity-70 flex-1 w-full relative">
                                        <div className="w-24 h-24 bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-3xl flex items-center justify-center mb-8 shadow-2xl relative overflow-hidden group hover:scale-105 transition-transform">
                                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <Search className="w-10 h-10 text-indigo-400/60" />
                                        </div>
                                        <div className="max-w-md space-y-3">
                                            <h3 className="text-2xl font-black tracking-tight text-white font-sans bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Awaiting Protocol</h3>
                                            <p className="text-slate-400 text-[15px] font-sans leading-relaxed">Submit your inquiry to Nina to instantiate a real-time, high-fidelity intelligence presentation.</p>
                                        </div>
                                    </div>
                                ) : (
                                    // DATA STATE (PREMIUM PRESENTATION)
                                    <div className="space-y-12 animate-in fade-in zoom-in-95 duration-1000 w-full max-w-4xl mx-auto bg-slate-900/40 backdrop-blur-2xl rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-slate-700/50 p-10 md:p-16 mb-10 h-max relative overflow-hidden">

                                        {/* Subtle internal atmospheric glow */}
                                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>

                                        {/* Document Header */}
                                        <div className="border-b border-slate-700/50 pb-10 text-left relative z-10">
                                            <div className="absolute top-0 right-0 flex flex-col items-end gap-1">
                                                <span className="text-[10px] font-sans font-black text-indigo-400/70 uppercase tracking-[0.25em]">
                                                    {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).toUpperCase()}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                                                <span className="text-[11px] font-black font-sans text-cyan-400 uppercase tracking-[0.2em]">
                                                    Intelligence Briefing
                                                </span>
                                            </div>

                                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15] mb-6 font-sans drop-shadow-md">
                                                {researchData?.title || "Untitled Research"}
                                            </h1>

                                            <div className="flex items-center gap-2 mt-8 opacity-80">
                                                <div className="h-px bg-gradient-to-r from-indigo-500/50 to-transparent flex-1"></div>
                                                <p className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 px-4 whitespace-nowrap">
                                                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> NeuralForge Synthesis
                                                </p>
                                            </div>
                                        </div>

                                        {/* Report Body Wrapper (react-markdown) */}
                                        <div className="prose prose-invert prose-lg md:prose-xl max-w-none 
                                            prose-headings:font-sans prose-headings:font-black prose-headings:tracking-tight prose-headings:text-indigo-100 prose-headings:mt-12 prose-headings:mb-6
                                            prose-p:text-slate-300 prose-p:leading-[1.8] prose-p:font-sans prose-p:font-medium prose-p:mb-8
                                            prose-a:text-cyan-400 prose-a:decoration-cyan-400/30 hover:prose-a:decoration-cyan-400
                                            prose-strong:text-white prose-strong:font-bold prose-strong:bg-indigo-900/30 prose-strong:px-1 prose-strong:rounded
                                            prose-ul:text-slate-300 prose-ul:my-8 prose-ul:space-y-4
                                            prose-li:marker:text-indigo-400
                                            prose-hr:border-slate-700/50 prose-hr:my-12
                                            prose-blockquote:border-l-indigo-400 prose-blockquote:bg-indigo-950/20 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-indigo-200 prose-blockquote:my-8
                                            whitespace-pre-wrap
                                            z-10 relative">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {researchData?.report || "No content generated."}
                                            </ReactMarkdown>
                                        </div>

                                        {/* Document Footer */}
                                        <div className="mt-20 pt-8 border-t border-slate-700/50 text-center flex flex-col items-center gap-4">
                                            <div className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                            </div>
                                            <span className="text-slate-500 font-sans font-bold text-[10px] uppercase tracking-[0.3em]">
                                                End of Synthesis
                                            </span>
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
