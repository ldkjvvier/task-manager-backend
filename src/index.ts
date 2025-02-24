import express from 'express'
import { createServer } from 'http'
import { userAuthRoutes, corsMiddleware, config } from './modules'
import { taskRoutes } from './routes/Task'
import { connectDB } from './config/db.config' // Importamos la conexión a DB

const app = express()
const server = createServer(app)

// Conectar a la base de datos
connectDB()

// Middlewares
app.use(express.json())
app.use(corsMiddleware())

// Routes
app.use('/api/', userAuthRoutes)
app.use('/api/tasks/', taskRoutes)
app.get('/ping', (_, res) => {
  res.send('pong')
})

// Iniciar el servidor
const PORT = config.port || 5000
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`)
})
