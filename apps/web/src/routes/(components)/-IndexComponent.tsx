import { authClient } from '~/lib/auth'
import { Button } from '@habbit-tracker/ui/components/button'
import { ModeToggle } from '@habbit-tracker/ui/components/mode-toggle'
import { NewHabbitDialog } from '~/components/NewHabbitDialog'

export const IndexComponent = () => {
  const handleLogIn = async () => {
    const { data, error } = await authClient.signIn.email({
      email: 'john.doe@example.com',
      password: 'password1234',
    })

    console.log(data, error)
  }

  const handleSignUp = async () => {
    const { data, error } = await authClient.signUp.email({
      name: 'John Doe', // required
      email: 'john.doe@example.com', // required
      password: 'password1234', // required
      image: 'https://example.com/image.png',
    })

    console.log(data, error)
  }

  const handleSignOut = async () => {
    const { data, error } = await authClient.signOut()
    console.log(data, error)
  }

  return (
    <div>
      <section>
        <h1>Hello David</h1>
        <NewHabbitDialog />
        <ModeToggle />
        <Button onClick={handleLogIn}>Log In</Button>
        <Button onClick={handleSignUp}>Sign Up</Button>
        <Button onClick={handleSignOut}>Sign Out</Button>
      </section>
    </div>
  )
}
