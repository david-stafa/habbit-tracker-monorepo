import { publicProcedure, router } from './_context'
import { habbitRouter } from './habbit/habbit'

export const appRouter = router({
  habbit: habbitRouter,
  greeting: publicProcedure.query(() => 'hello tRPC v11!'),
})

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter