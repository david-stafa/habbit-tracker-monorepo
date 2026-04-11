import { ThemeProvider } from '@habit-tracker/ui/components/theme-provider'
import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router'
import { authClient } from '~/lib/auth'

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
      <div>
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
