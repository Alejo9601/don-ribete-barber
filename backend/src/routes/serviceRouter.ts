import express from 'express'
import { requireAuth } from '../middleware/requireAuth'
import { getAllServices, saveServices } from '../services/serviceServices'
import { Service } from '../types/Service'

const serviceRouter = express.Router()

serviceRouter.get('/', async (_req, res, next) => {
  try {
    const services = await getAllServices()
    res.status(200).json(services)
  } catch (error) {
    next(error)
  }
})

serviceRouter.put('/', requireAuth, async (req, res, next) => {
  try {
    const services = req.body as Service[]

    if (!Array.isArray(services)) {
      return res.status(400).json({ error: 'Invalid services payload' })
    }

    const updatedServices = await saveServices(services)
    res.status(200).json(updatedServices)
  } catch (error) {
    next(error)
  }
})

export default serviceRouter
