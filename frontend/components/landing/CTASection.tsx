'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Send, Mail, User, MessageSquare, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';

export function CTASection() {
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
        <section className="py-24 relative">
            <div className="container-padding relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Left: Heading & Info */}
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-6xl font-display font-medium text-white leading-[1.1]">
                                Discuss details <br />
                                of your <span className="text-[#82ae19]">project?</span>
                            </h2>
                            <div className="flex items-center gap-2 text-gray-400">
                                <span>Contact us below</span>
                                <ArrowRight className="w-4 h-4" />
                            </div>

                            {/* Social / Extra Links */}
                            <div className="flex gap-4 pt-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#82ae19] transition-colors cursor-pointer">
                                    <MessageCircle className="w-5 h-5" />
                                </div>
                            </div>
                        </div>

                        {/* Contact Info Cards */}
                        <div className="space-y-4 pt-8">
                            <div className="glass-card p-6 rounded-2xl">
                                <h3 className="text-lg font-display font-bold mb-3 text-gradient-green">
                                    Contact Information
                                </h3>
                                <div className="flex items-start gap-3 text-white/70">
                                    <Mail className="w-5 h-5 mt-1 text-nature-500" />
                                    <div>
                                        <p className="font-medium text-white text-sm">Email</p>
                                        <a href="mailto:contact@sanjivani.app" className="hover:text-nature-500 transition-colors text-sm">
                                            contact@sanjivani.app
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card p-6 rounded-2xl">
                                <h3 className="text-lg font-display font-bold mb-3 text-gradient-green">
                                    Support Hours
                                </h3>
                                <div className="space-y-1 text-white/70 text-sm">
                                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                                    <p>Sunday: Closed</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Real Contact Form */}
                    <div className="bg-[#1a1a18] rounded-3xl p-8 border border-white/5 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name Input */}
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-14 pl-12 pr-4 bg-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-500 transition-all text-white placeholder:text-gray-500 text-sm"
                                    placeholder="Your Name"
                                />
                            </div>

                            {/* Email Input */}
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-14 pl-12 pr-4 bg-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-500 transition-all text-white placeholder:text-gray-500 text-sm"
                                    placeholder="Email Address"
                                />
                            </div>

                            {/* Subject Input */}
                            <div>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-14 px-4 bg-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-500 transition-all text-white placeholder:text-gray-500 text-sm"
                                    placeholder="Subject"
                                />
                            </div>

                            {/* Message Textarea */}
                            <div className="relative">
                                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-white/40" />
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full pl-12 pr-4 py-3 bg-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-500 transition-all text-white placeholder:text-gray-500 resize-none text-sm"
                                    placeholder="Tell us about your project..."
                                />
                            </div>

                            {/* Success Message */}
                            {submitStatus === 'success' && (
                                <div className="flex items-center gap-2 p-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 text-sm">
                                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                                    <span>Message sent! We'll get back to you soon.</span>
                                </div>
                            )}

                            {/* Error Message */}
                            {submitStatus === 'error' && (
                                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
                                    Failed to send. Please try again.
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-14 rounded-full bg-[#82ae19] text-white font-medium hover:bg-[#6d9315] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

                            {/* Alternative CTA */}
                            <div className="pt-2">
                                <Link href="/scan" className="block">
                                    <button type="button" className="w-full h-12 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-all">
                                        Or Start Free Scan Instead
                                    </button>
                                </Link>
                            </div>

                            <p className="text-[10px] text-gray-600 text-center px-4">
                                By sending a message you agree to our processing of personal data.
                            </p>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}
