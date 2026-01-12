'use client';

export const runtime = 'edge';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Share2, AlertTriangle, Sprout, Info, Calendar, Camera, CheckCircle, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getDiseaseById } from '@/lib/diseases';

// We'll fetch from the same meta endpoint for now, or a specific detail one.
// Since we don't have a specific detail endpoint yet, we'll use the meta one and filter client side
// OR we can update the backend to support /api/v2/meta/diseases/{id}. 
// For efficiency, let's reuse the full list for now as it's small, or just mock it if needed?
// No, the plan said "Fetch disease list...". 
// Better: Add a lightweight endpoint for details if the list grows, but for < 20 items, client filtering is fine.
// Wait, the meta endpoint filtered sypmtoms. Let's add a proper detail endpoint.

interface DiseaseDetail {
    id: string;
    name: string;
    scientific_name: string;
    severity: string;
    crops_affected: string[];
    symptoms: string[];
    recommended_actions: {
        immediate: string[];
        short_term: string[];
        preventive: string[];
    };
    explanation: string;
    economic_impact: string;
    imageUrl?: string;
}

export default function DiseaseDetailPage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [disease, setDisease] = useState<DiseaseDetail | null>(null);
    const [loading, setLoading] = useState(true);

    const isDemo = searchParams.get('demo') === 'true';
    const isScan = searchParams.get('source') === 'scan';
    const confidence = searchParams.get('confidence') || '98.4';

    useEffect(() => {
        const fetchDisease = async () => {
            if (!params.id) return;

            // Priority 1: Check for recent scan result (if coming from scan)
            if (isScan) {
                try {
                    const storedResult = localStorage.getItem('latest_scan_result');
                    const storedImage = localStorage.getItem('latest_scan_image');

                    if (storedResult) {
                        const result: any = JSON.parse(storedResult);
                        // Normalize scan result to DiseaseDetail format
                        // Check if stored result matches current ID (fuzzy match)
                        const resultSlug = result.disease.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim();

                        if (resultSlug === params.id) {
                            setDisease({
                                id: resultSlug,
                                name: result.disease,
                                scientific_name: result.metadata?.scientific_name || "Unknown Scientific Name",
                                severity: result.severity,
                                crops_affected: [result.crop],
                                symptoms: result.metadata?.symptoms || ["See analysis details below"],
                                recommended_actions: result.recommended_actions || {
                                    immediate: [],
                                    short_term: [],
                                    preventive: []
                                },
                                explanation: result.explanation,
                                economic_impact: "Impact analysis not available for this specific scan.",
                                imageUrl: result.imageUrl || storedImage || undefined
                            });
                            // If we have a stored image, we might want to use it? 
                            // The current UI uses `disease.imageUrl`. 
                            // We should probably update the type and UI to support custom images.
                            // For now, let's just proceed.
                            setLoading(false);
                            return;
                        }
                    }
                } catch (e) {
                    console.error("Failed to load scan result", e);
                }
            }

            // Priority 2: Check for demo mode / client data
            if (isDemo || (!isScan)) { // Also fallback to client data if not scan, or if scan load failed?
                const clientDisease = getDiseaseById(params.id as string);
                if (clientDisease) {
                    // Convert client disease format to backend format
                    setDisease({
                        id: clientDisease.id,
                        name: clientDisease.name,
                        scientific_name: clientDisease.scientificName,
                        severity: clientDisease.severity.charAt(0).toUpperCase() + clientDisease.severity.slice(1),
                        crops_affected: [clientDisease.crop],
                        symptoms: clientDisease.symptoms,
                        recommended_actions: {
                            immediate: clientDisease.treatments.chemical,
                            short_term: clientDisease.treatments.organic,
                            preventive: clientDisease.treatments.prevention
                        },
                        explanation: clientDisease.description,
                        economic_impact: `This disease can significantly reduce crop yield if not managed properly. ${clientDisease.severity === 'high' ? 'Severe outbreaks can lead to complete crop loss.' : 'Early detection and treatment can minimize losses.'}`,
                        imageUrl: clientDisease.imageUrl
                    });
                    setLoading(false);
                    return;
                }
            }

            // Priority 3: Fetch from backend API
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v2/meta/diseases/${params.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setDisease(data);
                } else {
                    console.error("Not found");
                    // Assuming setDisease(null) is default
                }
            } catch (error) {
                console.error("Failed to fetch disease details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDisease();
    }, [params.id, isDemo, isScan]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="animate-pulse text-nature-400">Loading disease intel...</div>
            </div>
        );
    }

    if (!disease) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold mb-4">Disease Not Found</h1>
                <Link href="/">
                    <Button variant="outline">Return Home</Button>
                </Link>
            </div>
        );
    }

    const handleShare = async () => {
        if (!disease) return;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Sanjivani Diagnosis: ${disease.name}`,
                    text: `Learn about ${disease.name} (${disease.scientific_name}) and how to treat it.`,
                    url: window.location.href
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pb-20 font-sans selection:bg-nature-500/30">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-white hover:bg-white/10 rounded-full">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <span className="font-display font-bold text-lg tracking-tight opacity-90">Diagnosis Details</span>
                    <Button variant="ghost" size="icon" onClick={handleShare} className="text-white hover:bg-white/10 rounded-full">
                        <Share2 className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* Hero Section with Image */}
            <div className="relative h-[45vh] w-full">
                {disease.imageUrl ? (
                    <img
                        src={disease.imageUrl}
                        alt={disease.name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 bg-nature-900/50" />
                )}

                <div className="absolute inset-0 bg-gradient-to-b from-nature-900/30 via-nature-900/60 to-black" />
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px] opacity-20" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="glass-card p-6 rounded-3xl border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                            <div className="relative z-10 flex flex-col md:flex-row md:items-end gap-4 justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center gap-1.5",
                                            disease.severity === 'Critical' ? "bg-red-500/20 text-red-300 border-red-500/30" :
                                                disease.severity === 'High' ? "bg-orange-500/20 text-orange-300 border-orange-500/30" :
                                                    "bg-nature-500/20 text-nature-300 border-nature-500/30"
                                        )}>
                                            {disease.severity === 'Critical' && <AlertTriangle className="w-3 h-3" />}
                                            {disease.severity} Severity
                                        </span>
                                        {disease.crops_affected[0] && (
                                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/5 text-gray-300 border border-white/10 uppercase tracking-wider flex items-center gap-1.5">
                                                <Sprout className="w-3 h-3" />
                                                {disease.crops_affected[0]}
                                            </span>
                                        )}
                                    </div>
                                    <h1 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white mb-2 leading-tight">
                                        {disease.name}
                                    </h1>
                                    <p className="text-lg text-gray-400 italic font-serif flex items-center gap-2">
                                        {disease.scientific_name}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    {(isScan || isDemo) && (
                                        <div className="text-right">
                                            <div className="text-3xl font-bold text-nature-400 font-mono tracking-tight">{confidence}%</div>
                                            <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold flex items-center justify-end gap-1">
                                                Match Confidence
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 space-y-6">

                {/* Demo Banner */}
                {isDemo && (
                    <div className="glass-card p-4 rounded-2xl border-blue-500/30 bg-blue-500/5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                <Info className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-blue-100 text-sm">Demo Mode</h3>
                                <p className="text-xs text-blue-300">Viewing sample data for demonstration.</p>
                            </div>
                        </div>
                        <Link href="/scan">
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white border-0 shadow-lg shadow-blue-500/20">
                                <Camera className="w-4 h-4 mr-2" /> Try Scan
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Explanation Card */}
                <div className="glass-card p-8 rounded-3xl border border-white/10">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                        <Info className="w-5 h-5 text-nature-500" />
                        About this Disease
                    </h2>
                    <p className="text-gray-300 leading-relaxed text-lg">
                        {disease.explanation}
                    </p>
                    {/* Symptoms List */}
                    <div className="mt-8 pt-6 border-t border-white/5">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Common Symptoms</h3>
                        <div className="grid md:grid-cols-2 gap-3">
                            {disease.symptoms.map((symptom, i) => (
                                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="w-2 h-2 rounded-full bg-nature-500 mt-2 flex-shrink-0" />
                                    <span className="text-gray-200 text-sm font-medium">{symptom}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Treatment Section */}
                <div className="glass-card p-1 rounded-3xl overflow-hidden border border-nature-500/20 bg-gradient-to-b from-nature-900/40 to-black/40">
                    <div className="p-8">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Leaf className="w-6 h-6 text-nature-500" />
                            Recommended Treatments
                        </h2>

                        <div className="space-y-6">
                            {/* Immediate */}
                            {disease.recommended_actions.immediate?.length > 0 && (
                                <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/20 backdrop-blur-sm">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center shadow-lg shadow-red-900/20">
                                            <AlertTriangle className="w-5 h-5 text-red-400" />
                                        </div>
                                        <h3 className="text-lg font-bold text-red-100">Immediate Action</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {disease.recommended_actions.immediate.map((action, i) => (
                                            <li key={i} className="flex items-start gap-3 text-gray-300">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(248,113,113,0.6)]" />
                                                <span>{action}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Organic & Prevention Grid */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Organic */}
                                <div className="p-5 rounded-2xl bg-nature-500/10 border border-nature-500/20 hover:bg-nature-500/15 transition-colors">
                                    <h3 className="text-lg font-bold text-nature-100 mb-4 flex items-center gap-2">
                                        <Leaf className="w-5 h-5 text-nature-400" /> Organic Solutions
                                    </h3>
                                    <ul className="space-y-3">
                                        {disease.recommended_actions.short_term.map((action, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                                <CheckCircle className="w-4 h-4 text-nature-500 mt-0.5 flex-shrink-0" />
                                                <span>{action}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* Prevention */}
                                <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/15 transition-colors">
                                    <h3 className="text-lg font-bold text-blue-100 mb-4 flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-blue-400" /> Prevention
                                    </h3>
                                    <ul className="space-y-3">
                                        {disease.recommended_actions.preventive.map((action, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                                                <span>{action}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-8">
                    <Link href="/scan">
                        <Button className="w-full h-14 text-lg bg-nature-600 hover:bg-nature-500 text-white rounded-2xl shadow-xl shadow-nature-900/50 font-bold tracking-wide">
                            Scan Another Crop
                        </Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button variant="outline" className="w-full h-14 text-lg border-white/10 hover:bg-white/5 text-white rounded-2xl font-semibold">
                            Back to Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
