export interface Task {
  id: string
  title: string
  description?: string
  dueDate: Date | null
  status: 'pending' | 'completed'
  priority: 'high' | 'medium' | 'low'
}
