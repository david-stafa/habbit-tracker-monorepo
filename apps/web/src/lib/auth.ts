import { createAuth } from '@habbit-tracker/auth/client'

const apiBaseUrl =
  (import.meta.env.VITE_API_URL as string) || 'http://localhost:3001'

export const authClient = createAuth({ apiBaseUrl })

export type AuthResult =
  | { success: true }
  | { success: false; error: { message: string } }

export const signInWithEmail = async (
  email: string,
  password: string
): Promise<AuthResult> => {
  const { data, error } = await authClient.signIn.email({
    email,
    password,
  })
  if (error) {
    return {
      success: false,
      error: { message: error.message || 'Sign in failed' },
    }
  } else if (data) {
    return { success: true }
  } else {
    return { success: false, error: { message: 'Sign in failed' } }
  }
}


export const signUpWithEmail = async (
  name: string,
  email: string,
  password: string,
  image?: string
): Promise<AuthResult> => {
  const { data, error } = await authClient.signUp.email({
    name,
    email,
    password,
    image,
  })
  if (error) {
    return {
      success: false,
      error: { message: error.message || 'Registration failed' },
    }
  } else if (data) {
    return { success: true }
  } else {
    return {
      success: false,
      error: { message: 'Registration failed' },
    }
  }
}
