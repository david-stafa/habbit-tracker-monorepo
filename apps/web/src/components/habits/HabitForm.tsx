import { Input } from '@habit-tracker/ui/components/input'
import { Label } from '@habit-tracker/ui/components/label'
import { formOptions, useForm } from '@tanstack/react-form'
import z from 'zod'
import { FieldInfo } from '../form/FieldInfo'
import { Button } from '@habit-tracker/ui/components/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouteContext } from '@tanstack/react-router'
import { trpc } from '~/lib/trpc'
import { Weekday } from '@habit-tracker/db/enums'
import type { Habit } from '@habit-tracker/db/browser'

import { cn } from '@habit-tracker/ui/lib/utils'

const habitSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  userId: z.string(),
  points: z.number().min(1).max(10),
  scheduleDays: z.array(z.enum(Weekday)),
})

type HabitSchemaType = z.infer<typeof habitSchema>

type NewHabitFormProps = {
  onSuccess?: () => void
  habit?: Omit<Habit, 'createdAt' | 'updatedAt' | 'userId'>
}

export const HabitForm = ({ onSuccess, habit }: NewHabitFormProps) => {
  const { user } = useRouteContext({ from: '__root__' })
  const queryClient = useQueryClient()

  const defaultHabit: HabitSchemaType = {
    name: habit?.name || '',
    description: habit?.description || '',
    userId: user?.id || '',
    points: habit?.points || 1,
    scheduleDays: habit?.scheduleDays || ['everyDay'],
  }

  const formOpts = formOptions({
    defaultValues: defaultHabit,
  })

  const isEditMode = !!habit

  const onMutationSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: trpc.habit.getTodayHabits.queryKey({ userId: user?.id }),
    })
    onSuccess?.()
  }

  const { mutate: createHabit } = useMutation(
    trpc.habit.createHabit.mutationOptions({ onSuccess: onMutationSuccess })
  )

  const { mutate: updateHabit } = useMutation(
    trpc.habit.updateHabit.mutationOptions({ onSuccess: onMutationSuccess })
  )

  const form = useForm({
    ...formOpts,
    //! Figure out how to handle userId without "!"
    defaultValues: { ...defaultHabit, userId: user!.id },
    validators: {
      onBlur: habitSchema,
      onSubmit: habitSchema,
    },
    onSubmit: async ({ value }) => {
      if (isEditMode) {
        updateHabit({ ...value, id: habit.id })
      } else {
        createHabit(value)
      }
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
                    'w-full cursor-default rounded-md p-2 text-center md:w-28',
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
            {isSubmitting ? '...' : isEditMode ? 'Save changes' : 'Create habit'}
          </Button>
        )}
      />
    </form>
  )
}
