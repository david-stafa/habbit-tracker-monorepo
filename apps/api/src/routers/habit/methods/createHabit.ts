import { prisma } from '@habit-tracker/db'
import type { CreateHabitInput } from '../schemas/schemas'

export const createHabit = async (input: CreateHabitInput) => {
  await prisma.habit.create({
    data: {
      name: input.name,
      userId: input.userId,
      points: input.points,
      description: input.description,
      scheduleDays: input.scheduleDays,
    },
  })

  return true
}
