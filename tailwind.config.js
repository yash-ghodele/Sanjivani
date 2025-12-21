/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Farmer-First Palette (High Contrast, Earthy)
                farmer: {
                    primary: '#166534', // Deep Green (Trust)
                    secondary: '#15803d', // Lighter Green
                    accent: '#EA580C', // Harvest Orange (Action)
                    background: '#FEFCE8', // Warm Beige (Easy on eyes)
                    surface: '#FFFFFF', // Clean White
                    text: '#1e293b', // Slate 800 (Readable Black)
                    muted: '#64748b', // Slate 500
                    border: '#e2e8f0', // Slate 200
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // Maximum Legibility
            },
            boxShadow: {
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'floating': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            },
            borderRadius: {
                'lg': '0.75rem', // Soft, friendly corners
                'xl': '1rem',
            }
        },
    },
    plugins: [require("tailwindcss-animate")],
}
