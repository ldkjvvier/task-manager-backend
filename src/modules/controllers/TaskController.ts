import { Request, Response } from 'express'
import { TaskService } from '../services/Task'

export class TaskController {
  /* Obtener todas las tareas */
  public static async getTasks(_req: Request, res: Response): Promise<void> {
    try {
      const tasks = await TaskService.getTasks()
      res.json(tasks)
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener tareas' })
    }
  }

  /* Crear una nueva tarea */
  public static async createTask(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, dueDate, status, priority } = req.body

      // Validación de datos requeridos
      if (!title || !dueDate || !status || !priority) {
        res
          .status(400)
          .json({ message: 'Todos los campos requeridos menos descripción' })
        return
      }

      const newTask = await TaskService.createTask({
        title,
        description,
        dueDate: new Date(dueDate),
        status,
        priority
      })

      res.status(201).json(newTask)
    } catch (error) {
      res.status(500).json({ message: 'Error al crear tarea' })
    }
  }

  /* Actualizar una tarea */
  static async updateTask(req: Request, res: Response) {
    try {
      const { id } = req.params
      const taskData = req.body

      const updatedTask = await TaskService.updateTask(id, taskData)
      console.log(taskData)
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
  static async deleteTask(req: Request, res: Response) {
    try {
      const { id } = req.params

      const isDeleted = await TaskService.deleteTask(id)

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
