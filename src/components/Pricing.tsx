import { Check } from "lucide-react"
import { Button } from "./ui/Button"

export function Pricing() {
    return (
        <section className="py-24 px-6 bg-slate-50">
            <div className="container mx-auto max-w-5xl text-center">
                <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-16">Simple pricing for powerful tools.</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Starter */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-start text-left">
                        <span className="text-slate-500 font-medium mb-4">Starter</span>
                        <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">$0 <span className="text-base md:text-lg text-slate-400 font-normal">/ month</span></div>

                        <div className="space-y-4 mb-8 flex-1">
                            <div className="flex gap-3">
                                <Check size={20} className="text-slate-900 shrink-0" />
                                <span className="text-slate-600">Access to 3 Basic Agents</span>
                            </div>
                            <div className="flex gap-3">
                                <Check size={20} className="text-slate-900 shrink-0" />
                                <span className="text-slate-600">50 Credits per day</span>
                            </div>
                            <div className="flex gap-3">
                                <Check size={20} className="text-slate-900 shrink-0" />
                                <span className="text-slate-600">Community Support</span>
                            </div>
                        </div>

                        <Button variant="outline" className="w-full h-12 rounded-xl border-slate-200">Get Started</Button>
                    </div>

                    {/* Pro */}
                    <div className="bg-black p-8 rounded-3xl shadow-xl flex flex-col items-start text-left relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">BEST VALUE</div>
                        <span className="text-slate-400 font-medium mb-4">Pro Plan</span>
                        <div className="text-4xl md:text-5xl font-bold text-white mb-6">$29 <span className="text-base md:text-lg text-slate-500 font-normal">/ month</span></div>

                        <div className="space-y-4 mb-8 flex-1">
                            <div className="flex gap-3">
                                <Check size={20} className="text-indigo-400 shrink-0" />
                                <span className="text-slate-200">Unlimited Agent Access</span>
                            </div>
                            <div className="flex gap-3">
                                <Check size={20} className="text-indigo-400 shrink-0" />
                                <span className="text-slate-200">Priority Processing Speed</span>
                            </div>
                            <div className="flex gap-3">
                                <Check size={20} className="text-indigo-400 shrink-0" />
                                <span className="text-slate-200">Connect your own API Keys</span>
                            </div>
                            <div className="flex gap-3">
                                <Check size={20} className="text-indigo-400 shrink-0" />
                                <span className="text-slate-200">Email Support</span>
                            </div>
                        </div>

                        <Button className="w-full h-12 rounded-xl bg-white text-black hover:bg-slate-100 border-0">Upgrade to Pro</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
