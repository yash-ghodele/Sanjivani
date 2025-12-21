
import { motion } from 'framer-motion'

export function ScanOverlay({ isScanning }: { isScanning: boolean }) {
    if (!isScanning) return null

    return (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-3xl">
            {/* The Laser Scanner */}
            <motion.div
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-brand-primary shadow-[0_0_20px_#00DC82] opacity-80"
            />

            {/* Corner Reticles */}
            <Corner className="top-4 left-4 border-l-2 border-t-2" />
            <Corner className="top-4 right-4 border-r-2 border-t-2" />
            <Corner className="bottom-4 left-4 border-l-2 border-b-2" />
            <Corner className="bottom-4 right-4 border-r-2 border-b-2" />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

            {/* Digital Readout */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-brand-dark/80 backdrop-blur px-3 py-1 rounded-full border border-brand-primary/30">
                <span className="text-brand-primary text-xs font-mono tracking-widest animate-pulse">ANALYZING TISSUE...</span>
            </div>
        </div>
    )
}

function Corner({ className }: { className: string }) {
    return (
        <div className={`absolute w-6 h-6 border-brand-primary/60 rounded-sm ${className}`} />
    )
}
