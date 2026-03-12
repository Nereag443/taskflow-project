/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./app.js"],
  safelist: [
    'bg-rose-400',
    'opacity-50',
    'line-through',
    'border-2',
    'border-rose-500',
    'hover:bg-rose-500',
    'text-white',
    'rounded',
    'w-6',
    'h-6',
    'ml-auto',
    'transform',
    'hover:-translate-y-1',
    'hover:shadow-lg',
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
