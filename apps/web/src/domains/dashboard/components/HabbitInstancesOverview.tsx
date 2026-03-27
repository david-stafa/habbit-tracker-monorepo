import { Button } from '@habbit-tracker/ui/components/button'
import { TypographyH3 } from '@habbit-tracker/ui/components/typography'
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

  const { isPending, data } = useQuery({
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

  // if (isPending) return <HabbitOverviwSkeleton />  

  return (
    <div className="bg-card text-card-foreground border-border mt-5 w-fit rounded-xl border p-4">
      <div className="flex items-center gap-2">
        <Button onClick={() => setSelectedDay(new Date(selectedDay.setDate(selectedDay.getDate() - 1)))}>Yesterday</Button>
        <Button onClick={() => setSelectedDay(new Date())}>Today</Button>
        <Button onClick={() => setSelectedDay(new Date(selectedDay.setDate(selectedDay.getDate() + 1)))}>Tomorrow</Button>
      </div>
      <TypographyH3 className="mb-2">Todays habbits:</TypographyH3>
      <div className="flex flex-col gap-2">
        {data?.map((instance) => (
          <SingleHabbitUi
            key={instance.id}
            name={instance.habbit.name}
            completed={instance.completed}
            onClick={() =>
              toggleCompleted({
                completed: instance.completed,
                instanceId: instance.id,
              })
            }
          />
        ))}
      </div>
    </div>
  )
}

const HabbitOverviwSkeleton = () => {
  return (
    <div className="mt-5 h-60 w-40 animate-pulse rounded-xl bg-slate-500" />
  )
}
