import { prisma } from '@habit-tracker/db'

export const getDailyHabitInstances = async ({
  userId,
  day,
}: {
  userId: string
  day: Date
}) => {
  const startOfDay = new Date(day)
  startOfDay.setHours(0, 0, 0)

  const endOfDay = new Date(day)
  endOfDay.setHours(23, 59, 59)

  const habitInstances = await prisma.habitInstance.findMany({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
      habit: {
        userId,
      },
    },
    select: {
      id: true,
      completed: true,
      date: true,
      habit: {
        select: {
          name: true,
          description: true,
        },
      },
    },
    orderBy: {
      date: 'asc',
    },
  })

  return habitInstances
}
