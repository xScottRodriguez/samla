import { randomUUID, UUID } from 'crypto'
import { TFiles, TNormalizedFiles } from 'interfaces'

const getRandomUuid = (): UUID => {
  return randomUUID()
}

const normalizedFiles = (files: TFiles): TNormalizedFiles => {
  const normalized: TFiles = {
    identificationFront: (
      files as { [fieldname: string]: Express.Multer.File[] }
    )['identificationFront'],
    identificationBack: (
      files as { [fieldname: string]: Express.Multer.File[] }
    )['identificationBack'],
    selfie: (files as { [fieldname: string]: Express.Multer.File[] })['selfie'],
  }
  return normalized
}

export * from './logger'
export * from './response-helper'
export { getRandomUuid, normalizedFiles }
