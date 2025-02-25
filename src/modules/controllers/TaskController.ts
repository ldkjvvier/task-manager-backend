import { Request, Response } from 'express'
import { TaskService } from '../services/Task'

export class TaskController {
  /* Obtener todas las tareas */
  public static async GetTasks(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params
      if (!userId) {
        res.status(400).json({ message: 'User ID is required' })
        return
      }

      // Llamar al servicio para obtener las tareas del usuario específico
      const tasks = await TaskService.GetTasks(userId)

      // Verificar si el usuario tiene tareas
      if (!tasks || tasks.length === 0) {
        res.status(404).json({ message: 'No tasks found for this user' })
        return
      }

      res.json(tasks)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error al obtener tareas' })
    }
  }

  /* Crear una nueva tarea */
  public static async CreateTask(req: Request, res: Response): Promise<void> {
    try {
      const {
        title,
        description,
        dueDate,
        status,
        priority,
        userId,
        categoryId
      } = req.body

      const newTask = await TaskService.CreateTask({
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        status,
        priority,
        userId,
        categoryId
      })

      res.status(201).json(newTask)
    } catch (error) {
      res.status(500).json({ message: 'Error al crear tarea' })
    }
  }

  /* Actualizar una tarea */
  static async UpdateTask(req: Request, res: Response) {
    try {
      const { id } = req.params
      const taskData = req.body

      const updatedTask = await TaskService.UpdateTask(id, taskData)
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' })
      }

      return res.json(updatedTask)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  /* Eliminar una tarea */
  static async DeleteTask(req: Request, res: Response) {
    try {
      const { id } = req.params

      const isDeleted = await TaskService.DeleteTask(id)

      if (!isDeleted) {
        return res.status(404).json({ message: 'Task not found' })
      }

      return res.status(204).send()
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
