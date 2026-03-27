import { prisma } from '@habbit-tracker/db'

export const getHabbits = async (userId: string) => {
  const habbits = await prisma.habbit.findMany({
    where: { userId: userId },
    select: {
      id: true,
      name: true,
      habbitInstances: { select: { date: true, completed: true } },
    },
  })
  return habbits
}

export const getDailyHabbitInstances = async (userId: string, day: Date) => {
  const startOfDay = new Date(day)
  startOfDay.setHours(0, 0, 0)

  const endOfDay = new Date(day)
  endOfDay.setHours(23, 59, 59)

  const habbitInstances = await prisma.habbitInstance.findMany({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
      habbit: {
        userId,
      },
    },
    select: {
      id: true,
      completed: true,
      date: true,
      habbit: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      date: 'asc',
    },
  })

  return habbitInstances
}

export const toggleCompletedInHabbitInstance = async (
  completed: boolean,
  instanceId: string
) => {
  const habbitInstance = await prisma.habbitInstance.update({
    where: { id: instanceId },
    data: { completed: !completed },
    select: {
      id: true,
      completed: true,
      date: true,
      habbit: {
        select: {
          name: true,
        },
      },
    },
  })

  return habbitInstance
}

export const createHabbitWithInstances = async (
  name: string,
  userId: string,
  points: number
) => {
  const habbit = await prisma.habbit.create({
    data: {
      name: name,
      userId: userId,
      points: points,
    },
  })

  const thisYear = new Date().getFullYear()
  const thisMonth = new Date().getMonth()
  const thisDay = new Date().getDate()
  const lastDayOfMonth = new Date(thisYear, thisMonth + 1, 0).getDate()
  const lastDayOfNextMonth = new Date(thisYear, thisMonth + 2, 0).getDate()
  const daysTillEndOfTheMonth = lastDayOfMonth - thisDay

  const habbitInstancesData = Array.from({
    length: daysTillEndOfTheMonth + lastDayOfNextMonth,
  }).map((_, index) => {
    const now = new Date()
    return {
      date: new Date(now.setDate(now.getDate() + index)),
      habbitId: habbit.id,
      points: points,
    }
  })

  const habbitInstances = await prisma.habbitInstance.createMany({
    data: habbitInstancesData,
  })

  return { habbit, habbitInstances }
}

export const deleteHabbitWithInstances = async (
  habbitId: string,
  userId: string
) => {
  const habbit = await prisma.habbit.delete({
    where: { id: habbitId, user: { id: userId } },
    select: {
      name: true,
    },
  })
  return habbit
}

export const getAllHabbitPoints = async (userId: string) => {
  const habbits = await prisma.habbitInstance.aggregate({
    where: {
      completed: true,
      habbit: {
        userId: userId,
      },
    },
    _sum: {
      points: true,
    },
  })

  return habbits._sum.points || 0
}
