import dotenv from 'dotenv'
dotenv.config()

export const config = {
  // DATABASE
  dbURI: process.env.DB_CONNECTION_STRING || '',

  mode: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,

  apiVersion: process.env.API_VERSION || 'v1',
  apiUrl: process.env.API_URL || 'http://localhost:5000'
}
