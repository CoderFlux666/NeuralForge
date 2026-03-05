import { useState, useRef, useEffect } from "react"
import { Navbar } from "../components/Navbar"
import { Send, UserCircle2, Target, Briefcase, Sparkles } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import OnboardingAgentImg from "../assets/agents/agent-3.png"

interface Message {
    id: number
    text: string
    sender: 'user' | 'ai'
}

interface UserData {
    userName: string | null
    userRole: string | null
    userGoal: string | null
    plan_steps: string[]
}

export function OnboardingAgentPage() {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hi! I'm Eva, your Onboarding Specialist. I'm here to set up your profile and create a personalized success plan. What's your name?", sender: 'ai' }
    ])
    const [inputValue, setInputValue] = useState("")
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState<UserData>({
        userName: null,
        userRole: null,
        userGoal: null,
        plan_steps: []
    })

    const { user } = useAuth();
    const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;
    const initial = (user?.email?.[0] ?? '?').toUpperCase();

    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputValue.trim()) return

        const userMsg: Message = { id: Date.now(), text: inputValue, sender: 'user' }
        setMessages(prev => [...prev, userMsg])
        setInputValue("")
        setLoading(true)

        try {
            // Placeholder Webhook URL - User to replace [PASTE_YOUR_EVA_WEBHOOK_URL] here
            const N8N_BASE_URL = import.meta.env.VITE_N8N_BASE_URL || 'http://localhost:5678';
            const WEBHOOK_URL = `${N8N_BASE_URL}/webhook/onboarding-agent`

            const currentData = userData || {}; // Prevents crash if userData is null
            const payload = {
                prompt: inputValue,
                sessionId: "user-session-id",
                userName: currentData.userName || (currentData as any).user_name || null,
                userRole: currentData.userRole || (currentData as any).user_role || null,
                userGoal: currentData.userGoal || (currentData as any).user_goal || null
            };

            console.log("Debug Payload Sending:", payload) // Check console to see if this prints!

            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (!response.ok) throw new Error("Failed to fetch response")

            const data = await response.json()

            // FIX: Read 'chat_response' from the backend JSON, not 'output'
            let messageText = data.chat_response || data.output || "I'm listening..."

            // Update State from Backend
            if (data.onboarding_data) {
                const newData = data.onboarding_data
                setUserData(prev => ({
                    userName: newData.userName || newData.user_name || prev.userName,
                    userRole: newData.userRole || newData.user_role || prev.userRole,
                    userGoal: newData.userGoal || newData.user_goal || prev.userGoal,

                    // FIX: Only update steps if the backend actually sent new ones. 
                    // If backend sends empty array [], keep the 'prev.plan_steps'.
                    plan_steps: (newData.plan_steps && newData.plan_steps.length > 0)
                        ? newData.plan_steps
                        : prev.plan_steps
                }))
            }

            const aiMsg: Message = { id: Date.now() + 1, text: messageText, sender: 'ai' }
            setMessages(prev => [...prev, aiMsg])

        } catch (error) {
            console.error("Error communicating with agent:", error)
            const errorMsg: Message = { id: Date.now() + 1, text: "Sorry, I'm having trouble connecting to my brain right now.", sender: 'ai' }
            setMessages(prev => [...prev, errorMsg])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#F3F4F6] font-sans text-slate-900 selection:bg-purple-100 selection:text-purple-900">
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
                                <h2 className="font-bold text-slate-900 text-sm">Eva <span className="text-slate-400 font-normal">| Onboarding Specialist</span></h2>
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
                                                    <img src={OnboardingAgentImg} alt="Eva" className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-sm" />
                                                    <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Bubble */}
                                        <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm border ${msg.sender === 'user'
                                            ? 'bg-white border-slate-200 text-slate-800 rounded-tr-none'
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
                                            <img src={OnboardingAgentImg} alt="Eva" className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-sm" />
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
                                    placeholder="Answer Eva's questions..."
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

                    {/* --- RIGHT COL: LIVE PROFILE (Rounded Card) --- */}
                    <div className="lg:col-span-8 flex flex-col h-full bg-slate-50 rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-[#f8fafc] z-0 opacity-50"></div>
                        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-50/50 via-transparent to-transparent"></div>

                        <div className="flex-1 overflow-y-auto p-8 relative z-10 flex flex-col items-center">
                            <div className="w-full max-w-2xl space-y-6">
                                {/* Profile Card */}
                                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative group hover:shadow-md transition-all duration-500">
                                    <div className="h-28 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600"></div>
                                    <div className="px-8 pb-8">
                                        <div className="relative -mt-14 mb-6 flex justify-between items-end">
                                            <div className="w-28 h-28 rounded-3xl bg-white p-1.5 shadow-lg ring-1 ring-black/5">
                                                <div className="w-full h-full rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100">
                                                    <UserCircle2 className="w-14 h-14 text-slate-400" />
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <span className="px-4 py-1.5 bg-purple-50 text-purple-700 text-[11px] font-bold uppercase tracking-widest rounded-full border border-purple-200 shadow-sm">
                                                    New Hire
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            {/* User Name */}
                                            <div>
                                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Full Name</label>
                                                <div className={`text-3xl font-bold tracking-tight ${userData.userName ? 'text-slate-900' : 'text-slate-300 italic'}`}>
                                                    {userData.userName || "Pending..."}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-12">
                                                {/* Role */}
                                                <div>
                                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 block flex items-center gap-1.5">
                                                        <Briefcase className="w-3.5 h-3.5" /> Role
                                                    </label>
                                                    <div className={`text-lg font-medium ${userData.userRole ? 'text-slate-700' : 'text-slate-300 italic'}`}>
                                                        {userData.userRole || "Pending..."}
                                                    </div>
                                                </div>
                                                {/* Goal */}
                                                <div>
                                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 block flex items-center gap-1.5">
                                                        <Target className="w-3.5 h-3.5" /> Career Goal
                                                    </label>
                                                    <div className={`text-lg font-medium ${userData.userGoal ? 'text-slate-700' : 'text-slate-300 italic'}`}>
                                                        {userData.userGoal || "Pending..."}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Success Plan Section */}
                                {userData.plan_steps && userData.plan_steps.length > 0 && (
                                    <div className="mt-8 pt-8 border-t border-slate-100">
                                        <h3 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-purple-600 fill-purple-600" />
                                            Your Success Plan
                                        </h3>
                                        <div className="space-y-4">
                                            {userData.plan_steps.map((step: string, index: number) => (
                                                <div
                                                    key={index}
                                                    className="group flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:border-purple-200 transition-all duration-200"
                                                >
                                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-50 group-hover:bg-purple-600 text-purple-600 group-hover:text-white flex items-center justify-center text-sm font-bold transition-all duration-300 ring-4 ring-white shadow-sm">
                                                        {index + 1}
                                                    </div>
                                                    <p className="text-sm text-slate-600 font-medium leading-relaxed pt-1.5 group-hover:text-slate-900 transition-colors">
                                                        {step}
                                                    </p>
                                                </div>
                                            ))}
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
