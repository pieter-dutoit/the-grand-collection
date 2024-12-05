/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
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
    },
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
      backgroundImage: {
        'custom-gradient':
          'radial-gradient(circle, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 90%)',
        'custom-gradient-mobile':
          'linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.8) 35%, rgba(0, 0, 0, 0) 100%)'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))'
        }
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
