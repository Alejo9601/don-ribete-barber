import express from 'express'
import { getUser } from '../services/userServices'
import { User } from '../types/User'

const userRouter = express.Router()

userRouter.get('/', (req, res) => {
  const auth = req.headers.authorization

  if (!auth) {
    return res.status(401).json({ error: 'Authorization header missing' })
  }

  const encodedCredentials = auth.split(' ')[1]
  const decodedCredentials = Buffer.from(
    encodedCredentials,
    'base64'
  ).toString()
  const [username, password] = decodedCredentials.split(':')

  getUser(username, password).then((user: User | null) => {
    if (user === null) {
      return res.status(404).send({ error: 'Username or Password incorrect' })
    }

    res.send(user)
  })
})

export default userRouter
