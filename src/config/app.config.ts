import dotenv from 'dotenv'
dotenv.config()

export const config = {
  // DATABASE
  dbURI: process.env.DB_CONNECTION_STRING || '',

  port: process.env.PORT || 5000
}
