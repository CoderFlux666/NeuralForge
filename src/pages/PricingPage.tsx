import { Navbar } from "../components/Navbar"
import { Pricing } from "../components/Pricing"
import { Footer } from "../components/Footer"
import { motion } from "framer-motion"

export function PricingPage() {
    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-yellow-300 selection:text-black">
            <Navbar />
            <main className="pt-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 px-6"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-8xl font-black tracking-tight text-black mb-6">
                        Simple pricing
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto">
                        Choose the plan that works for your team
                    </p>
                </motion.div>

                <Pricing />
            </main>
            <Footer />
        </div>
    )
}
