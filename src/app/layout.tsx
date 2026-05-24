import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Abhinav OS - AI Systems Portfolio',
  description:
    'A macOS-inspired AI engineer portfolio with a grounded RAG assistant over Abhinav Singh\'s work.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
