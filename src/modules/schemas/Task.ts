import mongoose, { Schema, Document } from 'mongoose'
import { Task } from '../models/Task'

interface ITask extends Document, Omit<Task, 'id'> {}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, trim: true, maxlength: 500 },
    dueDate: { type: Date, default: null },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
      required: true
    },
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium',
      required: true
    }
  },
  { timestamps: true }
)

export const TaskModel = mongoose.model<ITask>('Task', TaskSchema)
