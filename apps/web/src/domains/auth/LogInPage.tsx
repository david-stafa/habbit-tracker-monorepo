import { LogInForm } from '~/components/auth/LogInFom'

export const LogInPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-full w-3/6 bg-slate-200" />
      <div className="flex w-3/6 flex-col items-center p-14">
        <h1 className="text-2xl font-semibold">Log in to your account</h1>
        <p className="text-muted-foreground mt-2 mb-6">
          Fill the form below to log in to your account
        </p>
        <LogInForm />
      </div>
    </div>
  )
}
