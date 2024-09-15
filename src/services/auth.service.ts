import type { Express } from 'express'

import { ApiError } from '../errors'
import {
  IDataToSave,
  IFileNames,
  IPagination,
  IPaginationFilters,
  IRegistrationRequest,
} from '../interfaces'
import { RegistrationRequest } from '../models'
import { getRandomUuid, logger, pageBuilder } from '../utils'
import { awsService } from './aws-s3.service'

class AuthService {
  async registry(
    payload: IRegistrationRequest,
    files: {
      [fieldname: string]: Express.Multer.File[]
    },
  ) {
    try {
      const objectFiles = await this.processFile(files)
      const { identificationFront, identificationBack, selfie } = objectFiles

      const dataToSave = {
        ...payload,
        identificationFront,
        identificationBack,
        selfie,
      }
      return await RegistrationRequest.create<IRegistrationRequest>(dataToSave)
    } catch (error) {
      const err = error as Error
      logger.error({
        label: 'AuthService',
        message: err.message,
        method: 'AuthService.registry',
      })
      throw ApiError.internalServer('Ocurrio un error Creando registro', [
        { msg: err.message, path: '' },
      ])
    }
  }

  async getRegistrationRequests({
    limit,
    page,
    filters,
  }: {
    limit: number
    page: number
    filters: IPaginationFilters | undefined
  }): Promise<IPagination<IDataToSave>> {
    const where: any = {}
    if (filters?.firstName)
      where['firstName'] = {
        $regex: filters.firstName,
        $options: 'i',
      }

    if (filters?.lastName)
      where['lastName'] = {
        $regex: filters.lastName,
        $options: 'i',
      }

    if (filters?.phoneNumber)
      where['phoneNumber'] = {
        $regex: filters.phoneNumber,
        $options: 'i',
      }

    if (filters?.identificationNumber)
      where['identificationNumber'] = {
        $regex: filters.identificationNumber,
        $options: 'i',
      }

    if (filters?.city)
      where['city'] = {
        $regex: filters.city,
        $options: 'i',
      }

    if (filters?.email)
      where['email'] = {
        $regex: filters.email,
        $options: 'i',
      }

    return await pageBuilder<IDataToSave>(RegistrationRequest, {
      limit,
      page,
      where,
    })
  }
  private async processFile(files: {
    [fieldname: string]: Express.Multer.File[]
  }) {
    const fileNames: IFileNames = {}
    for (const key in files) {
      const file = files[key][0]
      const fileName = `${getRandomUuid()}-${file.originalname}`
      fileNames[key] = fileName
      const { key: filePath } = await awsService.uploadFile({
        file: file.buffer,
        fileName,
        folder: 'documents',
      })
      fileNames[key] = filePath
    }
    return fileNames
  }
}

export default new AuthService()
