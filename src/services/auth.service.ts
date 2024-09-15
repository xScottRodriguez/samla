import { RegistrationRequest } from '../models'
import { IDataToSave, IFileNames, IPagination, IRegistrationRequest, TFiles } from '../interfaces'
import { ApiError } from '../errors'
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

  getRegistrationRequests(): Promise<IPagination<IDataToSave>> {
    return pageBuilder(RegistrationRequest, { limit: 10, page: 1, where: {} })
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
