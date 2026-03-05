import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    LayoutGrid,
    MessageSquare,
    Users,
    Settings,
    LogOut,
    Bot,
    Plus,
    Menu,
    X
} from "lucide-react"

export function Sidebar() {
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    const navItems = [
        { icon: LayoutGrid, label: "Overview", active: false },
        { icon: Bot, label: "AI Agents", active: true },
        { icon: MessageSquare, label: "Chat History", active: false },
        { icon: Users, label: "Team", active: false },
        { icon: Settings, label: "Settings", active: false },
    ]

    const SidebarContent = () => (
        <div className="w-64 border-r border-slate-200 bg-slate-50 flex flex-col h-full">
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-slate-200/50">
                <div className="w-8 h-8 bg-brand-gradient rounded-lg flex items-center justify-center text-white mr-3 shadow-md shadow-indigo-500/20">
                    <Bot size={20} />
                </div>
                <span className="font-bold text-slate-900 tracking-tight">NeuralForge</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                <button className="w-full flex items-center gap-2 px-3 py-2.5 mb-6 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 shadow-sm hover:border-indigo-300 hover:ring-2 hover:ring-indigo-100 transition-all">
                    <Plus size={16} className="text-indigo-600" />
                    <span>New Workflow</span>
                </button>

                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3">
                    Menu
                </div>

                {navItems.map((item, index) => (
                    <a
                        key={index}
                        href="#"
                        onClick={() => setIsMobileOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${item.active
                            ? "bg-white text-indigo-600 shadow-sm border border-slate-100"
                            : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900"
                            }`}
                    >
                        <item.icon size={18} className={item.active ? "text-indigo-600" : "text-slate-400"} />
                        {item.label}
                    </a>
                ))}
            </nav>

            {/* User Footer */}
            <div className="p-4 border-t border-slate-200/50">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-200/50 cursor-pointer transition-colors">
                    <div className="w-8 h-8 rounded-full bg-slate-300 overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">Alex Morgan</p>
                        <p className="text-xs text-slate-500 truncate">Pro Plan</p>
                    </div>
                    <LogOut size={16} className="text-slate-400" />
                </div>
            </div>
        </div>
    )

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileOpen(true)}
                className="md:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-lg shadow-md border border-slate-200"
                aria-label="Open menu"
            >
                <Menu size={24} className="text-slate-700" />
            </button>

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex fixed left-0 top-0 h-screen z-30">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setIsMobileOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed left-0 top-0 h-screen z-50 md:hidden"
                        >
                            <button
                                onClick={() => setIsMobileOpen(false)}
                                className="absolute top-4 right-4 p-2 text-slate-600 hover:text-slate-900 z-10"
                                aria-label="Close menu"
                            >
                                <X size={20} />
                            </button>
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
