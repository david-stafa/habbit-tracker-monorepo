import { Input } from '@habbit-tracker/ui/components/input'
import { Label } from '@habbit-tracker/ui/components/label'
import { formOptions, useForm } from '@tanstack/react-form'
import z from 'zod'
import { FieldInfo } from '../form/FieldInfo'
import { Button } from '@habbit-tracker/ui/components/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createHabbitQuery } from '~/queries/habbits/habbitQueries'
import { useRouteContext } from '@tanstack/react-router'

const habbitSchema = z.object({
  name: z.string(),
  userId: z.string(),
  points: z.number().min(1).max(10),
})

type HabbitType = z.infer<typeof habbitSchema>

const defaultHabbit: HabbitType = { name: '', userId: '', points: 1 }

const formOpts = formOptions({
  defaultValues: defaultHabbit,
})

type NewHabbitFormProps = {
  onSuccess?: () => void
}

export const NewHabbitForm = ({ onSuccess }: NewHabbitFormProps) => {
  const { user } = useRouteContext({ from: '__root__' })
  const queryClient = useQueryClient()

  const { mutate: createHabbit } = useMutation({
    mutationFn: (value: HabbitType) =>
      createHabbitQuery(value.name, value.userId, value.points),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habbits'] }) // refetch list
      onSuccess?.()
    },
  })

  const form = useForm({
    ...formOpts,
    //! Figure out how to handle userId without "!"
    defaultValues: { ...defaultHabbit, userId: user!.id },
    validators: {
      onBlur: habbitSchema,
      onSubmit: habbitSchema,
    },
    onSubmit: async ({ value }) => {
      createHabbit(value)
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className='flex flex-col gap-4'
    >
      <form.Field
        name="name"
        children={(field) => (
          <div className='flex flex-col gap-2'>
            <Label htmlFor="name">Habbit Name</Label>
            <Input
              id="name"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
            <FieldInfo field={field} />
          </div>
        )}
      />
      <form.Field
        name="points"
        children={(field) => (
          <div className='flex flex-col gap-2'>
            <Label htmlFor="points">Reward points</Label>
            <Input
              id="points"
              type="number"
              min={1}
              max={10}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.valueAsNumber)}
              onBlur={field.handleBlur}
            />
            <FieldInfo field={field} />
          </div>
        )}
      />
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit} className='w-fit self-end'>
            {isSubmitting ? '...' : 'Create habbit'}
          </Button>
        )}
      />
    </form>
  )
}
