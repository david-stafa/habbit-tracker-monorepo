import { Input } from '@habit-tracker/ui/components/input'
import { Label } from '@habit-tracker/ui/components/label'
import { formOptions, useForm } from '@tanstack/react-form'
import z from 'zod'
import { FieldInfo } from '../form/FieldInfo'
import { Button } from '@habit-tracker/ui/components/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouteContext } from '@tanstack/react-router'
import { trpc } from '~/lib/trpc'
import { Weekday } from '../../../../../packages/database/generated/prisma/enums'
import { cn } from '@habit-tracker/ui/lib/utils'

const habitSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  userId: z.string(),
  points: z.number().min(1).max(10),
  scheduleDays: z.array(z.enum(Weekday)),
})

type HabitType = z.infer<typeof habitSchema>

const defaultHabit: HabitType = {
  name: '',
  userId: '',
  points: 1,
  scheduleDays: ['everyDay'],
}

const formOpts = formOptions({
  defaultValues: defaultHabit,
})

type NewHabitFormProps = {
  onSuccess?: () => void
}

export const NewHabitForm = ({ onSuccess }: NewHabitFormProps) => {
  const { user } = useRouteContext({ from: '__root__' })
  const queryClient = useQueryClient()

  const habitMutationOptions = trpc.habit.createHabit.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trpc.habit.getTodayHabits.queryKey({ userId: user?.id }),
      })
      onSuccess?.()
    },
  })

  const { mutate: createHabit } = useMutation(habitMutationOptions)

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
        name="scheduleDays"
        mode="array"
        children={(field) => (
          <div className="flex flex-col gap-2">
            <Label htmlFor="scheduleDays">Schedule Days</Label>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {Object.values(Weekday).map((day) => (
                <div
                  onClick={() =>
                    field.state.value.includes(day)
                      ? field.removeValue(field.state.value.indexOf(day))
                      : field.pushValue(day)
                  }
                  className={cn(
                    'w-full md:w-28 cursor-default rounded-md p-2 text-center',
                    field.state.value.includes(day)
                      ? 'bg-primary'
                      : 'bg-secondary'
                  )}
                >
                  {day}
                </div>
              ))}
            </div>
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
