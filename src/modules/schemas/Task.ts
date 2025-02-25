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
    },
    userId: {
      type: mongoose.Schema.Types.String,
      ref: 'User',
      required: true
    },
    categoryId: {
      type: mongoose.Schema.Types.String,
      ref: 'Category',
      nullable: true
    }
  },
  { timestamps: true }
)

TaskSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

export const TaskModel = mongoose.model<ITask>('Task', TaskSchema)
