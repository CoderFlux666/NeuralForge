import { useState, useEffect, useRef } from "react"
import { Navbar } from "../components/Navbar"
import { Send, Sparkles, Linkedin, Twitter, Instagram, Clipboard, CheckCircle2, ChevronDown, MessageCircle, Heart, Share2, Repeat2, Send as SendIcon, ThumbsUp } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ContentAgentImg from "../assets/agents/agent-6.png"

interface Message {
    id: string
    sender: 'user' | 'ai'
    text: string
}

interface ContentDraft {
    platform: 'LinkedIn' | 'Twitter' | 'Instagram'
    title: string
    content: string
}

export function ContentAgentPage() {
    // --- State ---
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', sender: 'ai', text: "Hey there! I'm Kai. Ready to create some viral content? Pick a platform, set the tone, and tell me what's on your mind." }
    ])
    const [inputValue, setInputValue] = useState("")
    const [platform, setPlatform] = useState<'LinkedIn' | 'Twitter' | 'Instagram'>('LinkedIn')
    const [tone, setTone] = useState("Professional")
    const [platformOpen, setPlatformOpen] = useState(false)
    const [toneOpen, setToneOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [draft, setDraft] = useState<ContentDraft | null>(null)

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
        setMessages([{ id: '1', sender: 'ai', text: "Hey there! I'm Kai. Ready to create some viral content? Pick a platform, set the tone, and tell me what's on your mind." }])
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
            // Using placeholder URL as requested, user can replace
            const N8N_BASE_URL = import.meta.env.VITE_N8N_BASE_URL || 'http://localhost:5678';
            const WEBHOOK_URL = `${N8N_BASE_URL}/webhook/content-agent`

            const payload = {
                sessionId: sessionId,
                userMessage: userMsg.text,
                platform: platform,
                tone: tone
            }

            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (!response.ok) throw new Error("Failed to fetch response")

            const data = await response.json()

            // Logic: Handle structured API response
            let draftContent: ContentDraft | null = null
            let messageText = "Here is your drafted content! I have placed it in the studio on the right."

            // Clean parsing
            try {
                // If it's pure stringified JSON, parse it
                const parsedData = typeof data === 'string' ? JSON.parse(data) : data;

                // If the webhook returns {Title: "...", Content: "..."} or {title: "...", content: "..."}
                let extractedTitle = parsedData.title || parsedData.Title || parsedData.topic || "Generated Draft";
                let extractedContent = parsedData.content || parsedData.Content || parsedData.body || parsedData.text;

                // Handle nested stringified JSON in content_draft (n8n quirk)
                if (parsedData.content_draft) {
                    const cd = typeof parsedData.content_draft === 'string' ? JSON.parse(parsedData.content_draft) : parsedData.content_draft;
                    extractedTitle = cd.title || cd.Title || extractedTitle;
                    extractedContent = cd.content || cd.Content || cd.text || cd;
                }

                if (extractedContent) {
                    // Make completely sure it's a string, avoid ANY object leaking
                    let finalContentString = "";

                    if (typeof extractedContent === 'string') {
                        finalContentString = extractedContent;
                    } else if (extractedContent && (extractedContent.content || extractedContent.text)) {
                        finalContentString = extractedContent.content || extractedContent.text;
                    } else {
                        finalContentString = JSON.stringify(extractedContent || "");
                    }

                    // Check boundaries aggressively
                    const cTrim = finalContentString.trim();
                    if (cTrim.startsWith('{') && cTrim.endsWith('}')) {
                        const noBrackets = cTrim.slice(1, -1);
                        const contentMatch = noBrackets.match(/"content"\s*:\s*"([\s\S]*?)"\s*(?:,|$)/i) ||
                            noBrackets.match(/"text"\s*:\s*"([\s\S]*?)"\s*(?:,|$)/i);
                        if (contentMatch) {
                            finalContentString = contentMatch[1];
                        } else {
                            finalContentString = noBrackets;
                        }

                        const titleMatch = noBrackets.match(/"title"\s*:\s*"([\s\S]*?)"\s*(?:,|$)/i);
                        if (titleMatch) {
                            extractedTitle = titleMatch[1];
                        }
                    }

                    // Strict replace and parse line breaks directly without extra escapes
                    const cleanContent = finalContentString.replace(/\\n/gm, '\n').replace(/^["']|["']$/gm, '').replace(/\\"/gm, '"');

                    draftContent = {
                        platform: platform,
                        title: typeof extractedTitle === 'string' ? extractedTitle : "Generated Draft",
                        content: cleanContent
                    }
                } else if (parsedData.output) {
                    messageText = typeof parsedData.output === 'string' ? parsedData.output : JSON.stringify(parsedData.output);
                } else {
                    messageText = "I couldn't parse a standard draft, but here is the raw response: " + JSON.stringify(parsedData);
                }
            } catch (e) {
                messageText = "Error parsing draft: " + (typeof e === 'object' && e !== null && 'message' in e ? String(e.message) : 'Unknown parse error');
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
                text: "Sorry, I ran into an issue connecting to my creative brain (the server). Please try again!"
            }])
        } finally {
            setLoading(false)
        }
    }

    const copyToClipboard = () => {
        if (!draft) return
        navigator.clipboard.writeText(draft.content)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    // Helper for Platform Icons
    const PlatformIcon = ({ p, className }: { p: string, className?: string }) => {
        if (p === 'LinkedIn') return <Linkedin className={className} />
        if (p === 'Twitter') return <Twitter className={className} />
        if (p === 'Instagram') return <Instagram className={className} />
        return <Sparkles className={className} />
    }

    return (
        <div className="min-h-screen bg-[#F3F4F6] font-sans text-slate-900 selection:bg-pink-100 selection:text-pink-900">
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
                                <h2 className="font-bold text-slate-900 text-sm">Kai <span className="text-slate-400 font-normal">| Content Agent</span></h2>
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
                                                    <img src={ContentAgentImg} alt="Kai" className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-sm" />
                                                    <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Bubble */}
                                        <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm border ${msg.sender === 'user'
                                            ? 'bg-white border-pink-100/50 text-slate-800 rounded-tr-none'
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
                                            <img src={ContentAgentImg} alt="Kai" className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-sm" />
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

                        {/* Controls & Input Area */}
                        <div className="p-5 bg-white border-t border-slate-100 space-y-3 z-20 relative">
                            {/* Custom Dropdowns */}
                            <div className="flex gap-2">
                                {/* Platform Select */}
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => { setPlatformOpen(!platformOpen); setToneOpen(false); }}
                                        className="flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-400 text-slate-700 text-xs font-semibold rounded-xl px-3 py-2 transition-all shadow-sm ring-1 ring-slate-900/5"
                                    >
                                        <PlatformIcon p={platform} className="w-3.5 h-3.5 text-slate-900" />
                                        {platform}
                                        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${platformOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    {platformOpen && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setPlatformOpen(false)}></div>
                                            <div className="absolute bottom-full left-0 mb-2 w-40 bg-white border border-slate-200 rounded-xl shadow-xl z-20 overflow-hidden animate-in slide-in-from-bottom-2 fade-in duration-200 ring-1 ring-slate-900/5">
                                                {['LinkedIn', 'Twitter', 'Instagram'].map(p => (
                                                    <button
                                                        key={p}
                                                        type="button"
                                                        onClick={() => { setPlatform(p as any); setPlatformOpen(false); }}
                                                        className={`w-full text-left px-4 py-2.5 text-xs font-medium flex items-center gap-2 hover:bg-slate-50 transition-colors ${platform === p ? 'text-slate-900 bg-slate-50' : 'text-slate-600'}`}
                                                    >
                                                        <PlatformIcon p={p} className="w-3.5 h-3.5" />
                                                        {p}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Tone Select */}
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => { setToneOpen(!toneOpen); setPlatformOpen(false); }}
                                        className="flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-400 text-slate-700 text-xs font-semibold rounded-xl px-3 py-2 transition-all shadow-sm ring-1 ring-slate-900/5"
                                    >
                                        <span className="text-slate-900">✨</span>
                                        {tone}
                                        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${toneOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    {toneOpen && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setToneOpen(false)}></div>
                                            <div className="absolute bottom-full left-0 mb-2 w-40 bg-white border border-slate-200 rounded-xl shadow-xl z-20 overflow-hidden animate-in slide-in-from-bottom-2 fade-in duration-200 ring-1 ring-slate-900/5">
                                                {['Professional', 'Viral', 'Casual', 'Controversial', 'Educational'].map(t => (
                                                    <button
                                                        key={t}
                                                        type="button"
                                                        onClick={() => { setTone(t); setToneOpen(false); }}
                                                        className={`w-full text-left px-4 py-2.5 text-xs font-medium flex items-center gap-2 hover:bg-slate-50 transition-colors ${tone === t ? 'text-slate-900 bg-slate-50' : 'text-slate-600'}`}
                                                    >
                                                        {t}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Input */}
                            <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={`Write a ${tone.toLowerCase()} post about...`}
                                    className="w-full pl-5 pr-14 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all outline-none text-sm font-medium text-slate-700 placeholder:text-slate-400 shadow-inner"
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
                        <div className="absolute inset-0 bg-[#f8fafc] z-0 opacity-50"></div>
                        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-50/50 via-transparent to-transparent"></div>


                        <div className="flex-1 overflow-y-auto p-8 relative z-10 flex flex-col items-center justify-center custom-scrollbar">

                            {draft ? (
                                <div className="w-full max-w-[600px] z-10 animate-in slide-in-from-bottom-5 fade-in duration-500 relative">

                                    {/* Universal Copy Button anchored top right of the wrapper */}
                                    <div className="absolute -top-12 right-0 flex gap-2">
                                        <button
                                            onClick={copyToClipboard}
                                            className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm rounded-lg text-slate-600 hover:text-slate-900 transition-all text-xs font-bold active:scale-95"
                                        >
                                            {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Clipboard className="w-4 h-4" />}
                                            {copied ? 'Copied!' : 'Copy Content'}
                                        </button>
                                    </div>

                                    {/* DYNAMIC PLATFORM PREVIEWS */}

                                    {/* 1. LINKEDIN */}
                                    {draft.platform === 'LinkedIn' && (
                                        <div className="bg-white rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.08)] border border-slate-200 overflow-hidden text-[#00000099] flex flex-col">
                                            <div className="p-4 flex gap-3">
                                                <div className="w-12 h-12 bg-slate-100 rounded-full flex-shrink-0 border border-slate-200 flex items-center justify-center overflow-hidden">
                                                    {avatarUrl ? (
                                                        <img src={avatarUrl} alt="User" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                                                            {initial}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-1 text-[14px]">
                                                        <span className="font-semibold text-slate-900">{user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User"}</span>
                                                        <span className="text-slate-500">• 1st</span>
                                                    </div>
                                                    <div className="text-[12px] text-slate-500">Software Professional</div>
                                                    <div className="text-[12px] text-slate-500 flex items-center gap-1 mt-0.5">
                                                        Just now • <Sparkles className="w-3 h-3" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="px-4 pb-2 text-[14px] text-slate-900 leading-relaxed whitespace-pre-wrap font-normal prose prose-sm prose-slate max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                    {draft.content}
                                                </ReactMarkdown>
                                            </div>
                                            <div className="px-4 py-2 border-t border-slate-100 mt-4 flex justify-between bg-white isolate">
                                                <button className="flex items-center gap-2 text-[14px] font-semibold text-slate-500 hover:bg-slate-100 px-3 py-2 rounded-md transition-colors">
                                                    <ThumbsUp className="w-5 h-5 -scale-x-100" /> Like
                                                </button>
                                                <button className="flex items-center gap-2 text-[14px] font-semibold text-slate-500 hover:bg-slate-100 px-3 py-2 rounded-md transition-colors">
                                                    <MessageCircle className="w-5 h-5" /> Comment
                                                </button>
                                                <button className="flex items-center gap-2 text-[14px] font-semibold text-slate-500 hover:bg-slate-100 px-3 py-2 rounded-md transition-colors">
                                                    <Share2 className="w-5 h-5" /> Repost
                                                </button>
                                                <button className="flex items-center gap-2 text-[14px] font-semibold text-slate-500 hover:bg-slate-100 px-3 py-2 rounded-md transition-colors">
                                                    <SendIcon className="w-5 h-5" /> Send
                                                </button>
                                            </div>
                                            {/* Action Button */}
                                            <div className="bg-slate-50 border-t border-slate-200 px-4 py-3 flex justify-end relative z-20">
                                                <button onClick={() => window.open('https://www.linkedin.com/feed/', '_blank')} className="bg-[#0a66c2] hover:bg-[#004182] text-white font-bold text-[14px] px-6 py-2 rounded-full transition-colors flex items-center gap-2 shadow-sm">
                                                    <Linkedin className="w-4 h-4" /> Post to LinkedIn
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* 2. TWITTER / X */}
                                    {draft.platform === 'Twitter' && (
                                        <div className="bg-white rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.06)] border border-slate-200 overflow-hidden font-sans">
                                            <div className="p-4 flex gap-3 pb-2">
                                                <div className="w-10 h-10 bg-slate-100 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-200">
                                                    {avatarUrl ? (
                                                        <img src={avatarUrl} alt="User" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                                                            {initial}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 text-left">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-1">
                                                            <span className="font-bold text-[15px] text-slate-900 hover:underline cursor-pointer">{user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User"}</span>
                                                            <span className="text-[15px] text-slate-500">@{user?.email?.split('@')[0] || "user"}</span>
                                                            <span className="text-[15px] text-slate-500">· 1m</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-[15px] text-slate-900 mt-1 leading-normal whitespace-pre-wrap prose prose-sm prose-slate max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0">
                                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                            {draft.content}
                                                        </ReactMarkdown>
                                                    </div>
                                                    <div className="flex justify-between items-center mt-4 mb-1 text-slate-500 max-w-md print:hidden">
                                                        <div className="group flex items-center gap-2 cursor-pointer transition-colors hover:text-sky-500"><MessageCircle className="w-4 h-4 group-hover:bg-sky-50 rounded-full" /></div>
                                                        <div className="group flex items-center gap-2 cursor-pointer transition-colors hover:text-emerald-500"><Repeat2 className="w-4 h-4 group-hover:bg-emerald-50 rounded-full" /></div>
                                                        <div className="group flex items-center gap-2 cursor-pointer transition-colors hover:text-pink-500"><Heart className="w-4 h-4 group-hover:bg-pink-50 rounded-full" /></div>
                                                        <div className="group flex items-center gap-2 cursor-pointer transition-colors hover:text-sky-500"><Share2 className="w-4 h-4 group-hover:bg-sky-50 rounded-full" /></div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Action Button */}
                                            <div className="bg-slate-50 border-t border-slate-100 px-4 py-3 flex justify-end relative z-20">
                                                <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(draft.content)}`, '_blank')} className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-bold text-[15px] px-6 py-2 rounded-full transition-colors flex items-center gap-2 shadow-sm">
                                                    <Twitter className="w-4 h-4" /> Tweet
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* 3. INSTAGRAM */}
                                    {draft.platform === 'Instagram' && (
                                        <div className="bg-white rounded-[3px] shadow-[0_2px_15px_rgb(0,0,0,0.1)] border border-slate-200 overflow-hidden max-w-[470px] mx-auto">
                                            {/* Header */}
                                            <div className="px-3 py-3 flex items-center justify-between border-b border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px]">
                                                        <div className="w-full h-full bg-white rounded-full border-2 border-white overflow-hidden flex items-center justify-center">
                                                            <div className="w-full h-full bg-slate-100 flex items-center justify-center overflow-hidden">
                                                                {avatarUrl ? (
                                                                    <img src={avatarUrl} alt="User" className="w-full h-full object-cover" />
                                                                ) : (
                                                                    <div className="w-full h-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                                                                        {initial}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className="font-semibold text-sm text-slate-900">{user?.email?.split('@')[0] || "user"}</span>
                                                </div>
                                            </div>

                                            {/* Image Placeholder */}
                                            <div className="w-full aspect-square bg-slate-50 flex items-center justify-center border-b border-gray-100">
                                                <div className="text-center space-y-2">
                                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 mx-auto flex items-center justify-center mb-2">
                                                        <Instagram className="w-6 h-6 text-slate-400" />
                                                    </div>
                                                    <p className="text-slate-400 font-medium text-sm">Post Image</p>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="px-4 py-3 flex items-center justify-between">
                                                <div className="flex gap-4">
                                                    <Heart className="w-6 h-6 text-slate-900 cursor-pointer hover:opacity-70" />
                                                    <MessageCircle className="w-6 h-6 text-slate-900 -scale-x-100 cursor-pointer hover:opacity-70" />
                                                    <SendIcon className="w-6 h-6 text-slate-900 cursor-pointer hover:opacity-70" />
                                                </div>
                                                <div className="w-6 h-6 border-2 border-slate-900 rounded-sm cursor-pointer hover:opacity-70"></div>
                                            </div>

                                            {/* Caption */}
                                            <div className="px-4 pb-4">
                                                <div className="text-sm text-slate-900 whitespace-pre-wrap leading-relaxed prose prose-sm prose-slate max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0 text-left">
                                                    <span className="font-semibold mr-2 float-left isolate">{user?.email?.split('@')[0] || "user"}</span>
                                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                        {draft.content}
                                                    </ReactMarkdown>
                                                </div>
                                                <div className="text-[10px] text-slate-500 uppercase font-medium mt-3 text-left">
                                                    1 day ago
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            <div className="bg-slate-50 border-t border-slate-100 px-4 py-3 flex justify-end relative z-20">
                                                <button onClick={() => window.open('https://www.instagram.com/', '_blank')} className="bg-[#0095F6] hover:bg-[#1877F2] text-white font-semibold text-[14px] px-6 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-sm">
                                                    <Instagram className="w-4 h-4" /> Share on Instagram
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-center z-10 opacity-60">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/10 mb-6 border border-pink-50">
                                        <Sparkles className="w-8 h-8 text-pink-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Social Preview</h3>
                                    <p className="text-slate-500 max-w-sm">
                                        Select a platform and tone to see how your post matches the vibe.
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
