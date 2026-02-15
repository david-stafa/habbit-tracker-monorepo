import { Button } from '@habbit-tracker/ui/components/button'
import { useQuery } from '@tanstack/react-query'
import {
  createFileRoute,
  useNavigate,
  useRouteContext,
} from '@tanstack/react-router'
import { signOut } from '~/lib/auth'
import { fetchHabbits } from '~/queries/habbits/habbitQueries'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const navigate = useNavigate()
  const { user } = useRouteContext({ from: '__root__' })

  const handleSignOut = async () => {
    const result = await signOut()
    if (result.success) {
      navigate({ to: '/dashboard' })
    } else {
      console.error(result.error.message)
    }
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
