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

    if (existsData.length) {
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
      { name: 'El Refugio', departmentId: 'Ahuachapán' },
      { name: 'San Lorenzo', departmentId: 'Ahuachapán' },
      { name: 'San Francisco Menéndez', departmentId: 'Ahuachapán' },
      { name: 'Jujutla', departmentId: 'Ahuachapán' },
      { name: 'Tacuba', departmentId: 'Ahuachapán' },
      { name: 'Concepción de Ataco', departmentId: 'Ahuachapán' },
      { name: 'El Sunza', departmentId: 'Ahuachapán' },

      { name: 'Santa Ana', departmentId: 'Santa Ana' },
      { name: 'Coatepeque', departmentId: 'Santa Ana' },
      { name: 'Chalchuapa', departmentId: 'Santa Ana' },
      { name: 'La Libertad', departmentId: 'Santa Ana' },
      { name: 'El Congo', departmentId: 'Santa Ana' },
      { name: 'San Sebastián Salitrillo', departmentId: 'Santa Ana' },
      { name: 'Santa Rosa Guachipilín', departmentId: 'Santa Ana' },
      { name: 'Candelaria de la Frontera', departmentId: 'Santa Ana' },
      { name: 'San Antonio Los Ranchos', departmentId: 'Santa Ana' },
      { name: 'El Porvenir', departmentId: 'Santa Ana' },

      { name: 'San Salvador', departmentId: 'San Salvador' },
      { name: 'Santa Tecla', departmentId: 'San Salvador' },
      { name: 'Mejicanos', departmentId: 'San Salvador' },
      { name: 'Soyapango', departmentId: 'San Salvador' },
      { name: 'Ilopango', departmentId: 'San Salvador' },
      { name: 'Apopa', departmentId: 'San Salvador' },
      { name: 'San Marcos', departmentId: 'San Salvador' },
      { name: 'San Martín', departmentId: 'San Salvador' },
      { name: 'Tonacatepeque', departmentId: 'San Salvador' },
      { name: 'Panchimalco', departmentId: 'San Salvador' },

      { name: 'La Libertad', departmentId: 'La Libertad' },
      { name: 'Santa Tecla', departmentId: 'La Libertad' },
      { name: 'Antiguo Cuscatlán', departmentId: 'La Libertad' },
      { name: 'Nuevo Cuscatlán', departmentId: 'La Libertad' },
      { name: 'El Sunza', departmentId: 'La Libertad' },
      { name: 'Chiltiupán', departmentId: 'La Libertad' },
      { name: 'Tamanique', departmentId: 'La Libertad' },
      { name: 'Teotepeque', departmentId: 'La Libertad' },
      { name: 'San José Villanueva', departmentId: 'La Libertad' },
      { name: 'San Juan Opico', departmentId: 'La Libertad' },

      { name: 'San Vicente', departmentId: 'San Vicente' },
      { name: 'San Sebastián', departmentId: 'San Vicente' },
      { name: 'Guadalupe', departmentId: 'San Vicente' },
      { name: 'Apastepeque', departmentId: 'San Vicente' },
      { name: 'Santa Clara', departmentId: 'San Vicente' },
      { name: 'San Cayetano Istepeque', departmentId: 'San Vicente' },
      { name: 'San Lorenzo', departmentId: 'San Vicente' },
      { name: 'San Miguelito', departmentId: 'San Vicente' },
      { name: 'Verapaz', departmentId: 'San Vicente' },

      { name: 'Usulután', departmentId: 'Usulután' },
      { name: 'Santa Elena', departmentId: 'Usulután' },
      { name: 'Jiquilisco', departmentId: 'Usulután' },
      { name: 'San Miguel Tepezontes', departmentId: 'Usulután' },
      { name: 'San Juan del Gozo', departmentId: 'Usulután' },
      { name: 'El Triunfo', departmentId: 'Usulután' },
      { name: 'Puerto El Triunfo', departmentId: 'Usulután' },
      { name: 'Concepción Batres', departmentId: 'Usulután' },
      { name: 'Nueva Granada', departmentId: 'Usulután' },

      { name: 'San Miguel', departmentId: 'San Miguel' },
      { name: 'San Antonio del Mosquito', departmentId: 'San Miguel' },
      { name: 'El Tránsito', departmentId: 'San Miguel' },
      { name: 'La Unión', departmentId: 'San Miguel' },
      { name: 'San Jorge', departmentId: 'San Miguel' },
      { name: 'Nuevo Edén de San Juan', departmentId: 'San Miguel' },
      { name: 'Ciudad Barrios', departmentId: 'San Miguel' },
      { name: 'Chirilagua', departmentId: 'San Miguel' },
      { name: 'El Carmen', departmentId: 'San Miguel' },

      { name: 'La Unión', departmentId: 'La Unión' },
      { name: 'San Alejo', departmentId: 'La Unión' },
      { name: 'El Salvador del Mundo', departmentId: 'La Unión' },
      { name: 'Conchagua', departmentId: 'La Unión' },
      { name: 'San José', departmentId: 'La Unión' },
      { name: 'Pasaquina', departmentId: 'La Unión' },
      { name: 'La Reina', departmentId: 'La Unión' },
      { name: 'Nueva Esparta', departmentId: 'La Unión' },
      { name: 'El Carmen', departmentId: 'La Unión' },

      { name: 'Chalatenango', departmentId: 'Chalatenango' },
      { name: 'La Laguna', departmentId: 'Chalatenango' },
      { name: 'El Paraíso', departmentId: 'Chalatenango' },
      { name: 'San Ignacio', departmentId: 'Chalatenango' },
      { name: 'Nombre de Dios', departmentId: 'Chalatenango' },
      { name: 'Tejutla', departmentId: 'Chalatenango' },
      { name: 'Santa Rita', departmentId: 'Chalatenango' },
      { name: 'San Rafael', departmentId: 'Chalatenango' },
      { name: 'La Palma', departmentId: 'Chalatenango' },

      { name: 'San Francisco Gotera', departmentId: 'Morazán' },
      { name: 'El Divisadero', departmentId: 'Morazán' },
      { name: 'Guatajiagua', departmentId: 'Morazán' },
      { name: 'Jocoro', departmentId: 'Morazán' },
      { name: 'San Isidro', departmentId: 'Morazán' },
      { name: 'San Simón', departmentId: 'Morazán' },
      { name: 'Corinto', departmentId: 'Morazán' },
      { name: 'La Unión', departmentId: 'Morazán' },

      { name: 'Cojutepeque', departmentId: 'Cuscatlán' },
      { name: 'San Ramón', departmentId: 'Cuscatlán' },
      { name: 'El Carmen', departmentId: 'Cuscatlán' },
      { name: 'San Pedro Perulapán', departmentId: 'Cuscatlán' },
      { name: 'San Cristóbal', departmentId: 'Cuscatlán' },
      { name: 'Monte San Juan', departmentId: 'Cuscatlán' },
      { name: 'Santa Cruz Michapa', departmentId: 'Cuscatlán' },
      { name: 'La Libertad', departmentId: 'Cuscatlán' },

      { name: 'Sonsonate', departmentId: 'Sonsonate' },
      { name: 'Acajutla', departmentId: 'Sonsonate' },
      { name: 'Juayúa', departmentId: 'Sonsonate' },
      { name: 'Salcoatitán', departmentId: 'Sonsonate' },
      { name: 'San Julián', departmentId: 'Sonsonate' },
      { name: 'Santa Isabel Ishuatán', departmentId: 'Sonsonate' },
      { name: 'San Antonio del Monte', departmentId: 'Sonsonate' },
      { name: 'Armenia', departmentId: 'Sonsonate' },
    ]

    await Municipalities.deleteMany()
    const departments: IDepartament[] = await Departments.find<IDepartament>({})

    const mappedMunicipalities = municipalities.map((municipality) => {
      const department: IDepartament | undefined = departments.find(
        (department: IDepartament) =>
          department.name === municipality.departmentId,
      )
      if (!department) throw new Error('Department not found')

      return {
        ...municipality,
        departmentId: department._id,
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
