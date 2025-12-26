# 🖥️ Sanjivani Frontend (v2.0)

A high-performance, accessible web interface for the Sanjivani AI platform, built with **Next.js 15 (App Router)** and **Tailwind CSS**.

## 🎨 Design Philosophy

*   **"Dumb Client" Architecture**: The frontend handles **no business logic**. It strictly renders the API's structured response.
*   **Premium Nature Theme**: Deep slate backgrounds with neon green accents using `glassmorphism` for clarity.
*   **Accessibility**: High contrast, large touch targets, and clear typography (Outfit/Inter).

## ⚡ Features

*   **Camera Integration**: Native HTML5 camera access for real-time scanning.
*   **Dynamic Dashboard**: Live weather widget (OpenWeather) and recent activity.
*   **Responsive Results**: Adaptive cards for "Immediate", "Short-term", and "Preventive" actions.
*   **PWA Ready**: Manifest and service worker configuration for offline capability (Roadmap).

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
├── services/         # API Clients (Strict contracts)
└── public/           # Static Assets
```
