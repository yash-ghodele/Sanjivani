/**
 * TypeScript interfaces for SANJIVANI 2.0 API v2 responses
 */

export interface RecommendedActions {
    immediate: string[]
    short_term: string[]
    preventive: string[]
}

export interface PredictionMetadata {
    model_version: string
    inference_time_ms: number
    model_architecture: string
}

export interface AlternativePrediction {
    disease: string
    confidence: number
}

export interface PredictionResponse {
    crop: string
    disease: string
    disease_key: string
    confidence: number
    severity: "None" | "Low" | "Moderate" | "High" | "Critical"
    explanation: string
    recommended_actions: RecommendedActions
    symptoms: string[]
    economic_impact: string
    scientific_name?: string
    alternatives?: AlternativePrediction[]
    metadata: PredictionMetadata
}

export interface ModelMetrics {
    version: string
    architecture: string
    accuracy?: number
    precision?: number
    recall?: number
    f1_score?: number
    model_size_mb?: number
    avg_inference_ms?: number
    trained_date?: string
    num_classes: number
}
