import { Checkbox } from '@habit-tracker/ui/components/checkbox'
import {
  TypographyH3,
  TypographyP,
} from '@habit-tracker/ui/components/typography'
import { XIcon } from '@habit-tracker/ui/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouteContext } from '@tanstack/react-router'
import {
  deleteHabitQuery,
  getHabitsQuery,
} from '~/queries/habits/habitQueries'

export const HabitsOverview = () => {
  const { user } = useRouteContext({ from: '/_authenticated' })
  const queryClient = useQueryClient()

  const { isPending, data } = useQuery({
    queryKey: ['habits', 'dailyInstances', user.id],
    queryFn: () => getHabitsQuery(user.id),
  })

  const { mutate: deleteHabit } = useMutation({
    mutationFn: (habitId: string) => deleteHabitQuery(habitId, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] }) // refetch list
    },
  })

  if (isPending) return <HabitOverviewSkeleton />

  return (
    <div className="bg-card text-card-foreground border-border mt-5 w-full rounded-xl border p-2 md:p-4 md:w-64">
      <TypographyH3 className="mb-2">Habits overview:</TypographyH3>
      {data?.map((habit) => (
        <div
          className="flex items-center justify-between gap-1"
          key={habit.id}
        >
          <TypographyP>{habit.name}</TypographyP>
          <div className="flex items-center gap-2">
            <Checkbox />
            <XIcon
              onClick={() => deleteHabit(habit.id)}
              className="text-destructive hover:opacity-80"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

const HabitOverviewSkeleton = () => {
  return (
    <div className="mt-5 h-60 w-40 animate-pulse rounded-xl bg-slate-500" />
  )
}
