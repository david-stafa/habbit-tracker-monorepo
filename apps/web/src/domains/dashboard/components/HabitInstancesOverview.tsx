import { Button } from '@habit-tracker/ui/components/button'
import { TypographyP } from '@habit-tracker/ui/components/typography'
import { ChevronLeftIcon, ChevronRightIcon } from '@habit-tracker/ui/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouteContext } from '@tanstack/react-router'
import { useState } from 'react'
import { SingleHabitUi } from '~/components/habits/SingleHabitUi'
import { trpc } from '~/lib/trpc'
import { postToggleHabitInstanceCompleted } from '~/queries/habits/habitQueries'

export const HabitInstancesOverview = () => {
  const { user } = useRouteContext({ from: '__root__' })
  const [selectedDay, setSelectedDay] = useState<Date>(new Date())
  const queryClient = useQueryClient()

  const { data, isLoading, isSuccess } = useQuery(
    trpc.habit.dailyHabitInstances.queryOptions({
      userId: user!.id,
      day: selectedDay,
    })
  )

  const { mutate: toggleCompleted } = useMutation({
    mutationFn: ({
      completed,
      instanceId,
    }: {
      completed: boolean
      instanceId: string
    }) => postToggleHabitInstanceCompleted(completed, instanceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] })
    },
  })

  const header = (
    <div className="mb-4 flex items-center justify-between gap-2">
      <Button
        variant="secondary"
        onClick={() =>
          setSelectedDay(
            new Date(selectedDay.setDate(selectedDay.getDate() - 1))
          )
        }
        className="rounded-lg"
      >
        <ChevronLeftIcon />
      </Button>
      <TypographyP>
        {selectedDay.toLocaleDateString('en-US', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        })}
      </TypographyP>
      <Button
        variant="secondary"
        onClick={() =>
          setSelectedDay(
            new Date(selectedDay.setDate(selectedDay.getDate() + 1))
          )
        }
        className="rounded-lg"
      >
        <ChevronRightIcon />
      </Button>
    </div>
  )

  if (isLoading) {
    return (
      <div className="bg-card text-card-foreground border-border w-full rounded-xl border p-2 md:w-fit md:p-4">
        {header}
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div className="bg-card text-card-foreground border-border w-full rounded-xl border p-2 md:w-fit md:p-4">
      {header}
      <div className="flex flex-col gap-2">
        {!isSuccess || data?.length === 0 ? (
          <TypographyP className="py-4 text-center">
            No habit instances for this day
          </TypographyP>
        ) : (
          data.map((instance) => (
            <SingleHabitUi
              key={instance.id}
              name={instance.habit.name}
              description={instance.habit.description}
              completed={instance.completed}
              onClick={() =>
                toggleCompleted({
                  completed: instance.completed,
                  instanceId: instance.id,
                })
              }
            />
          ))
        )}
      </div>
    </div>
  )
}
