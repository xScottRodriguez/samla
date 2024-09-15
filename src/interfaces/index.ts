// Define la interfaz para el documento
interface IRegistrationRequest {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  identificationType: 'Dui' | 'Pasaporte' | 'Licencia de conducir'
  identificationNumber: string
  region: string
  city: string
  address: string
  monthlyIncome: number
}

type TFiles =
  | {
      [fieldname: string]: Express.Multer.File[]
    }
  | Express.Multer.File[]
  | undefined

interface IFileNames {
  [key: string]: string
}
interface IDataToSave extends IRegistrationRequest {
  identificationFront: string
  identificationBack: string
  selfie: string
}

type TNormalizedFiles = {
  [fieldname: string]: Express.Multer.File[]
}

interface IPaginationOptions {
  limit?: number
  page?: number
  where: unknown
  orderBy?: unknown
}
interface IPageResponse {
  prev: number | null
  next: number | null
  count: number
}
interface IPagination<T> {
  data: T[]
  total: number
  page: IPageResponse
}

interface IPaginationFilters {
  firstName?: string
  lastName?: number
  phoneNumber?: string
  identificationNumber?: string
  city?: string
  email?: string
}

interface IPaginationQuery {
  page: number
  limit: number
  filters?: IPaginationFilters
}

export {
  IPaginationQuery,
  IPaginationFilters,
  IPaginationOptions,
  IPagination,
  IPageResponse,
  IDataToSave,
  IFileNames,
  IRegistrationRequest,
  TFiles,
  TNormalizedFiles,
}
