# SANJIVANI Backend 🐍

The AI brain of the CropGuard platform. Built with **FastAPI** and **TensorFlow**.

## ⚙️ Setup

### 1. Environment
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Database (Firebase)
To enable History limits:
1.  Go to Firebase Console -> Project Settings -> Service Accounts.
2.  Generate Private Key.
3.  Save as `backend/serviceAccountKey.json`.
4.  *Without this, the app runs in Mock Mode (Data not saved).*

### 3. Run Server
```bash
python main.py
# Running on http://localhost:8000
```

---

## 🧠 AI Model Training
The model detects 38 classes of plant diseases.

### Step 1: Get Data
Run the automated downloader:
```bash
python download_dataset.py
```
*Retrieves ~2.7GB from Kaggle automatically.*

### Step 2: Train
```bash
python train_model.py
```
*   Trains MobileNetV2 for 20 epochs.
*   Saves best model to `models/plant_disease_model.h5`.
*   Auto-switches API from Mock -> Real Mode found.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/predict` | Upload image, returns disease + confidence + treatment |
| `GET` | `/history` | Fetch recent scans from Firestore |
| `GET` | `/health` | Check API status & Model loading state |
