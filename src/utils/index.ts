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

interface IResponse {
  take: number
  skip: number
}

const getTakeAndSkip = (limit: number, page: number): IResponse => {
  const offset = (page - 1) * limit
  return {
    take: limit,
    skip: offset,
  }
}
export * from './logger'
export * from './response-helper'
export { default as pageBuilder } from './page-builder'
export { getRandomUuid, normalizedFiles, getTakeAndSkip }
