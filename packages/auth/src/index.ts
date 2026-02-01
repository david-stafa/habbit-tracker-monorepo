import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from '@habbit-tracker/db'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [process.env.BASE_URL as string],
})

// Export types for use in client and server
export type Session = typeof auth.$Infer.Session

// TODO: Check with Béďos if this is the correct way to export the helper
export { toNodeHandler, fromNodeHeaders } from 'better-auth/node'
