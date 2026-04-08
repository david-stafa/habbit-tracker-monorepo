import { Button } from '@habbit-tracker/ui/components/button'
import { ModeToggle } from '@habbit-tracker/ui/components/mode-toggle'
import { TypographyH2 } from '@habbit-tracker/ui/components/typography'
import {
  createFileRoute,
  useNavigate,
  useRouteContext,
} from '@tanstack/react-router'
import { useState } from 'react'
import { NewHabbitDialog } from '~/components/habbits/NewHabbitDialog'
import { HabbitInstancesOverview } from '~/domains/dashboard/components/HabbitInstancesOverview'
import { HabbitPoints } from '~/domains/dashboard/components/HabbitPoints'
import { HabbitsOverview } from '~/domains/dashboard/components/HabbitsOverview'
import { authClient } from '~/lib/auth'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const navigate = useNavigate()
  const { user } = useRouteContext({ from: '__root__' })
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onRequest: () => setIsLoading(true),
        onSuccess: () => {
          setIsLoading(false)
          navigate({ to: '/' })
        },
        onError: (ctx) => {
          setIsLoading(false)
          console.error(ctx.error.message)
        },
      },
    })
  }

  return (
    <div className="p-8">
      <div className="flex h-fit items-start justify-between">
        <TypographyH2>Welcome, {user?.name}.</TypographyH2>
        <div className="flex items-center justify-center gap-1">
          <ModeToggle />
          <Button
            onClick={handleSignOut}
            variant="secondary"
            disabled={isLoading}
          >
            {isLoading ? 'Signing out…' : 'Sign Out'}
          </Button>
        </div>
      </div>
      <NewHabbitDialog />
      <div className="flex items-start gap-2">
        <HabbitInstancesOverview />
        <HabbitsOverview />
        <HabbitPoints />
      </div>
    </div>
  )
}
