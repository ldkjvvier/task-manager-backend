import { userRegister, userLogin } from '../models/User'
import User from '../schemas/User'

export class UserModel {
  // Método para iniciar sesión
  static async Login(data: userLogin) {
    try {
      const user = await User.findOne({ email: data.email })
      if (!user) {
        throw new Error('User not found')
      }

      const isMatch = await user.comparePassword(data.password)
      if (!isMatch) {
        throw new Error('Invalid password')
      }

      return { user }
    } catch (error) {
      console.log(error)
      throw new Error('Error logging in')
    }
  }

  // Método para registrar un nuevo usuario
  static async Register(data: userRegister) {
    try {
      const user = new User({
        email: data.email,
        password: data.password
      })

      return await user.save()
    } catch (error) {
      console.log(error)
      throw new Error('Error creating user')
    }
  }

  // Crear categoria
  static async CreateCategory(userId: string, category: string) {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            categories: {
              name: category
            }
          }
        },
        { new: true }
      )

      return user
    } catch (error) {
      console.log(error)
      throw new Error('Error creating category')
    }
  }
}
