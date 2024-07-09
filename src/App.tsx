import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppShell, Title } from '@mantine/core'
import { Instructions } from './components'
import Spotlight from './components/Spotlight'

export const App = () => {

  return (
    <Router>
      <AppShell
        padding="md"
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 'sm' }}
      >
        <Spotlight/>
        <AppShell.Header bg="dark.5" p="md">
          <Title order={3} c="white">Recovr Frontend Technical Test</Title>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          Navbar
        </AppShell.Navbar>
        <AppShell.Main bg="gray.1">
          <Routes>
            <Route path="/*" element={<Instructions />} />
          </Routes>
        </AppShell.Main>
      </AppShell>
    </Router>
  )
}
