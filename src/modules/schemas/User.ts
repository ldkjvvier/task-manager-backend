import mongoose, { Schema, Document, Model } from 'mongoose'
import bcrypt from 'bcryptjs'
import { User, Category } from '../models/User'

export interface IUser extends Document, Omit<User, 'id'> {
  comparePassword(password: string): Promise<boolean>
}

interface IUserModel extends Model<IUser> {}

const categorySchema = new Schema<Category>({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

const userSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    categories: {
      type: [categorySchema],
      default: [],
      maxlength: 5
    }
  },
  { timestamps: true }
)

userSchema.pre<IUser>('save', function (next) {
  if (this.isModified('password') || this.isNew) {
    bcrypt.hash(this.password, 10, (err, hash) => {
      if (err) {
        return next(err)
      } else {
        this.password = hash
        next()
      }
    })
  } else {
    next()
  }
})

userSchema.methods.comparePassword = async function (
  this: IUser,
  password: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw new Error('Error in comparePassword: ' + error)
  }
}

userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

const User = mongoose.model<IUser, IUserModel>('User', userSchema)

export default User
