import { type ReactNode } from "react"
import { Navbar } from "../components/Navbar"

interface LayoutProps {
    children: ReactNode
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden selection:bg-black/10 selection:text-black">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
        </div>
    )
}
