
# SANJIVANI 2.0 - Dataset Configuration


DISEASE_MAPPING = {
    # Tomato
    "Tomato__Early_Blight": {"crop": "Tomato", "disease": "Early_Blight", "severity": "Moderate"},
    "Tomato__Late_Blight": {"crop": "Tomato", "disease": "Late_Blight", "severity": "High"},
    "Tomato__Leaf_Mold": {"crop": "Tomato", "disease": "Leaf_Mold", "severity": "Low"},
    "Tomato__Healthy": {"crop": "Tomato", "disease": "Healthy", "severity": "Low"},
    
    # Potato
    "Potato__Early_Blight": {"crop": "Potato", "disease": "Early_Blight", "severity": "Moderate"},
    "Potato__Late_Blight": {"crop": "Potato", "disease": "Late_Blight", "severity": "Critical"},
    "Potato__Healthy": {"crop": "Potato", "disease": "Healthy", "severity": "Low"},
    
    # Rice
    "Rice__Bacterial_Blight": {"crop": "Rice", "disease": "Bacterial_Blight", "severity": "High"},
    "Rice__Brown_Spot": {"crop": "Rice", "disease": "Brown_Spot", "severity": "Moderate"},
    "Rice__Healthy": {"crop": "Rice", "disease": "Healthy", "severity": "Low"}
}

CLASS_NAMES = list(DISEASE_MAPPING.keys())

def get_crop_from_class(class_name: str) -> str:
    return DISEASE_MAPPING.get(class_name, {}).get("crop", "Unknown")

def get_disease_from_class(class_name: str) -> str:
    return DISEASE_MAPPING.get(class_name, {}).get("disease", "Unknown")

def get_severity_from_class(class_name: str) -> str:
    return DISEASE_MAPPING.get(class_name, {}).get("severity", "Unknown")

MODEL_CONFIG = {
    "num_classes": len(CLASS_NAMES),
    "input_size": (224, 224, 3),
    "batch_size": 32,
    "epochs": 10,
    "learning_rate": 1e-4,
    "base_learning_rate": 1e-4,
    "fine_tune_learning_rate": 1e-5,
    "input_shape": (224, 224, 3),
    "input_size": (224, 224, 3)
}

PERFORMANCE_THRESHOLDS = {
    "min_accuracy": 0.90,
    "min_precision": 0.88,
    "min_recall": 0.88,
    "max_inference_ms": 100
}
