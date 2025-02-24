import mongoose from 'mongoose'
import { config } from '@/config/app.config'

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.dbURI, {
      autoIndex: true
    })

    console.log('📌 Conectado a la base de datos con éxito')
  } catch (error) {
    // Manejo de errores
    if (error instanceof Error) {
      console.error(`❌ Error al conectar a MongoDB: ${error.message}`)
    } else {
      console.error(
        '❌ Ocurrió un error desconocido al conectar a la base de datos'
      )
    }

    process.exit(1)
  }
}
