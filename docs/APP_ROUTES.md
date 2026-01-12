# 🗺️ Application Routes

This document lists all available routes in the Sanjivani 2.0 application.

## Public Routes

| Route | Description | File Path |
|-------|-------------|-----------|
| `/` | **Landing Page** - Hero, Features, CTA | `app/page.tsx` |
| `/login` | **Authentication** - Sign In / Sign Up | `app/login/page.tsx` |
| `/about` | **About Us** - Mission & Vision | `app/about/page.tsx` |
| `/contact` | **Contact** - Support Form | `app/contact/page.tsx` |
| `/faq` | **FAQ** - Common Questions | `app/faq/page.tsx` |

## Protected / Functional Routes

| Route | Description | File Path |
|-------|-------------|-----------|
| `/dashboard` | **User Dashboard** - Main Hub | `app/dashboard/dashboard-page.tsx` |
| `/scan` | **Scan** - Disease Detection Camera | `app/scan/page.tsx` |
| `/disease/[id]` | **Disease Details** - Diagnosis & Treatment | `app/disease/[id]/page.tsx` |
| `/calendar` | **Crop Calendar** - Scheduling | `app/calendar/page.tsx` (Protected by `AuthGuard`) |
| `/history` | **Scan History** - Past diagnoses | `app/history/page.tsx` (Protected by `AuthGuard`) |

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/contact` | POST | Handles contact form submissions (via Resend) |
