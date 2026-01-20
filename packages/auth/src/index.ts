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
  // Social providers can be added here
  // socialProviders: {
  //   github: {
  //     clientId: process.env.GITHUB_CLIENT_ID as string,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  //   },
  // },
})

// Export types for use in client and server
export type Session = typeof auth.$Infer.Session

// TODO: Check with Béďos if this is the correct way to export the helper
export { toNodeHandler, fromNodeHeaders } from 'better-auth/node'
