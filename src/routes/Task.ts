import { TaskController } from '@/modules/controllers/TaskController'

import express from 'express'
export const taskRoutes = express.Router()

taskRoutes.get('/:userId', TaskController.GetTasks)

taskRoutes.post('/', TaskController.CreateTask)

taskRoutes.patch('/:id', TaskController.UpdateTask)

taskRoutes.delete('/:id', TaskController.DeleteTask)
