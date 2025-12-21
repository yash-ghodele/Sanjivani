
import { Outlet } from "react-router-dom"
import { Dock } from "../components/ui/Dock"

export default function OSLayout() {
    return (
        <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-primary selection:text-brand-dark pb-24">
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none z-0" />

            {/* Main Content Area */}
            <main className="relative z-10 container mx-auto px-4 py-8">
                <Outlet />
            </main>

            {/* The Dock - Always present in the OS */}
            <Dock />
        </div>
    )
}
