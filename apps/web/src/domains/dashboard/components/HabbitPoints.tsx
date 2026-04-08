import {
  TypographyH3,
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
    <div className="bg-card text-card-foreground border-border mt-5 w-64 rounded-xl border p-4">
      <TypographyH3>Habbit Points</TypographyH3>
      <TypographyP>You have {data} points</TypographyP>
    </div>
  )
}
