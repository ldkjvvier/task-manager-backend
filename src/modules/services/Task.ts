import { Task } from '../models/Task'

export class TaskService {
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
    }
  ]

  /* Obtener todas las tareas */
  static getTasks(): Task[] {
    return this.tasks
  }

  /* Crear una tarea */
  static createTask(taskData: Omit<Task, 'id'>): Task {
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...taskData
    }
    this.tasks.push(newTask)
    return newTask
  }

  /* Actualizar una tarea */
  static updateTask(id: string, taskData: Omit<Task, 'id'>): Task | null {
    const taskIndex = this.tasks.findIndex((task) => task.id === id)

    if (taskIndex === -1) return null

    this.tasks[taskIndex] = { id, ...taskData }
    return this.tasks[taskIndex]
  }

  /* Eliminar una tarea */
  static deleteTask(id: string): boolean {
    const taskIndex = this.tasks.findIndex((task) => task.id === id)

    if (taskIndex === -1) return false

    this.tasks.splice(taskIndex, 1)
    return true
  }
}
