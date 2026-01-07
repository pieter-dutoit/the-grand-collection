/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem'
      }
    },
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.olive.900'),
            a: {
              color: theme('colors.sage.700'),
              fontWeight: '600',
              textDecoration: 'underline',
              textUnderlineOffset: '4px'
            },
            h1: { color: theme('colors.olive.900') },
            h2: { color: theme('colors.olive.900') },
            h3: { color: theme('colors.olive.900') },
            h4: { color: theme('colors.olive.900') },
            h5: { color: theme('colors.olive.900') },
            h6: { color: theme('colors.olive.900') },
            strong: { color: theme('colors.olive.900') },
            blockquote: {
              color: theme('colors.olive.800'),
              borderLeftColor: theme('colors.gold.300')
            },
            figcaption: { color: theme('colors.olive.700') },
            hr: { borderColor: theme('colors.olive.200') },
            'ul > li::marker': { color: theme('colors.olive.400') },
            'ol > li::marker': { color: theme('colors.olive.500') }
          }
        }
      }),
      screens: {
        '2xl': '1280px'
      },
      backgroundImage: {
        'custom-gradient':
          'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 90%)',
        'custom-gradient-mobile':
          'linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.9) 35%, rgba(0, 0, 0, 0.2) 100%)'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        white: '#ffffff',
        black: '#000000',
        transparent: 'transparent',
        olive: {
          50: '#f5f6f3',
          100: '#e8e8e3',
          200: '#d1d2c8',
          300: '#9fa38f',
          400: '#898e79',
          500: '#6a7059',
          600: '#525744',
          700: '#414636',
          800: '#35392c',
          900: '#2c2f25',
          950: '#171a14',
          DEFAULT: '#6a7059',
          dark: '#414636'
        },
        gold: {
          50: '#f5f5f1',
          100: '#e7e6da',
          200: '#d1cfb7',
          300: '#b6b18e',
          400: '#a1996e',
          500: '#9a8f65',
          600: '#7d7151',
          700: '#655843',
          800: '#574b3c',
          900: '#4c4237',
          950: '#2b241d',
          DEFAULT: '#9a8f65',
          dark: '#655843'
        },
        sage: {
          50: '#f5f8f7',
          100: '#dee9e7',
          200: '#bdd2ce',
          300: '#94b4ae',
          400: '#6d948e',
          500: '#537974',
          600: '#41605c',
          700: '#374e4c',
          800: '#2f403f',
          900: '#2a3736',
          950: '#151e1e',
          DEFAULT: '#537974',
          dark: '#374e4c'
        }
      }
    }
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')]
}
