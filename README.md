# CropGuard/SANJIVANI

🚀 **Production-Ready AI Crop Disease Detection Platform**
Built for Smart India Hackathon 2024.

---

## 🌟 Features
*   **Real-Time Detection**: Instant diagnosis via Webcam or File Upload using a custom CNN.
*   **Premium UI**: Glassmorphism design (Emerald/Teal theme) with framer-motion animations.
*   **Mobile-First**: Fully responsive with bottom navigation and touch-friendly controls.
*   **Data Persistence**: Firebase connection for saving scan history indefinitely.
*   **Farmer Dashboard**: Weather integration, health scores, and recent activity.
*   **Multilingual**: Support for English, Hindi, and Marathi.

---

## 🛠️ Tech Stack
*   **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
*   **Backend**: Python FastAPI, Uvicorn, TensorFlow, OpenCV
*   **AI Model**: MobileNetV2 (Transfer Learning) on 38 Disease Classes
*   **Database**: Google Firebase Firestore
*   **infrastructure**: Docker & Docker Compose

---

## 🚀 Quick Start

### 1. Frontend
```bash
npm install
npm run dev
# Open http://localhost:5173
```

### 2. Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python main.py
# API runs at http://localhost:8000
```

### 3. AI Model Setup
The repo comes with a `download_dataset.py` script.
1.  **Download**: `python download_dataset.py` (or manual download)
2.  **Train**: `python train_model.py` (Takes ~1 hour)

---

## ☁️ Deployment
This project is container-ready. 
```bash
docker-compose up --build
```

## 📂 Repository
[https://github.com/yash-ghodele/Sanjivani-MVP](https://github.com/yash-ghodele/Sanjivani-MVP)

---
© 2024 Team SANJIVANI
