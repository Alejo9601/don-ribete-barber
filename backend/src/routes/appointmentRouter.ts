import express from 'express'
import {
  getAllAppointments,
  setAppointment
} from '../services/appointmentServices'

const appointmentRouter = express.Router()

appointmentRouter.get('/', (req, res) => {
  getAllAppointments().then((appointments) => res.send(appointments))
})

appointmentRouter.post('/', (req, res) => {
  const appointmentData = req.body
  setAppointment(appointmentData).then((appointment) => res.send(appointment))
})

export default appointmentRouter
