import { prisma } from '@habit-tracker/db'

export const deleteHabitWithInstances = async (
  habitId: string,
  userId: string
) => {
  const habit = await prisma.habit.delete({
    where: { id: habitId, user: { id: userId } },
    select: {
      name: true,
    },
  })
  return habit
}

export const getAllHabitPoints = async (userId: string) => {
  const habits = await prisma.habitInstance.aggregate({
    where: {
      completed: true,
      habit: {
        userId: userId,
      },
    },
    _sum: {
      points: true,
    },
  })

  return habits._sum.points || 0
}
