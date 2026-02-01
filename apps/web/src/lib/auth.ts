import { createAuth } from '@habbit-tracker/auth/client'

const apiBaseUrl = import.meta.env.VITE_API_URL as string || 'http://localhost:3001' 

export const authClient = createAuth({apiBaseUrl})