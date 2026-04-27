import { GetAllHabitPointsQuerySchema } from '@habit-tracker/contracts'
import express from 'express'
import {
  deleteHabitWithInstances,
  getAllHabitPoints,
} from '../controllers/habits'

const router = express.Router()

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
