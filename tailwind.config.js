/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'te-cream': '#F8F9FA',
        'te-choc': '#1A1A1A',
        'te-choc-light': '#4A4A4A',
        'te-mustard': '#D4AF37',
        'te-mustard-hover': '#C19B28',
        'te-terra': '#8B0000',
        'te-sand': '#EAEAEA',
      },
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
        'pill': '9999px',
      }
    },
  },
  plugins: [],
}
