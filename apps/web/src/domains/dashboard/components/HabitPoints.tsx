import {
  TypographyH4,
  TypographyP,
} from '@habit-tracker/ui/components/typography'
import { useQuery } from '@tanstack/react-query'
import { useRouteContext } from '@tanstack/react-router'
import { getAllHabitPointsQuery } from '~/queries/habits/habitQueries'

export const HabitPoints = () => {
  const { user } = useRouteContext({ from: '__root__' })

  const { isPending, isError, data } = useQuery({
    queryKey: ['habits', 'allHabitPoints', user?.id],
    queryFn: () => getAllHabitPointsQuery(user!.id),
  })

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Something went wrong</div>

  return (
    <div className="bg-card text-card-foreground border-border w-full rounded-xl border p-4 md:w-64">
      <TypographyH4>Habit Points</TypographyH4>
      <TypographyP>
        You have {data} point{data === 1 ? '' : 's'}
      </TypographyP>
    </div>
  )
}
