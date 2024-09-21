import { Auth } from '../models'
import { logger } from '../utils'

class Seeder {
  async seedAdmin() {
    try {
      const existsAdmin = await Auth.findOne({ email: 'admin@admin.com' })
      if (existsAdmin) {
        logger.info('Admin already exists')
        return
      }

      const admin = await new Auth({
        email: 'admin@admin.com',
        password: 'admin',
      })

      await admin.save()
    } catch (error) {
      logger.error('Error seeding admin:', error)
      process.exit(1)
    }
  }
}
export const seeder = new Seeder()
