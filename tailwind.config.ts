import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // -- StrawBunny design tokens --
        blush: {
          50: '#FFFDFB',
          100: '#FFF7F0', // crème principal (fond)
          200: '#FFEFE6',
          300: '#FFE4EC', // rose poudré
          400: '#FFD1DE',
          500: '#FFB6C9'
        },
        strawberry: {
          100: '#FFE0EA',
          300: '#FFA6C1',
          500: '#FF7FA6', // rose fraise — accent principal
          600: '#F4658F',
          700: '#E14E79',
          800: '#C9436B' // baie profonde — titres forts
        },
        sage: {
          100: '#EAF5EC',
          300: '#C8E6D0', // vert pastel
          500: '#9FCFAE'
        },
        cream: '#FFFDF9',
        latte: '#F1D2B8', // beige clair
        ink: {
          DEFAULT: '#6B4A55', // brun-rose doux, jamais noir pur
          soft: '#9A7C86'
        }
      },
      fontFamily: {
        display: ['"Fredoka"', 'ui-rounded', 'sans-serif'],
        body: ['"Quicksand"', 'ui-sans-serif', 'sans-serif']
      },
      borderRadius: {
        cozy: '28px',
        bubble: '36px'
      },
      boxShadow: {
        soft: '0 8px 24px -8px rgba(201, 67, 107, 0.18)',
        petal: '0 4px 14px -4px rgba(255, 127, 166, 0.25)',
        glow: '0 0 0 8px rgba(255, 214, 226, 0.35)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(2deg)' }
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' }
        },
        popIn: {
          '0%': { transform: 'scale(0.6)', opacity: '0' },
          '60%': { transform: 'scale(1.08)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.9)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' }
        },
        driftIn: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        ribbonWiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' }
        }
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        floatSlow: 'floatSlow 7s ease-in-out infinite',
        breathe: 'breathe 4s ease-in-out infinite',
        popIn: 'popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        sparkle: 'sparkle 2.4s ease-in-out infinite',
        driftIn: 'driftIn 0.6s ease-out forwards',
        ribbonWiggle: 'ribbonWiggle 3s ease-in-out infinite'
      }
    }
  },
  plugins: []
} satisfies Config
