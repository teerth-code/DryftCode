/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080809",
        card: "#111113",
        cardBorder: "#222226",
        sidebar: "#0D0D0E",
        brand: {
          orange: "#FF5500",
          orangeGlow: "#FF3300",
          orangeMuted: "#CC4400",
          green: "#00E599",
          yellow: "#FFB800",
          red: "#FF3344",
          dimText: "#888890",
          mutedText: "#A0A0AA",
        }
      },
      fontFamily: {
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
        sans: ['var(--font-inter)', 'sans-serif'],
        script: ['var(--font-script)', 'cursive'],
      },
      boxShadow: {
        'orange-glow': '0 0 25px rgba(255, 85, 0, 0.45)',
        'orange-glow-sm': '0 0 12px rgba(255, 85, 0, 0.3)',
        'green-glow': '0 0 15px rgba(0, 229, 153, 0.3)',
      }
    },
  },
  plugins: [],
}

