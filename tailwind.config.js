module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Raleway', 'sans-serif'],
    },
    colors: {
      white: 'hsl(0, 0%, 100%)',
      gray: {
        100: 'hsl(185, 5%, 95%)',
        300: 'hsl(190, 5%, 80%)',
        500: 'hsl(196, 4%, 60%)',
        700: 'hsl(220, 5%, 40%)',
        900: 'hsl(220, 3%, 20%)',
      },
      primary: 'hsl(340, 65%, 47%)',
      secondary: 'hsl(240, 60%, 63%)',
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')],
}
