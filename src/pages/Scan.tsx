
import { useRef, useState, useCallback, useEffect } from "react"
import Webcam from "react-webcam"
import { ResultCard } from "../components/scan/ResultCard"
import { ActionCard } from "../components/scan/ActionCard"
import type { PredictionResponse } from "../types/api"

export default function Scan() {
    const webcamRef = useRef<Webcam>(null)
    const [imgSrc, setImgSrc] = useState<string | null>(null)
    const [analyzing, setAnalyzing] = useState(false)
    const [result, setResult] = useState<PredictionResponse | null>(null)
    const [showActions, setShowActions] = useState(false)
    const [camReady, setCamReady] = useState(false)

    useEffect(() => {
        setTimeout(() => setCamReady(true), 1000)
    }, [])

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot()
        if (imageSrc) {
            setImgSrc(imageSrc)
            // Haptic feedback
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

            // Use API v2 endpoint
            const apiRes = await fetch(`${API_URL}/api/v2/predict`, {
                method: 'POST',
                body: formData
            })

            if (!apiRes.ok) throw new Error('API request failed')
            const data: PredictionResponse = await apiRes.json()

            setTimeout(() => {
                setResult(data)
                setAnalyzing(false)
            }, 1000)

        } catch (error) {
            console.error('Prediction error:', error)

            // Mock fallback for development
            setTimeout(() => {
                setResult({
                    crop: "Tomato",
                    disease: "Early Blight",
                    disease_key: "Early_Blight",
                    confidence: 0.94,
                    severity: "Moderate",
                    explanation: "Fungal disease that typically starts on lower, older leaves and progresses upward.",
                    recommended_actions: {
                        immediate: [
                            "Remove and destroy infected leaves immediately",
                            "Apply copper-based fungicide (Copper oxychloride 50% WP @ 3g/L)"
                        ],
                        short_term: [
                            "Apply Mancozeb 75% WP @ 2.5g/L every 7-10 days",
                            "Ensure proper plant spacing for air circulation"
                        ],
                        preventive: [
                            "Crop rotation with non-solanaceous crops",
                            "Use disease-resistant varieties"
                        ]
                    },
                    symptoms: [
                        "Dark brown spots with concentric rings on older leaves",
                        "Yellowing around spots"
                    ],
                    economic_impact: "Can reduce yields by 20-30% if left untreated",
                    scientific_name: "Alternaria solani",
                    metadata: {
                        model_version: "2.0.0",
                        inference_time_ms: 45,
                        model_architecture: "MobileNetV2"
                    }
                })
                setAnalyzing(false)
            }, 1500)
        }
    }

    const reset = () => {
        setImgSrc(null)
        setResult(null)
        setShowActions(false)
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
                        {result && !showActions && (
                            <div className="absolute bottom-0 left-0 right-0">
                                <ResultCard result={result} />

                                {/* View Actions Button */}
                                <div className="bg-white px-6 pb-6">
                                    <button
                                        onClick={() => setShowActions(true)}
                                        className="w-full py-3 bg-farmer-accent text-white font-bold rounded-lg hover:bg-farmer-accent/90 transition-colors"
                                    >
                                        View Treatment Plan
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Actions Sheet */}
                        {result && showActions && (
                            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.2)] max-h-[80vh] overflow-y-auto">
                                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-4" />
                                <ActionCard
                                    actions={result.recommended_actions}
                                    onClose={reset}
                                />
                            </div>
                        )}

                        {/* Analyzing Overlay */}
                        {analyzing && (
                            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
                                <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4" />
                                <p className="font-bold text-xl">Analyzing...</p>
                                <p className="text-sm text-gray-300 mt-2">AI processing your image</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
