import { prisma } from '@habbit-tracker/db'

export const getHabbits = async () => {
  const habbits = await prisma.habbit.findMany({
    where: {},
    select: {
      id: true,
      name: true,
      // habbitInstances: { select: { date: true, completed: true } },
    },
  })
  return habbits
}