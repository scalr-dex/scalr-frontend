/** @type {import('tailwindcss/defaultConfig')} */
module.exports = {
  content: ['./index.html', './src/**/!(tailwind).{ts,tsx}'],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],

  theme: {
    fontFamily: {
      sans: ['SF Pro Rounded', 'sans'],
      accent: ['SF Pro', 'sans'],
    },
    extend: {
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        hovering: {
          '0%, 100%': { transform: 'translateY(0rem)' },
          '50%': { transform: 'translateY(0.5rem)' },
        },
        hanging: {
          '0%, 100%': { transform: 'rotate(0)' },
          '50%': { transform: 'rotate(15deg)' },
        },
      },
      animation: {
        hovering: 'hovering 4s ease-in-out infinite',
        hanging: 'hanging 8s ease-in-out infinite',
      },
      fontSize: {
        '4.5xl': ['2.5rem', { lineHeight: '3rem' }],
      },
      spacing: {
        '1/10': '10%',
        '1/7': '15%',
        '1/5': '20%',
      },
      boxShadow: {
        super:
          '0px 15px 40px 0px #00000066, 0px 5px 10px 0px #00000033, 0px 0px 0px 1px #0000001a',
        onboarding: '0px 16px 32px -8px #0C0C0D66',
      },
      screens: {
        se: '375px',
      },
      inset: {
        'safe-bottom': 'var(--safe-area-bottom)',
      },
      background: {
        'border-gradient':
          'linear-gradient(white, white) padding-box, linear-gradient(to right, darkblue, darkorchid) border-box',
      },
      margin: { 'safe-bottom': 'var(--safe-area-bottom)' },
      colors: {
        primary: '#0E121B',
        secondary: '#171D26',
        tertiary: '#1D232F',

        'controls-tertiary': '#2E3442',
        'controls-tertiary-hover': '#3E4149',
        'controls-tertiary-focus': '#727B89',
        'controls-tertiary-disabled': '#2B343F',

        accent: '#4374EC',
        'accent-hover': '#6D9EFC',
        'accent-focus': '#427AE4',
        'accent-disabled': '#345FB2',
        'accent-dimmed': '#B1C9F7',
        success: '#23CFB2',
        'success-light': '#CBECDE',
        'success-alt': '#E5FCB4',
        error: '#F3617D',

        'white-16': '#ffffff16',
        skelton: '#DDDDDD60',
      },
    },
  },
}
