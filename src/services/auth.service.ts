import type { Express } from 'express'

import { ApiError } from '../errors'
import {
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
      const registrationRequestToSave =
        await RegistrationRequest.create<IRegistrationRequest>(dataToSave)

      return registrationRequestToSave.save()
    } catch (error) {
      const err = error as Error
      logger.error({
        label: 'AuthService',
        message: err,
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
  }): Promise<IPagination<IRegistrationRequest>> {
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

    const { data, ...rest } = await pageBuilder<IRegistrationRequest>(
      RegistrationRequest,
      {
        limit,
        page,
        where,
      },
    )

    const newData = await Promise.all(
      data.map(async (item: any) => {
        const itemData = item?.['_doc'] as IRegistrationRequest
        const front = await awsService.downloadFile(
          itemData.identificationFront,
        )
        const back = await awsService.downloadFile(itemData.identificationBack)
        const selfie = await awsService.downloadFile(itemData.selfie)

        return {
          ...itemData,
          identificationFront: front,
          identificationBack: back,
          selfie,
        }
      }),
    )

    return {
      data: newData,
      ...rest,
    }
  }
  private async processFile(files: {
    [fieldname: string]: Express.Multer.File[]
  }) {
    const fileNames: IFileNames = {}
    for (const key in files) {
      const file = files?.[key]?.[0]

      if (!file)
        throw ApiError.badRequest(`No se cargaron archivos para ${key}`)

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
