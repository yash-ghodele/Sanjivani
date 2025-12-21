
import { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Webcam from 'react-webcam'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Zap, ChevronUp, AlertCircle, CheckCircle2 } from 'lucide-react'
import { ScanOverlay } from '../components/ui/ScanOverlay'
import { cn } from '../lib/utils'

export default function CameraPage() {
    const navigate = useNavigate()
    const webcamRef = useRef<Webcam>(null)
    const [imgSrc, setImgSrc] = useState<string | null>(null)
    const [isScanning, setIsScanning] = useState(false)
    const [result, setResult] = useState<any>(null)
    const [camReady, setCamReady] = useState(false)

    // "Boot up" effect
    useEffect(() => {
        setTimeout(() => setCamReady(true), 500)
    }, [])

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot()
        if (imageSrc) {
            // Haptic Feedback (Mobile only)
            if (navigator.vibrate) navigator.vibrate(50)

            setImgSrc(imageSrc)
            analyzeImage(imageSrc)
        }
    }, [webcamRef])

    const analyzeImage = async (image: string) => {
        setIsScanning(true)

        try {
            const response = await fetch(image)
            const blob = await response.blob()
            const formData = new FormData()
            formData.append('file', blob, 'scan.jpg')

            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
            const apiRes = await fetch(`${API_URL}/predict`, {
                method: 'POST',
                body: formData
            })

            if (!apiRes.ok) throw new Error('AI Server Offline')

            const data = await apiRes.json()

            // Artificial delay for the "Cool" factor if API is too fast
            setTimeout(() => {
                setResult(data)
                setIsScanning(false)
                if (navigator.vibrate) navigator.vibrate([50, 50, 50]) // Success pulse
            }, 1200)

        } catch (error) {
            console.error(error)
            setIsScanning(false)
            // Fallback for demo if server is training
            setResult({
                disease: "Server Training...",
                confidence: 0,
                treatment: "The AI is currently learning. Please try again in 30 mins."
            })
        }
    }

    const reset = () => {
        setImgSrc(null)
        setResult(null)
        setIsScanning(false)
    }

    return (
        <div className="relative h-[calc(100vh-80px)] overflow-hidden bg-black rounded-3xl border border-brand-border shadow-2xl mx-1 mt-1">

            {/* 1. Header */}
            <div className="absolute top-0 inset-x-0 z-20 p-6 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent">
                <div>
                    <h1 className="text-xl font-heading font-bold text-white tracking-wide">
                        <span className="text-brand-primary">NEURAL</span> SCANNER
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${camReady ? 'bg-brand-primary animate-pulse' : 'bg-red-500'}`} />
                        <span className="text-xs font-mono text-gray-400">
                            {camReady ? 'OPTICAL SENSORS ONLINE' : 'INITIALIZING...'}
                        </span>
                    </div>
                </div>

                <button
                    onClick={() => navigate('/dashboard')}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                    <X className="w-5 h-5 text-white" />
                </button>
            </div>

            {/* 2. The Viewfinder */}
            <div className="absolute inset-0 z-0">
                {!imgSrc ? (
                    <div className="relative w-full h-full">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="w-full h-full object-cover opacity-90"
                            videoConstraints={{ facingMode: "environment" }}
                            onUserMedia={() => setCamReady(true)}
                        />
                        {/* Overlay is always visible in active mode, but "Scanning" animates on capture */}
                        <div className="absolute inset-0 border-[40px] border-brand-dark/40 pointer-events-none" />

                        {/* Static Reticle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] border border-white/20 rounded-3xl">
                            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-brand-primary" />
                            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-brand-primary" />
                            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-brand-primary" />
                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-brand-primary" />
                        </div>
                    </div>
                ) : (
                    <img src={imgSrc} className="w-full h-full object-cover" alt="Scan" />
                )}
            </div>

            {/* 3. The "Holographic" Overlay */}
            <AnimatePresence>
                {isScanning && <ScanOverlay isScanning={isScanning} />}
            </AnimatePresence>

            {/* 4. Controls & Results Drawer */}
            <div className="absolute bottom-0 inset-x-0 z-30 p-8 pb-12 bg-gradient-to-t from-brand-dark via-brand-dark/90 to-transparent">
                {!result ? (
                    <div className="flex justify-center">
                        <motion.button
                            onClick={capture}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="group relative w-20 h-20"
                        >
                            <div className="absolute inset-0 bg-brand-primary/20 rounded-full animate-ping" />
                            <div className="absolute inset-0 bg-brand-surface/50 backdrop-blur-md rounded-full border-2 border-white/30 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white rounded-full group-hover:scale-90 transition-transform duration-300" />
                            </div>
                        </motion.button>
                    </div>
                ) : (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-brand-surface/80 backdrop-blur-xl border border-brand-border rounded-3xl p-6 shadow-neon"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                    {result.disease === 'Healthy' ? <CheckCircle2 className="text-brand-primary" /> : <AlertCircle className="text-brand-danger" />}
                                    {result.disease}
                                </h2>
                                <p className="text-gray-400 font-mono text-sm mt-1">CONFIDENCE: {Math.round(result.confidence)}%</p>
                            </div>
                            <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-mono">
                                AI-MODEL-v1
                            </div>
                        </div>

                        <div className="bg-black/20 p-4 rounded-xl mb-6 border border-white/5">
                            <h3 className="text-sm font-bold text-brand-primary mb-2 flex items-center gap-2">
                                <Zap className="w-4 h-4" /> TREATMENT PROTOCOL
                            </h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                {result.treatment}
                            </p>
                        </div>

                        <button
                            onClick={reset}
                            className="w-full py-4 bg-brand-primary text-brand-dark font-bold rounded-xl hover:bg-brand-primary/90 transition-colors"
                        >
                            INITIATE NEW SCAN
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
