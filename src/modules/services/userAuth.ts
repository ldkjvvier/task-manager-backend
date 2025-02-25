import { userRegister, userLogin } from '../models/User'
import User from '../schemas/User'

export class userAuthModel {
  // Método para iniciar sesión
  static async login(data: userLogin) {
    try {
      // Buscar el usuario por email
      const user = await User.findOne({ email: data.email })
      if (!user) {
        throw new Error('User not found')
      }

      // Comparar la contraseña proporcionada con la almacenada
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
  static async register(data: userRegister) {
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
}
