import express from "express"
import { createHabbitWithInstances, getHabbits } from "../controllers/habbits"

const router = express.Router()

router.get('/', async (req, res) =>  {
    const habbits = await getHabbits(req.query.userId as string)
    res.json(habbits)
})

router.post('/', async (req, res) => {
    const habbitWithInstances = await createHabbitWithInstances()
    res.json(habbitWithInstances)
})

export default router;
