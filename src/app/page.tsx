import { AppShell }   from '@/components/shell/AppShell'
import { LeftPanel }   from '@/components/left/LeftPanel'
import { CenterPanel } from '@/components/center/CenterPanel'
import { RightPanel }  from '@/components/right/RightPanel'

export default function HomePage() {
  const leftSidebar = <LeftPanel layout="sidebar" />
  const leftTopbar  = <LeftPanel layout="topbar" />

  return (
    <AppShell
      left={leftSidebar}
      leftTopbar={leftTopbar}
      center={<CenterPanel />}
      right={<RightPanel />}
    />
  )
}
