# CHANGELOG - SANJIVANI

All notable changes to the SANJIVANI crop disease detection platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2025-12-26 - "Dashboard 2.0 & MVP Complete"

### Added
- **Dashboard 2.0 Features**
  - `SprayingWidget.tsx` - Real-time spraying condition assessment with wind, humidity, and rain detection
  - `CropCalendar.tsx` - Weekly task management system with urgency indicators
  - Integrated both widgets into main Dashboard page
  
- **UI Components**
  - Comprehensive component library (Button, GlassCard, ChatAssistant, ScanOverlay, SpotlightCard, Dock)
  - Layout system (FarmerLayout, OSLayout, Header, MobileNav, PageTransition)
  - "Sunlight Glass" design theme optimized for outdoor use
  
- **Pages**
  - Landing, Auth, Dashboard, Scan, Camera, History
  - Mobile-first responsive design
  - Bottom navigation dock
  
- **Backend Infrastructure**
  - FastAPI server with CORS support
  - `/predict` endpoint for disease detection
  - Firebase Firestore integration for scan history
  - Mock fallback when model not trained
  - Disease information database (early_blight, late_blight, healthy, etc.)
  
- **AI Pipeline**
  - MobileNetV2 architecture (planned)
  - Dataset download scripts
  - Training pipeline (`train_model.py`)
  - Model evaluation framework
  
- **DevOps**
  - Docker containerization (frontend + backend)
  - docker-compose for orchestration
  - Nginx configuration for production
  
- **Documentation**
  - Comprehensive README with tech stack and quick start
  - Backend README with API documentation
  - Training documentation (TRAINING.md)

### Technical Details
- React 18 + TypeScript + Vite
- Tailwind CSS with custom farmer theme
- FastAPI + Uvicorn + TensorFlow
- Firebase Firestore for persistence
- Multi-language context (EN, HI, MR)

### Known Limitations
- Model not yet trained (using mock predictions)
- Some API endpoints documented but not implemented (`/health`, `/history`)
- No automated tests
- No offline support

---

## [2.0.0] - In Progress - "Production-Grade Architecture Refactor"

### Planning Phase - 2025-12-26

#### Architectural Changes (Planned)

**AI System Redesign**
- Reduce scope from 38 to ~10 disease classes (3 crops)
- Implement proper MobileNetV2 with transfer learning
- Add comprehensive model evaluation metrics
- Export dual formats (.h5 + .tflite for edge)
- Add inference time benchmarking
- Document model performance with confusion matrix

**Backend Refactoring**
- Separate AI inference into dedicated module (`ai/inference_engine.py`)
- Create Disease Knowledge Engine (`knowledge/knowledge_engine.py`)
- Implement versioned `disease_knowledge.json`
- Add API v2 with structured responses
- Implement `/api/v2/model/metrics` endpoint
- Add proper health check endpoint

**API v2 Contract**
```json
{
  "crop": "Tomato",
  "disease": "Late Blight",
  "confidence": 0.93,
  "severity": "High",
  "explanation": "Visual patterns matched leaf lesions",
  "recommended_actions": {
    "immediate": [...],
    "short_term": [...],
    "preventive": [...]
  },
  "metadata": {
    "model_version": "2.0.0",
    "inference_time_ms": 45
  }
}
```

**Frontend Enhancement**
- Remove/flag OSLayout experimental UI
- Add PWA support with service worker
- Implement offline scan queue with IndexedDB
- Add background sync for queued scans
- Update Scan.tsx for new response structure
- New components: ResultCard, ActionCard, ConfidenceBar, SeverityBadge

**Documentation**
- System architecture diagram (Mermaid)
- AI pipeline documentation with benchmarks
- Complete API reference
- Deployment guide
- Performance metrics table

#### Breaking Changes
⚠️ API response format change (v1 → v2)
⚠️ Model retrained with different classes
⚠️ Database schema updates for new response structure

#### Success Criteria
- Model accuracy >90%
- Inference time <100ms
- Model size <20MB
- Full PWA offline support
- Code coverage >70%
- Portfolio-ready documentation

---

## VERSION HISTORY

| Version | Date | Description | Status |
|---------|------|-------------|--------|
| 0.1.0 | 2024-11-XX | Initial SIH 2024 submission | ✅ Complete |
| 1.0.0 | 2025-12-26 | Dashboard 2.0 + MVP features | ✅ Complete |
| 2.0.0 | 2025-12-XX | Production-grade refactor | 🔄 In Progress |

---

## IMPROVEMENT TRACKING

### Performance Improvements (v1.0 → v2.0)

| Metric | v1.0 | v2.0 Target | v2.0 Actual |
|--------|------|-------------|-------------|
| Model Accuracy | N/A (mock) | >90% | TBD |
| Inference Time | ~1000ms | <100ms | TBD |
| Model Size | N/A | <20MB | TBD |
| API Response Time | ~500ms | <200ms | TBD |
| Offline Support | ❌ None | ✅ Full PWA | TBD |
| Code Coverage | 0% | >70% | TBD |
| Bundle Size | ~500KB | <1MB | TBD |

### Architecture Improvements

**v1.0 Issues:**
- Mixed AI logic and business logic
- No separation of concerns
- Mock predictions, no real model
- No offline support
- Limited error handling
- No testing infrastructure

**v2.0 Solutions:**
- Clean layer separation (UI → API → AI → Knowledge)
- Isolated inference engine
- Real trained model with benchmarks
- Full PWA with offline queue
- Comprehensive error handling
- Testing suite with >70% coverage

---

## Repository Snapshots

- **v1.0-pre-refactor** (2025-12-26): Checkpoint before 2.0 refactor
- **v1.0.0** (2025-12-26): Dashboard 2.0 complete, pre-refactor state
- **v2.0.0** (TBD): Production-grade architecture complete

---

*This changelog will be updated as improvements are implemented.*
