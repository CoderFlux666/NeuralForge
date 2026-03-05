import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import {
    ArrowRight, BrainCircuit, ShieldCheck, Zap, Users, LineChart, CheckCircle2, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Character2 from '../assets/character-2.png';
import AgentRD from '../assets/agents/agent-RD.png';
import AgentSD from '../assets/agents/agent-SD.png';
import AgentCS from '../assets/agents/agent-CS.png';
import AgentAE from '../assets/agents/agent-AE.png';

export function AboutPage() {

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.anim').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans overflow-x-hidden">
            <Navbar />

            {/* =================== HERO =================== */}
            <section className="relative pt-36 pb-28 px-6 overflow-hidden">
                {/* Light grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)] -z-10"></div>

                {/* Ambient glows */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[700px] pointer-events-none -z-10">
                    <div className="absolute top-10 left-1/4 w-96 h-96 bg-indigo-300/25 rounded-full blur-[120px]"></div>
                    <div className="absolute top-24 right-1/4 w-[500px] h-[400px] bg-rose-300/15 rounded-full blur-[140px]"></div>
                </div>

                <div className="max-w-5xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-10">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-600">Our Story & Mission</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 leading-[1.0] mb-8">
                        We're building<br />
                        <span className="relative inline-block mt-3">
                            {/* Layered hand-painted marker effect */}
                            {/* Back marker stroke — indigo, tilted opposite */}
                            <span className="absolute -inset-x-3 inset-y-2 bg-indigo-400/30 rotate-[1.2deg] rounded -z-20"></span>
                            {/* Front marker stroke — yellow, main */}
                            <span className="absolute -inset-x-2 -inset-y-1 bg-[#FACC15] -rotate-[0.6deg] rounded -z-10 opacity-90"></span>
                            {/* Marker "bleed" edge top */}
                            <span className="absolute -top-3 left-4 right-8 h-2 bg-[#FDE047]/60 rotate-[1deg] rounded-full -z-10 blur-[2px]"></span>
                            {/* Marker "bleed" edge bottom */}
                            <span className="absolute -bottom-2 left-2 right-4 h-2 bg-[#FACC15]/50 -rotate-[0.5deg] rounded-full -z-10 blur-[2px]"></span>
                            <span className="relative font-serif italic px-3 text-slate-900">the AI workforce.</span>
                            {/* Hand-drawn scribble circle around the whole phrase */}
                            <svg className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] overflow-visible hidden md:block pointer-events-none" viewBox="0 0 300 80" fill="none" preserveAspectRatio="none">
                                <path d="M12 65 Q8 20 30 8 Q80 -4 150 5 Q220 -2 270 10 Q295 20 292 50 Q290 70 265 72 Q200 82 150 74 Q90 80 30 70 Q8 68 12 65 Z"
                                    stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 4" fill="none" opacity="0.7" />
                            </svg>
                            {/* Scribble arrow */}
                            <svg className="absolute -bottom-7 -right-16 w-12 h-8 text-indigo-500 hidden md:block" viewBox="0 0 50 30" fill="none">
                                <path d="M2 25 Q18 5 44 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                <path d="M36 8 L44 12 L38 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed mt-10">
                        NeuralForge is building the operating system for the autonomous enterprise — where AI agents don't just assist, they{' '}
                        <span className="text-slate-900 font-semibold underline decoration-indigo-400 decoration-2 underline-offset-4">execute, adapt, and scale.</span>
                    </p>

                    {/* Stats row */}
                    <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
                        {[
                            { value: '4', label: 'AI Agents Live' },
                            { value: '100+', label: 'Integrations' },
                            { value: '24/7', label: 'Autonomous Uptime' },
                            { value: '∞', label: 'Scale Ceiling' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-4xl font-black text-slate-900">{stat.value}</div>
                                <div className="text-sm text-slate-400 font-semibold uppercase tracking-wider mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =================== MISSION / WHAT WE'RE BUILDING =================== */}
            <section className="py-28 px-6 bg-slate-50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                        {/* Left: Text */}
                        <div className="anim opacity-0 translate-y-10 transition-all duration-1000 ease-out">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-bold uppercase tracking-wider">
                                <Sparkles className="w-4 h-4" /> Our Mission
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                                Replace repetition
                                <br />
                                <span className="relative">
                                    <span className="relative z-10">with{' '}
                                        <span className="relative inline-block">
                                            <span className="absolute inset-x-0 bottom-1 h-4 bg-[#d4ff4e] -z-10 rounded-sm -skew-x-6"></span>
                                            intelligence.
                                        </span>
                                    </span>
                                </span>
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                Legacy software demands constant human operation. Every workflow, every follow-up, every data entry — it all drains the capacity of brilliant people.
                            </p>
                            <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                <strong className="text-slate-900">NeuralForge changes that equation.</strong> We're building a team of specialized AI agents that understand your business context and take real action — so your team focuses on what only humans can do.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    'Agents that act, not just respond',
                                    'Workflows that adapt, not just automate',
                                    'Intelligence that scales with your ambition',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium text-base">
                                        <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 className="w-3 h-3 text-indigo-600" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right: Agent Character Showcase */}
                        <div className="anim opacity-0 translate-y-10 transition-all duration-1000 delay-200 ease-out">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Nina - Research */}
                                <div className="group relative bg-white border border-slate-200 rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
                                    <div className="relative z-10">
                                        <img src={AgentRD} alt="Nina" className="w-full h-36 object-contain object-bottom mb-3" />
                                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Research</span>
                                        <h4 className="font-bold text-slate-900 text-sm">Nina, Research Specialist</h4>
                                        <p className="text-xs text-slate-500 mt-1 leading-snug">Deep-dives markets, competitors, and people in seconds.</p>
                                    </div>
                                    {/* Scribble label */}
                                    <div className="absolute -top-1 -right-1 bg-indigo-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider rotate-6">Live</div>
                                </div>

                                {/* Suni - Cold Email */}
                                <div className="group relative bg-white border border-slate-200 rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-white opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
                                    <div className="relative z-10">
                                        <img src={AgentAE} alt="Suni" className="w-full h-36 object-contain object-bottom mb-3" />
                                        <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Outreach</span>
                                        <h4 className="font-bold text-slate-900 text-sm">Suni, Cold Email Agent</h4>
                                        <p className="text-xs text-slate-500 mt-1 leading-snug">Crafts personalized outreach that converts strangers to customers.</p>
                                    </div>
                                    <div className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider rotate-6">Live</div>
                                </div>

                                {/* Ravi - Follow Up */}
                                <div className="group relative bg-white border border-slate-200 rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-white opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
                                    <div className="relative z-10">
                                        <img src={AgentSD} alt="Ravi" className="w-full h-36 object-contain object-bottom mb-3" />
                                        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Follow-Up</span>
                                        <h4 className="font-bold text-slate-900 text-sm">Ravi, Follow Up Agent</h4>
                                        <p className="text-xs text-slate-500 mt-1 leading-snug">Nurtures every lead automatically until they convert.</p>
                                    </div>
                                    <div className="absolute -top-1 -right-1 bg-amber-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider rotate-6">Live</div>
                                </div>

                                {/* Kai - Content */}
                                <div className="group relative bg-white border border-slate-200 rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
                                    <div className="relative z-10">
                                        <img src={AgentCS} alt="Kai" className="w-full h-36 object-contain object-bottom mb-3" />
                                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Content</span>
                                        <h4 className="font-bold text-slate-900 text-sm">Kai, Content Agent</h4>
                                        <p className="text-xs text-slate-500 mt-1 leading-snug">Generates brand-aligned content at inhuman speed and scale.</p>
                                    </div>
                                    <div className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider rotate-6">Live</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =================== WHAT MAKES US DIFFERENT =================== */}
            <section className="py-28 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 anim opacity-0 translate-y-10 transition-all duration-700">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 text-sm font-bold uppercase tracking-wider">
                            <Zap className="w-4 h-4" /> Philosophy
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                            Built on first principles.
                            <br />
                            <span className="relative inline-block mt-2">
                                <span className="absolute -inset-1 bg-[#FFF04D] -skew-x-3 rounded-sm -z-10"></span>
                                <span className="relative">Not shortcuts.</span>
                            </span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Zap,
                                title: 'Velocity First',
                                desc: 'Latency is the enemy of cognition. Our agents react in milliseconds, not minutes.',
                                color: 'indigo',
                                delay: '0ms'
                            },
                            {
                                icon: BrainCircuit,
                                title: 'Context-Aware Intelligence',
                                desc: 'Agents that learn from your data and workflows, becoming smarter with every interaction.',
                                color: 'violet',
                                delay: '100ms'
                            },
                            {
                                icon: ShieldCheck,
                                title: 'Enterprise-Grade Security',
                                desc: 'SOC2 Type II ready. Your data stays in your secure enclave. Always.',
                                color: 'emerald',
                                delay: '200ms'
                            },
                            {
                                icon: Users,
                                title: 'Human Amplification',
                                desc: 'Designed to multiply human capability, not replace human judgment and creativity.',
                                color: 'rose',
                                delay: '300ms'
                            },
                            {
                                icon: LineChart,
                                title: 'Predictive Scaling',
                                desc: 'Systems that anticipate load and resource needs before bottlenecks emerge.',
                                color: 'amber',
                                delay: '400ms'
                            },
                            {
                                icon: Sparkles,
                                title: 'Continuous Learning',
                                desc: "Every run makes the system smarter. Your agents don't just execute — they evolve.",
                                color: 'cyan',
                                delay: '500ms'
                            },
                        ].map((item, i) => {
                            const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
                                indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', border: 'border-indigo-100' },
                                violet: { bg: 'bg-violet-50', icon: 'text-violet-600', border: 'border-violet-100' },
                                emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', border: 'border-emerald-100' },
                                rose: { bg: 'bg-rose-50', icon: 'text-rose-600', border: 'border-rose-100' },
                                amber: { bg: 'bg-amber-50', icon: 'text-amber-600', border: 'border-amber-100' },
                                cyan: { bg: 'bg-cyan-50', icon: 'text-cyan-600', border: 'border-cyan-100' },
                            };
                            const c = colorMap[item.color];
                            return (
                                <div
                                    key={i}
                                    className="anim opacity-0 translate-y-10 transition-all duration-700 group p-7 bg-white border border-slate-200 rounded-3xl hover:shadow-xl hover:-translate-y-1 hover:border-slate-300 ease-out"
                                    style={{ transitionDelay: item.delay }}
                                >
                                    <div className={`w-12 h-12 rounded-2xl ${c.bg} ${c.border} border flex items-center justify-center mb-5`}>
                                        <item.icon className={`w-6 h-6 ${c.icon}`} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =================== AGENT WORKFORCE SECTION =================== */}
            <section className="py-28 px-6 bg-slate-50 border-y border-slate-100 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 anim opacity-0 translate-y-10 transition-all duration-700">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-lg bg-violet-50 border border-violet-200 text-violet-700 text-sm font-bold uppercase tracking-wider">
                            <Users className="w-4 h-4" /> The Team
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                            Meet your new{' '}
                            <span className="relative inline-block">
                                <span className="absolute inset-x-0 bottom-0 h-5 bg-violet-200/70 -skew-x-2 -z-10 rounded"></span>
                                <span className="relative">AI workforce.</span>
                            </span>
                        </h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto">Four specialized agents. One unified platform. Zero busywork for your team.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                name: 'Nina',
                                role: 'Research Specialist',
                                img: AgentRD,
                                desc: 'Instantly synthesizes market intelligence, competitor landscapes, and prospect profiles into actionable dossiers.',
                                color: 'from-indigo-500 to-violet-600',
                                lightBg: 'bg-indigo-50',
                                tag: 'Research',
                                skills: ['Deep Research', 'Market Intel', 'Lead Info']
                            },
                            {
                                name: 'Suni',
                                role: 'Cold Email Agent',
                                img: AgentAE,
                                desc: 'Crafts hyper-personalized outreach sequences using research data to maximize open and reply rates.',
                                color: 'from-rose-500 to-pink-600',
                                lightBg: 'bg-rose-50',
                                tag: 'Outreach',
                                skills: ['Email Drafts', 'Personalization', 'A/B Testing']
                            },
                            {
                                name: 'Ravi',
                                role: 'Follow Up Agent',
                                img: AgentSD,
                                desc: 'Automatically nurtures every lead with perfectly timed, contextual follow-ups until conversion.',
                                color: 'from-amber-500 to-orange-600',
                                lightBg: 'bg-amber-50',
                                tag: 'Nurture',
                                skills: ['Auto Follow-Up', 'CRM Sync', 'Pipeline']
                            },
                            {
                                name: 'Kai',
                                role: 'Content Agent',
                                img: AgentCS,
                                desc: 'Produces brand-aligned blogs, social posts, and copy at scale without sacrificing quality or voice.',
                                color: 'from-emerald-500 to-teal-600',
                                lightBg: 'bg-emerald-50',
                                tag: 'Content',
                                skills: ['Blog Posts', 'Social Copy', 'Brand Voice']
                            },
                        ].map((agent, i) => (
                            <div key={i} className="anim opacity-0 translate-y-10 transition-all duration-700 group" style={{ transitionDelay: `${i * 100}ms` }}>
                                <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 h-full flex flex-col">
                                    {/* Image area */}
                                    <div className={`${agent.lightBg} h-52 flex items-end justify-center pt-6 overflow-hidden relative`}>
                                        {/* Scribble annotation */}
                                        <div className="absolute top-3 left-3 font-['Caveat',cursive] text-slate-400 text-sm rotate-[-6deg] leading-tight">
                                            {agent.tag}
                                            <svg className="w-8 h-4 text-slate-300" viewBox="0 0 40 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M2 10 Q20 2 38 10" />
                                            </svg>
                                        </div>
                                        <img src={agent.img} alt={agent.name} className="h-44 w-auto object-contain object-bottom group-hover:scale-105 transition-transform duration-500" />
                                    </div>

                                    {/* Info */}
                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="mb-3">
                                            <h3 className="text-lg font-black text-slate-900">{agent.name}</h3>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{agent.role}</p>
                                        </div>
                                        <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">{agent.desc}</p>

                                        {/* Skill tags */}
                                        <div className="flex flex-wrap gap-1.5">
                                            {agent.skills.map((skill, j) => (
                                                <span key={j} className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full border border-slate-200">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =================== FOUNDER SECTION (KEPT DARK — existing design) =================== */}
            <section className="py-32 bg-slate-950 relative overflow-hidden">
                {/* Blueprint Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:20px_20px] opacity-10"></div>
                {/* Glowing orbs */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[128px]"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[128px]"></div>

                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    {/* Section label */}
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">// The Architect</span>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-16">
                        {/* Image Card with Annotations */}
                        <div className="relative group flex-shrink-0">
                            <div className="absolute inset-0 bg-indigo-500 rounded-none rotate-3 opacity-20 blur-xl group-hover:rotate-6 transition-transform duration-500"></div>

                            <div className="relative w-72 h-88 bg-slate-900 border border-slate-700 p-2 shadow-2xl overflow-visible" style={{ height: '22rem' }}>
                                <img src={Character2} alt="Saunak" className="w-full h-full object-cover filter contrast-125 hover:grayscale-0 transition-all duration-500" />

                                {/* Marker Annotations */}
                                <div className="absolute -top-7 -left-8 text-yellow-400 font-['Caveat',cursive] text-xl rotate-[-12deg] z-20 drop-shadow-md">
                                    <span>Visionary Node</span>
                                    <svg className="w-10 h-8 ml-3 -mt-1 text-yellow-400" viewBox="0 0 80 60" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M10,10 Q40,40 70,10" />
                                    </svg>
                                </div>
                                <div className="absolute -bottom-7 -right-10 text-cyan-400 font-['Caveat',cursive] text-lg rotate-[6deg] z-20 drop-shadow-md">
                                    <span>Dev & Architect →</span>
                                </div>

                                {/* Tech overlay corners */}
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/50"></div>
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/50"></div>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-6">
                                <h2 className="text-4xl font-bold text-white">Saunak</h2>
                                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-mono border border-indigo-500/30 rounded uppercase">System Architect</span>
                            </div>

                            <div className="space-y-5 text-lg text-slate-300 font-light leading-relaxed">
                                <p>
                                    <span className="text-indigo-400 font-bold font-mono text-2xl">"</span>
                                    We are approaching the event horizon of productivity. The tools of yesterday were built for human speed. NeuralForge is built for machine speed.
                                </p>
                                <p>
                                    My mission is not just to build software, but to architect a new layer of cognition for the enterprise. One where strategy is human, but execution is infinite.
                                    <span className="text-indigo-400 font-bold font-mono text-2xl">"</span>
                                </p>
                            </div>

                            <div className="mt-10 flex gap-6 flex-wrap">
                                <div className="flex flex-col">
                                    <span className="text-3xl font-bold text-white">10+</span>
                                    <span className="text-xs text-slate-500 uppercase tracking-widest mt-1">Years Experience</span>
                                </div>
                                <div className="w-px h-14 bg-slate-800"></div>
                                <div className="flex flex-col">
                                    <span className="text-3xl font-bold text-white">∞</span>
                                    <span className="text-xs text-slate-500 uppercase tracking-widest mt-1">Possibilities Built</span>
                                </div>
                                <div className="w-px h-14 bg-slate-800"></div>
                                <div className="flex flex-col">
                                    <span className="text-3xl font-bold text-white">1</span>
                                    <span className="text-xs text-slate-500 uppercase tracking-widest mt-1">Singular Vision</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =================== CTA =================== */}
            <section className="py-32 px-6 relative bg-white overflow-hidden border-t border-slate-100">
                {/* Background glows */}
                <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-indigo-100 rounded-full mix-blend-multiply blur-3xl opacity-60 pointer-events-none"></div>
                <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-violet-100 rounded-full mix-blend-multiply blur-3xl opacity-60 pointer-events-none"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10 anim opacity-0 translate-y-10 transition-all duration-1000">
                    {/* Scribble arrow decoration */}
                    <div className="relative inline-block mb-10">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ready to get started?</span>
                        <svg className="absolute -right-14 top-1/2 -translate-y-1/2 w-12 h-8 text-slate-300" viewBox="0 0 50 30" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M2 15 Q25 2 48 15" strokeLinecap="round" />
                            <path d="M38 10 L48 15 L38 20" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-8 leading-tight">
                        Stop operating.
                        <br />
                        <span className="relative inline-block">
                            <span className="absolute -inset-2 bg-[#d4ff4e] -skew-x-3 rounded-lg -z-10"></span>
                            Start architecting.
                        </span>
                    </h2>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12">
                        The future belongs to those who build it. Initialize your NeuralForge instance today and deploy your first AI agent in minutes.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/agents" className="inline-flex items-center gap-2 px-10 py-5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all active:scale-95 text-lg shadow-xl shadow-slate-900/20">
                            Deploy Your First Agent <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link to="/product" className="inline-flex items-center gap-2 px-10 py-5 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all text-lg">
                            See the Platform
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default AboutPage;
