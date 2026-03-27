import axios from 'axios'
import type { Habbit, HabbitInstance } from '@habbit-tracker/contracts'

const instance = axios.create({
  baseURL: 'http://localhost:3001',
})

export const getHabbitsQuery = async (userId: string) => {
  const res = await instance.get<Habbit[]>('/api/habbits', { params: { userId } })
  return res.data
}

export const createHabbitQuery = async (name: string, userId: string, points: number) => {
  const res = await instance.post<Habbit>('/api/habbits', { name, userId, points })
  return res.data
}

export const deleteHabbitQuery = async (habbitId: string, userId: string) => {
  const res = await instance.delete(`/api/habbits`, {
    params: { habbitId, userId },
  })
  return res.data
}

export const getDailyHabbitInstancesQuery = async (
  userId: string,
  day: Date
) => {
  const res = await instance.get<HabbitInstance[]>(
    'api/habbits/dailyHabbitInstances',
    {
      params: { userId, day },
    }
  )
  return res.data
}

export const postToggleHabbitInstanceCompleted = async (
  completed: boolean,
  instanceId: string
) => {
  const res = await instance.post<HabbitInstance[]>(
    'api/habbits/dailyHabbitInstances/toggleCompleted',
    {
      completed,
      instanceId,
    }
  )

  return res.data
}


export const getAllHabbitPointsQuery = async (userId: string) => {
  const res = await instance.get<number>('/api/habbits/allHabbitPoints', {
    params: { userId },
  })
  return res.data
}