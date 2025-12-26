import { Zap, AlertTriangle, CheckCircle, Info } from "lucide-react"
import type { PredictionResponse } from "../../types/api"

interface ResultCardProps {
    result: PredictionResponse
}

const severityConfig = {
    None: { color: "green", bg: "bg-green-50", border: "border-green-500", text: "text-green-800" },
    Low: { color: "yellow", bg: "bg-yellow-50", border: "border-yellow-500", text: "text-yellow-800" },
    Moderate: { color: "orange", bg: "bg-orange-50", border: "border-orange-500", text: "text-orange-800" },
    High: { color: "red", bg: "bg-red-50", border: "border-red-500", text: "text-red-800" },
    Critical: { color: "red", bg: "bg-red-100", border: "border-red-600", text: "text-red-900" }
}

export function ResultCard({ result }: ResultCardProps) {
    const config = severityConfig[result.severity]

    return (
        <div className="bg-white rounded-t-3xl p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom duration-500">
            {/* Drag indicator */}
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

            {/* Header with crop & disease */}
            <div className="mb-4">
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">{result.crop}</p>
                <h2 className="text-2xl font-bold text-farmer-primary flex items-center gap-2">
                    <Zap className="fill-current w-6 h-6" />
                    {result.disease}
                </h2>
                {result.scientific_name && (
                    <p className="text-xs text-gray-500 italic mt-1">{result.scientific_name}</p>
                )}
            </div>

            {/* Confidence bar */}
            <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">Confidence</span>
                    <span className="font-bold text-farmer-primary">{Math.round(result.confidence * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-farmer-primary transition-all duration-500"
                        style={{ width: `${result.confidence * 100}%` }}
                    />
                </div>
            </div>

            {/* Severity badge */}
            <div className={`${config.bg} ${config.border} border-l-4 p-3 rounded-lg mb-4`}>
                <div className="flex items-center gap-2">
                    {result.severity === "None" ? (
                        <CheckCircle className={`w-5 h-5 ${config.text}`} />
                    ) : result.severity === "Critical" || result.severity === "High" ? (
                        <AlertTriangle className={`w-5 h-5 ${config.text}`} />
                    ) : (
                        <Info className={`w-5 h-5 ${config.text}`} />
                    )}
                    <span className={`font-bold ${config.text}`}>Severity: {result.severity}</span>
                </div>
            </div>

            {/* Explanation */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-4">
                <p className="text-sm text-gray-700 leading-relaxed">{result.explanation}</p>
            </div>

            {/* Metadata */}
            <div className="flex gap-4 text-xs text-gray-500 mb-4">
                <span>Model: {result.metadata.model_architecture}</span>
                <span>•</span>
                <span>{result.metadata.inference_time_ms.toFixed(0)}ms</span>
            </div>
        </div>
    )
}
