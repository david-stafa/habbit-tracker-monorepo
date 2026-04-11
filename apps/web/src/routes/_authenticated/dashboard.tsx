import { Button } from '@habit-tracker/ui/components/button'
import { ModeToggle } from '@habit-tracker/ui/components/mode-toggle'
import { TypographyH2 } from '@habit-tracker/ui/components/typography'
import {
  createFileRoute,
  useNavigate,
  useRouteContext,
} from '@tanstack/react-router'
import { useState } from 'react'
import { NewHabitDialog } from '~/components/habits/NewHabitDialog'
import { HabitInstancesOverview } from '~/domains/dashboard/components/HabitInstancesOverview'
import { HabitPoints } from '~/domains/dashboard/components/HabitPoints'
// import { HabitsOverview } from '~/domains/dashboard/components/HabitsOverview'
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
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-end gap-1 mb-4">
        <ModeToggle />
        <Button
          onClick={handleSignOut}
          variant="secondary"
          disabled={isLoading}
        >
          {isLoading ? 'Signing out…' : 'Sign Out'}
        </Button>
      </div>
      <div className="flex flex-col md:flex-row h-fit items-start justify-between mb-4">
        <TypographyH2>Welcome, {user?.name}.</TypographyH2>
        <NewHabitDialog />
      </div>
      <div className="flex flex-col items-start gap-2 md:flex-row">
        <HabitInstancesOverview />
        {/* <HabitsOverview /> */}
        <HabitPoints />
      </div>
    </div>
  )
}
