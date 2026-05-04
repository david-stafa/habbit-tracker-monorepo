import { prisma } from '@habit-tracker/db'
import type { UpdateHabitInput } from '../schemas/schemas'

export const updateHabit = async ({ id, ...data }: UpdateHabitInput) => {
  const habit = await prisma.habit.findUnique({
    where: { id, userId: data.userId },
  })

  if (!habit) {
    throw new Error('Habit not found')
  }

  return await prisma.habit.update({
    where: { id, userId: data.userId },
    data,
  })
}
