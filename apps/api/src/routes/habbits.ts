import express from 'express'
import {
  createHabbitWithInstances,
  getHabbits,
  deleteHabbitWithInstances,
  getDailyHabbitInstances,
  toggleCompletedInHabbitInstance,
  getAllHabbitPoints,
} from '../controllers/habbits'
import {
  CreateHabbitBodySchema,
  GetAllHabbitPointsQuerySchema,
  GetDailyInstancesQuerySchema,
} from '@habbit-tracker/contracts'

const router = express.Router()

router.get('/', async (req, res) => {
  const habbits = await getHabbits(req.query.userId as string)
  res.json(habbits)
})

router.get('/dailyHabbitInstances', async (req, res) => {
  const { userId, day } = GetDailyInstancesQuerySchema.parse(req.query)
  const dailyHabbitInstances = await getDailyHabbitInstances(userId, day)
  res.json(dailyHabbitInstances)
})

router.post('/dailyHabbitInstances/toggleCompleted', async (req, res) => {
  const habbitInstance = await toggleCompletedInHabbitInstance(
    req.body.completed as boolean,
    req.body.instanceId as string
  )
  res.json(habbitInstance)
})

router.post('/', async (req, res) => {
  const { name, userId, points, description } = CreateHabbitBodySchema.parse(
    req.body
  )

  const habbitWithInstances = await createHabbitWithInstances(
    name,
    userId,
    points,
    description
  )

  res.json(habbitWithInstances)
})

router.delete('/', async (req, res) => {
  const deletedHabbit = await deleteHabbitWithInstances(
    req.query.habbitId as string,
    req.query.userId as string
  )
  res.json(deletedHabbit)
})

router.get('/allHabbitPoints', async (req, res) => {
  const { userId } = GetAllHabbitPointsQuerySchema.parse(req.query)
  const allHabbitPoints = await getAllHabbitPoints(userId)
  res.json(allHabbitPoints)
})

export default router
