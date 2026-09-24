/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'te-cream': '#FDF6E9',
        'te-choc': '#3D1609',
        'te-choc-light': '#5A2613',
        'te-mustard': '#F5B731',
        'te-mustard-hover': '#F7C65A',
        'te-terra': '#BA3E1A',
        'te-sand': '#F2E5D5',
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
