# 🖥️ Sanjivani Frontend (v2.0)

A high-performance, accessible web interface for the Sanjivani AI platform, built with **Next.js 14.2 (App Router)** and **Tailwind CSS**.

## 🎨 Design Philosophy ("Green Space")

*   **"Dumb Client" Architecture**: The frontend handles **no business logic**. It strictly renders the API's structured response.
*   **Deep Forest Theme**: Immersive `#0f110f` backgrounds with `#82ae19` neon accents and glassmorphism for a premium feel.
*   **Dynamic Visuals**: Features "Falling Leaves" motion effects and seamless section transitions for a unified user experience.
*   **Accessibility**: High contrast text, clear botany-inspired iconography, and large touch targets.

## ⚡ Features

*   **Secure Authentication**: Firebase-powered OAuth (Google, GitHub) & Email/Password login.
*   **Disease Treatment**: Dedicated diagnosis pages with deep linking, sharing, and demo modes.
*   **Multilingual Support**: Full translation for English, Hindi, and Marathi via `i18next`.
*   **Camera Integration**: Native HTML5 camera access for real-time scanning.
*   **Dynamic Dashboard**: Live weather widget (OpenWeather) and recent activity tracking.
*   **Result Cards**: Adaptive cards for "Immediate", "Short-term", and "Preventive" actions.
*   **Interactive Landing**: Engaging hero section with animated elements and seamless scroll effects.
*   **PWA-Enabled**: Frontend architecture ready for Progressive Web App features (manifest included).

> **Planned Offline Strategy**:
> - IndexedDB image caching
> - Deferred status upload queue
> - Sync-on-reconnect implementation

## 🛠️ Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_key_here

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# Resend (Email)
RESEND_API_KEY=...
```

### 3. Run Development Server
```bash
npm run dev
# App runs on http://localhost:3000
```

## 📁 Structure

```
frontend/
├── app/              # Next.js App Router Pages
├── components/       # UI Components (Button, Cards, Navbar)
├── hooks/            # Custom Hooks (useAuth, useWeather)
├── lib/              # Client-side DB & Utilities
├── services/         # API Clients (Strict contracts)
└── public/           # Static Assets
```
