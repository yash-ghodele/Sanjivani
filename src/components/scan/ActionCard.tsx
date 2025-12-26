import { CheckSquare, Clock, Shield } from "lucide-react"
import type { RecommendedActions } from "../../types/api"

interface ActionCardProps {
    actions: RecommendedActions
    onClose: () => void
}

export function ActionCard({ actions, onClose }: ActionCardProps) {
    return (
        <div className="bg-white p-6 space-y-6">
            {/* Immediate Actions */}
            {actions.immediate && actions.immediate.length > 0 && (
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                            <CheckSquare className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900">Do Now</h3>
                    </div>
                    <ul className="space-y-2">
                        {actions.immediate.map((action, i) => (
                            <li key={i} className="flex gap-3 text-sm text-gray-700">
                                <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-xs">
                                    {i + 1}
                                </span>
                                <span>{action}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Short-term Actions */}
            {actions.short_term && actions.short_term.length > 0 && (
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                            <Clock className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900">Next 7-14 Days</h3>
                    </div>
                    <ul className="space-y-2">
                        {actions.short_term.map((action, i) => (
                            <li key={i} className="flex gap-3 text-sm text-gray-700">
                                <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xs">
                                    {i + 1}
                                </span>
                                <span>{action}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Preventive Actions */}
            {actions.preventive && actions.preventive.length > 0 && (
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                            <Shield className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900">Prevention</h3>
                    </div>
                    <ul className="space-y-2">
                        {actions.preventive.map((action, i) => (
                            <li key={i} className="flex gap-3 text-sm text-gray-700">
                                <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-xs">
                                    {i + 1}
                                </span>
                                <span>{action}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Close button */}
            <button
                onClick={onClose}
                className="w-full py-3 bg-farmer-primary text-white font-bold rounded-lg hover:bg-farmer-primary/90 transition-colors"
            >
                Scan Again
            </button>
        </div>
    )
}
