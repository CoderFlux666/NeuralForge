import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Bot, Workflow, Plug, ShieldCheck, ArrowRight, Zap, CheckCircle2, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ProductPage() {

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                }
            });
        }, { threshold: 0.1 });

        const hiddenElements = document.querySelectorAll('.animate-on-scroll');
        hiddenElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
            <Navbar />

            {/* --- HERO SECTION --- */}
            <section className="relative pt-32 md:pt-48 pb-20 md:pb-32 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-white -z-20">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                </div>

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none -z-10">
                    <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-[100px] mix-blend-multiply"></div>
                    <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-purple-400/20 rounded-full blur-[120px] mix-blend-multiply"></div>
                    <div className="absolute top-60 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-400/20 rounded-full blur-[100px] mix-blend-multiply"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-8 hover:shadow-md transition-shadow cursor-pointer">
                        <Zap className="w-4 h-4 text-indigo-500 fill-indigo-500" />
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-700">The Operations Platform</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-[90px] font-black tracking-tight text-slate-900 mb-8 font-display leading-[1.05]">
                        Architect the future of <br className="hidden md:block" />
                        <div className="relative inline-block mt-4 md:mt-2 rotate-1 hover:rotate-0 transition-transform duration-300">
                            <div className="absolute -inset-1 sm:-inset-2 bg-[#d4ff4e] transform -skew-x-6 rounded-md -z-10 shadow-sm"></div>
                            <span className="text-slate-900 font-serif italic tracking-tight px-3">
                                autonomous work.
                            </span>
                            <svg className="absolute -bottom-8 -right-16 w-28 h-12 text-indigo-500 pointer-events-none hidden md:block" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 25C25 45 65 45 90 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                                <path d="M80 15L90 15L95 25" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
                        NeuralForge replaces shattered toolchains with a single, intelligent ecosystem.
                        Deploy agents, run workflows, and manage enterprise security—all in one place.
                    </p>
                </div>
            </section>

            {/* --- 1. AI AGENTS SECTION --- */}
            <section id="agents" className="py-24 px-6 relative bg-slate-50 border-y border-slate-200 overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-lg bg-blue-100/50 border border-blue-200 text-blue-700 text-sm font-bold uppercase tracking-wider">
                            <Bot className="w-4 h-4" /> Platform
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                            AI Agents. <br />
                            <span className="text-slate-500 font-medium tracking-normal">Digital workers acting with intent.</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed mb-8">
                            Deploy fully autonomous digital workers capable of multi-step reasoning, external data retrieval, and real-time execution. These aren't just chatbots—they are your new department.
                        </p>
                        <ul className="space-y-4 mb-10">
                            {[
                                "Natural language parsing & dynamic intent routing",
                                "Long-term conversation state & memory recall",
                                "Multi-modal vision and document comprehension",
                                "Proactive follow-ups and escalation logic"
                            ].map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-slate-700 font-medium">
                                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <Link to="/agents" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-xl shadow-slate-900/20 active:scale-95">
                            Explore Agent Marketplace <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="relative animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200 ease-out">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-purple-200 rounded-[2rem] blur-3xl opacity-50 -z-10"></div>
                        <div className="bg-white border border-slate-200 rounded-[2rem] p-4 sm:p-8 shadow-2xl shadow-slate-200/50 relative overflow-hidden h-[400px] sm:h-[500px] flex flex-col ring-1 ring-slate-900/5">
                            <div className="flex items-center gap-4 border-b border-slate-100 pb-4 mb-6">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400 shadow-inner"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-400 shadow-inner"></div>
                                    <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-inner"></div>
                                </div>
                                <div className="ml-auto px-3 py-1 bg-slate-100 rounded-lg text-xs font-mono text-slate-500 font-medium">agent_state: active</div>
                            </div>

                            <div className="flex-1 space-y-6 overflow-hidden relative">
                                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                                        <Bot className="w-5 h-5 text-indigo-500" />
                                    </div>
                                    <div className="bg-slate-50 rounded-2xl rounded-tl-none p-4 text-sm font-medium border border-slate-100 text-slate-700 shadow-sm leading-relaxed">
                                        Analyzing lead volume from Q3. Attempting to cross-reference with active CRM entries...
                                    </div>
                                </div>
                                <div className="flex gap-4 flex-row-reverse">
                                    <div className="bg-indigo-600 rounded-2xl rounded-tr-none p-4 text-sm font-medium text-white shadow-md leading-relaxed">
                                        Compile a target list for re-engagement.
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                                        <Bot className="w-5 h-5 text-indigo-500" />
                                    </div>
                                    <div className="bg-slate-50 rounded-2xl rounded-tl-none p-4 text-sm font-medium border border-slate-100 text-slate-700 shadow-sm leading-relaxed">
                                        <span className="text-emerald-600 font-bold flex items-center gap-2 mb-2 bg-emerald-50 w-fit px-2 py-1 rounded-md border border-emerald-100"><CheckCircle2 className="w-4 h-4" /> 142 Leads Extracted</span>
                                        Drafting personalized cold outreach sequences for the list based on prior interaction history. Review requested.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 2. WORKFLOWS SECTION --- */}
            <section id="workflows" className="py-24 px-6 relative bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* LEFT: Beautiful Pipeline Visualization */}
                    <div className="order-2 lg:order-1 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
                        <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-2xl shadow-slate-200/60 bg-white">

                            {/* Top Bar */}
                            <div className="bg-slate-50 border-b border-slate-100 px-5 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-300"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-300"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                                    </div>
                                    <span className="font-mono text-xs text-slate-400">automation_pipeline.ts</span>
                                </div>
                                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Live</span>
                                </div>
                            </div>

                            {/* Steps */}
                            <div className="p-6">

                                {/* Step 1 */}
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center w-10 shrink-0">
                                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-300/40">
                                            <Zap className="w-4 h-4 text-white fill-white" />
                                        </div>
                                        <div className="w-px flex-1 mt-2 mb-0 bg-gradient-to-b from-indigo-200 to-transparent" style={{ minHeight: '2rem' }}></div>
                                    </div>
                                    <div className="flex-1 pb-7">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">01 — Trigger</p>
                                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">Done</span>
                                        </div>
                                        <h4 className="font-bold text-slate-900 mb-2.5">Webhook Received</h4>
                                        <div className="rounded-xl bg-slate-950 p-3.5 text-xs font-mono leading-relaxed">
                                            <p><span className="text-purple-400">POST</span> <span className="text-slate-500">/api/v1/hooks/trigger</span></p>
                                            <p className="text-amber-300 mt-1">{'{"event":"form.submit","source":"web"}'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center w-10 shrink-0">
                                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-300/40">
                                            <Bot className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="w-px flex-1 mt-2 mb-0 bg-gradient-to-b from-violet-200 to-transparent" style={{ minHeight: '2rem' }}></div>
                                    </div>
                                    <div className="flex-1 pb-7">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">02 — Intelligence</p>
                                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">Done</span>
                                        </div>
                                        <h4 className="font-bold text-slate-900 mb-2.5">AI Agent Processing</h4>
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="bg-violet-50 border border-violet-100 rounded-xl p-3 text-center">
                                                <p className="text-[9px] text-violet-400 font-bold uppercase tracking-wider mb-1">Model</p>
                                                <p className="text-xs font-bold text-violet-900">Llama 3.1</p>
                                            </div>
                                            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-center">
                                                <p className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider mb-1">Latency</p>
                                                <p className="text-xs font-bold text-indigo-900">1.2s</p>
                                            </div>
                                            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
                                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">Tokens</p>
                                                <p className="text-xs font-bold text-slate-900">1,280</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center w-10 shrink-0">
                                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-300/40">
                                            <Plug className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="w-px flex-1 mt-2 mb-0 bg-gradient-to-b from-amber-200 to-transparent" style={{ minHeight: '2rem' }}></div>
                                    </div>
                                    <div className="flex-1 pb-7">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">03 — Action</p>
                                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse inline-block"></span>Running
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-slate-900 mb-2.5">CRM Integration</h4>
                                        <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl p-3.5">
                                            <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                                                <span className="text-[9px] font-black text-orange-500">HS</span>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs font-bold text-slate-800">HubSpot — Create Contact</p>
                                                <p className="text-[11px] text-slate-400 truncate">Syncing lead data to pipeline stage...</p>
                                            </div>
                                            <div className="w-5 h-5 rounded-full border-2 border-blue-200 border-t-blue-500 animate-spin shrink-0"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 4 */}
                                <div className="flex gap-4">
                                    <div className="w-10 shrink-0 flex items-start justify-center pt-0">
                                        <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                                            <CheckCircle2 className="w-4 h-4 text-slate-300" />
                                        </div>
                                    </div>
                                    <div className="flex-1 pt-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">04 — Output</p>
                                            <span className="text-[10px] font-bold text-slate-300 bg-slate-50 border border-slate-100 px-2.5 py-0.5 rounded-full">Queued</span>
                                        </div>
                                        <h4 className="font-bold text-slate-300">Respond to Caller</h4>
                                    </div>
                                </div>

                            </div>

                            {/* Footer */}
                            <div className="border-t border-slate-100 px-5 py-3 bg-slate-50/50 flex items-center justify-between">
                                <span className="text-[11px] text-slate-400 font-medium">Run #4,821 today</span>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                                    <span className="text-[11px] text-slate-400 font-medium">Avg. 1.8s execution</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT: Text Content */}
                    <div className="order-1 lg:order-2 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200 ease-out z-10 lg:pt-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-lg bg-teal-50 border border-teal-200 text-teal-700 text-sm font-bold uppercase tracking-wider">
                            <Workflow className="w-4 h-4" /> Platform
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                            Workflows. <br />
                            <span className="text-slate-500 font-medium tracking-normal">Build complex automations visually.</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed mb-8">
                            Empower your agents with structured logic. Visually build multi-step automations that connect tools, process conditional logic, and enforce exact operating procedures.
                        </p>
                        <ul className="space-y-4 mb-10">
                            {[
                                "Drag-and-drop orchestration canvas",
                                "Hundreds of pre-built connector nodes",
                                "Conditional branching & error handling",
                                "Webhook & API endpoint triggers"
                            ].map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-slate-700 font-medium">
                                    <div className="w-6 h-6 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle2 className="w-4 h-4 text-teal-600" />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* --- 3. INTEGRATIONS SECTION --- */}
            <section id="integrations" className="py-24 px-6 relative bg-slate-50 border-y border-slate-200 overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-sm font-bold uppercase tracking-wider">
                            <Plug className="w-4 h-4" /> Ecosystem
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                            Integrations. <br />
                            <span className="text-slate-500 font-medium tracking-normal">Connect 100+ tools instantly.</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed mb-8">
                            Your agents are only as powerful as the systems they can reach. NeuralForge gives your AI native read/write access to your entire enterprise software stack from day one.
                        </p>

                        <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-10">
                            {[
                                { title: "CRMs", desc: "Salesforce, HubSpot" },
                                { title: "Communication", desc: "Slack, Teams, Discord" },
                                { title: "Databases", desc: "Postgres, MongoDB, Redis" },
                                { title: "Productivity", desc: "Google, Notion" }
                            ].map((domain, i) => (
                                <div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer">
                                    <div className="font-bold text-slate-900 mb-1">{domain.title}</div>
                                    <div className="text-sm text-slate-500">{domain.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200 ease-out">
                        <div className="absolute inset-0 bg-gradient-to-tr from-amber-100 to-orange-100 rounded-[2rem] blur-3xl opacity-50 -z-10"></div>
                        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-2xl shadow-slate-200/50 relative overflow-hidden h-[400px] sm:h-[500px] flex items-center justify-center ring-1 ring-slate-900/5">

                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white border border-slate-200 z-20 flex items-center justify-center shadow-xl shadow-slate-200/50">
                                <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                                    <Zap className="w-10 h-10 text-amber-500 fill-amber-500" />
                                </div>
                            </div>

                            <div className="absolute w-full h-full animate-[spin_30s_linear_infinite]">
                                <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-lg" style={{ animation: 'spin 30s linear infinite reverse' }}>
                                    <span className="font-bold text-xl text-[#00A4EF]">Msft</span>
                                </div>
                                <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-lg" style={{ animation: 'spin 30s linear infinite reverse' }}>
                                    <span className="font-bold text-xl text-[#4285F4]">Ggl</span>
                                </div>
                                <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-lg" style={{ animation: 'spin 30s linear infinite reverse' }}>
                                    <span className="font-bold text-xl text-[#FF5A5F]">Hub</span>
                                </div>
                                <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-lg" style={{ animation: 'spin 30s linear infinite reverse' }}>
                                    <svg className="w-8 h-8 text-[#4A154B]" viewBox="0 0 24 24" fill="currentColor"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522v-2.52zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.523-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522-2.52h-6.313z" /></svg>
                                </div>
                            </div>

                            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                <circle cx="50%" cy="50%" r="35%" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="10 10" />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 4. ENTERPRISE SECTION --- */}
            <section id="enterprise" className="py-24 px-6 relative bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1 relative animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-transparent rounded-[2rem] blur-3xl opacity-50 -z-10"></div>
                        <div className="bg-white border border-slate-200 rounded-[2rem] shadow-2xl shadow-slate-200/50 relative overflow-hidden h-[400px] sm:h-[500px] ring-1 ring-slate-900/5">
                            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>
                            <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-emerald-50/80 to-transparent"></div>

                            <div className="p-10 h-full flex flex-col justify-center relative z-10">
                                <div className="space-y-6">
                                    <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between shadow-lg shadow-black/5 hover:border-slate-300 transition-colors cursor-default">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100"><Lock className="w-5 h-5" /></div>
                                            <div>
                                                <div className="font-bold text-slate-800 text-sm">Role-Based Access Control</div>
                                                <div className="text-xs text-slate-500 font-medium mt-0.5">Strict granular agent permissions</div>
                                            </div>
                                        </div>
                                        <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200">Active</div>
                                    </div>

                                    <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between shadow-lg shadow-black/5 ml-4 sm:ml-8 hover:border-slate-300 transition-colors cursor-default">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100"><ShieldCheck className="w-5 h-5" /></div>
                                            <div>
                                                <div className="font-bold text-slate-800 text-sm">Action Audit Log</div>
                                                <div className="text-xs text-slate-500 font-medium mt-0.5">Immutable execution history tracked</div>
                                            </div>
                                        </div>
                                        <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200">Secure</div>
                                    </div>

                                    <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between shadow-lg shadow-black/5 ml-8 sm:ml-16 opacity-90 transition-colors cursor-default">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-200"><CheckCircle2 className="w-5 h-5" /></div>
                                            <div>
                                                <div className="font-bold text-slate-800 text-sm">SOC2 Type II Compliant</div>
                                                <div className="text-xs text-slate-500 font-medium mt-0.5">Enterprise data sovereignty</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200 ease-out z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold uppercase tracking-wider">
                            <ShieldCheck className="w-4 h-4" /> Ecosystem
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                            Enterprise. <br />
                            <span className="text-slate-500 font-medium tracking-normal">SSO, Audit Logs, and SLAs.</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed mb-8">
                            Deploy autonomous AI confidently with zero-trust architecture. We secure the infrastructure so building, managing, and scaling your AI workforce complies with high corporate standards.
                        </p>
                        <ul className="space-y-4 mb-10">
                            {[
                                "Single Sign-On (SAML/Okta/Entra)",
                                "Comprehensive immutable audit logging",
                                "Self-hosted & Virtual Private Cloud (VPC)",
                                "99.99% Guaranteed uptime Support SLAs"
                            ].map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-slate-700 font-medium">
                                    <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* --- CTA SECTION --- */}
            <section className="py-32 px-6 relative overflow-hidden bg-white border-t border-slate-200">
                <div className="absolute inset-0 bg-indigo-50/50 backdrop-blur-3xl -z-10"></div>
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                    <h2 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-8 font-display">
                        Stop automating. <br />
                        Start architecting intelligence.
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <button className="px-10 py-5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all active:scale-95 cursor-pointer text-lg w-full sm:w-auto shadow-xl shadow-slate-900/20">
                            Start Building For Free
                        </button>
                        <button className="px-10 py-5 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all active:scale-95 cursor-pointer text-lg w-full sm:w-auto shadow-sm">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default ProductPage;
