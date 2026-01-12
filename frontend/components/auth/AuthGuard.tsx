"use client";

import { useAuth } from "@/hooks/useAuth";
import { LoginModal } from "./LoginModal";
import { Loader2 } from "lucide-react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#0a0b0a]">
                <Loader2 className="w-8 h-8 text-nature-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="relative">
            <div className={`transition-all duration-500 ${!user ? 'blur-md pointer-events-none select-none opacity-50 h-[100vh] overflow-hidden' : ''}`}>
                {children}
            </div>
            {!user && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                    <LoginModal open={true} />
                </div>
            )}
        </div>
    );
}
