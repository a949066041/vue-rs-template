const { addDynamicIconSelectors } = require('@iconify/tailwind')
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,ts,jsx,tsx,vue}'],
  plugins: [
    addDynamicIconSelectors(),
  ],
}
