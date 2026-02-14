/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        body: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#0f9df8",
        background: "#020e2b",
        surface: "#041633",
        card: "#051a3a",
        navbg: "rgba(2, 14, 43, 0.9)",
        border: "rgba(15, 157, 248, 0.12)",
        muted: "#8899b0",
      },
      fontSize: {
        'display-lg': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-sm': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading': ['1.75rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '500' }],
        'subheading': ['1.125rem', { lineHeight: '1.5', fontWeight: '500' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', fontWeight: '300' }],
        'body': ['1rem', { lineHeight: '1.7', fontWeight: '300' }],
        'caption': ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],
        'overline': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.12em', fontWeight: '500' }],
      },
      spacing: {
        'section': '8rem',
        'section-sm': '5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(ellipse at 50% 0%, rgba(15, 157, 248, 0.08) 0%, transparent 60%)',
        'gradient-subtle': 'linear-gradient(180deg, rgba(15, 157, 248, 0.03) 0%, transparent 100%)',
      },
    },
  },
  plugins: [],
}
