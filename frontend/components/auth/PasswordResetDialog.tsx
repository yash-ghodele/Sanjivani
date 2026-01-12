'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Mail, Loader2, CheckCircle2 } from 'lucide-react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export function PasswordResetDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus('idle');
        setErrorMessage('');

        try {
            await sendPasswordResetEmail(auth, email);
            setStatus('success');
            setEmail('');
            // Auto-close after 3 seconds
            setTimeout(() => {
                onOpenChange(false);
                setStatus('idle');
            }, 3000);
        } catch (error: any) {
            setStatus('error');
            if (error.code === 'auth/user-not-found') {
                setErrorMessage('No account found with this email address.');
            } else if (error.code === 'auth/invalid-email') {
                setErrorMessage('Please enter a valid email address.');
            } else {
                setErrorMessage('Failed to send reset email. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-[#1a1a18] border-white/10">
                <DialogHeader>
                    <DialogTitle className="text-white">Reset Your Password</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Enter your email address and we'll send you a link to reset your password.
                    </DialogDescription>
                </DialogHeader>

                {status === 'success' ? (
                    <div className="flex flex-col items-center justify-center py-8 space-y-4">
                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                            <CheckCircle2 className="w-8 h-8 text-green-400" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-white font-semibold mb-2">Check Your Email</h3>
                            <p className="text-sm text-gray-400">
                                We've sent a password reset link to <span className="text-nature-400">{email}</span>
                            </p>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-[#82ae19] transition-colors" />
                            <input
                                type="email"
                                placeholder="your@email.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#82ae19] transition-all text-sm disabled:opacity-50"
                            />
                        </div>

                        {status === 'error' && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                                {errorMessage}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#82ae19] hover:bg-[#6d9214] text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-[#82ae19]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                'Send Reset Link'
                            )}
                        </button>

                        <p className="text-xs text-center text-gray-500">
                            Remember your password?{' '}
                            <button
                                type="button"
                                onClick={() => onOpenChange(false)}
                                className="text-nature-400 hover:underline"
                            >
                                Back to login
                            </button>
                        </p>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
