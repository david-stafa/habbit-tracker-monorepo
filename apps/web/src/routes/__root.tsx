import { ThemeProvider } from '@habbit-tracker/ui/components/theme-provider'
import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => <div>404 Not Found</div>,
})

function RootLayout() {
  return (
    <Wrapper>
      <div className="max-w-3xl">
        <header>My App</header>
        <Outlet />
      </div>
    </Wrapper>
  )
}

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <>
    <HeadContent />
    <ThemeProvider>
      {children}
      {/* <TanStackRouterDevtools />
      <ReactQueryDevtools /> */}
    </ThemeProvider>
  </>
)
