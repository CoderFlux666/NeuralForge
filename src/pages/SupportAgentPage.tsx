import { useState, useEffect, useRef } from "react"
import { Navbar } from "../components/Navbar"
import { Send, Sparkles, CheckCircle2, Clipboard } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import SupportAgentImg from "../assets/agents/agent-1.png" // Lina

interface Message {
    id: string
    sender: 'user' | 'ai'
    text: string
}

interface SupportDraft {
    summary: string
    replyText: string
}

export function SupportAgentPage() {
    // --- State ---
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', sender: 'ai', text: "Hello! I'm Lina, your Support Agent. Describe the issue you're facing, and I'll analyze it, summarize the problem, and propose a solution." }
    ])
    const [inputValue, setInputValue] = useState("")
    const [loading, setLoading] = useState(false)
    const [draft, setDraft] = useState<SupportDraft | null>(null)
    const { user } = useAuth();
    const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;
    const initial = (user?.email?.[0] ?? '?').toUpperCase();
    const [sessionId, setSessionId] = useState<string>(() => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
    const [copied, setCopied] = useState(false)

    // Auto-scroll to bottom of chat
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // --- Handlers ---
    const handleReset = () => {
        setMessages([{ id: '1', sender: 'ai', text: "Hello! I'm Lina, your Support Agent. Paste a customer's support ticket and I will draft a reply." }])
        setDraft(null)
        setInputValue("")
        setSessionId(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
    }
    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!inputValue.trim() || loading) return

        const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: inputValue }
        setMessages(prev => [...prev, userMsg])
        setInputValue("")
        setLoading(true)

        try {
            const N8N_BASE_URL = import.meta.env.VITE_N8N_BASE_URL || 'http://localhost:5678';
            const WEBHOOK_URL = `${N8N_BASE_URL}/webhook/support-agent`

            const payload = {
                sessionId: sessionId,
                customerMessage: userMsg.text
            }

            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (!response.ok) throw new Error("Failed to fetch response")

            const data = await response.json()

            let draftContent = null
            let messageText = "Here is your drafted support reply! I have placed it in the editor on the right."

            if (data.summary && data.replyText) {
                draftContent = {
                    summary: data.summary,
                    replyText: data.replyText
                }
            } else if (data.chat_response || data.email_draft) {
                messageText = data.chat_response || messageText
                if (data.email_draft) {
                    const draftObj = typeof data.email_draft === 'string' ? JSON.parse(data.email_draft) : data.email_draft
                    draftContent = {
                        summary: draftObj.summary || "Ticket Summary",
                        replyText: draftObj.replyText || draftObj.reply || draftObj.body || (typeof draftObj === 'string' ? draftObj : JSON.stringify(draftObj))
                    }
                }
            } else if (data.output) {
                try {
                    const parsed = typeof data.output === 'string' ? JSON.parse(data.output) : data.output
                    if (parsed.type === 'draft' || parsed.replyText || parsed.summary || parsed.reply) {
                        draftContent = {
                            summary: parsed.summary || "Ticket Summary",
                            replyText: parsed.replyText || parsed.reply || parsed.body
                        }
                    } else {
                        const txt = parsed.message || parsed.text || (typeof parsed === 'string' ? parsed : data.output)
                        messageText = typeof txt === 'string' ? txt : JSON.stringify(txt)
                    }
                } catch (e) {
                    messageText = data.output
                }
            } else if (data.replyText || data.reply) {
                draftContent = {
                    summary: data.summary || "Ticket Summary",
                    replyText: data.replyText || data.reply
                }
            } else if (!draftContent) {
                try {
                    if (typeof data === 'string') {
                        const parsed = JSON.parse(data)
                        if (parsed.summary && (parsed.replyText || parsed.reply)) {
                            draftContent = { summary: parsed.summary, replyText: parsed.replyText || parsed.reply }
                        } else {
                            messageText = data
                        }
                    } else {
                        messageText = JSON.stringify(data)
                    }
                } catch {
                    messageText = typeof data === 'string' ? data : JSON.stringify(data)
                }
            }

            if (draftContent) {
                setDraft(draftContent)
            }

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                sender: 'ai',
                text: messageText
            }])

        } catch (error) {
            console.error(error)
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                sender: 'ai',
                text: "Sorry, I encountered an error connecting to the support system. Please try again."
            }])
        } finally {
            setLoading(false)
        }
    }

    const copyToClipboard = () => {
        if (!draft) return
        navigator.clipboard.writeText(draft.replyText)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="min-h-screen bg-[#F3F4F6] font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
            {/* Navbar (Fixed) */}
            <div className="z-50">
                <Navbar />
            </div>

            {/* Main Content Area */}
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-140px)] lg:h-[calc(100vh-140px)]">

                    {/* --- LEFT COL: CHAT (Rounded Card) --- */}
                    <div className="lg:col-span-4 flex flex-col h-full bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                        {/* Chat Header */}
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-sm sticky top-0 z-10">
                            <div>
                                <h2 className="font-bold text-slate-900 text-sm">Lina <span className="text-slate-400 font-normal">| Support Agent</span></h2>
                            </div>
                            <button
                                onClick={handleReset}
                                className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg"
                            >
                                Clear Chat
                            </button>
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
                                                <div className="relative">
                                                    <img src={SupportAgentImg} alt="Lina" className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-sm" />
                                                    <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Bubble */}
                                        <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm border ${msg.sender === 'user'
                                            ? 'bg-white border-blue-100/50 text-slate-800 rounded-tr-none'
                                            : 'bg-white border-slate-200 text-slate-700 rounded-tl-none'
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Typing Indicator */}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="flex gap-3 max-w-[90%]">
                                        <div className="relative mt-1">
                                            <img src={SupportAgentImg} alt="Lina" className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-sm" />
                                            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                                        </div>
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
                                    placeholder="Describe your technical issue..."
                                    className="w-full pl-5 pr-14 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all outline-none text-sm font-medium text-slate-700 placeholder:text-slate-400"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || loading}
                                    className="absolute right-2 p-2 bg-slate-900 hover:opacity-90 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* --- RIGHT COL: PREVIEW (Rounded Card) --- */}
                    <div className="lg:col-span-8 flex flex-col h-full bg-slate-50 rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-[#f8fafc] z-0 opacity-50"></div>
                        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent"></div>

                        <div className="flex-1 overflow-y-auto p-8 relative z-10 flex flex-col items-center justify-center custom-scrollbar">
                            {draft ? (
                                <div className="w-full max-w-2xl z-10 animate-in slide-in-from-bottom-5 fade-in duration-500">
                                    {/* Draft Card */}
                                    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden ring-1 ring-slate-900/5">
                                        {/* Header / Actions */}
                                        <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                                                TICKET ANALYSIS & RESOLUTION
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-8 space-y-8">
                                            {/* Summary Section */}
                                            <div className="space-y-3">
                                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Problem Summary</h4>
                                                <div className="p-5 bg-indigo-50/60 rounded-xl border border-indigo-100/50 text-slate-700 text-sm leading-relaxed font-medium">
                                                    {draft.summary}
                                                </div>
                                            </div>

                                            {/* Reply Section */}
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Proposed Reply</h4>
                                                    <button
                                                        onClick={copyToClipboard}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-slate-100 rounded-md text-slate-500 hover:text-slate-800 transition-colors text-xs font-medium"
                                                    >
                                                        {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> : <Clipboard className="w-3.5 h-3.5" />}
                                                        {copied ? 'Copied!' : 'Copy Reply'}
                                                    </button>
                                                </div>
                                                <div className="text-slate-600 leading-relaxed whitespace-pre-wrap font-medium pt-2">
                                                    {draft.replyText}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-center z-10 opacity-60">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/10 mb-6 border border-indigo-50">
                                        <Sparkles className="w-8 h-8 text-indigo-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Support Assistant</h3>
                                    <p className="text-slate-500 max-w-sm">
                                        Describe your issue, and Lina will generate a support ticket and action plan for you.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
