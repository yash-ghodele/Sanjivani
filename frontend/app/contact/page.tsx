'use client';

import { useState } from 'react';
import { ArrowLeft, Send, Mail, User, MessageSquare, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="min-h-screen bg-nature-900 text-white">
            {/* Header */}
            <header className="glass-nav sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Home</span>
                    </Link>
                    <h1 className="hidden sm:block text-xl font-display font-bold text-gradient-green">
                        Contact Us
                    </h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                        Get in <span className="text-gradient-green">Touch</span>
                    </h2>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        Have questions about SANJIVANI? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div className="glass-card p-8 rounded-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2 text-white/90">
                                    Your Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-500 transition-all text-white placeholder:text-white/40"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2 text-white/90">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-500 transition-all text-white placeholder:text-white/40"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium mb-2 text-white/90">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-500 transition-all text-white placeholder:text-white/40"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2 text-white/90">
                                    Message
                                </label>
                                <div className="relative">
                                    <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-white/40" />
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-500 transition-all text-white placeholder:text-white/40 resize-none"
                                        placeholder="Tell us more about your inquiry..."
                                    />
                                </div>
                            </div>

                            {submitStatus === 'success' && (
                                <div className="flex items-center gap-2 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400">
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span>Message sent successfully! We'll get back to you soon.</span>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400">
                                    Failed to send message. Please try again or email us directly.
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="animate-spin">⏳</span>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="glass-card p-8 rounded-2xl">
                            <h3 className="text-2xl font-display font-bold mb-4 text-gradient-green">
                                Contact Information
                            </h3>
                            <div className="space-y-4 text-white/70">
                                <div className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 mt-1 text-nature-500" />
                                    <div>
                                        <p className="font-medium text-white">Email</p>
                                        <a href="mailto:contact@sanjivani.app" className="hover:text-nature-500 transition-colors">
                                            contact@sanjivani.app
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-8 rounded-2xl">
                            <h3 className="text-2xl font-display font-bold mb-4 text-gradient-green">
                                Support Hours
                            </h3>
                            <div className="space-y-2 text-white/70">
                                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                                <p>Saturday: 10:00 AM - 4:00 PM</p>
                                <p>Sunday: Closed</p>
                            </div>
                        </div>

                        <div className="glass-card p-8 rounded-2xl bg-gradient-to-br from-nature-500/10 to-nature-600/10 border-nature-500/20">
                            <h3 className="text-xl font-display font-bold mb-2">
                                Need immediate assistance?
                            </h3>
                            <p className="text-white/70 mb-4">
                                Check out our <Link href="/faq" className="text-nature-500 hover:underline">FAQ page</Link> for quick answers to common questions.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
