import { Button } from '@habbit-tracker/ui/components/button'
import { ModeToggle } from '@habbit-tracker/ui/components/mode-toggle'
import { ThemeProvider } from '@habbit-tracker/ui/components/theme-provider'



function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="bg-background min-h-screen">
        <h1>My App</h1>
        <Button>Hello</Button>
        <ModeToggle />
      </div>
    </ThemeProvider>
  )
}

export default App
