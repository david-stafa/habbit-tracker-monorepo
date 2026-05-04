import { Button } from '@habit-tracker/ui/components/button'
import { TypographyP } from '@habit-tracker/ui/components/typography'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SmileIcon,
} from '@habit-tracker/ui/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouteContext } from '@tanstack/react-router'
import { useState } from 'react'
import { SingleHabitUi } from '~/components/habits/SingleHabitUi'
import { trpc } from '~/lib/trpc'
import dayjs from 'dayjs'
import { EditHabitDialog } from '~/components/habits/EditHabitDialog'

export const HabitInstancesOverview = () => {
  const { user } = useRouteContext({ from: '__root__' })
  const [selectedDay, setSelectedDay] = useState(dayjs())
  const queryClient = useQueryClient()

  const { data, isLoading, isSuccess } = useQuery(
    trpc.habit.getTodayHabits.queryOptions({
      userId: user!.id,
      day: selectedDay.toISOString(),
    })
  )

  const { mutate: upsertHabitInstance } = useMutation(
    trpc.habit.upsertHabitInstance.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.habit.getTodayHabits.queryKey({
            userId: user!.id,
            day: selectedDay.toISOString(),
          }),
        })
      },
    })
  )

  const header = (
    <div className="mb-4 flex items-center justify-between gap-2">
      <Button
        variant="secondary"
        onClick={() => {
          setSelectedDay((prev) => prev.subtract(1, 'day'))
        }}
        className="rounded-lg"
      >
        <ChevronLeftIcon />
      </Button>
      <TypographyP>{selectedDay.format('dddd, D.M.')}</TypographyP>
      <Button
        variant="secondary"
        onClick={() => {
          setSelectedDay((prev) => prev.add(1, 'day'))
        }}
        className="rounded-lg"
      >
        <ChevronRightIcon />
      </Button>
    </div>
  )

  if (isLoading) {
    return (
      <div className="bg-card text-card-foreground border-border w-full rounded-xl border p-2 md:w-80 md:p-4">
        {header}
        <HabitSkeleton />
      </div>
    )
  }

  return (
    <div className="bg-card text-card-foreground border-border w-full rounded-xl border p-2 md:w-80 md:p-4">
      {header}
      <div className="flex flex-col gap-2">
        {!isSuccess || data?.length === 0 ? (
          <div className="bg-muted border-border flex h-14 w-full min-w-40 items-center justify-center rounded-xl border">
            Take a break and enjoy your day!
            <SmileIcon className="ml-2 size-4" />
          </div>
        ) : (
          data.map((habit) => (
            <div
              className="flex items-center justify-between gap-1"
              key={habit.id}
            >
              <SingleHabitUi
                name={habit.name}
                description={habit.description}
                completed={habit.habitInstances[0]?.completed ?? false}
                onClick={() =>
                  upsertHabitInstance({
                    habitId: habit.id,
                    userId: user!.id,
                    date: selectedDay.format('YYYY-MM-DD'),
                    completed: habit.habitInstances[0]?.completed
                      ? false
                      : true,
                    points: habit.points,
                  })
                }
              />
              <EditHabitDialog habit={habit} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

const HabitSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-muted border-border h-14 w-full min-w-40 animate-pulse rounded-xl border" />
      <div className="bg-muted border-border h-14 w-full min-w-40 animate-pulse rounded-xl border" />
      <div className="bg-muted border-border h-14 w-full min-w-40 animate-pulse rounded-xl border" />
      <div className="bg-muted border-border h-14 w-full min-w-40 animate-pulse rounded-xl border" />
    </div>
  )
}
