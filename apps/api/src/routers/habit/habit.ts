import z from 'zod'
import { publicProcedure, router } from '../_context'
import { getHabits } from './methods/getHabits'

export const habitRouter = router({
  getHabits: publicProcedure.input(z.void()).query(async () => {
    return await getHabits()
  }),
})
