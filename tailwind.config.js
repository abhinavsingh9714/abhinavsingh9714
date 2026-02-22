/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:             'var(--bg)',
        workspace:      'var(--workspace)',
        surface:        'var(--surface)',
        'surface-2':    'var(--surface-2)',
        'surface-3':    'var(--surface-3)',
        border:         'var(--border)',
        'border-subtle':'var(--border-subtle)',
        text:           'var(--text)',
        'text-muted':   'var(--text-muted)',
        'text-subtle':  'var(--text-subtle)',
        primary:        'var(--primary)',
        'primary-weak': 'var(--primary-weak)',
        accent:         'var(--accent)',
        'accent-weak':  'var(--accent-weak)',
        success:        'var(--success)',
        error:          'var(--error)',
      },
      fontFamily: {
        // Tailwind `font-heading`, `font-sans`, `font-mono` utilities
        heading: ['var(--font-heading)'],
        sans:    ['var(--font-sans)',    'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)',    'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sm:   'var(--radius-sm)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        pill: 'var(--radius-pill)',
      },
    },
  },
  plugins: [],
}
