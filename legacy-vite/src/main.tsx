import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const stored = localStorage.getItem('portfolio-theme')
const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
if (stored === 'dark' || (!stored && prefersDark)) document.documentElement.classList.add('dark')
else document.documentElement.classList.remove('dark')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
