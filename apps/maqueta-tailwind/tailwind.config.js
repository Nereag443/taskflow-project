/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: [
    'bg-rose-400',
    'hover:bg-rose-500',
    'text-white',
    'rounded',
    'w-6',
    'h-6',
    'ml-auto'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#6366F1',
        accent: '#10B981'
      },
      transitionDuration: {
        DEFAULT: '200ms'
      }
    },
  },
  plugins: [],
}
