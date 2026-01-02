# 🧠 Sanjivani AI Backend (v2.0)

Production-ready backend for the Sanjivani AI Crop Disease Detection system. Built with **FastAPI**, **TensorFlow**, and **Clean Architecture** principles.

## 🏗️ Architecture

The backend is structured into distinct layers to separate concerns:

```
backend/
├── ai/                  # Inference Engine (MobileNetV2)
│   ├── inference_engine.py  # Isolated prediction logic
│   └── dataset_config.py    # Training configurations
├── api/                 # API Layer
│   └── v2/              # Versioned Endpoints
├── knowledge/           # Domain Knowledge
│   └── disease_knowledge.json # Deterministic treatment logic
├── models/              # Trained Model Artifacts (.h5/.tflite)
└── tests/               # Automated Tests
```

## 🚀 Key Features

*   **Structured API Response**: Returns `crop`, `disease`, `confidence`, `severity`, `actions`, and `metadata`.
*   **Dual Mode Inference**: Supports both Server-Side (TensorFlow) and Edge (TFLite) models.
*   **Generative AI Diagnosis**: Uses Gemini 1.5 Flash for *explanation/validation only*. Treatment advice is 100% deterministic (from KB).
*   **Weather Intelligence**: Real-time localized weather data via OpenWeatherMap API for context-aware farming advice.
*   **Knowledge Integration**: Decouples "What is it?" (AI) from "What to do?" (Knowledge Base).

## 🛠️ Setup & Run

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Run API Server
```bash
python main.py
# Server runs on http://localhost:8000
```

### 3. Run Tests
```bash
pytest tests/
```

## 📊 AI Model Information

*   **Architecture**: MobileNetV2 (Transfer Learning from ImageNet)
*   **Input Size**: 224x224 RGB
*   **Classes**: 7 (Tomato: 4, Potato: 3)
*   **Target Inference**: <100ms
