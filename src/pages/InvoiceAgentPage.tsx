import { useState, useEffect, useRef } from "react"
import { Navbar } from "../components/Navbar"
import { Send, FileText, DollarSign } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import InvoiceAgentImg from "../assets/agents/agent-11.png" // Omar

interface Message {
    id: string
    sender: 'user' | 'ai'
    text: string
}

interface BillingDraft {
    subject: string
    body: string
}

export function InvoiceAgentPage() {
    // --- State ---
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', sender: 'ai', text: "Hi, I'm Omar. I handle invoicing and payments. Tell me who to bill and for what, and I'll generate a professional invoice for you." }
    ])
    const [inputValue, setInputValue] = useState("")
    const [loading, setLoading] = useState(false)
    const [draft, setDraft] = useState<BillingDraft | null>(null)

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
            // Placeholder Webhook URL - User to replace [PASTE_YOUR_OMAR_WEBHOOK_URL] here
            const N8N_BASE_URL = import.meta.env.VITE_N8N_BASE_URL || 'http://localhost:5678';
            const WEBHOOK_URL = `${N8N_BASE_URL}/webhook/invoice-agent`

            const payload = {
                sessionId: "user-session-id",
                input: userMsg.text
            }

            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (!response.ok) throw new Error("Failed to fetch response")

            const data = await response.json()

            let messageText = "Here is your billing draft! I have prepared the communication on the right."
            let newDraft: BillingDraft | null = null

            // Clean parsing for stringified data
            const parsedData = typeof data === 'string' && data.trim().startsWith('{') ? JSON.parse(data) : data;

            let subject = parsedData.subject || parsedData.Subject || "";
            let body = parsedData.body || parsedData.Body || parsedData.text || parsedData.content || "";

            // Nested JSON wrapper
            if (typeof body === 'string' && body.trim().startsWith('{') && body.trim().endsWith('}')) {
                try {
                    const bJSON = JSON.parse(body);
                    subject = bJSON.subject || bJSON.Subject || subject;
                    body = bJSON.body || bJSON.Body || bJSON.text || bJSON.content || bJSON;
                } catch (e) { }
            }

            // Raw fallback cleanly removing brackets
            if (typeof body === 'string' && body.trim().startsWith('{') && body.trim().endsWith('}')) {
                const noBrackets = body.trim().slice(1, -1);
                const bodyMatch = noBrackets.match(/"body"\s*:\s*"([\s\S]*?)"\s*(?:,|$)/i) || noBrackets.match(/"text"\s*:\s*"([\s\S]*?)"\s*(?:,|$)/i);
                if (bodyMatch) body = bodyMatch[1];
                else body = noBrackets;

                const subjectMatch = noBrackets.match(/"subject"\s*:\s*"([\s\S]*?)"\s*(?:,|$)/i);
                if (subjectMatch) subject = subjectMatch[1];
            }

            if (body || subject) {
                let bodyString = typeof body === 'string' ? body : JSON.stringify(body);
                bodyString = bodyString.replace(/\\n/gm, '\n').replace(/^["']|["']$/gm, '').replace(/\\"/gm, '"');
                newDraft = {
                    subject: typeof subject === 'string' ? subject : "Billing Communication",
                    body: bodyString
                }
            } else if (parsedData.output) {
                messageText = typeof parsedData.output === 'string' ? parsedData.output : JSON.stringify(parsedData.output);
            } else {
                messageText = "I couldn't parse a standard draft, but here is the raw response: " + JSON.stringify(parsedData);
            }

            if (newDraft) {
                setDraft(newDraft)
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
                text: "Sorry, I can't connect to the invoicing system right now. Please try again later."
            }])
        } finally {
            setLoading(false)
        }
    }

    // downloadPDF removed since it's an email draft now

    return (
        <div className="min-h-screen bg-[#F3F4F6] font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
            {/* Navbar (Fixed) */}
            <div className="z-50">
                <Navbar />
            </div>

            {/* Main Content Area 
                - pt-40: roughly 160px (120px navbar + 40px gap) 
                - h-[calc(100vh-180px)]: Leaves space at bottom 
            */}
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-140px)] lg:h-[calc(100vh-140px)]">

                    {/* --- LEFT COL: CHAT (Rounded Card) --- */}
                    <div className="lg:col-span-4 flex flex-col h-full bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                        {/* Chat Header */}
                        <div className="p-5 border-b border-slate-100 flex items-center gap-4 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
                            <div>
                                <h2 className="font-bold text-slate-900 text-sm">Omar <span className="text-slate-400 font-normal">| Invoice Agent</span></h2>
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
                                                    <img src={InvoiceAgentImg} alt="Omar" className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-sm" />
                                                    <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Bubble */}
                                        <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm border ${msg.sender === 'user'
                                            ? 'bg-white border-emerald-100/50 text-slate-800 rounded-tr-none'
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
                                            <img src={InvoiceAgentImg} alt="Omar" className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-sm" />
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
                                    placeholder="e.g. Bill Acme Corp $1500 for Web Development..."
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
                        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-50/50 via-transparent to-transparent"></div>

                        <div className="w-full h-full overflow-y-auto relative z-10 custom-scrollbar">
                            <div className="min-h-full flex flex-col items-center justify-center p-8">

                                {draft ? (
                                    <div className="w-full max-w-2xl z-10 animate-in slide-in-from-bottom-5 fade-in duration-500">

                                        {/* Professional Invoice Document Card */}
                                        <div className="bg-white rounded-2xl shadow-xl shadow-slate-300/60 border border-slate-200/60 overflow-hidden flex flex-col relative before:absolute before:inset-0 before:ring-1 before:ring-inset before:ring-slate-900/5 before:rounded-2xl">

                                            {/* Top Subtle Focus Bar */}
                                            <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 to-teal-400 absolute top-0 left-0 z-10"></div>

                                            {/* Decorative Background Watermark */}
                                            <div className="absolute top-20 right-8 text-[120px] font-black tracking-tighter text-slate-50/80 uppercase select-none pointer-events-none z-0 transform rotate-[-2deg]">
                                                INVOICE
                                            </div>

                                            {/* Header */}
                                            <div className="px-10 pt-10 pb-6 flex items-start justify-between relative z-10">
                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-2.5 mb-2">
                                                        <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shadow-md shadow-emerald-500/20">
                                                            <DollarSign className="w-5 h-5 text-white" />
                                                        </div>
                                                        <h2 className="text-xl font-black tracking-tight text-slate-900">NeuralForge Inc.</h2>
                                                    </div>
                                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-widest pl-10">
                                                        Billing & Services
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <h3 className="text-3xl font-black tracking-tighter text-slate-200 uppercase mb-1 drop-shadow-sm">INVOICE</h3>
                                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full border border-amber-100 text-[10px] font-bold text-amber-600 tracking-wider uppercase">
                                                        Pending Payment
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Subject/Project Banner */}
                                            <div className="mx-10 my-4 px-6 py-5 bg-slate-50 border-l-4 border-emerald-500 rounded-r-xl relative z-10">
                                                <div className="text-[10px] font-bold text-emerald-600/80 uppercase tracking-widest mb-1.5">For Services Rendered</div>
                                                <h1 className="text-lg font-bold text-slate-800 leading-snug">{draft.subject}</h1>
                                            </div>

                                            {/* Body Text (The Invoice Items & Details) */}
                                            <div className="px-10 py-6 flex-1 relative z-10">
                                                <div className="text-[15px] font-medium text-slate-700 leading-8 whitespace-pre-wrap font-serifs tracking-tight">
                                                    {draft.body}
                                                </div>
                                            </div>

                                            {/* Footer Terms */}
                                            <div className="px-10 pt-8 pb-10 mt-auto relative z-10 border-t border-slate-100 bg-slate-50/50">
                                                <p className="text-sm italic font-medium text-slate-400 text-center">
                                                    "Thank you for your business. We appreciate your continued partnership."
                                                </p>
                                            </div>
                                        </div>

                                        {/* Floating Action Buttons */}
                                        <div className="mt-6 flex flex-wrap items-center justify-end gap-3 px-2">
                                            <button
                                                onClick={() => navigator.clipboard.writeText(draft.subject + "\n\n" + draft.body)}
                                                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 text-sm font-bold rounded-xl transition-all shadow-sm active:scale-95"
                                            >
                                                <FileText className="w-4 h-4" />
                                                Copy Details
                                            </button>
                                            <button
                                                className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-slate-900/20 active:scale-95"
                                            >
                                                <Send className="w-4 h-4" />
                                                Generate & Send
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center text-center z-10 opacity-60">
                                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/10 mb-6 border border-emerald-50">
                                            <FileText className="w-8 h-8 text-emerald-500" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">Billing & Communications</h3>
                                        <p className="text-slate-500 max-w-sm">
                                            Tell Omar what you need to bill (e.g., "Draft a polite overdue invoice for Acme Corp"), and watch your professional document render here.
                                        </p>
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
