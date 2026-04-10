import { ModeToggle } from '@habbit-tracker/ui/components/mode-toggle'
import { TypographyH1 } from '@habbit-tracker/ui/components/typography'
import { ButtonLink } from '~/components/ui/button-link'

export const RootPage = () => {
  console.log(import.meta.env.VITE_API_URL)
  return (
    <div className="flex h-screen flex-col">
      <nav className="flex justify-between gap-2 p-2">
        <ModeToggle />
        <div>
          <ButtonLink to="/login" variant="secondary" className="mr-2">
            Log in
          </ButtonLink>
          <ButtonLink to="/register" variant="default">
            Register
          </ButtonLink>
        </div>
      </nav>
      <div className="flex flex-1 items-center justify-center">
        <TypographyH1>
          Welcome to your new{' '}
          <span className="text-primary">Habit Tracker</span>
        </TypographyH1>
      </div>
    </div>
  )
}
