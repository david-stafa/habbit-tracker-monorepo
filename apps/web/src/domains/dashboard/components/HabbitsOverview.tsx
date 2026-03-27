import { Checkbox } from '@habbit-tracker/ui/components/checkbox'
import {
  TypographyH3,
  TypographyP,
} from '@habbit-tracker/ui/components/typography'
import { XIcon } from '@habbit-tracker/ui/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouteContext } from '@tanstack/react-router'
import {
  deleteHabbitQuery,
  getHabbitsQuery,
} from '~/queries/habbits/habbitQueries'

export const HabbitsOverview = () => {
  const { user } = useRouteContext({ from: '__root__' })
  const queryClient = useQueryClient()

  const { isPending, data } = useQuery({
    queryKey: ['habbits', 'dailyInstances', user?.id],
    queryFn: () => getHabbitsQuery(user!.id),
  })

  const { mutate: deleteHabbit } = useMutation({
    mutationFn: (habbitId: string) => deleteHabbitQuery(habbitId, user!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habbits'] }) // refetch list
    },
  })

  if (isPending) return <HabbitOverviwSkeleton />

  return (
    <div className="bg-card text-card-foreground border-border mt-5 w-64 rounded-xl border p-4">
      <TypographyH3 className="mb-2">Habbits overview:</TypographyH3>
      {data?.map((habbit) => (
        <div
          className="flex items-center justify-between gap-1"
          key={habbit.id}
        >
          <TypographyP>{habbit.name}</TypographyP>
          <div className="flex items-center gap-2">
            <Checkbox />
            <XIcon
              onClick={() => deleteHabbit(habbit.id)}
              className="text-destructive hover:opacity-80"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

const HabbitOverviwSkeleton = () => {
  return (
    <div className="mt-5 h-60 w-40 animate-pulse rounded-xl bg-slate-500" />
  )
}
