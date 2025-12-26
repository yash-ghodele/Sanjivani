"""
Dataset Configuration for SANJIVANI 2.0
Focused scope: 3 crops with 8-10 critical diseases for higher accuracy
"""

# Narrowed scope for production-grade accuracy
CROPS = ["Tomato", "Potato", "Rice"]

# Disease classes per crop (realistic, focused scope)
DISEASES = {
    "Tomato": [
        "Early_Blight",
        "Late_Blight",
        "Leaf_Mold",
        "Healthy"
    ],
    "Potato": [
        "Early_Blight",
        "Late_Blight",
        "Healthy"
    ],
    "Rice": [
        "Bacterial_Blight",
        "Brown_Spot",
        "Healthy"
    ]
}

# Flattened class list for model training (10 total classes)
CLASS_NAMES = [
    "Tomato__Early_Blight",
    "Tomato__Late_Blight",
    "Tomato__Leaf_Mold",
    "Tomato__Healthy",
    "Potato__Early_Blight",
    "Potato__Late_Blight",
    "Potato__Healthy",
    "Rice__Bacterial_Blight",
    "Rice__Brown_Spot",
    "Rice__Healthy"
]

# Model configuration
MODEL_CONFIG = {
    "architecture": "MobileNetV2",
    "input_size": (224, 224, 3),
    "num_classes": len(CLASS_NAMES),
    "weights": "imagenet",  # Transfer learning
    "trainable_layers": -4,  # Fine-tune last 4 layers
    "learning_rate": 0.0001,
    "batch_size": 32,
    "epochs": 20
}

# Data augmentation settings
AUGMENTATION_CONFIG = {
    "rotation_range": 20,
    "width_shift_range": 0.2,
    "height_shift_range": 0.2,
    "shear_range": 0.2,
    "zoom_range": 0.2,
    "horizontal_flip": True,
    "fill_mode": "nearest"
}

# Validation split
VALIDATION_SPLIT = 0.2
TEST_SPLIT = 0.1

# Performance thresholds
PERFORMANCE_THRESHOLDS = {
    "min_accuracy": 0.90,  # 90% minimum
    "min_precision": 0.88,
    "min_recall": 0.88,
    "max_inference_ms": 100  # Edge-ready target
}

def get_crop_from_class(class_name: str) -> str:
    """Extract crop name from class name"""
    return class_name.split("__")[0]

def get_disease_from_class(class_name: str) -> str:
    """Extract disease name from class name"""
    return class_name.split("__")[1]

def format_disease_display(class_name: str) -> str:
    """Format disease name for user display"""
    disease = get_disease_from_class(class_name)
    return disease.replace("_", " ").title()
