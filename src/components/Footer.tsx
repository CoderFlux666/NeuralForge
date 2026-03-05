import { Bot } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                    {/* Logo Column */}
                    <div className="sm:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
                                <Bot size={20} />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-slate-900">NeuralForge</span>
                        </div>
                        <p className="text-slate-500 text-sm max-w-xs">
                            Empowering teams with autonomous AI agents that work as hard as you do.
                        </p>
                    </div>

                    {/* Columns */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li><a href="#" className="hover:text-indigo-600">Features</a></li>
                            <li><a href="#" className="hover:text-indigo-600">Agents</a></li>
                            <li><a href="#" className="hover:text-indigo-600">Roadmap</a></li>
                            <li><a href="#" className="hover:text-indigo-600">Changelog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li><a href="#" className="hover:text-indigo-600">About</a></li>
                            <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
                            <li><a href="#" className="hover:text-indigo-600">Blog</a></li>
                            <li><a href="#" className="hover:text-indigo-600">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li><a href="#" className="hover:text-indigo-600">Privacy</a></li>
                            <li><a href="#" className="hover:text-indigo-600">Terms</a></li>
                            <li><a href="#" className="hover:text-indigo-600">Security</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-sm">© 2026 NeuralForge Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        {/* Social placeholders */}
                        <div className="w-5 h-5 bg-slate-200 rounded-full" />
                        <div className="w-5 h-5 bg-slate-200 rounded-full" />
                        <div className="w-5 h-5 bg-slate-200 rounded-full" />
                    </div>
                </div>
            </div>
        </footer>
    )
}
