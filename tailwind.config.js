module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}',],
  theme: {
    extend: {
      // Wedding color palette
      // Application strategy: Ivory/Champagne is the dominant airy base,
      // Sage Green is the confident accent (buttons, headings, hairlines, links),
      // Dusty Rose is a sparse warm highlight (tint washes, thin underlines).
      colors: {
        'sage': {
          50: '#eef2f0',
          100: '#dbe1de',
          200: '#b7c4bd',
          300: '#96a9a0',
          400: '#728c7f',
          500: '#587768',
          600: '#4a6b5b',   // base — reserved for CTA fill + small accents
          700: '#3e5a4c',   // hover / inline link
          800: '#32493e',
          900: '#26382f',   // headings + body text on light surfaces
          950: '#1c2923',
        },
        'rose': {
          50: '#faf5f6',   // soft wash behind feature cards
          100: '#f3e6e8',  // subtle tint / hover
          200: '#e7ced0',
          300: '#ddb8bb',  // decorative thin underline / hairline / focus ring
          400: '#d19fa4',
          500: '#c98e93',  // large graphic accent / underline only (not text on white)
          600: '#c4848a',  // base — on dark sage only (never white text)
          700: '#a56f74',
          800: '#855a5e',
          900: '#664548',
          950: '#4a3234',
        },
        'ivory': {
          50: '#f8f5ef',   // page-level background (whitespace-dominant)
          100: '#ede8dc',  // card / section surfaces
          200: '#e0d9c7',  // hairline borders
          300: '#d3cab4',
          400: '#c8c0ad',  // stronger dividers / section dividers
        },
      },
      // Typography scale
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'title': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'title-sm': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
      },
      // Spacing scale
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      // Shadows
      boxShadow: {
        'apple': '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
        'apple-lg': '0 4px 16px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'apple-xl': '0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)',
      },
      // Blur
      backdropBlur: {
        'apple': '20px',
      },
      // Animation
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
