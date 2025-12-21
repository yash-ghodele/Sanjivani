
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Cloud, Droplets, Wind, Plus } from "lucide-react"

export default function Dashboard() {
    const navigate = useNavigate()

    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <div className="bg-white p-6 rounded-2xl shadow-card border border-gray-100 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-farmer-primary">Namaste, Farmer</h2>
                    <p className="text-gray-500">Pune District • 24°C Sunny</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                    🌾
                </div>
            </div>

            {/* Weather Grid */}
            <div className="grid grid-cols-3 gap-3">
                <WeatherCard icon={Cloud} label="Temp" value="24°C" color="text-blue-500" />
                <WeatherCard icon={Droplets} label="Humidity" value="65%" color="text-cyan-500" />
                <WeatherCard icon={Wind} label="Wind" value="12km" color="text-teal-500" />
            </div>

            {/* Main Action */}
            <div
                onClick={() => navigate('/scan')}
                className="bg-farmer-primary text-white p-6 rounded-2xl shadow-floating relative overflow-hidden group active:scale-95 transition-transform"
            >
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Plus className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">New Crop Scan</h3>
                        <p className="text-green-100">Check for diseases instantly</p>
                    </div>
                </div>
                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-8 -mb-8" />
            </div>

            {/* Recent Alert */}
            <div className="space-y-3">
                <h3 className="text-lg font-bold text-gray-800">Recent Scans</h3>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-orange-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-2xl">
                        🍂
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-gray-800">Early Blight</h4>
                        <p className="text-xs text-gray-500">Tomato • Today, 10:00 AM</p>
                    </div>
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">High Risk</span>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
                        🍃
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-gray-800">Healthy Crop</h4>
                        <p className="text-xs text-gray-500">Potato • Yesterday</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Safe</span>
                </div>
            </div>
        </div>
    )
}

function WeatherCard({ icon: Icon, label, value, color }: any) {
    return (
        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-1">
            <Icon className={`w-6 h-6 ${color}`} />
            <span className="text-xs text-gray-400 font-medium uppercase">{label}</span>
            <span className="text-lg font-bold text-gray-800">{value}</span>
        </div>
    )
}
