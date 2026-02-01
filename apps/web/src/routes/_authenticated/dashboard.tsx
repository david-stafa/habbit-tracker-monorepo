import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@habbit-tracker/ui/components/button'
import { authClient } from '@habbit-tracker/auth/client'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const handleSignOut = async () => {
    await authClient.signOut()
    window.location.href = '/login'
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-4">You are logged in! This is a protected route.</p>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  )
}
