import { Task } from '../models/Task'
import { TaskModel } from '../schemas/Task'

export class TaskService {
  /* Obtener todas las tareas */
  public static async getTasks(): Promise<Task[]> {
    return await TaskModel.find()
  }

  /* Crear una tarea */
  public static async createTask(taskData: Omit<Task, 'id'>): Promise<Task> {
    const newTask = await new TaskModel(taskData).save()

    return {
      id: newTask.id.toString(),
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate,
      status: newTask.status,
      priority: newTask.priority
    } as Task
  }

  /* Actualizar una tarea */
  static async updateTask(
    id: string,
    taskData: Partial<Omit<Task, 'id'>>
  ): Promise<Task | null> {
    const updatedTask = await TaskModel.findByIdAndUpdate(id, taskData, {
      new: true,
      runValidators: true
    })

    if (!updatedTask) return null

    return updatedTask
      ? ({
          id: updatedTask.id.toString(),
          title: updatedTask.title,
          description: updatedTask.description,
          dueDate: updatedTask.dueDate,
          status: updatedTask.status,
          priority: updatedTask.priority
        } as Task)
      : null
  }

  /* Eliminar una tarea */
  static async deleteTask(id: string): Promise<boolean> {
    const deletedTask = await TaskModel.findByIdAndDelete(id)
    return !!deletedTask
  }
}
