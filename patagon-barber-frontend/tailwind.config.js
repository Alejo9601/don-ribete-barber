/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        slide_left: {
          '0%': { opacity: 0, transform: 'translateX(-200px)' },
          '100%': { opacity: 1, transform: 'translateX(0px)' }
        },
        slide_right: {
          '0%': { opacity: 0, transform: 'translateX(200px)' },
          '100%': { opacity: 1, transform: 'translateX(0px)' }
        }
      },
      animation: {
        slide_left: 'slide_left 1s ease',
        slide_right: 'slide_right 1s ease'
      }
    }
  },
  plugins: []
}
