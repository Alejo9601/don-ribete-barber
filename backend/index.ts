import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import appointmentRouter from './src/routes/appointmentRouter'
import userRouter from './src/routes/userRouter'

dotenv.config()

const app = express()
const PORT = Number(process.env.PORT ?? 3000)
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173'

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true
  })
)

app.use('/api/appointments', appointmentRouter)
app.use('/api/admin-panel', userRouter)

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`SERVER is running on port ${PORT}`)
})
