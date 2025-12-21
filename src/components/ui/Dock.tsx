
import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useNavigate, useLocation } from "react-router-dom"
import { Home, Scan, LayoutDashboard, History, Settings } from "lucide-react"

export function Dock() {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="flex h-16 gap-4 items-end rounded-2xl border border-brand-border bg-brand-glass backdrop-blur-2xl px-4 pb-3 shadow-glass">
                <DockItem icon={Home} label="Home" path="/" />
                <DockItem icon={LayoutDashboard} label="Dash" path="/dashboard" />
                <div className="w-[1px] h-8 bg-white/10 mb-2" /> {/* Divider */}
                <DockItem icon={Scan} label="Scan" path="/scan" isPrimary />
                <div className="w-[1px] h-8 bg-white/10 mb-2" />
                <DockItem icon={History} label="History" path="/history" />
                <DockItem icon={Settings} label="Config" path="/settings" />
            </div>
        </div>
    )
}

function DockItem({ icon: Icon, label, path, isPrimary }: { icon: any, label: string, path: string, isPrimary?: boolean }) {
    const mouseX = useMotionValue(Infinity)
    const navigate = useNavigate()
    const location = useLocation()
    const isActive = location.pathname === path

    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            onClick={() => navigate(path)}
            className="group relative flex flex-col items-center justify-end gap-1 cursor-pointer"
        >
            <motion.div
                whileHover={{ scale: 1.2, y: -10 }}
                whileTap={{ scale: 0.9 }}
                className={`
                    relative flex items-center justify-center p-3 rounded-2xl transition-all duration-300
                    ${isActive ? 'bg-white/10 text-brand-primary shadow-neon' : 'text-gray-400 hover:text-white'}
                    ${isPrimary ? 'bg-brand-primary text-brand-dark hover:bg-brand-primary/90' : ''}
                `}
            >
                <Icon className={isPrimary ? "w-6 h-6" : "w-5 h-5"} />

                {isActive && (
                    <span className="absolute -bottom-2 w-1 h-1 rounded-full bg-brand-primary" />
                )}
            </motion.div>

            {/* Tooltip */}
            <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-all bg-brand-surface border border-white/10 px-2 py-1 rounded-lg text-xs text-white whitespace-nowrap">
                {label}
            </span>
        </motion.div>
    )
}
