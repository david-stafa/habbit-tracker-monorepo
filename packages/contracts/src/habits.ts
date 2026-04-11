import { z } from "zod";

// ---- Request schemas ----

export const GetHabitsQuerySchema = z.object({
  userId: z.string(),
});

export const CreateHabitBodySchema = z.object({
  name: z.string().min(1),
  userId: z.string(),
  points: z.number().min(1),
  description: z.string().optional(),
});

export const DeleteHabitQuerySchema = z.object({
  habitId: z.string(),
  userId: z.string(),
});

export const GetDailyInstancesQuerySchema = z.object({
  userId: z.string(),
  day: z.coerce.date(), // e.g. ISO date string
});

export const ToggleInstanceBodySchema = z.object({
  completed: z.boolean(),
  instanceId: z.string(),
});

export const GetAllHabitPointsQuerySchema = z.object({
  userId: z.string(),
});

// ---- Response schemas ----

export const HabitSchema = z.object({
  id: z.string(),
  name: z.string(),
  habitInstances: z.array(
    z.object({ date: z.coerce.date(), completed: z.boolean() })
  ),
});

export const HabitInstanceSchema = z.object({
  id: z.string(),
  completed: z.boolean(),
  date: z.coerce.date(),
  habit: z.object({ name: z.string(), description: z.string().optional() }),
});

// ---- Inferred types (used on both sides) ----

export type Habit = z.infer<typeof HabitSchema>;
export type HabitInstance = z.infer<typeof HabitInstanceSchema>;
export type GetHabitsQuery = z.infer<typeof GetHabitsQuerySchema>;
export type CreateHabitBody = z.infer<typeof CreateHabitBodySchema>;