// Define la interfaz para el documento
export interface IRegistrationRequest {
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

export type TFiles =
  | {
      [fieldname: string]: Express.Multer.File[]
    }
  | Express.Multer.File[]
  | undefined

export interface IFileNames {
  [key: string]: string
}
export interface IDataToSave extends IRegistrationRequest {
  identificationFront: string
  identificationBack: string
  selfie: string
}

export type TNormalizedFiles = {
  [fieldname: string]: Express.Multer.File[]
}
