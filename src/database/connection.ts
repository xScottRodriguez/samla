import mongoose from 'mongoose'

import { envs } from '../config'
import { logger } from '../utils'

const connectDB = async () => {
  try {
    await mongoose.connect(envs.databaseUrl)
    logger.info({
      label: 'Database',
      message: 'MongoDB Connected...',
    })
  } catch (error) {
    logger.error({
      label: 'Database',
      message: 'MongoDB connection error:',
      error,
    })
    process.exit(1) // Exit process with failure
  }
}
export { connectDB }
