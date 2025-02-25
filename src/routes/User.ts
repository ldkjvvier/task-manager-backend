import { UserControllers } from '@/modules/controllers/UserController'

import express from 'express'

export const userRoutes = express.Router()

userRoutes.post('/login', UserControllers.Login)
userRoutes.post('/register', UserControllers.Register)
userRoutes.post('/logout', UserControllers.Logout)
userRoutes.post('/category', UserControllers.CreateCategory)
