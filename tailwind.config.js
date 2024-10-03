/** @type {import('tailwindcss/defaultConfig')} */
module.exports = {
  content: ['./index.html', './src/**/!(tailwind).{ts,tsx}'],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  future: { hoverOnlyWhenSupported: true },

  theme: {
    fontFamily: {
      sans: ['SF Pro Rounded', 'sans-serif'],
      accent: ['Inter', 'sans-serif'],
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
        spin: {
          from: { transform: 'rotate(0)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        hovering: 'hovering 4s ease-in-out infinite',
        spin: 'spin 5s linear forwards infinite',
      },
      fontSize: {
        xxs: '0.625rem',
        '4.5xl': ['2.5rem', { lineHeight: '3rem' }],
      },
      spacing: {
        '1/10': '10%',
        '1/7': '15%',
        '1/5': '20%',
        'safe-bottom': 'var(--safe-area-bottom)',
        'safe-top': 'var(--safe-area-top)',
        'footer-height': 'var(--footer-height)',
      },
      boxShadow: {
        super:
          '0px 15px 40px 0px #00000066, 0px 5px 10px 0px #00000033, 0px 0px 0px 1px #0000001a',
        onboarding: '0px 16px 32px -8px #0C0C0D66',
        accent: '0 0 6px 2px #4374EC',
      },
      dropShadow: {
        'glow-accent': '0 0 0.125rem #4374EC',
      },
      screens: {
        se: '375px',
      },
      inset: {
        'safe-bottom': 'var(--safe-area-bottom)',
        'footer-height': 'var(--footer-height)',
      },
      background: {
        'border-gradient':
          'linear-gradient(white, white) padding-box, linear-gradient(to right, darkblue, darkorchid) border-box',
      },
      margin: { 1.5: '1.5px', 'safe-bottom': 'var(--safe-area-bottom)' },
      borderWidth: {
        1.5: '1.5px',
      },
      colors: {
        primary: '#0E121B',
        secondary: '#171D26',
        tertiary: '#1D232F',

        'controls-secondary-disabled': '#ffffff64',

        'controls-tertiary': '#2E3442',
        'controls-tertiary-hover': '#3E4149',
        'controls-tertiary-focus': '#727B89',
        'controls-tertiary-disabled': '#2B343F',

        accent: '#4374EC',
        'accent-hover': '#6D9EFC',
        'accent-focus': '#427AE4',
        'accent-disabled': '#345FB2',
        'accent-dimmed': '#B1C9F7',
        'accent-dark': '#8160e1',
        success: '#23CFB2',
        'success-light': '#CBECDE',
        'success-alt': '#E5FCB4',
        'success-dark': '#128873',
        'success-focus': '#1CA68E',
        error: '#F3617D',

        alt: '#FFE792',

        'white-16': '#ffffff16',
        skelton: '#DDDDDD60',
        'metal-gray': '#555555',
      },
    },
  },
}
