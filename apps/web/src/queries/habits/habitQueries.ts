import axios from 'axios'
import type { Habit, HabitInstance } from '@habit-tracker/contracts'

const apiBaseUrl =
  (import.meta.env.VITE_API_URL as string) || 'http://localhost:3001'

const instance = axios.create({
  baseURL: apiBaseUrl,
})

export const getHabitsQuery = async (userId: string) => {
  const res = await instance.get<Habit[]>('/api/habits', {
    params: { userId },
  })
  return res.data
}

export const createHabitQuery = async (
  name: string,
  userId: string,
  points: number,
  description?: string
) => {
  const res = await instance.post<Habit>('/api/habits', {
    name,
    description,
    userId,
    points,
  })
  return res.data
}

export const deleteHabitQuery = async (habitId: string, userId: string) => {
  const res = await instance.delete(`/api/habits`, {
    params: { habitId, userId },
  })
  return res.data
}

export const getDailyHabitInstancesQuery = async (
  userId: string,
  day: Date
) => {
  const res = await instance.get<HabitInstance[]>(
    '/api/habits/dailyHabitInstances',
    {
      params: { userId, day },
    }
  )
  return res.data
}

export const postToggleHabitInstanceCompleted = async (
  completed: boolean,
  instanceId: string
) => {
  const res = await instance.post<HabitInstance>(
    '/api/habits/dailyHabitInstances/toggleCompleted',
    {
      completed,
      instanceId,
    }
  )

  return res.data
}

export const getAllHabitPointsQuery = async (userId: string) => {
  const res = await instance.get<number>('/api/habits/allHabitPoints', {
    params: { userId },
  })
  return res.data
}
