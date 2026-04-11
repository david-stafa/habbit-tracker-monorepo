import { prisma } from '@habit-tracker/db'

export const getHabits = async () => {
  const habits = await prisma.habit.findMany({
    where: {},
    select: {
      id: true,
      name: true,
      // habitInstances: { select: { date: true, completed: true } },
    },
  })
  return habits
}