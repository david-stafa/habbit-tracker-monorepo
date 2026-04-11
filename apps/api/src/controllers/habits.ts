import { prisma } from '@habit-tracker/db'

export const getHabits = async (userId: string) => {
  const habits = await prisma.habit.findMany({
    where: { userId: userId },
    select: {
      id: true,
      name: true,
      habitInstances: { select: { date: true, completed: true } },
    },
  })
  return habits
}

export const getDailyHabitInstances = async (userId: string, day: Date) => {
  const startOfDay = new Date(day)
  startOfDay.setHours(0, 0, 0)

  const endOfDay = new Date(day)
  endOfDay.setHours(23, 59, 59)

  const habitInstances = await prisma.habitInstance.findMany({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
      habit: {
        userId,
      },
    },
    select: {
      id: true,
      completed: true,
      date: true,
      habit: {
        select: {
          name: true,
          description: true,
        },
      },
    },
    orderBy: {
      date: 'asc',
    },
  })

  return habitInstances
}

export const toggleCompletedInHabitInstance = async (
  completed: boolean,
  instanceId: string
) => {
  const habitInstance = await prisma.habitInstance.update({
    where: { id: instanceId },
    data: { completed: !completed },
    select: {
      id: true,
      completed: true,
      date: true,
      habit: {
        select: {
          name: true,
        },
      },
    },
  })

  return habitInstance
}

export const createHabitWithInstances = async (
  name: string,
  userId: string,
  points: number,
  description?: string
) => {
  const habit = await prisma.habit.create({
    data: {
      name: name,
      userId: userId,
      points: points,
      description: description,
    },
  })

  const thisYear = new Date().getFullYear()
  const thisMonth = new Date().getMonth()
  const thisDay = new Date().getDate()
  const lastDayOfMonth = new Date(thisYear, thisMonth + 1, 0).getDate()
  const lastDayOfNextMonth = new Date(thisYear, thisMonth + 2, 0).getDate()
  const daysTillEndOfTheMonth = lastDayOfMonth - thisDay

  const habitInstancesData = Array.from({
    length: daysTillEndOfTheMonth + lastDayOfNextMonth,
  }).map((_, index) => {
    const now = new Date()
    return {
      date: new Date(now.setDate(now.getDate() + index)),
      habitId: habit.id,
      points: points,
    }
  })

  const habitInstances = await prisma.habitInstance.createMany({
    data: habitInstancesData,
  })

  return { habit, habitInstances }
}

export const deleteHabitWithInstances = async (
  habitId: string,
  userId: string
) => {
  const habit = await prisma.habit.delete({
    where: { id: habitId, user: { id: userId } },
    select: {
      name: true,
    },
  })
  return habit
}

export const getAllHabitPoints = async (userId: string) => {
  const habits = await prisma.habitInstance.aggregate({
    where: {
      completed: true,
      habit: {
        userId: userId,
      },
    },
    _sum: {
      points: true,
    },
  })

  return habits._sum.points || 0
}
