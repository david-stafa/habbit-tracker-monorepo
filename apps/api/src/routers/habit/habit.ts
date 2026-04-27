import z from 'zod'
import { publicProcedure, router } from '../_context'
import { getHabits } from './methods/getHabits'
import { getDailyHabitInstances } from './methods/getDailyHabitInstances'
import { createHabit } from './methods/createHabit'
import { createHabitInstanceSchema, createHabitSchema } from './schemas/schemas'
import { createHabitInstance } from './methods/createHabitInstance'

export const habitRouter = router({
  getHabits: publicProcedure.input(z.void()).query(async () => {
    return await getHabits()
  }),
  getTodayHabits: publicProcedure
    .input(z.object({ userId: z.string(), day: z.coerce.date<string>() }))
    .query(async ({ input }) => {
      return await getDailyHabitInstances(input)
    }),
  createHabit: publicProcedure
    .input(createHabitSchema)
    .mutation(async ({ input }) => {
      return await createHabit(input)
    }),
  upsertHabitInstance: publicProcedure
    .input(createHabitInstanceSchema)
    .mutation(async ({ input }) => {
      return await createHabitInstance(input)
    }),
})
