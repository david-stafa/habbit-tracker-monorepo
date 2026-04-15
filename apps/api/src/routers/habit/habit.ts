import z from 'zod'
import { publicProcedure, router } from '../_context'
import { getHabits } from './methods/getHabits'
import { getDailyHabitInstances } from './methods/getDailyHabitInstances'

export const habitRouter = router({
  getHabits: publicProcedure.input(z.void()).query(async () => {
    return await getHabits()
  }),
  dailyHabitInstances: publicProcedure
    .input(z.object({ userId: z.string(), day: z.coerce.date() }))
    .query(async ({ input }) => {
      return await getDailyHabitInstances(input)
    }),
})
