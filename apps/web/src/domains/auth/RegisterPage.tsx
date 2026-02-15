import { Link } from '@tanstack/react-router'
import { RegisterForm } from '~/components/auth/RegisterForm'

export const RegisterPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-full w-3/6 bg-slate-200" />
      <div className="flex w-3/6 flex-col items-center p-14">
        <h1 className="text-2xl font-semibold">Create your account</h1>
        <p className="text-muted-foreground mt-2 mb-6">
          Fill in the form below to log in to your account
        </p>
        <RegisterForm />
        <p className="text-muted-foreground mt-2 font-light">
          Already have an account?{' '}
          <Link to="/login" className="underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
