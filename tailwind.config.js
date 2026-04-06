// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        krav: {
          charcoal: '#1A1A1B',
          concrete: '#2D2D2D',
          brass: '#C5A059',
          oak: '#8B5E3C',
        },
      },
      backgroundImage: {
        'concrete-pattern': "url('/textures/concrete-texture.png')", // Add a subtle grain image here
      }
    },
  },
  plugins: [],
}