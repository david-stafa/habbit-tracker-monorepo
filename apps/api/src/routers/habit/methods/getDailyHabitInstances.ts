import { prisma, Weekday } from '@habit-tracker/db'
import dayjs from 'dayjs'

export const getDailyHabitInstances = async ({
  userId,
  day,
}: {
  userId: string
  day: Date
}) => {
  const dayOfWeek = dayjs(day).format('dddd') as Weekday

  const habits = await prisma.habit.findMany({
    where: {
      scheduleDays: {
        hasSome: ['everyDay', dayOfWeek],
      },
      userId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      points: true,
      scheduleDays: true,
      habitInstances: {
        take: 1,
        where: {
          date: {
            gte: dayjs(day).startOf('day').toDate(),
            lte: dayjs(day).endOf('day').toDate(),
          },
        },
        select: {
          completed: true,
        },
      },
    },
  })

  return habits
}
