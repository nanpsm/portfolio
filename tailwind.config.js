/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#B4E650', foreground: '#1E3B45' },
        card:    { DEFAULT: '#F5F8ED', foreground: '#1C1814' },
        secondary: { DEFAULT: 'rgba(30,59,69,0.08)', foreground: '#1E3B45' },
        muted:   { DEFAULT: '#EDE8DE', foreground: '#8A8074' },
      },
    },
  },
  plugins: [],
}

