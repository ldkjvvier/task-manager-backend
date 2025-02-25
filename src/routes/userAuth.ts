import { userAuthControllers } from '@/modules/controllers/UserController'

import express from 'express'

export const userAuthRoutes = express.Router()

userAuthRoutes.post('/login', userAuthControllers.login)
userAuthRoutes.post('/register', userAuthControllers.register)
userAuthRoutes.post('/logout', userAuthControllers.logout)
