import { z } from "zod";

// ---- Request schemas ----

export const GetHabbitsQuerySchema = z.object({
  userId: z.string(),
});

export const CreateHabbitBodySchema = z.object({
  name: z.string().min(1),
  userId: z.string(),
  points: z.number().min(1),
  description: z.string().optional(),
});

export const DeleteHabbitQuerySchema = z.object({
  habbitId: z.string(),
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

export const GetAllHabbitPointsQuerySchema = z.object({
  userId: z.string(),
});

// ---- Response schemas ----

export const HabbitSchema = z.object({
  id: z.string(),
  name: z.string(),
  habbitInstances: z.array(
    z.object({ date: z.coerce.date(), completed: z.boolean() })
  ),
});

export const HabbitInstanceSchema = z.object({
  id: z.string(),
  completed: z.boolean(),
  date: z.coerce.date(),
  habbit: z.object({ name: z.string(), description: z.string().optional() }),
});

// ---- Inferred types (used on both sides) ----

export type Habbit = z.infer<typeof HabbitSchema>;
export type HabbitInstance = z.infer<typeof HabbitInstanceSchema>;
export type GetHabbitsQuery = z.infer<typeof GetHabbitsQuerySchema>;
export type CreateHabbitBody = z.infer<typeof CreateHabbitBodySchema>;