/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'dancing': ['"Dancing Script"', 'cursive'],
        'sans': ['Poppins', 'sans-serif'],
        'serif': ['"Cormorant Garamond"', 'serif'],
        'cormorant': ['"Cormorant Garamond"', 'serif'],
      },
      animation: {
        'float-heart': 'floatHeart var(--animation-duration, 10s) linear forwards',
      },
      keyframes: {
        floatHeart: {
          '0%': { transform: 'translateY(0) rotate(45deg) scale(1)', opacity: 1 },
          '100%': { transform: 'translateY(-100vh) rotate(45deg) scale(0)', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}