import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { ArrowRight, Search, Zap, Shield, Cpu, BarChart, Globe, CheckCircle2, Play } from "lucide-react"
import { Link } from "react-router-dom"
import ColdEmailAgentImg from "../assets/agents/agent-2.png"
import FollowUpAgentImg from "../assets/agents/agent-4.png"
import SupportAgentImg from "../assets/agents/agent-1.png"
import ContentAgentImg from "../assets/agents/agent-6.png"
import InvoiceAgentImg from "../assets/agents/agent-11.png"
import OnboardingAgentImg from "../assets/agents/agent-7.png"
import CallerAgentImg from "../assets/agents/agent-9.png"
import ConsultantAgentImg from "../assets/agents/agent-8.png"
import SalesAgentImg from "../assets/agents/agent-3.png"
import ResearchAgentImg from "../assets/agents/agent-10.png"

interface Agent {
    name: string
    role: string
    description: string
    initials: string
    color: string
    image?: string
    link?: string
}

export function AgentsPage() {
    const agents: Agent[] = [
        { name: "Suni", role: "The Cold Email Agent", description: "Crafts high-converting cold emails personalized for every prospect.", initials: "CE", color: "bg-blue-100 text-blue-600", image: ColdEmailAgentImg, link: "/agents/cold-email" },
        { name: "Ravi", role: "The Follow Up Agent", description: "Ensures no lead is left behind with timely, intelligent follow-ups.", initials: "FA", color: "bg-purple-100 text-purple-600", image: FollowUpAgentImg, link: "/agents/follow-up" },
        { name: "Lina", role: "The Support Agent", description: "Provides instant, 24/7 customer support with human-like empathy.", initials: "SA", color: "bg-green-100 text-green-600", image: SupportAgentImg, link: "/agents/support-agent" },
        { name: "Kai", role: "The Content Agent", description: "Generates engaging social media content tailored to your brand voice.", initials: "SC", color: "bg-pink-100 text-pink-600", image: ContentAgentImg, link: "/agents/content-agent" },
        { name: "Omar", role: "The Invoice Agent", description: "Automates billing, invoicing, and payment reminders seamlessly.", initials: "IA", color: "bg-yellow-100 text-yellow-600", image: InvoiceAgentImg, link: "/agents/invoice-agent" },
        { name: "Eva", role: "The Onboarding Agent", description: "Guides new users through a smooth, personalized onboarding journey.", initials: "OA", color: "bg-indigo-100 text-indigo-600", image: OnboardingAgentImg, link: "/agents/onboarding-agent" },
        { name: "Zack", role: "The Caller Agent", description: "Handles outbound calls and qualifies leads with natural conversation.", initials: "CA", color: "bg-red-100 text-red-600", image: CallerAgentImg },
        { name: "Maya", role: "The Consultant Agent", description: "Provides strategic advice and insights based on your business data.", initials: "CN", color: "bg-teal-100 text-teal-600", image: ConsultantAgentImg, link: "/agents/consultant-agent" },
        { name: "Leo", role: "The Sales Agent", description: "Drives sales by engaging prospects and closing deals autonomously.", initials: "SL", color: "bg-orange-100 text-orange-600", image: SalesAgentImg, link: "/agents/sales-agent" },
        { name: "Nina", role: "The Research Specialist", description: "Deep dives into data to provide comprehensive market research reports.", initials: "RS", color: "bg-cyan-100 text-cyan-600", image: ResearchAgentImg, link: "/agents/research-agent" },
    ]

    const suggestions = [
        "Write reports on trends in data",
        "Automate benefits enrollment",
        "Identify contract risks",
        "Schedule social posts",
        "Predict churn likelihood",
        "Monitor server security",
        "Monitor brand mentions"
    ]

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
            <Navbar />

            {/* --- HERO SECTION --- 
                "Beyond Automation: Autonomous Intelligence."
                "Hire Your Next AI Employee" with Scribble style
            */}
            <section className="relative pt-24 md:pt-32 pb-10 md:pb-16 px-6 overflow-hidden">
                {/* Background Blobs/Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-50/50 to-transparent pointer-events-none"></div>
                <div className="absolute -top-40 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute top-20 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-[10px] font-bold uppercase tracking-widest mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Zap className="w-3 h-3" /> New Generation
                    </span>

                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 font-display leading-tight">
                        Beyond Automation: <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Autonomous Intelligence.</span>
                    </h1>

                    {/* Scribble / Handwritten Style Sub-headline */}
                    <div className="relative inline-block mt-4 mb-8 rotate-1 hover:rotate-0 transition-transform duration-300">
                        <div className="absolute -inset-2 bg-yellow-200/80 transform -skew-x-3 rounded-lg -z-10 blur-[1px]"></div>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 font-serif italic tracking-tight px-2">
                            "Hire Your Next AI Employee"
                        </h2>
                        {/* SVG Scribble Underline/Arrow */}
                        <svg className="absolute -bottom-8 -right-12 w-24 h-12 text-slate-400 pointer-events-none hidden md:block" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 20C30 40 70 40 90 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-pulse" />
                            <path d="M85 15L90 10L95 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>

                    <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Deploy specialized AI agents to automate your workflow.
                        Instant setup, 24/7 availability, infinite scalability.
                    </p>

                    {/* Infinite Loop Slideshow of Agents */}
                    <div className="relative w-full max-w-5xl mx-auto h-24 md:h-32 mb-12 overflow-hidden mask-linear-fade">
                        <div className="absolute inset-0 flex items-center gap-8 animate-infinite-scroll whitespace-nowrap">
                            {[...agents, ...agents].map((agent, imgIdx) => (
                                <div key={imgIdx} className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white border-2 border-slate-100 shadow-md flex-shrink-0 overflow-hidden p-1">
                                    {agent.image ? (
                                        <img src={agent.image} alt={agent.name} className="w-full h-full object-cover rounded-xl" />
                                    ) : (
                                        <div className={`w-full h-full rounded-xl flex items-center justify-center font-bold text-xl ${agent.color}`}>
                                            {agent.initials}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        {/* Gradient Masks */}
                        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
                        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10"></div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95 flex items-center gap-2">
                            Get Started Now <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all active:scale-95 flex items-center gap-2">
                            <Play className="w-5 h-5 fill-current" /> Watch Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* --- THE TEAM SECTION (Preserved Grid) --- 
                "Meet Your New Digital Department."
             */}
            <section className="py-16 px-6 max-w-[1400px] mx-auto bg-white border-t border-b border-slate-100">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-display">
                        Meet Your New Digital Department.
                    </h2>
                    <p className="text-slate-500 max-w-xl mx-auto">
                        A complete workforce of autonomous agents, ready to join your team today.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {agents.map((agent, index) => (
                        <div key={index} className="group relative bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                            <div className="flex items-start gap-4 mb-4">
                                {agent.image ? (
                                    <img
                                        src={agent.image}
                                        alt={agent.name}
                                        className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-gray-100"
                                    />
                                ) : (
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${agent.color} flex-shrink-0`}>
                                        {agent.initials}
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-bold text-[17px] text-slate-900 flex items-center gap-1.5 whitespace-nowrap tracking-tight">
                                        {agent.name}, <span className="text-slate-500 font-normal">{agent.role.replace('The ', '')}</span>
                                    </h3>
                                    <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                                        {agent.description}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-auto pt-4">
                                {agent.link ? (
                                    <Link to={agent.link} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 px-4 py-2 rounded-lg transition-all group-hover:shadow-sm">
                                        Get started
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                ) : (
                                    <button className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 px-4 py-2 rounded-lg transition-all group-hover:shadow-sm">
                                        Get started
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Interactive Search Section (Refined) */}
                <div className="max-w-4xl mx-auto mt-20 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
                    <div className="p-2 border-b border-slate-100 flex items-center gap-3 px-6 py-6 ring-4 ring-slate-50">
                        <Search className="w-6 h-6 text-indigo-500" />
                        <input
                            type="text"
                            placeholder="Example: Creates an employee experience survey and sends it out..."
                            className="w-full text-lg outline-none text-slate-700 placeholder:text-slate-400 font-medium bg-transparent"
                        />
                        <div className="hidden md:flex px-2 py-1 bg-slate-100 rounded text-xs font-bold text-slate-500 uppercase">Enter</div>
                    </div>
                    <div className="p-6 bg-slate-50/80">
                        <div className="flex flex-wrap gap-2">
                            {suggestions.map((tag, i) => (
                                <button key={i} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs leading-5 font-bold text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-sm transition-all">
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CAPABILITIES SECTION --- 
                "Enterprise-Grade Skills, On Demand."
            */}
            <section className="py-24 px-6 bg-[#0B0F19] text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-2 block">Capabilities</span>
                        <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">Enterprise-Grade Skills, On Demand.</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            Our agents aren't just chatbots. They are fully autonomous workers capable of executing complex workflows, accessing tools, and making decisions.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Globe, title: "Multi-Modal Intelligence", desc: "Process text, images, and data streams simultaneously for comprehensive understanding." },
                            { icon: Shield, title: "Enterprise Security", desc: "SOC2 compliant architecture with granular permission controls and audit logging." },
                            { icon: Cpu, title: "Self-Healing Workflows", desc: "Agents detect errors and attempt autonomous recovery before flagging human review." },
                            { icon: Zap, title: "Real-Time Execution", desc: "Latency-optimized processing for high-frequency trading, support, and monitoring." },
                            { icon: CheckCircle2, title: "Human-in-the-Loop", desc: "Seamlessly hand off critical decisions to human supervisors when confidence is low." },
                            { icon: BarChart, title: "Performance Analytics", desc: "Detailed dashboards tracking agent efficiency, accuracy, and ROI in real-time." }
                        ].map((item, idx) => (
                            <div key={idx} className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group">
                                <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- TECH STACK SECTION --- 
                "Powered by NeuralForge Architecture."
            */}
            <section className="py-24 px-6 bg-slate-50 overflow-hidden">
                <div className="max-w-7xl mx-auto text-center">
                    <span className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2 block">The Tech Stack</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 font-display">Powered by NeuralForge Architecture.</h2>

                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Text-based Logos for Demo purposes (replace with actual SVGs if available) */}
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-[#FF6C37] rounded-lg"></div>
                            <span className="text-2xl font-bold text-slate-800">n8n</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-[#F23B2F] rounded-lg"></div>
                            <span className="text-2xl font-bold text-slate-800">Groq</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-[#0467DF] rounded-lg"></div>
                            <span className="text-2xl font-bold text-slate-800">Llama 3</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-[#000000] rounded-lg"></div>
                            <span className="text-2xl font-bold text-slate-800">Supabase</span>
                        </div>
                    </div>

                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16"></div>
                            <h4 className="text-lg font-bold text-slate-900 mb-2 relative z-10">Low-Latency Inference</h4>
                            <p className="text-sm text-slate-500 relative z-10">Powered by Groq LPUs for near-instantaneous token generation.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -mr-16 -mt-16"></div>
                            <h4 className="text-lg font-bold text-slate-900 mb-2 relative z-10">Orchestrated Workflows</h4>
                            <p className="text-sm text-slate-500 relative z-10">Complex logic handled by n8n workflow automation engine.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PERFORMANCE SECTION --- 
                "ROI & Efficiency Metrics."
            */}
            <section className="py-24 px-6 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-2 block">Performance</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-display">ROI & Efficiency Metrics.</h2>
                        <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                            Stop measuring hours worked. Start measuring outcomes delivered. NeuralForge agents consistently outperform traditional outsourcing in speed, cost, and accuracy.
                        </p>

                        <div className="space-y-6">
                            {[
                                { label: "Cost Reduction", value: "85%", desc: "Average savings vs human FTEs" },
                                { label: "Speed Increase", value: "24x", desc: "Faster task completion rate" },
                                { label: "Availability", value: "100%", desc: "24/7/365 uptime operation" }
                            ].map((stat, i) => (
                                <div key={i} className="flex items-center gap-6">
                                    <div className="w-20 text-4xl font-bold text-slate-900">{stat.value}</div>
                                    <div>
                                        <div className="font-bold text-slate-800">{stat.label}</div>
                                        <div className="text-slate-400 text-sm">{stat.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-inner md:p-12">
                        {/* Mock Chart Visual */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-sm font-bold text-slate-400">Task Volume</span>
                                <span className="text-sm font-bold text-emerald-600">+420% Efficiency</span>
                            </div>
                            <div className="h-64 flex items-end justify-between gap-2">
                                {[30, 45, 35, 60, 50, 75, 65, 90, 85, 100].map((h, i) => (
                                    <div key={i} className="w-full bg-indigo-100 rounded-t-sm relative group overflow-hidden" style={{ height: `${h}%` }}>
                                        <div className="absolute bottom-0 left-0 w-full bg-indigo-600 transition-all duration-1000" style={{ height: `${h * 0.4}%` }}></div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono">
                                <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CALL TO ACTION --- 
                "Deploy Your First Agent."
            */}
            <section className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/30 via-slate-900 to-slate-900"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-bold font-display mb-8">Deploy Your First Agent.</h2>
                    <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
                        Ready to revolutionize your workflow? Start building your autonomous workforce today. No credit card required for pilot access.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all active:scale-95 w-full sm:w-auto">
                            Start Free Trial
                        </button>
                        <button className="px-8 py-4 bg-transparent border border-slate-700 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all active:scale-95 w-full sm:w-auto">
                            Schedule Consultation
                        </button>
                    </div>
                </div>
            </section>

            <Footer />

            {/* Global Keyframes for Infinite Scroll */}
            <style>{`
                @keyframes infinite-scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .animate-infinite-scroll {
                    animation: infinite-scroll 40s linear infinite;
                }
                .mask-linear-fade {
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
                /* Font Display Utility */
                .font-display { font-family: 'Inter', system-ui, sans-serif; letter-spacing: -0.02em; }
            `}</style>
        </div>
    )
}
