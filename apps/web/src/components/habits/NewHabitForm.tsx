import { Input } from '@habit-tracker/ui/components/input'
import { Label } from '@habit-tracker/ui/components/label'
import { formOptions, useForm } from '@tanstack/react-form'
import z from 'zod'
import { FieldInfo } from '../form/FieldInfo'
import { Button } from '@habit-tracker/ui/components/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createHabitQuery } from '~/queries/habits/habitQueries'
import { useRouteContext } from '@tanstack/react-router'

const habitSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  userId: z.string(),
  points: z.number().min(1).max(10),
})

type HabitType = z.infer<typeof habitSchema>

const defaultHabit: HabitType = { name: '', userId: '', points: 1 }

const formOpts = formOptions({
  defaultValues: defaultHabit,
})

type NewHabitFormProps = {
  onSuccess?: () => void
}

export const NewHabitForm = ({ onSuccess }: NewHabitFormProps) => {
  const { user } = useRouteContext({ from: '__root__' })
  const queryClient = useQueryClient()

  const { mutate: createHabit } = useMutation({
    mutationFn: (value: HabitType) =>
      createHabitQuery(value.name, value.userId, value.points, value.description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] }) // refetch list
      onSuccess?.()
    },
  })

  const form = useForm({
    ...formOpts,
    //! Figure out how to handle userId without "!"
    defaultValues: { ...defaultHabit, userId: user!.id },
    validators: {
      onBlur: habitSchema,
      onSubmit: habitSchema,
    },
    onSubmit: async ({ value }) => {
      createHabit(value)
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="flex flex-col gap-4"
    >
      <form.Field
        name="name"
        children={(field) => (
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Habit Name</Label>
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
        name="description"
        children={(field) => (
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Habit Description</Label>
            <Input
              id="description"
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
          <div className="flex flex-col gap-2">
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
          <Button
            type="submit"
            disabled={!canSubmit}
            className="w-fit self-end"
          >
            {isSubmitting ? '...' : 'Create habit'}
          </Button>
        )}
      />
    </form>
  )
}
