import { ModeToggle } from '@habbit-tracker/ui/components/mode-toggle'
import { NewHabbitDialog } from '~/components/NewHabbitDialog'

export const IndexComponent = () => {
  return (
    <div>
      <section>
        <h1>Hello David</h1>
        <NewHabbitDialog />
        <ModeToggle />
      </section>
    </div>
  )
}
