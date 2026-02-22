/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        micro: ['var(--fs-xs)', { lineHeight: '1.35' }],
        'micro-tight': ['0.6875rem', { lineHeight: '1.3' }],
        small: ['var(--fs-sm)', { lineHeight: '1.45' }],
        base: ['var(--fs-base)', { lineHeight: '1.5' }],
        title: ['var(--fs-title)', { lineHeight: '1.3' }],
        'title-lg': ['1.25rem', { lineHeight: '1.25' }],
        header: ['var(--fs-h1)', { lineHeight: '1.25' }],
        'fs-xs': ['var(--fs-xs)', { lineHeight: '1.35' }],
        'fs-sm': ['var(--fs-sm)', { lineHeight: '1.45' }],
        'fs-base': ['var(--fs-base)', { lineHeight: '1.5' }],
        'fs-title': ['var(--fs-title)', { lineHeight: '1.25' }],
        'fs-h1': ['var(--fs-h1)', { lineHeight: '1.25' }],
      },
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary)',
          muted: 'var(--primary-weak)',
        },
        background: 'var(--bg)',
        card: 'var(--surface)',
        border: {
          DEFAULT: 'var(--border)',
          subtle: 'var(--border)',
        },
        surface: 'var(--surface)',
        muted: 'var(--text-muted)',
        body: 'var(--text-subtle)',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
      },
      borderRadius: {
        card: 'var(--radius-md)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        pill: 'var(--radius-pill)',
      },
      fontWeight: {
        heading: '600',
        'heading-bold': '700',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}
