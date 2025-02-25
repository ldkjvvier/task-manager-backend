export interface userLogin {
  email: string
  password: string
}

export interface userRegister extends userLogin {}

export interface User {
  id: string
  password: string
  email: string
  categories: string[]
}
