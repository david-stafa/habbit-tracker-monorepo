import { createFileRoute, useRouteContext } from '@tanstack/react-router'
import { Button } from '@habbit-tracker/ui/components/button'
import { authClient } from '~/lib/auth'
import { fetchHabbits } from '~/queries/habbits/habbitQueries'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const { user } = useRouteContext({ from: '__root__' })

  const handleSignOut = async () => {
    await authClient.signOut()
    window.location.href = '/login'
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['habbits'],
    queryFn: () => fetchHabbits(user!.id),
  })

  console.log(isPending, isError, data, error)

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
      <p className="mb-4">You are logged in! This is a protected route.</p>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  )
}
