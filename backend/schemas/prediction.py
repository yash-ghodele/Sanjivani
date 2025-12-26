"""
Pydantic schemas for SANJIVANI 2.0 API v2
Structured, type-safe response models
"""
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Literal


class RecommendedActions(BaseModel):
    """Categorized treatment recommendations"""
    immediate: List[str] = Field(description="Actions to take immediately")
    short_term: List[str] = Field(description="Actions for next 7-14 days")
    preventive: List[str] = Field(description="Long-term prevention strategies")


class PredictionMetadata(BaseModel):
    """Model and inference metadata"""
    model_version: str = Field(description="Model version used")
    inference_time_ms: float = Field(description="Inference time in milliseconds")
    model_architecture: str = Field(description="Model architecture name")


class AlternativePrediction(BaseModel):
    """Alternative disease possibility"""
    disease: str
    confidence: float


class PredictionResponse(BaseModel):
    """Complete prediction response (API v2)"""
    crop: str = Field(description="Detected crop")
    disease: str = Field(description="Detected disease (human-readable)")
    disease_key: str = Field(description="Disease identifier for lookups")
    confidence: float = Field(ge=0, le=1, description="Prediction confidence (0-1)")
    severity: Literal["None", "Low", "Moderate", "High", "Critical"] = Field(
        description="Disease severity level"
    )
    explanation: str = Field(description="Disease explanation for farmers")
    recommended_actions: RecommendedActions
    symptoms: List[str] = Field(description="Disease symptoms to watch for")
    economic_impact: str = Field(description="Potential economic impact")
    scientific_name: Optional[str] = Field(None, description="Scientific disease name")
    alternatives: Optional[List[AlternativePrediction]] = Field(
        None, description="Alternative predictions"
    )
    metadata: PredictionMetadata


class ModelMetrics(BaseModel):
    """Model performance metrics"""
    version: str
    architecture: str
    accuracy: Optional[float] = None
    precision: Optional[float] = None
    recall: Optional[float] = None
    f1_score: Optional[float] = None
    model_size_mb: Optional[float] = None
    avg_inference_ms: Optional[float] = None
    trained_date: Optional[str] = None
    num_classes: int


class HealthCheckResponse(BaseModel):
    """API health check response"""
    status: Literal["healthy", "degraded", "unhealthy"]
    model_loaded: bool
    knowledge_base_loaded: bool
    knowledge_version: str
    model_version: str
    total_inferences: int
    avg_inference_ms: Optional[float] = None


class PerformanceStats(BaseModel):
    """Runtime performance statistics"""
    total_inferences: int
    avg_inference_ms: float
    min_inference_ms: float
    max_inference_ms: float
    std_inference_ms: float
