import express from 'express'
import {
  getAllAppointments,
  getOccupiedAppointmentSlots,
  setAppointment
} from '../services/appointmentServices'
import { requireAuth } from '../middleware/requireAuth'

const appointmentRouter = express.Router()

appointmentRouter.get('/', requireAuth, async (_req, res, next) => {
  try {
    const appointments = await getAllAppointments()
    res.status(200).json(appointments)
  } catch (error) {
    next(error)
  }
})

appointmentRouter.get('/occupied', async (_req, res, next) => {
  try {
    const appointments = await getOccupiedAppointmentSlots()
    res.status(200).json(appointments)
  } catch (error) {
    next(error)
  }
})

appointmentRouter.post('/', async (req, res, next) => {
  try {
    const appointment = await setAppointment(req.body)
    res.status(201).json(appointment)
  } catch (error) {
    next(error)
  }
})

export default appointmentRouter
