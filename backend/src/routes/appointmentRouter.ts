import express from 'express'
import {
  deleteAppointment,
  getAllAppointments,
  getOccupiedAppointmentSlots,
  setAppointment,
  updateAppointmentStatus
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

appointmentRouter.patch('/:id/status', requireAuth, async (req, res, next) => {
  try {
    const appointmentId = Number(req.params.id)
    const { status } = req.body as { status?: string }

    if (Number.isNaN(appointmentId) || !status) {
      return res.status(400).json({ error: 'Appointment id and status are required' })
    }

    const appointment = await updateAppointmentStatus(appointmentId, status)

    if (appointment === null) {
      return res.status(404).json({ error: 'Appointment not found' })
    }

    res.status(200).json(appointment)
  } catch (error) {
    next(error)
  }
})

appointmentRouter.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const appointmentId = Number(req.params.id)

    if (Number.isNaN(appointmentId)) {
      return res.status(400).json({ error: 'Appointment id is required' })
    }

    const deletedAppointment = await deleteAppointment(appointmentId)

    if (deletedAppointment === null) {
      return res.status(404).json({ error: 'Appointment not found' })
    }

    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

export default appointmentRouter
