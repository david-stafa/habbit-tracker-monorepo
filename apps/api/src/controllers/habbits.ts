import { prisma } from '@habbit-tracker/db'

export const getHabbits = async (userId: string) => {
  const habbits = await prisma.habbit.findMany({
    where: { userId: userId },
    select: {
      name: true,
      habbitInstances: { select: { date: true, completed: true } },
    },
  })
  return habbits
}

export const createHabbitWithInstances = async () => {
  const habbit = await prisma.habbit.create({
    data: {
      name: 'Drink Water',
      userId: 'Sl2lXqJtBEl5kVLACIJTYuz45LS1EWhu',
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
    }
  })

  const habbitInstances = await prisma.habbitInstance.createMany({
    data: habbitInstancesData,
  })

  return { habbit, habbitInstances }
}
