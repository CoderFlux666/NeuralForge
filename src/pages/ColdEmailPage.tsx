import { useState, useEffect, useRef } from "react"
import { Navbar } from "../components/Navbar"
import { Send, Copy, Mail, Check, Sparkles } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import ColdEmailAgentImg from "../assets/agents/agent-2.png"

interface Message {
    id: string
    sender: 'user' | 'ai'
    text: string
}

interface Draft {
    subject: string
    body: string
}

export function ColdEmailPage() {
    // --- State ---
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', sender: 'ai', text: "Hi! I'm Suni, your Cold Email Specialist. Tell me about your product and who you're targeting, and I'll draft a high-converting email for you." }
    ])
    const [inputValue, setInputValue] = useState("")
    const [loading, setLoading] = useState(false)
    const [draft, setDraft] = useState<Draft | null>(null)
    const [copied, setCopied] = useState(false)

    const { user } = useAuth();
    const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;
    const initial = (user?.email?.[0] ?? '?').toUpperCase();

    // Auto-scroll to bottom of chat
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // --- Handlers ---
    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!inputValue.trim() || loading) return

        const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: inputValue }
        setMessages(prev => [...prev, userMsg])
        setInputValue("")
        setLoading(true)

        try {
            const N8N_BASE_URL = import.meta.env.VITE_N8N_BASE_URL || 'http://localhost:5678';
            const WEBHOOK_URL = `${N8N_BASE_URL}/webhook/cold-email-agent`

            // We send the user's input as 'emailContext' mostly, but the agent might be smart enough to extract other fields
            // For this chat interface, we treat the whole input as context/prompt
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    // Sending generic placeholders for structured fields if the API requires them, 
                    // or ideally the API should handle unstructured input "context"
                    productName: "User Product",
                    targetAudience: "Potential Customers",
                    emailContext: userMsg.text,
                    emailSubject: "Cold Outreach" // logic fallback
                }),
            })

            if (!response.ok) throw new Error("Failed to fetch response")

            const data = await response.json()

            // Logic: Handle generic or structured API responses
            let draftContent = null
            let messageText = "Here is your draft! I have placed it in the editor on the right for you."

            // If the response is exactly { subject: "...", body: "..." }
            if (data.subject && data.body) {
                draftContent = {
                    subject: data.subject,
                    body: data.body
                }
            }
            // 1. New Structure: { chat_response, email_draft }
            else if (data.chat_response || data.email_draft) {
                messageText = data.chat_response || messageText
                if (data.email_draft) {
                    const draftObj = typeof data.email_draft === 'string' ? JSON.parse(data.email_draft) : data.email_draft
                    draftContent = {
                        subject: draftObj.subject || "Cold Outreach",
                        body: draftObj.body || draftObj.email || (typeof draftObj === 'string' ? draftObj : JSON.stringify(draftObj))
                    }
                }
            }
            // 2. Fallback to old 'output' logic
            else if (data.output) {
                try {
                    const parsed = typeof data.output === 'string' ? JSON.parse(data.output) : data.output
                    if (parsed.type === 'draft' || parsed.email || parsed.subject) {
                        draftContent = {
                            subject: parsed.subject || "Cold Outreach",
                            body: parsed.email || parsed.body
                        }
                    } else {
                        const txt = parsed.message || parsed.text || (typeof parsed === 'string' ? parsed : data.output)
                        messageText = typeof txt === 'string' ? txt : JSON.stringify(txt)
                    }
                } catch (e) {
                    messageText = data.output
                }
            } else if (data.email) {
                draftContent = {
                    subject: data.subject || "Cold Outreach",
                    body: data.email
                }
            }
            // Absolute fallback if it's just a raw un-keyed response
            else if (!draftContent) {
                try {
                    // Maybe the entire root object is the email draft but we didn't catch it
                    if (typeof data === 'string') {
                        const parsed = JSON.parse(data)
                        if (parsed.subject && parsed.body) {
                            draftContent = { subject: parsed.subject, body: parsed.body }
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
                text: "Sorry, I encountered an error while processing that. Please try again."
            }])
        } finally {
            setLoading(false)
        }
    }

    const copyToClipboard = () => {
        if (!draft) return
        const fullText = `Subject: ${draft.subject}\n\n${draft.body}`
        navigator.clipboard.writeText(fullText)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const openInGmail = () => {
        if (!draft) return
        const url = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`
        window.open(url, '_blank')
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
                        <div className="p-5 border-b border-slate-100 flex items-center gap-4 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
                            <div>
                                <h2 className="font-bold text-slate-900 text-sm">Suni <span className="text-slate-400 font-normal">| Cold Email Specialist</span></h2>
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
                                                <div className="relative">
                                                    <img src={ColdEmailAgentImg} alt="Suni" className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-sm" />
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
                                            <img src={ColdEmailAgentImg} alt="Suni" className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-sm" />
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
                                    placeholder="Describe your product & audience..."
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

                    {/* --- RIGHT COL: CANVAS (Rounded Card) --- */}
                    <div className="lg:col-span-8 flex flex-col h-full bg-slate-50 rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                        {draft ? (
                            <div className="flex-1 overflow-y-auto relative z-10 custom-scrollbar">
                                <div className="min-h-full flex flex-col items-center justify-center p-8 lg:p-12">
                                    {/* Draft Card */}
                                    <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl shadow-slate-200/60 border border-gray-200 overflow-hidden animate-in zoom-in-95 duration-500">
                                        {/* Header / Actions */}
                                        <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                                                AI Generated Draft
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={copyToClipboard}
                                                    className="p-2 hover:bg-gray-100 rounded-lg text-slate-500 hover:text-blue-600 transition-colors tooltip"
                                                    title="Copy to Clipboard"
                                                >
                                                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                                </button>
                                                <button
                                                    onClick={openInGmail}
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
                                                >
                                                    <Mail className="w-3.5 h-3.5" />
                                                    Open in Gmail
                                                </button>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-8 space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subject</label>
                                                <div className="text-lg font-semibold text-slate-900 border-b border-gray-100 pb-2">
                                                    {draft.subject}
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Body</label>
                                                <div className="text-slate-600 leading-relaxed whitespace-pre-wrap font-medium">
                                                    {draft.body}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 relative z-10">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/10 mb-6 border border-blue-50">
                                    <Sparkles className="w-8 h-8 text-blue-500" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to Draft</h3>
                                <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
                                    Chat with Suni on the left to provide details about your product and audience. Your generated email will appear here.
                                </p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}
