/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        kangqore: {
          blue: '#2564ea',
          cyan: '#4ab6d4',
          indigo: '#1d4ed8',
          dark: '#0a0f1d',
          card: '#0f172a',
          surface: '#1e293b',
          border: '#334155'
        }
      },
      backgroundImage: {
        'kangqore-gradient': 'linear-gradient(135deg, #2564ea 0%, #4ab6d4 100%)',
        'kangqore-glow': 'radial-gradient(circle at 50% 50%, rgba(37, 100, 234, 0.15) 0%, transparent 70%)',
      }
    },
  },
  plugins: [],
}
