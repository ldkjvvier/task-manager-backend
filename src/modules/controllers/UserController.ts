import { userAuthModel } from '../services/userAuth'
import { Request, Response } from 'express'

export class userAuthControllers {
  // Método para iniciar sesión
  static async login(req: Request, res: Response) {
    const { email, password } = req.body
    try {
      const { user } = await userAuthModel.login({ email, password })

      if (!user) {
        return res.status(401).json({ message: 'Login failed' })
      }

      return res.status(200).json(user)
    } catch (error) {
      return res.status(401).json({
        message: 'Login failed',
        error: error
      })
    }
  }

  // Método para registrar un nuevo usuario
  static async register(req: Request, res: Response) {
    const { email, password } = req.body

    try {
      const UserRegistered = await userAuthModel.register({
        email,
        password
      })

      if (!UserRegistered) {
        return res.status(400).json({ message: 'Error creating user' })
      }

      return res.status(201).json({ message: 'User registered' })
    } catch (error) {
      return res.status(400).json({
        message: 'Error creating user',
        error: error
      })
    }
  }

  // Método para cerrar sesión
  static async logout(_req: Request, res: Response) {
    try {
      return res.status(200).json({ message: 'User logged out' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
