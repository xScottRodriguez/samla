import { readFile } from 'fs/promises'
import {
  ICommon,
  IDepartament,
  IMunicipality,
  IRegistrationRequest,
} from 'interfaces'
import { join } from 'path'

import {
  Auth,
  Departments,
  Documents,
  Municipalities,
  RegistrationRequest,
} from '../models'
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
    if (existsData.length <= 300) {
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

  async documents() {
    await Documents.deleteMany()
    const documents: ICommon[] = [
      {
        name: 'Dui',
      },
      {
        name: 'Pasaporte',
      },
      {
        name: 'Licencia de conducir',
      },
    ]
    await Documents.insertMany(documents)
  }
  async departaments() {
    const departaments: ICommon[] = [
      { name: 'Ahuachapán' },
      { name: 'Cabañas' },
      { name: 'Chalatenango' },
      { name: 'La Libertad' },
      { name: 'La Paz' },
      { name: 'Santa Ana' },
      { name: 'San Salvador' },
      { name: 'San Vicente' },
      { name: 'Sonsonate' },
      { name: 'Usulután' },
      { name: 'Morazán' },
      { name: 'San Miguel' },
      { name: 'La Unión' },
      { name: 'Cuscatlán' },
    ]

    await Departments.deleteMany()
    await Departments.insertMany(departaments)
  }
  async municipality() {
    const municipalities: IMunicipality[] = [
      { name: 'Ahuachapán', departmentId: 'Ahuachapán' },
      { name: 'Apaneca', departmentId: 'Ahuachapán' },
      { name: 'Atiquizaya', departmentId: 'Ahuachapán' },
      { name: 'Santa Ana', departmentId: 'Santa Ana' },
      { name: 'Coatepeque', departmentId: 'Santa Ana' },
      { name: 'San Salvador', departmentId: 'San Salvador' },
      { name: 'Santa Tecla', departmentId: 'La Libertad' },
      { name: 'San Vicente', departmentId: 'San Vicente' },
      { name: 'Usulután', departmentId: 'Usulután' },
      { name: 'San Miguel', departmentId: 'San Miguel' },
      { name: 'La Unión', departmentId: 'La Unión' },
      { name: 'Chalatenango', departmentId: 'Chalatenango' },
      { name: 'San Francisco Gotera', departmentId: 'Morazán' },
      { name: 'Cojutepeque', departmentId: 'Cuscatlán' },
      { name: 'La Libertad', departmentId: 'La Libertad' },
      { name: 'Sonsonate', departmentId: 'Sonsonate' },
    ]

    await Municipalities.deleteMany()
    const departments: IDepartament[] = await Departments.find<IDepartament>({})

    const mappedMunicipalities = municipalities.map((municipality) => {
      const department = departments.find(
        (department: IDepartament) =>
          department.name === municipality.departmentId,
      )
      return {
        ...municipality,
        departmentId: department?._id,
      }
    })
    await Municipalities.insertMany(mappedMunicipalities)
  }

  async seedAll() {
    await this.seedAdmin()
    await this.seed()
    await this.documents()
    await this.departaments()
    await this.municipality()
  }
}
export const seeder = new Seeder()
