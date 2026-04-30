/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"DM Serif Display"', '"Playfair Display"', 'serif'],
      },
      colors: {
        cream: {
          50: '#FDFBF9',
          100: '#F5F2ED',
        },
        // Muted Pastel Brown (Taupe/Tan)
        pastelBrown: {
          50: '#FAF8F6',
          100: '#F2EDE9', // light tint for bg
          200: '#E5DDD6',
          300: '#D1C4B9',
          500: '#B2A08F', // main pastel brown
          600: '#968372',
          800: '#5C5046', // deep taupe
        },
        tan: {
          50: '#FDF9F3',
          100: '#F8F1E9',
          200: '#F3E9DD',
        },
        forest: {
          50: '#f4f7f6',
          100: '#e9efed',
          400: '#8ba79d',
          600: '#4d6b60',
          800: '#2D4A43',
          900: '#1a2e29',
        },
        burnt: {
          400: '#c57d56',
          500: '#A65D37',
          600: '#8b4a2b',
        }
      },
    },
  },
  plugins: [],
}
