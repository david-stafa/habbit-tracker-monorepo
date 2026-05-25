import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location, context }) => {
    if (!context.user) {
      throw redirect({
        to: '/',
        search: {
          redirect: location.href,
        },
      })
    }
    return {
      user: context.user,
    }
  },
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  return (
    <>
      <Outlet />
    </>
  )
}
