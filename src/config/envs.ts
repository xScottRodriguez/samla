import 'dotenv/config'
import * as joi from 'joi'

interface IEnvConfig {
  PORT: number
  DATABASE_URL: string
  AWS_ACCESS_KEY_ID: string
  AWS_SECRET_ACCESS_KEY: string
  AWS_ENDPOINT: string
  AWS_REGION: string
  AWS_BUCKET_NAME: string
  JWT_SECRET: string
  CLIENT_URL: string
}

const envVarsSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    AWS_ACCESS_KEY_ID: joi.string().required(),
    AWS_SECRET_ACCESS_KEY: joi.string().required(),
    AWS_ENDPOINT: joi.string().required(),
    AWS_REGION: joi.string().required(),
    AWS_BUCKET_NAME: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    CLIENT_URL: joi.string().required(),
  })
  .unknown(true)

const { error, value } = envVarsSchema.validate(process.env)

if (error) throw new Error(`Config validation error: ${error.message} `)

const envVars: IEnvConfig = value

export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
  awsAccessKeyId: envVars.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: envVars.AWS_SECRET_ACCESS_KEY,
  awsEndpoint: envVars.AWS_ENDPOINT,
  awsRegion: envVars.AWS_REGION,
  awsBucketName: envVars.AWS_BUCKET_NAME,
  jwtSecret: envVars.JWT_SECRET,
  clientUrl: envVars.CLIENT_URL,
}
