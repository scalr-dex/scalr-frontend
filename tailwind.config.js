/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./index.html', './src/**/!(tailwind).{ts,tsx}'],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    fontFamily: {
      sans: ['SF Pro Rounded', 'sans'],
      accent: ['-apple-system, BlinkMacSystemFont'],
    },
    extend: {
      boxShadow: {
        super:
          '0px 15px 40px 0px #00000066, 0px 5px 10px 0px #00000033, 0px 0px 0px 1px #0000001a;',
      },
      screens: {
        se: '375px',
      },
      inset: {
        'safe-bottom': 'var(--safe-area-inset-bottom)',
      },
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
        success: '#23CFB2',
        error: '#F3617D',

        'white-16': '#ffffff16',
      },
    },
  },
}
