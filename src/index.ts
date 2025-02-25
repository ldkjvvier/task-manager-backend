import express from 'express'
import { createServer } from 'http'
import { corsMiddleware, config } from './modules'
import { userAuthRoutes } from './routes/userAuth'
import { taskRoutes } from './routes/Task'
import { connectDB } from './config/db.config'

const app = express()
const server = createServer(app)

connectDB()

app.use(express.json())
app.use(corsMiddleware())

app.use('/api/', userAuthRoutes)
app.use('/api/tasks/', taskRoutes)
app.get('/ping', (_, res) => {
  res.send('pong')
})

const PORT = config.port || 5000
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`)
})
