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
