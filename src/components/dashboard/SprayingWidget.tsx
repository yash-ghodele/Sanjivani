import { Wind, Droplets, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "../../lib/utils";

interface SprayingWidgetProps {
    windSpeed: number; // km/h
    humidity: number; // %
    isRaining: boolean;
}

export function SprayingWidget({ windSpeed, humidity, isRaining }: SprayingWidgetProps) {
    // Logic: Unsafe if raining, wind > 20km/h, or humidity < 40% (evaporation)
    const isUnsafe = isRaining || windSpeed > 15 || humidity < 30;

    return (
        <div className={cn(
            "relative overflow-hidden rounded-2xl p-6 shadow-card transition-all",
            isUnsafe
                ? "bg-red-50 text-red-900 border-l-8 border-red-500"
                : "bg-emerald-50 text-emerald-900 border-l-8 border-emerald-500"
        )}>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold opacity-90">Spraying Conditions</h3>
                    <div className="flex items-center gap-2 mt-2">
                        {isUnsafe ? (
                            <ThumbsDown className="h-8 w-8 text-red-600" />
                        ) : (
                            <ThumbsUp className="h-8 w-8 text-emerald-600" />
                        )}
                        <span className="text-3xl font-black tracking-tight">
                            {isUnsafe ? "NOT SAFE" : "OPTIMAL"}
                        </span>
                    </div>
                </div>

                <div className="text-right space-y-1">
                    <div className="flex items-center justify-end gap-1.5 text-sm font-medium">
                        <Wind className="h-4 w-4" />
                        {windSpeed} km/h
                    </div>
                    <div className="flex items-center justify-end gap-1.5 text-sm font-medium">
                        <Droplets className="h-4 w-4" />
                        {humidity}%
                    </div>
                </div>
            </div>

            <p className="mt-4 text-sm font-medium opacity-80">
                {isUnsafe
                    ? isRaining ? "Rain detected. Spray will wash off." : "High winds may cause drift."
                    : "Conditions are perfect for absorption."}
            </p>
        </div>
    );
}
