const plugin = require('tailwindcss/plugin')

const rem = (px) => `${(px / 12).toFixed(4)}rem`

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        'accent': {
          darker: '#831ECC',
          lighter: '#C06FFB'
        },
        'status': {
          online: '#9AFF76',
          warning: '#FFB257',
          error: '#FF6464'
        },
        'blue-gray': {
          200: '#78A4C6',
          300: '#608AAB',
          400: '#3D6381',
          500: '#1A3D59',
          600: '#112D43',
          700: '#081E30',
          800: '#00101C',
          900: '#000509',
        },
        'background': {
          10: '#02050A',
          20: '#00101C',
          30: '#112D43',
          40: '#051A2A',
          50: '#355C7A',
          60: '#214765',
        },
        'accent-background': {
          10: '#412F4B',
          20: '#A44FED',
          30: "#56407B",
          40: '#703C9C',
          50: '#4C3755',
          60: '#3EB481',
        }
        // 'purple-gray': {
        //   900: "#160B1D",
        //   800: "#261730",
        //   700: "#3F2A4F",
        //   600: "#593E6C",
        //   500: "#6E5084",
        //   400: "#8E6BA7",
        //   300: "#C0A1D8",
        //   200: "#EFE2F9",
        //   100: "#FFFFFF"
        // },
      },
      fontSize: {
        DEFAULT: rem(12),
      },
      fontWeight: {
        DEFAULT: 400,
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function({ addUtilities, theme }) {

      const textConfig = (fontSize, fontWeight, color) => ({
        color,
        fontSize,
        fontWeight
      })

      addUtilities({
        '.text-heading': textConfig(rem(35), 700, theme('colors.white')),
        '.text-secondary-heading': textConfig(rem(25), 700, theme('colors.white')),
        '.text-field-title': textConfig(rem(12), 700, theme('colors.white')),
        '.text-extra-emphasised': textConfig(rem(12), 600, theme('colors.white')),
        '.text-emphasised': textConfig(rem(12), 400, theme('colors.white')),
        '.text-default': textConfig(rem(12), 400, theme('colors.white')),
        '.text-section-indicator': textConfig(rem(12), 700, theme('colors.white'))
      })
    })
  ],
}