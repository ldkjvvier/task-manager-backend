import { UserModel } from '../services/User'
import { Request, Response } from 'express'

export class UserControllers {
  // Método para iniciar sesión
  static async Login(req: Request, res: Response) {
    const { email, password } = req.body
    console.log(req.body)
    try {
      const { user } = await UserModel.Login({ email, password })

      if (!user) {
        return res.status(401).json({ message: 'Login failed' })
      }
      const USER = {
        id: user.id,
        email: user.email,
        categories: user.categories
      }
      return res.status(200).json(USER)
    } catch (error) {
      return res.status(401).json({
        message: 'Login failed',
        error: error
      })
    }
  }

  // Método para registrar un nuevo usuario
  static async Register(req: Request, res: Response) {
    const { email, password } = req.body

    try {
      const UserRegistered = await UserModel.Register({
        email,
        password
      })

      if (!UserRegistered) {
        return res.status(400).json({ message: 'Error creating user' })
      }
      const USER = {
        id: UserRegistered.id,
        email: UserRegistered.email,
        categories: UserRegistered.categories
      }
      return res.status(201).json(USER)
    } catch (error) {
      return res.status(400).json({
        message: 'Error creating user',
        error: error
      })
    }
  }

  // Método para cerrar sesión
  static async Logout(_req: Request, res: Response) {
    try {
      return res.status(200).json({ message: 'User logged out' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  // Crear Categoria
  static async CreateCategory(req: Request, res: Response) {
    const { id, category } = req.body
    try {
      const UserCategory = await UserModel.CreateCategory(id, category)

      if (!UserCategory) {
        return res.status(400).json({ message: 'Error creating category' })
      }
      return res.status(201).json(UserCategory)
    } catch (error) {
      return res.status(400).json({
        message: 'Error creating category',
        error: error
      })
    }
  }
}
