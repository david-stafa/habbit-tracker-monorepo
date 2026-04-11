import express from 'express'
import {
  createHabitWithInstances,
  getHabits,
  deleteHabitWithInstances,
  getDailyHabitInstances,
  toggleCompletedInHabitInstance,
  getAllHabitPoints,
} from '../controllers/habits'
import {
  CreateHabitBodySchema,
  GetAllHabitPointsQuerySchema,
  GetDailyInstancesQuerySchema,
} from '@habit-tracker/contracts'

const router = express.Router()

router.get('/', async (req, res) => {
  const habits = await getHabits(req.query.userId as string)
  res.json(habits)
})

router.get('/dailyHabitInstances', async (req, res) => {
  const { userId, day } = GetDailyInstancesQuerySchema.parse(req.query)
  const dailyHabitInstances = await getDailyHabitInstances(userId, day)
  res.json(dailyHabitInstances)
})

router.post('/dailyHabitInstances/toggleCompleted', async (req, res) => {
  const habitInstance = await toggleCompletedInHabitInstance(
    req.body.completed as boolean,
    req.body.instanceId as string
  )
  res.json(habitInstance)
})

router.post('/', async (req, res) => {
  const { name, userId, points, description } = CreateHabitBodySchema.parse(
    req.body
  )

  const habitWithInstances = await createHabitWithInstances(
    name,
    userId,
    points,
    description
  )

  res.json(habitWithInstances)
})

router.delete('/', async (req, res) => {
  const deletedHabit = await deleteHabitWithInstances(
    req.query.habitId as string,
    req.query.userId as string
  )
  res.json(deletedHabit)
})

router.get('/allHabitPoints', async (req, res) => {
  const { userId } = GetAllHabitPointsQuerySchema.parse(req.query)
  const allHabitPoints = await getAllHabitPoints(userId)
  res.json(allHabitPoints)
})

export default router
