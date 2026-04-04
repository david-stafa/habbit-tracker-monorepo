import z from 'zod'
import { publicProcedure, router } from '../_context'
import { getHabbits } from './methods/getHabbits'

export const habbitRouter = router({
  getHabbits: publicProcedure.input(z.void()).query(async () => {
    return await getHabbits()
  }),
})
