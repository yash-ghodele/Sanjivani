
import { Button } from "../components/ui/Button"
import { useNavigate } from "react-router-dom"

export default function Auth() {
    const navigate = useNavigate()

    return (
        <div className="min-h-[80vh] flex flex-col justify-center px-4 space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-farmer-primary mb-2">Login</h1>
                <p className="text-gray-500">Enter your mobile number to continue</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-card space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Mobile Number</label>
                    <div className="flex gap-2">
                        <div className="w-16 h-12 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center font-medium text-gray-500">
                            +91
                        </div>
                        <input
                            type="tel"
                            className="flex-1 h-12 bg-white border border-gray-200 rounded-lg px-4 text-lg font-medium outline-none focus:border-farmer-primary focus:ring-1 focus:ring-farmer-primary"
                            placeholder="98765 43210"
                        />
                    </div>
                </div>

                <Button
                    variant="big-action"
                    className="w-full text-lg"
                    onClick={() => navigate('/dashboard')}
                >
                    Send OTP
                </Button>
            </div>

            <p className="text-center text-xs text-gray-400">
                By continuing, you agree to our Terms & Privacy Policy.
            </p>
        </div>
    )
}
