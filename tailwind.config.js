const plugin = require('tailwindcss/plugin')

const pt = (pt) => `${pt}pt`

const colors = {
  'blue-gray': {
    100: '#ffffff',
    200: '#78A4C6',
    300: '#608AAB',
    400: '#3D6381',
    500: '#1A3D59',
    600: '#112D43',
    700: '#081E30',
    800: '#00101C',
    900: '#000509',
  },
  'purple': {
    100: '#BB8AE5',
    200: '#9D5CD4',
    500: '#65459A',
    700: '#623B83',
    900: '#2E2145',
  },
}


module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        'status': {
          success: '#50E897',
          warning: '#D8CD37',
          critical: '#DF6D8C',
          special: '#A44FED',
        },
        ...colors,
        'background': Object.keys(colors['blue-gray']).reduce((curr, colork, index) => ({ ...curr, [(index + 1) * 10]: colors['blue-gray'][colork] }), {}),
        'accent-background': Object.keys(colors.purple).reduce((curr, colork, index) => ({ ...curr, [(index + 1) * 10]: colors.purple[colork] }), {})
      },
      fontSize: {
        DEFAULT: pt(10),
      },
      fontWeight: {
        DEFAULT: 500,
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
        '.text-main-title': textConfig(pt(25), 700, theme('colors.white')),
        '.text-section-title': textConfig(pt(12), 700, theme('colors.white')),
        '.text-standard': textConfig(pt(10), 500, theme('colors.white')),
        '.text-vr-accesible': textConfig(pt(14), 500, theme('colors.white')),
        '.text-vr-accesible-bold': textConfig(pt(14), 700, theme('colors.white')),
        '.text-standard-bold': textConfig(pt(10), 700, theme('colors.white')),
      })
    })
  ],
}