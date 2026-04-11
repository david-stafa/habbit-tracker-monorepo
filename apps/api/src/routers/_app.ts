import { publicProcedure, router } from './_context'
import { habitRouter } from './habit/habit'

export const appRouter = router({
  habit: habitRouter,
  greeting: publicProcedure.query(() => 'hello tRPC v11!'),
})

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter