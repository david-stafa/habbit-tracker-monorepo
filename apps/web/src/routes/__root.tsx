import { authClient } from '@habbit-tracker/auth/client'
import { ThemeProvider } from '@habbit-tracker/ui/components/theme-provider'
import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  beforeLoad: async () => {
    const { data } = await authClient.getSession()

    return {
      session: data?.session || null,
      user: data?.user || null,
    }
  },
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
