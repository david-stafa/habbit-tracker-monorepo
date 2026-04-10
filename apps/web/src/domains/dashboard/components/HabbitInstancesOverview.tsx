import { Button } from '@habbit-tracker/ui/components/button'
import { TypographyP } from '@habbit-tracker/ui/components/typography'
import { ChevronLeftIcon, ChevronRightIcon } from '@habbit-tracker/ui/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouteContext } from '@tanstack/react-router'
import { useState } from 'react'
import { SingleHabbitUi } from '~/components/habbits/SingleHabbitUi'
import {
  getDailyHabbitInstancesQuery,
  postToggleHabbitInstanceCompleted,
} from '~/queries/habbits/habbitQueries'

export const HabbitInstancesOverview = () => {
  const { user } = useRouteContext({ from: '__root__' })
  const [selectedDay, setSelectedDay] = useState<Date>(new Date())
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['habbits', user?.id, selectedDay],
    queryFn: () => getDailyHabbitInstancesQuery(user!.id, selectedDay),
  })

  const { mutate: toggleCompleted } = useMutation({
    mutationFn: ({
      completed,
      instanceId,
    }: {
      completed: boolean
      instanceId: string
    }) => postToggleHabbitInstanceCompleted(completed, instanceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habbits'] })
    },
  })

  return (
    <div className="bg-card text-card-foreground border-border mt-5 w-full rounded-xl border p-2 md:w-fit md:p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
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
      <div className="flex flex-col gap-2">
        {data?.map((instance) => (
          <SingleHabbitUi
            key={instance.id}
            name={instance.habbit.name}
            description={instance.habbit.description}
            completed={instance.completed}
            onClick={() =>
              toggleCompleted({
                completed: instance.completed,
                instanceId: instance.id,
              })
            }
          />
        ))}
        {data?.length === 0 && (
          <TypographyP className="py-4 text-center">
            No habbit instances for this day
          </TypographyP>
        )}
      </div>
    </div>
  )
}
