import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => <div>404 Not Found</div>,
})

function RootLayout() {
  return (
    <>
      <header>My App</header>
      <Outlet />
    </>
  )
}