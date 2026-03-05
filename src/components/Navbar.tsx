import { useState } from "react"
import { Button } from "./ui/Button"
import { ArrowRight, LogOut, ChevronDown, Menu, X, Box, Users, Info, CreditCard } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import SuniAgentImg from "../assets/agents/agent-2.png"
import RaviAgentImg from "../assets/agents/agent-4.png"
import KaiAgentImg from "../assets/agents/agent-6.png"
import NinaAgentImg from "../assets/agents/agent-10.png"

export function Navbar() {
    const { user, signOut } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;
    const displayName = user?.user_metadata?.full_name as string | undefined;
    const initial = (user?.email?.[0] ?? '?').toUpperCase();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md pt-8 pb-2">
            <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between relative">

                {/* Left Side: Logo + Links */}
                <div className="flex items-center gap-24">
                    {/* Logo */}
                    <div className="flex-shrink-0 z-20">
                        <a href="/" className="flex items-center gap-2.5 group">
                            {/* Professional Brand Icon - Abstract Neural Node */}
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-[24px] font-bold tracking-tight text-slate-900 group-hover:text-black transition-colors">
                                NeuralForge
                            </span>
                        </a>
                    </div>

                    {/* Navigation Links - Left Aligned */}
                    <div className="hidden md:flex items-center gap-8">
                        {/* Product Dropdown - Professional Mega Menu */}
                        <div className="group hidden md:block relative">
                            <a href="/product" className="flex items-center gap-1.5 text-[16px] font-semibold text-[#19171c] hover:text-slate-600 transition-colors py-4 cursor-pointer">
                                Product
                                <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-all duration-300 transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </a>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 w-[900px] z-50 perspective-[2000px]">
                                <div className="bg-white rounded-2xl shadow-[0_50px_100px_-20px_rgba(50,50,93,0.25),0_30px_60px_-30px_rgba(0,0,0,0.3)] border border-slate-100 overflow-hidden ring-1 ring-black/5">
                                    <div className="flex">
                                        {/* Main Content */}
                                        <div className="flex-1 p-8">
                                            <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                                                <div>
                                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                                                        <span className="w-1 h-1 rounded-full bg-slate-400"></span> Platform
                                                    </div>
                                                    <div className="space-y-2">
                                                        <a href="/product#agents" className="flex items-start gap-4 p-3 -mx-3 rounded-xl hover:bg-slate-50 transition-all duration-200 group/item">
                                                            <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 group-hover/item:text-purple-600 group-hover/item:border-purple-200 transition-colors">
                                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-slate-900 group-hover/item:text-purple-700 transition-colors">AI Agents</div>
                                                                <p className="text-sm text-slate-500 mt-1 leading-relaxed">Autonomous digital workers for your team.</p>
                                                            </div>
                                                        </a>
                                                        <a href="/product#workflows" className="flex items-start gap-4 p-3 -mx-3 rounded-xl hover:bg-slate-50 transition-all duration-200 group/item">
                                                            <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 group-hover/item:text-blue-600 group-hover/item:border-blue-200 transition-colors">
                                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-slate-900 group-hover/item:text-blue-700 transition-colors">Workflows</div>
                                                                <p className="text-sm text-slate-500 mt-1 leading-relaxed">Build complex automations visually.</p>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                                                        <span className="w-1 h-1 rounded-full bg-slate-400"></span> Ecosystem
                                                    </div>
                                                    <div className="space-y-2">
                                                        <a href="/product#integrations" className="flex items-start gap-4 p-3 -mx-3 rounded-xl hover:bg-slate-50 transition-all duration-200 group/item">
                                                            <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 group-hover/item:text-emerald-600 group-hover/item:border-emerald-200 transition-colors">
                                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-slate-900 group-hover/item:text-emerald-700 transition-colors">Integrations</div>
                                                                <p className="text-sm text-slate-500 mt-1 leading-relaxed">Connect 100+ tools instantly.</p>
                                                            </div>
                                                        </a>
                                                        <a href="/product#enterprise" className="flex items-start gap-4 p-3 -mx-3 rounded-xl hover:bg-slate-50 transition-all duration-200 group/item">
                                                            <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 group-hover/item:text-amber-600 group-hover/item:border-amber-200 transition-colors">
                                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-slate-900 group-hover/item:text-amber-700 transition-colors">Enterprise</div>
                                                                <p className="text-sm text-slate-500 mt-1 leading-relaxed">SSO, Audit Logs, and SLA.</p>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Side Panel */}
                                        <div className="w-72 bg-slate-50 p-8 border-l border-slate-100 flex flex-col justify-between">
                                            <div>
                                                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">New Release</div>
                                                <div className="group/card cursor-pointer">
                                                    <div className="aspect-video bg-white rounded-lg border border-slate-200 mb-4 overflow-hidden relative shadow-sm group-hover/card:shadow-md transition-all">
                                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10" />
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 border border-black/5">v2.0</span>
                                                        </div>
                                                    </div>
                                                    <h4 className="font-semibold text-slate-900 mb-1 group-hover/card:text-purple-700 transition-colors">Introducing NeuralForge 2.0</h4>
                                                    <p className="text-sm text-slate-500 leading-relaxed">
                                                        Our biggest update yet. See what's changed.
                                                    </p>
                                                </div>
                                            </div>
                                            <a href="#" className="text-sm font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1 group/link">
                                                Read changelog <ArrowRight size={14} className="transform group-hover/link:translate-x-1 transition-transform" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Function Dropdown - Professional Mega Menu */}
                        <div className="group relative">
                            <button className="flex items-center gap-1.5 text-[16px] font-semibold text-[#19171c] hover:text-slate-600 transition-colors py-4">
                                Function
                                <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-all duration-300 transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 w-[600px] z-50">
                                <div className="bg-white rounded-2xl shadow-[0_50px_100px_-20px_rgba(50,50,93,0.25),0_30px_60px_-30px_rgba(0,0,0,0.3)] border border-slate-100 overflow-hidden p-2 ring-1 ring-black/5">
                                    <div className="grid grid-cols-1 p-2">
                                        <a href="#" className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 group/item">
                                            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all duration-300 shadow-sm">
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            </div>
                                            <div>
                                                <div className="text-base font-semibold text-slate-900 group-hover/item:text-indigo-600 transition-colors">Sales Solutions</div>
                                                <div className="text-sm text-slate-500 mt-0.5">Automate outreach, follow-ups, and closing.</div>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-slate-300 ml-auto opacity-0 group-hover/item:opacity-100 transform -translate-x-2 group-hover/item:translate-x-0 transition-all" />
                                        </a>
                                        <a href="#" className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 group/item">
                                            <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600 group-hover/item:bg-pink-600 group-hover/item:text-white transition-all duration-300 shadow-sm">
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
                                            </div>
                                            <div>
                                                <div className="text-base font-semibold text-slate-900 group-hover/item:text-pink-600 transition-colors">Marketing Automation</div>
                                                <div className="text-sm text-slate-500 mt-0.5">Generate content and campaigns at scale.</div>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-slate-300 ml-auto opacity-0 group-hover/item:opacity-100 transform -translate-x-2 group-hover/item:translate-x-0 transition-all" />
                                        </a>
                                        <a href="#" className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 group/item">
                                            <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 group-hover/item:bg-cyan-600 group-hover/item:text-white transition-all duration-300 shadow-sm">
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                            </div>
                                            <div>
                                                <div className="text-base font-semibold text-slate-900 group-hover/item:text-cyan-600 transition-colors">Customer Support</div>
                                                <div className="text-sm text-slate-500 mt-0.5">24/7 intelligent response and resolution.</div>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-slate-300 ml-auto opacity-0 group-hover/item:opacity-100 transform -translate-x-2 group-hover/item:translate-x-0 transition-all" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Agents Dropdown - Professional Mega Menu */}
                        <div className="group relative">
                            <button className="flex items-center gap-1.5 text-[16px] font-semibold text-[#19171c] hover:text-slate-600 transition-colors py-4">
                                Agents
                                <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-all duration-300 transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 w-[600px] z-50">
                                <div className="bg-white rounded-2xl shadow-[0_50px_100px_-20px_rgba(50,50,93,0.25),0_30px_60px_-30px_rgba(0,0,0,0.3)] border border-slate-100 overflow-hidden p-6 ring-1 ring-black/5">
                                    <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Agents</div>
                                        <a href="/agents" className="text-xs font-bold text-purple-600 hover:text-purple-700">View All</a>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <a href="/agents/cold-email" className="group/agent p-3 rounded-xl border border-slate-100 hover:border-purple-200 hover:shadow-sm transition-all bg-slate-50/50 hover:bg-white">
                                            <div className="flex items-center gap-3 mb-2">
                                                <img src={SuniAgentImg} alt="Suni" className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100 shadow-sm" />
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-[16px] text-slate-900 leading-tight">Suni</span>
                                                    <span className="text-[12px] font-medium text-slate-500">Cold Email Agent</span>
                                                </div>
                                            </div>
                                            <p className="text-[13px] text-slate-500 line-clamp-2 mt-2">Crafts high-converting personalized outreach.</p>
                                        </a>
                                        <a href="/agents/follow-up" className="group/agent p-3 rounded-xl border border-slate-100 hover:border-purple-200 hover:shadow-sm transition-all bg-slate-50/50 hover:bg-white">
                                            <div className="flex items-center gap-3 mb-2">
                                                <img src={RaviAgentImg} alt="Ravi" className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100 shadow-sm" />
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-[16px] text-slate-900 leading-tight">Ravi</span>
                                                    <span className="text-[12px] font-medium text-slate-500">Follow Up Agent</span>
                                                </div>
                                            </div>
                                            <p className="text-[13px] text-slate-500 line-clamp-2 mt-2">Ensures no lead is left behind.</p>
                                        </a>
                                        <a href="/agents/content-agent" className="group/agent p-3 rounded-xl border border-slate-100 hover:border-purple-200 hover:shadow-sm transition-all bg-slate-50/50 hover:bg-white">
                                            <div className="flex items-center gap-3 mb-2">
                                                <img src={KaiAgentImg} alt="Kai" className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100 shadow-sm" />
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-[16px] text-slate-900 leading-tight">Kai</span>
                                                    <span className="text-[12px] font-medium text-slate-500">Content Agent</span>
                                                </div>
                                            </div>
                                            <p className="text-[13px] text-slate-500 line-clamp-2 mt-2">Engaging, tailored social media content.</p>
                                        </a>
                                        <a href="/agents/research-agent" className="group/agent p-3 rounded-xl border border-slate-100 hover:border-purple-200 hover:shadow-sm transition-all bg-slate-50/50 hover:bg-white">
                                            <div className="flex items-center gap-3 mb-2">
                                                <img src={NinaAgentImg} alt="Nina" className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100 shadow-sm" />
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-[16px] text-slate-900 leading-tight">Nina</span>
                                                    <span className="text-[12px] font-medium text-slate-500">Research Specialist</span>
                                                </div>
                                            </div>
                                            <p className="text-[13px] text-slate-500 line-clamp-2 mt-2">Deep market research and data synthesis.</p>
                                        </a>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-slate-100">
                                        <a href="/agents" className="block w-full">
                                            <Button className="w-full bg-slate-900 text-white h-10 text-sm font-medium rounded-lg hover:bg-slate-800">
                                                Explore Agent Marketplace
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About (New) */}
                        <a href="/about" className="text-[16px] font-semibold text-[#19171c] hover:text-slate-600 transition-colors">About</a>

                        {/* Pricing */}
                        <a href="#" className="text-[16px] font-semibold text-[#19171c] hover:text-slate-600 transition-colors">Pricing</a>
                    </div>
                </div>

                {/* Hamburger Menu Toggle (Mobile Only) */}
                <div className="md:hidden flex items-center z-50">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Right Actions - Far Right (Desktop) */}
                <div className="hidden md:flex items-center gap-5 flex-shrink-0 z-20">
                    {user ? (
                        <div className="relative">
                            {/* Avatar button */}
                            <button
                                onClick={() => setShowUserMenu(v => !v)}
                                className="flex items-center gap-1.5 group focus:outline-none"
                            >
                                {avatarUrl ? (
                                    <img
                                        src={avatarUrl}
                                        alt={displayName ?? user.email ?? 'User'}
                                        className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm group-hover:ring-indigo-300 transition-all"
                                    />
                                ) : (
                                    <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm ring-2 ring-white shadow-sm group-hover:ring-indigo-300 transition-all">
                                        {initial}
                                    </div>
                                )}
                                <ChevronDown size={13} className={`text-slate-400 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown */}
                            {showUserMenu && (
                                <>
                                    {/* Backdrop to close on outside click */}
                                    <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                                    <div className="absolute right-0 top-full mt-3 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/70 py-2 z-50">
                                        <div className="px-4 py-3 border-b border-slate-100">
                                            {displayName && (
                                                <p className="text-sm font-bold text-slate-900 truncate">{displayName}</p>
                                            )}
                                            <p className="text-xs text-slate-400 truncate mt-0.5">{user.email}</p>
                                        </div>
                                        <button
                                            onClick={() => { signOut(); setShowUserMenu(false); }}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                                        >
                                            <LogOut size={14} /> Sign Out
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link to="/signin" className="text-[16px] font-semibold text-[#19171c] hover:text-slate-600 transition-colors">
                                Log in
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 py-6 text-[17px] font-medium transition-all shadow-sm border-0">
                                    Try for free
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
            {/* Mobile Navigation Drawer */}
            <div
                className={`fixed inset-0 z-40 bg-slate-50/95 backdrop-blur-xl transform transition-transform duration-500 ease-[0.22,1,0.36,1] md:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                style={{ top: '80px' }}
            >
                <div className="flex flex-col h-full overflow-y-auto px-6 py-6 pb-32">
                    <div className="space-y-3">
                        <a href="/product" onClick={() => setIsMobileMenuOpen(false)} className="group flex items-center gap-4 p-4 rounded-[1.25rem] bg-white border border-slate-200/60 shadow-sm shadow-slate-200/40 active:scale-[0.98] transition-all">
                            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-active:bg-indigo-600 group-active:text-white transition-colors duration-300">
                                <Box size={22} className="stroke-[2.5]" />
                            </div>
                            <div>
                                <div className="text-[17px] font-black tracking-tight text-slate-900 group-active:text-indigo-600 transition-colors">Product</div>
                                <div className="text-xs font-medium text-slate-500">Explore platform capabilities</div>
                            </div>
                        </a>
                        <a href="/agents" onClick={() => setIsMobileMenuOpen(false)} className="group flex items-center gap-4 p-4 rounded-[1.25rem] bg-white border border-slate-200/60 shadow-sm shadow-slate-200/40 active:scale-[0.98] transition-all">
                            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 group-active:bg-purple-600 group-active:text-white transition-colors duration-300">
                                <Users size={22} className="stroke-[2.5]" />
                            </div>
                            <div>
                                <div className="text-[17px] font-black tracking-tight text-slate-900 group-active:text-purple-600 transition-colors">Agent Marketplace</div>
                                <div className="text-xs font-medium text-slate-500">Discover pre-built AI workers</div>
                            </div>
                        </a>
                        <a href="/about" onClick={() => setIsMobileMenuOpen(false)} className="group flex items-center gap-4 p-4 rounded-[1.25rem] bg-white border border-slate-200/60 shadow-sm shadow-slate-200/40 active:scale-[0.98] transition-all">
                            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-active:bg-emerald-600 group-active:text-white transition-colors duration-300">
                                <Info size={22} className="stroke-[2.5]" />
                            </div>
                            <div>
                                <div className="text-[17px] font-black tracking-tight text-slate-900 group-active:text-emerald-600 transition-colors">About Us</div>
                                <div className="text-xs font-medium text-slate-500">Our story and mission</div>
                            </div>
                        </a>
                        <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="group flex items-center gap-4 p-4 rounded-[1.25rem] bg-white border border-slate-200/60 shadow-sm shadow-slate-200/40 active:scale-[0.98] transition-all">
                            <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 group-active:bg-rose-600 group-active:text-white transition-colors duration-300">
                                <CreditCard size={22} className="stroke-[2.5]" />
                            </div>
                            <div>
                                <div className="text-[17px] font-black tracking-tight text-slate-900 group-active:text-rose-600 transition-colors">Pricing</div>
                                <div className="text-xs font-medium text-slate-500">Plans for every team size</div>
                            </div>
                        </a>
                    </div>

                    <div className="mt-8 space-y-4 flex-1">
                        {user ? (
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-4 bg-white p-4 rounded-[1.25rem] border border-slate-200/60 shadow-sm">
                                    {avatarUrl ? (
                                        <img src={avatarUrl} alt={displayName ?? user.email ?? 'User'} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-50 shadow-sm" />
                                    ) : (
                                        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg ring-2 ring-indigo-100 shadow-sm">
                                            {initial}
                                        </div>
                                    )}
                                    <div className="overflow-hidden">
                                        <p className="text-base font-bold text-slate-900 truncate">{displayName ?? 'User'}</p>
                                        <p className="text-sm font-medium text-slate-500 truncate">{user.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                                    className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-bold py-4 rounded-[1.25rem] border border-slate-200 hover:bg-slate-200 transition-colors active:scale-[0.98]"
                                >
                                    <LogOut size={18} /> Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3 mt-auto">
                                <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                                    <Button className="w-full bg-white text-slate-900 border border-slate-200 font-bold py-7 rounded-[1.25rem] shadow-sm active:scale-[0.98] text-lg hover:bg-slate-50 transition-all">
                                        Log in
                                    </Button>
                                </Link>
                                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                                    <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-7 rounded-[1.25rem] shadow-lg shadow-slate-900/20 active:scale-[0.98] text-lg transition-all border-none">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
