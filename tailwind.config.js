/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4f7cac',  // soft blue
          DEFAULT: '#2c5282', // deep blue
          dark: '#1a365d',   // dark blue
        },
        secondary: {
          light: '#a0aec0',  // cool gray
          DEFAULT: '#718096', // slate gray
          dark: '#4a5568',   // darker slate
        },
        accent: {
          light: '#ed64a6',  // soft pink
          DEFAULT: '#d53f8c', // vibrant pink
          dark: '#97266d',   // deep pink
        },
        background: {
          light: '#f7fafc',  // light gray background
          DEFAULT: '#edf2f7', // gray background
          dark: '#e2e8f0',   // slightly darker gray
        },
        text: {
          primary: '#2d3748', // dark slate
          secondary: '#4a5568', // medium slate
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}