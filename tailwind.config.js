/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './resources/**/*.edge',
    './inertia/**/*.{js,ts,jsx,tsx,vue}',
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line unicorn/prefer-module
  plugins: [require('preline/plugin'), require('@tailwindcss/forms')],
}
