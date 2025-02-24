import { Request, Response } from 'express'
import { TaskService } from '../services/Task'

export class TaskController {
  /* Obtener todas las tareas */
  public static getTasks(_req: Request, res: Response): void {
    const tasks = TaskService.getTasks()
    res.json(tasks)
  }

  /* Crear una nueva tarea */
  public static createTask(req: Request, res: Response): Response | void {
    const { title, description, dueDate, status, priority } = req.body

    if (!title || !description || !dueDate || !status || !priority) {
      return res
        .status(400)
        .json({ message: 'Todos los campos son obligatorios' })
    }

    const newTask = TaskService.createTask({
      title,
      description,
      dueDate: new Date(dueDate),
      status,
      priority
    })

    res.status(201).json(newTask)
  }

  /* Actualizar una tarea */
  public static updateTask(req: Request, res: Response): Response | void {
    const { id } = req.params
    const { title, description, dueDate, status, priority } = req.body

    if (!title || !description || !dueDate || !status || !priority) {
      return res
        .status(400)
        .json({ message: 'Todos los campos son obligatorios' })
    }

    const updatedTask = TaskService.updateTask(id, {
      title,
      description,
      dueDate: new Date(dueDate),
      status,
      priority
    })

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.json(updatedTask)
  }

  /* Eliminar una tarea */
  public static deleteTask(req: Request, res: Response): Response {
    const { id } = req.params

    const isDeleted = TaskService.deleteTask(id)

    if (!isDeleted) {
      return res.status(404).json({ message: 'Task not found' })
    }

    return res.status(204).send()
  }
}
