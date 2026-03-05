import { motion } from "framer-motion"

const logos = [
    "Acme Corp", "GlobalTech", "Nebula", "Vertex", "Orbit"
]

export function SocialProof() {
    return (
        <section className="py-12 border-b border-slate-50 bg-white">
            <div className="container mx-auto px-6 text-center">
                <p className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-8">
                    Trusted by forward-thinking teams
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
                    {logos.map((logo, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05, opacity: 1 }}
                            className="text-xl md:text-2xl font-bold text-slate-300 hover:text-slate-800 transition-colors cursor-default select-none"
                        >
                            {logo}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
