// src/controllers/TaskController.ts
import { Request, Response } from 'express'
import { Task } from '../modules/Task'

export class TaskController {
  private static tasks: Task[] = [
    {
      id: '1',
      title: 'Tarea 1',
      description: 'Descripción 1',
      dueDate: new Date(),
      status: 'pending',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Tarea 2',
      description: 'Descripción 2',
      dueDate: new Date(),
      status: 'pending',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Tarea 3',
      description: 'Descripción 3',
      dueDate: new Date(),
      status: 'completed',
      priority: 'low'
    },
    {
      id: '4',
      title: 'Tarea 4',
      description: 'Descripción 4',
      dueDate: new Date(),
      status: 'pending',
      priority: 'medium'
    },
    {
      id: '5',
      title: 'Tarea 5',
      description: 'Descripción 5',
      dueDate: new Date(),
      status: 'pending',
      priority: 'high'
    }
  ]

  public static getTasks(_req: Request, res: Response): void {
    res.json(TaskController.tasks)
  }
}
