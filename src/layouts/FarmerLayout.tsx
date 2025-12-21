
import { Outlet, NavLink } from "react-router-dom"
import { Home, LayoutDashboard, ScanLine, User } from "lucide-react"

export default function FarmerLayout() {
    return (
        <div className="min-h-screen pb-24 md:pb-0">
            {/* Top Navigation (Desktop) */}
            <header className="sticky top-0 z-50 bg-farmer-primary text-white shadow-md">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                            <span className="text-farmer-primary font-bold text-lg">S</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight">Sanjivani</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-6">
                        <NavLink to="/" className={({ isActive }) => isActive ? "font-bold text-farmer-accent" : "hover:text-gray-200"}>Home</NavLink>
                        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "font-bold text-farmer-accent" : "hover:text-gray-200"}>My Farm</NavLink>
                        <NavLink to="/scan" className={({ isActive }) => isActive ? "font-bold text-farmer-accent" : "hover:text-gray-200"}>Scan Crop</NavLink>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6">
                <Outlet />
            </main>

            {/* Bottom Navigation (Mobile - Touch Friendly) */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2 pb-4 z-50 shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
                <NavButton to="/" icon={Home} label="Home" />
                <NavButton to="/dashboard" icon={LayoutDashboard} label="My Farm" />
                <div className="-mt-8">
                    <NavLink to="/scan" className={({ isActive }) => `
                        w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-white transition-transform
                        ${isActive ? 'bg-farmer-accent scale-110' : 'bg-farmer-primary'}
                     `}>
                        <ScanLine className="w-8 h-8 text-white" />
                    </NavLink>
                </div>
                <NavButton to="/history" icon={ScanLine} label="History" /> {/* Placeholder link */}
                <NavButton to="/auth" icon={User} label="Profile" />
            </nav>
        </div>
    )
}

function NavButton({ to, icon: Icon, label }: any) {
    return (
        <NavLink to={to} className={({ isActive }) => `
            flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-colors
            ${isActive ? 'text-farmer-primary bg-green-50' : 'text-gray-400'}
        `}>
            <Icon className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">{label}</span>
        </NavLink>
    )
}
