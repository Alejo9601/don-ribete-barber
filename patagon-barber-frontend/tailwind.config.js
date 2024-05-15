/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        cover_pattern:
          "linear-gradient(to right,transparent,95%,rgba(0,0,0,1)),linear-gradient(to left,transparent,95%,rgba(0,0,0,1)),linear-gradient(to bottom,transparent,95%,rgba(0,0,0,1)),linear-gradient(to top,transparent,95%,rgba(0,0,0,1)),url('assets/images/cover.webp')"
      },
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
