import { useState } from 'react'
import { Layout } from '@/components/Layout'
import { HomePage } from '@/pages/HomePage'
import { useTheme } from '@/lib/useTheme'

export default function App() {
  const [engineerView, setEngineerView] = useState(false)
  const { theme, toggleTheme } = useTheme()
  return (
    <Layout engineerView={engineerView} onEngineerViewChange={setEngineerView} theme={theme} onThemeToggle={toggleTheme}>
      <HomePage engineerView={engineerView} />
    </Layout>
  )
}
