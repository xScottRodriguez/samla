import { readFile } from 'fs/promises'
import { IRegistrationRequest } from 'interfaces'
import { join } from 'path'

import { Auth, RegistrationRequest } from '../models'
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
  async seed() {
    const existsData = await RegistrationRequest.find({})

    // write the validation if the data is minor than 100 and mayor than 10
    if (existsData.length < 100 && existsData.length > 50) {
      logger.info('Data already exists')
      return
    }
    await RegistrationRequest.deleteMany()

    const data = await readFile(join(process.cwd(), '/MOCK_DATA.json'), 'utf8')
    const parsedData = JSON.parse(data)
    const newData: IRegistrationRequest[] = parsedData.map(
      (item: IRegistrationRequest) => ({
        ...item,
        monthlyIncome: Number(
          String(item.monthlyIncome).replace(/[$\s]+/g, ''),
        ),
        identificationType: 'Dui',
      }),
    )
    await RegistrationRequest.insertMany(newData)
    return logger.info('Data seeded successfully')
  }
}
export const seeder = new Seeder()
