import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { useRef } from "react"
import characterImg from "../assets/character-4-modified.png"
import multipleFaceImg from "../assets/multiple-face.png"
import characterImg3 from "../assets/character-9.png"

export function ReimagineSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const slides = [
        {
            title: "AI BDR Agent",
            description: "Engages leads instantly. Drives pipeline 24/7",
            lineItems: [
                "Adapts to any sales motion. Fits any playbook",
                "Automates research, follow-ups, and CRM updates—effortlessly"
            ],
            features: [
                {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                    ),
                    title: "No cold leads",
                    desc: "Every follow-up handled"
                },
                {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                    ),
                    title: "Speed to lead",
                    desc: "Instant, every time"
                },
                {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                        </svg>
                    ),
                    title: "Sell more, less admin",
                    desc: "AI takes care of the rest"
                },
                {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                            <rect width="7" height="5" x="3" y="3" rx="1" />
                            <rect width="7" height="5" x="14" y="3" rx="1" />
                            <rect width="7" height="5" x="14" y="16" rx="1" />
                            <rect width="7" height="5" x="3" y="16" rx="1" />
                            <path d="M6.5 8v8" />
                            <path d="M17.5 8v8" />
                            <path d="M6.5 12h11" />
                        </svg>
                    ),
                    title: "Custom workflows",
                    desc: "Built for complexity"
                },
                {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                            <rect width="20" height="14" x="2" y="3" rx="2" />
                            <line x1="8" x2="16" y1="21" y2="21" />
                            <line x1="12" x2="12" y1="17" y2="21" />
                        </svg>
                    ),
                    title: "Seamless integration",
                    desc: "Works where you work"
                }
            ],
            image: characterImg
        },
        {
            title: "AI Research Agent",
            description: "AI handles your research, so you don't have to",
            lineItems: [
                "Every call is fully prepped with the right insights",
                "Customize exactly how you need it",
                "Adapts to any sales motion. Fits any playbook"
            ],
            features: [
                {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                            <line x1="12" x2="12" y1="8" y2="16" />
                            <line x1="8" x2="16" y1="12" y2="12" />
                        </svg>
                    ),
                    title: "Instant research",
                    desc: "Get insights in minutes"
                },
                {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                    ),
                    title: "Fully prepped calls",
                    desc: "Increase in sales call effectiveness"
                },
                {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="2" x2="22" y1="12" y2="12" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                    ),
                    title: "Competitor analysis",
                    desc: "Track every market shift"
                },
                {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" x2="12" y1="15" y2="3" />
                        </svg>
                    ),
                    title: "Data enrichment",
                    desc: "Fill missing lead details"
                }
            ],
            image: characterImg3
        },
        {
            title: "Build Your Own Custom Agent",
            description: "No coding required",
            lineItems: [
                "Complete tasks on autopilot",
                "Integrate with your tech stack",
                "Learns your processes",
                "Customize exactly how you need it"
            ],
            features: [
                {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                            <rect width="18" height="18" x="3" y="3" rx="2" />
                            <path d="M9 3v18" />
                            <path d="m14 9 3 3-3 3" />
                        </svg>
                    ),
                    title: "Autopilot Tasks",
                    desc: "Complete tasks automatically"
                },
                {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                        </svg>
                    ),
                    title: "AI Tools Equipped",
                    desc: "Give them abilities"
                }
            ],
            image: multipleFaceImg
        }
    ]

    return (
        <section ref={containerRef} className="bg-white pt-16 pb-0">
            {/* Header Section */}
            <div className="text-center mb-16 px-6 relative z-10 w-full">
                <h2 className="text-4xl md:text-5xl font-semibold text-[#0d162f] mb-6 w-full max-w-[90vw] mx-auto leading-[1.1]" style={{ fontFamily: 'Inter Display, sans-serif' }}>
                    Recruit enterprise-grade AI agents <br className="hidden md:block" />
                    today—
                    <span className="relative inline-block text-[#6056FF] ml-2 px-2 whitespace-nowrap">
                        <span className="relative z-10">fully customizable</span>
                        {/* Scribble Marker SVG - Behind Text (Bold Highlight) */}
                        <svg className="absolute w-[110%] h-[160%] -top-[25%] -left-[5%] text-[#6056FF] opacity-20 pointer-events-none z-0 transform -rotate-1" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 25C40 10 140 0 195 20C180 20 160 20 150 22C80 35 30 40 20 37" stroke="currentColor" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {/* Underline Scribble - Below Text (Accent) */}
                        <svg className="absolute w-[120%] h-[40px] -bottom-3 -left-[10%] text-[#6056FF] opacity-100 pointer-events-none z-10" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.00025 6.99997C25.7501 2.49994 132.5 -2.50004 198 7.99996" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                    </span>
                </h2>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                    Deploy intelligent AI agents that automate repetitive tasks, analyze flow,
                    and deliver actionable insights.
                </p>
            </div>

            <div className="relative px-4 pb-10">
                {slides.map((slide, index) => {
                    // Update scaling logic: Last slide index [2] -> Scale 1. Previous slides [1] -> 0.9, [0] -> 0.8
                    const targetScale = 1 - ((slides.length - 1 - index) * 0.1);

                    return (
                        <Card
                            key={index}
                            slide={slide}
                            index={index}
                            progress={scrollYProgress}
                            targetScale={targetScale}
                            range={[index * 0.25, 1]}
                        />
                    )
                })}
            </div>
        </section>
    )
}

function Card({
    slide,
    index,
    progress,
    targetScale,
    range
}: {
    slide: any,
    index: number,
    progress: MotionValue<number>,
    targetScale: number,
    range: number[]
}) {
    // Transform scale as scroll progresses
    // Adjusted range to delay the scaling effect
    const scale = useTransform(progress, [range[0] + 0.25, range[1]], [1, targetScale])

    return (
        <div
            className="sticky top-24 h-auto md:h-[600px] mb-8 w-full max-w-[1300px] mx-auto flex items-center justify-center p-4 md:p-6"
            style={{
                zIndex: index + 1
            }}
        >
            <motion.div
                style={{ scale }}
                className={`h-full w-full bg-[#FAFAFF] rounded-[2rem] p-6 shadow-lg border border-slate-100 flex flex-col md:flex-row gap-6 md:gap-8 overflow-hidden relative`}
            >


                {/* Left Content */}
                <div className="flex-1 flex flex-col justify-center max-w-full md:max-w-[650px] pl-0 md:pl-6 py-0 md:py-2">
                    <h3 className="text-xl md:text-[2rem] font-bold text-[#0d162f] mb-3 md:mb-4 leading-tight tracking-tight" style={{ fontFamily: 'Inter Display, sans-serif' }}>
                        {slide.title}
                    </h3>

                    <div className="space-y-3 mb-6">
                        {/* Typography Update: text-[0.95rem], #6c6f7a, leading-[22px] */}
                        <div className="pb-3 border-b border-slate-200">
                            <p className="text-[#6c6f7a] text-[0.95rem] font-medium leading-[22px]">
                                {slide.description}
                            </p>
                        </div>
                        {slide.lineItems.map((item: string, i: number) => (
                            <div key={i} className="pb-3 border-b border-slate-200 last:border-0 last:pb-0">
                                <p className="text-[#6c6f7a] text-[0.95rem] font-medium leading-[22px]">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 w-full">
                        {slide.features.map((feature: any, i: number) => (
                            <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow group/icon min-h-[70px]">
                                <span className="text-[#6056ff] transition-colors group-hover/icon:text-[#6056ff] mt-0.5 scale-90">{feature.icon}</span>
                                <div>
                                    <h4 className="text-[16px] font-medium text-[#0d162f] mb-0.5" style={{ lineHeight: '24px', fontFamily: 'Inter, sans-serif' }}>{feature.title}</h4>
                                    <p className="text-[13px] text-[#868a97]" style={{ lineHeight: '1.4', fontFamily: 'Inter, sans-serif' }}>{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto pl-1">
                        <button className="flex items-center hover:gap-2 transition-all group cursor-pointer" style={{ color: '#0d162f', fontSize: '16px', fontWeight: 500 }}>
                            Learn more <span className="ml-1 group-hover:translate-x-1 transition-transform">›</span>
                        </button>
                    </div>
                </div>

                {/* Right Visual */}
                {slide.image ? (
                    <div className="flex-1 rounded-[1.5rem] border border-slate-200 bg-transparent flex items-center justify-center relative overflow-hidden h-[300px] md:h-[80%] w-full md:w-auto my-auto">
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ) : (
                    <div className={`flex-1 rounded-[1.5rem] ${slide.visualColor} flex items-center justify-center relative shadow-inner overflow-hidden min-h-[300px] md:min-h-[400px] w-full md:w-auto`}>
                        {/* Glossy Overlay/Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 pointer-events-none" />

                        <div className="relative w-full h-full flex items-center justify-center">
                            {/* Isotmetric Platform - Standard size */}
                            <div className="relative w-72 h-72">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-white rounded-[2rem] transform rotate-45 skew-x-12 skew-y-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-10 opacity-95 transition-transform hover:scale-[1.02] duration-500"></div>

                                {/* Character Placeholder - Float Animation */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transform -translate-y-20 hover:-translate-y-24 transition-transform duration-700 ease-in-out">
                                    <span className="text-[9rem] filter drop-shadow-2xl grayscale-0 select-none cursor-default hover:scale-110 transition-transform">{slide.character}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </motion.div>
        </div>
    )
}
