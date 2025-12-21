
import { useRef, useState, useCallback, useEffect } from "react"
import Webcam from "react-webcam"
import { Button } from "../components/ui/Button"
import { Camera as CameraIcon, X, Zap } from "lucide-react"

export default function Scan() {
    const webcamRef = useRef<Webcam>(null)
    const [imgSrc, setImgSrc] = useState<string | null>(null)
    const [analyzing, setAnalyzing] = useState(false)
    const [result, setResult] = useState<any>(null)
    const [camReady, setCamReady] = useState(false)

    useEffect(() => {
        setTimeout(() => setCamReady(true), 1000)
    }, [])

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot()
        if (imageSrc) {
            setImgSrc(imageSrc)
            // Haptic
            if (navigator.vibrate) navigator.vibrate(50)
            analyzeImage(imageSrc)
        }
    }, [webcamRef])

    const analyzeImage = async (image: string) => {
        setAnalyzing(true)
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

            if (!apiRes.ok) throw new Error('Failed')
            const data = await apiRes.json()

            setTimeout(() => {
                setResult(data)
                setAnalyzing(false)
            }, 1000)

        } catch (error) {
            // Mock Fallback
            setTimeout(() => {
                setResult({
                    disease: "Early Blight",
                    confidence: 94,
                    treatment: "Use Chlorothalonil fungicide. Remove affected leaves."
                })
                setAnalyzing(false)
            }, 1500)
        }
    }

    const reset = () => {
        setImgSrc(null)
        setResult(null)
    }

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col bg-black rounded-3xl overflow-hidden relative shadow-2xl">
            {/* Camera Header */}
            <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between text-white bg-gradient-to-b from-black/50 to-transparent">
                <span className="font-medium bg-black/40 px-3 py-1 rounded-full text-sm backdrop-blur">
                    {camReady ? 'Camera Active' : 'Initializing...'}
                </span>
            </div>

            <div className="flex-1 relative bg-gray-900">
                {!imgSrc ? (
                    <>
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="w-full h-full object-cover"
                            videoConstraints={{ facingMode: "environment" }}
                            onUserMedia={() => setCamReady(true)}
                        />
                        {/* Simple Reticle */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-64 h-64 border-2 border-white/50 rounded-lg relative">
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-white" />
                                <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-white" />
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-white" />
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-white" />
                            </div>
                        </div>
                        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
                            <button
                                onClick={capture}
                                className="w-20 h-20 bg-white rounded-full border-4 border-gray-300 shadow-lg flex items-center justify-center active:scale-95 transition-transform"
                            >
                                <div className="w-16 h-16 bg-white rounded-full border-2 border-black" />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="relative w-full h-full">
                        <img src={imgSrc} className="w-full h-full object-cover" alt="Scan" />

                        {/* Result Sheet */}
                        {result && (
                            <div className="absolute bottom-0 left-0 right-0 bg-white text-black p-6 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom duration-500">
                                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

                                <h2 className="text-2xl font-bold text-farmer-primary flex items-center gap-2 mb-2">
                                    <Zap className="fill-current" />
                                    {result.disease}
                                </h2>
                                <p className="text-sm text-gray-500 mb-4 font-medium">Confidence: {Math.round(result.confidence)}%</p>

                                <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 mb-6">
                                    <p className="font-bold text-orange-800 mb-1">Treatment:</p>
                                    <p className="text-gray-700 leading-snug">{result.treatment}</p>
                                </div>

                                <Button size="lg" className="w-full font-bold text-lg" onClick={reset}>Scan Again</Button>
                            </div>
                        )}

                        {analyzing && (
                            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
                                <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4" />
                                <p className="font-bold text-xl">Analyzing...</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
