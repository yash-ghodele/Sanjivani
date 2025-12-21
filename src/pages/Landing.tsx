
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { ArrowRight, CheckCircle } from "lucide-react"

export default function Landing() {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
            <div className="w-full max-w-md space-y-6">
                <div className="inline-block p-4 rounded-full bg-green-100 mb-4">
                    <img src="/vite.svg" className="w-16 h-16" alt="Logo" /> {/* Placeholder logo */}
                </div>

                <h1 className="text-4xl font-bold text-farmer-primary leading-tight">
                    Healthy Crops,<br />
                    <span className="text-farmer-accent">Better Yield.</span>
                </h1>

                <p className="text-lg text-farmer-text/80 leading-relaxed">
                    Instant disease detection for your farm. <br />
                    Works without internet. Simple to use.
                </p>

                <div className="grid gap-3 max-w-xs mx-auto text-left">
                    <Feature text="98% Accurate Detection" />
                    <Feature text="Available in Hindi & Marathi" />
                    <Feature text="Works Offline" />
                </div>

                <div className="pt-8">
                    <Button
                        size="lg"
                        variant="big-action"
                        className="w-full text-xl shadow-xl hover:shadow-2xl transition-shadow"
                        onClick={() => navigate('/auth')}
                    >
                        Get Started <ArrowRight className="ml-2 w-6 h-6" />
                    </Button>
                    <p className="mt-4 text-sm text-gray-500">Free for Indian Farmers</p>
                </div>
            </div>
        </div>
    )
}

function Feature({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
            <CheckCircle className="w-5 h-5 text-farmer-secondary" />
            <span className="font-medium text-gray-700">{text}</span>
        </div>
    )
}
