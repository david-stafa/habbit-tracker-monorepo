import { Weekday } from '@habit-tracker/db'
import dayjs from 'dayjs'
import z from 'zod'

/* CREATE HABIT SCHEMA */
export const createHabitSchema = z.object({
  name: z.string().min(1),
  userId: z.string(),
  points: z.number().min(1),
  description: z.string().optional(),
  scheduleDays: z.array(z.enum(Weekday)),
})

export type CreateHabitInput = z.infer<typeof createHabitSchema>

/* UPDATE HABIT SCHEMA */
export const updateHabitSchema = createHabitSchema.extend({
  id: z.string(),
})

export type UpdateHabitInput = z.infer<typeof updateHabitSchema>

/* CREATE HABIT INSTANCE SCHEMA */
export const createHabitInstanceSchema = z
  .object({
    habitId: z.string(),
    userId: z.string(),
    date: z.iso.date(),
    time: z.iso.time().optional(),
    points: z.number().min(1),
    completed: z.boolean(),
  })
  .transform((data) => {
    return {
      ...data,
      date: data.time
        ? dayjs(`${data.date}T${data.time}`).toDate()
        : dayjs(data.date).startOf('day').toDate(),
    }
  })

export type CreateHabitInstanceInput = z.infer<typeof createHabitInstanceSchema>
