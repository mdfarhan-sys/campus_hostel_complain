/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        campus: {
          dark: '#173D2B',       // Primary Dark Green
          secondary: '#4F7F55',  // Secondary Green
          sage: '#AFC69A',       // Sage Green
          lightSage: '#E8F0DF',  // Light Sage
          cream: '#F7F6EE',      // Cream Background
          creamCard: '#FFFFFF',  // Crisp White Card
          textDark: '#173D2B',   // Dark Green Text
          muted: '#68756C',      // Muted Green-Gray
          accent: '#DCE9C9',     // Accent Soft Sage
          cardBg: '#F3F6ED',     // Slightly tinted subtle card background
          border: '#D8E2D2',     // Thin border
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'soft': '0 10px 30px rgba(23, 61, 43, 0.07)',
        'soft-lg': '0 18px 40px rgba(23, 61, 43, 0.11)',
        'subtle': '0 4px 16px rgba(23, 61, 43, 0.04)',
      }
    },
  },
  plugins: [],
}
