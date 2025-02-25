import { Task } from '../models/Task'
import { TaskModel } from '../schemas/Task'

export class TaskService {
  /* Obtener todas las tareas */
  public static async GetTasks(userId: string): Promise<Task[]> {
    const tasks = await TaskModel.find({ userId })

    return tasks.map((task) => ({
      id: task.id.toString(),
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status,
      priority: task.priority,
      userId: task.userId,
      categoryId: task.categoryId
    }))
  }

  /* Crear una tarea */
  public static async CreateTask(taskData: Omit<Task, 'id'>): Promise<Task> {
    const newTask = await new TaskModel(taskData).save()

    return {
      id: newTask.id.toString(),
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate,
      status: newTask.status,
      priority: newTask.priority,
      userId: newTask.userId,
      categoryId: newTask.categoryId
    } as Task
  }

  /* Actualizar una tarea */
  static async UpdateTask(
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
  static async DeleteTask(id: string): Promise<boolean> {
    const deletedTask = await TaskModel.findByIdAndDelete(id)
    return !!deletedTask
  }
}
