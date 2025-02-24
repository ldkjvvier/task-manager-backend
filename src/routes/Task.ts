import { TaskController } from '@/modules/controllers/TaskController'

import express from 'express'
export const taskRoutes = express.Router()

taskRoutes.get('/', TaskController.getTasks)

taskRoutes.post('/', TaskController.createTask)

taskRoutes.patch('/:id', TaskController.updateTask)

taskRoutes.delete('/:id', TaskController.deleteTask)
