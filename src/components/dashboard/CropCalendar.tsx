import { CalendarDays } from "lucide-react";

export function CropCalendar() {
    const tasks = [
        { title: "Fertilization", day: "Today", status: "urgent" },
        { title: "Irrigation", day: "Tomorrow", status: "pending" },
        { title: "Pest Check", day: "Friday", status: "pending" },
    ];

    return (
        <div className="rounded-2xl bg-white p-6 shadow-card border border-farmer-border/50">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-farmer-primary/10 rounded-lg text-farmer-primary">
                    <CalendarDays className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-farmer-text">This Week</h3>
            </div>

            <div className="space-y-3">
                {tasks.map((task, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-farmer-background transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                            <div className={`w-2 h-10 rounded-full ${task.status === "urgent" ? "bg-farmer-accent" : "bg-farmer-primary/30"
                                }`} />
                            <div>
                                <h4 className="font-semibold text-gray-900">{task.title}</h4>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{task.day}</p>
                            </div>
                        </div>

                        {task.status === "urgent" && (
                            <span className="px-3 py-1 bg-farmer-accent text-white text-xs font-bold rounded-full">
                                DO NOW
                            </span>
                        )}
                    </div>
                ))}
            </div>

            <button className="w-full mt-4 py-2 text-sm font-bold text-farmer-primary hover:bg-farmer-primary/5 rounded-lg transition-colors">
                View Full Calendar
            </button>
        </div>
    );
}
