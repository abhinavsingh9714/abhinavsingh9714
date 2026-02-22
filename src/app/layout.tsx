import type { Metadata } from 'next'
import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/shell/ThemeProvider'

// ── Fonts ─────────────────────────────────────────────────────────────────
// Each font exposes a CSS variable that globals.css reads via var(--font-*).

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

// ── Metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Abhinav Singh — ML Engineer',
  description:
    'Interactive resume with RAG-powered Q&A. Ask about experience, projects, skills, and education.',
}

// ── Layout ────────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Font variable class names are applied to <html> so every CSS var() resolves
  const fontVars = [
    instrumentSerif.variable,
    inter.variable,
    jetbrainsMono.variable,
  ].join(' ')

  return (
    <html lang="en" suppressHydrationWarning className={fontVars}>
      <head>
        {/*
          Flash-prevention: before React hydrates, read the stored preference
          and add the .dark class immediately so the first paint is correct.
          Warm Dark is the default when nothing is stored.
        */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('portfolio-theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (t === 'light') {
                  /* explicit light override — leave class off */
                } else {
                  /* dark by default (Warm Dark), or explicit 'dark' storage, or OS dark */
                  document.documentElement.classList.add('dark');
                }
              } catch(_) {}
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
      </body>
    </html>
  )
}
