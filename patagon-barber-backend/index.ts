import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import appointmentRouter from './src/routes/appointmentRouter'
import userRouter from './src/routes/userRouter'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

const PORT = 3000

app.use('/api/appointments', appointmentRouter)
app.use('/api/admin-panel/login', userRouter)

app.listen(3000, () => {
  console.log(`SERVER is running on port ${PORT}`)
})
