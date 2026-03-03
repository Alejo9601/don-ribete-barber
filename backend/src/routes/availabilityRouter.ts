import express from 'express'
import {
  getAvailabilitySettings,
  updateAvailabilitySettings
} from '../services/availabilityServices'
import { requireAuth } from '../middleware/requireAuth'

const availabilityRouter = express.Router()

availabilityRouter.get('/', async (_req, res, next) => {
  try {
    const availability = await getAvailabilitySettings()
    res.status(200).json(availability)
  } catch (error) {
    next(error)
  }
})

availabilityRouter.put('/', requireAuth, async (req, res, next) => {
  try {
    const availability = await updateAvailabilitySettings(req.body)
    res.status(200).json(availability)
  } catch (error) {
    next(error)
  }
})

export default availabilityRouter
