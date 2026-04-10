import {
  TypographyH4,
  TypographyP,
} from '@habbit-tracker/ui/components/typography'
import { useQuery } from '@tanstack/react-query'
import { useRouteContext } from '@tanstack/react-router'
import { getAllHabbitPointsQuery } from '~/queries/habbits/habbitQueries'

export const HabbitPoints = () => {
  const { user } = useRouteContext({ from: '__root__' })

  const { isPending, isError, data } = useQuery({
    queryKey: ['habbits', 'allHabbitPoints', user?.id],
    queryFn: () => getAllHabbitPointsQuery(user!.id),
  })

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Something went wrong</div>

  return (
    <div className="bg-card text-card-foreground border-border w-full rounded-xl border p-4 md:w-64">
      <TypographyH4>Habbit Points</TypographyH4>
      <TypographyP>
        You have {data} point{data === 1 ? '' : 's'}
      </TypographyP>
    </div>
  )
}
