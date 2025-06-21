/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          600: '#9333ea',
          700: '#7e22ce',
        },
        success: {
          500: '#22c55e',
          600: '#16a34a',
        },
        danger: {
          500: '#ef4444',
          600: '#dc2626',
        }
      },
    },
  },
  plugins: [
  ],
}
