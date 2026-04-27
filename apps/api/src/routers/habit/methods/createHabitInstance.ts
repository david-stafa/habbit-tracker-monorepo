import { prisma } from '@habit-tracker/db'
import { CreateHabitInstanceInput } from '../schemas/schemas'

export const createHabitInstance = async (input: CreateHabitInstanceInput) => {
  await prisma.habitInstance.upsert({
    where: {
      habitId_date: {
        habitId: input.habitId,
        date: input.date,
      },
    },
    update: {
      completed: input.completed,
    },
    create: {
      habitId: input.habitId,
      userId: input.userId,
      date: input.date,
      points: input.points,
      completed: input.completed,
    },
  })

  return true
}
