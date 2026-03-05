import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const steps = [
    {
        title: "Choose your Agent.",
        text: "Select from our library of pre-trained specialized agents.",
        color: "bg-indigo-500"
    },
    {
        title: "Give a simple instruction.",
        text: "Just type what you need. 'Find me 50 leads in fintech' or 'Draft a follow-up email.'",
        color: "bg-purple-500"
    },
    {
        title: "Watch it work.",
        text: "The agent executes the task, connects to your tools, and delivers the result.",
        color: "bg-emerald-500"
    }
]

export function ScrollableHowItWorks() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-white">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

                    {/* Left: Content */}
                    <div className="space-y-24">
                        <div className="mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
                                From idea to execution <br /> in seconds.
                            </h2>
                        </div>

                        {steps.map((step, i) => {
                            // Calculate opacity based on scroll position for each step
                            // This logic simplifies the "scrollytelling" effect text highlight
                            return (
                                <StepContent key={i} step={step} index={i} total={steps.length} scrollYProgress={scrollYProgress} />
                            )
                        })}
                    </div>

                    {/* Right: Visual */}
                    <div className="relative h-[400px] w-full bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden shadow-2xl flex items-center justify-center">
                        {/* Dynamic Visual that changes based on scroll */}
                        <motion.div
                            className="absolute inset-4 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center"
                            style={{
                                opacity: useTransform(scrollYProgress, [0, 0.4, 0.45, 0.8, 0.85, 1], [1, 1, 0, 0, 0, 0])
                            }}
                        >
                            <span className="text-indigo-600 font-bold text-xl">Agent Library UI</span>
                        </motion.div>

                        <motion.div
                            className="absolute inset-4 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center"
                            style={{
                                opacity: useTransform(scrollYProgress, [0.3, 0.45, 0.8, 0.85], [0, 1, 1, 0])
                            }}
                        >
                            <span className="text-purple-600 font-bold text-xl">Chat Input UI</span>
                        </motion.div>

                        <motion.div
                            className="absolute inset-4 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center"
                            style={{
                                opacity: useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1])
                            }}
                        >
                            <span className="text-emerald-600 font-bold text-xl">Result Dashboard UI</span>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    )
}

function StepContent({ step, index, total, scrollYProgress }: any) {
    // Opacity logic: Active when scroll is within the step's "zone"
    const start = index / total
    const end = (index + 1) / total
    const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0.3, 1, 1, 0.3])

    return (
        <motion.div style={{ opacity }} className="py-4">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Step {index + 1}: {step.title}
            </h3>
            <p className="text-lg text-slate-500">
                {step.text}
            </p>
        </motion.div>
    )
}
