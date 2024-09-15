import 'dotenv/config'
import * as joi from 'joi'

interface EnvConfig {
  PORT: number
  DATABASE_URL: string
  AWS_ACCESS_KEY_ID: string
  AWS_SECRET_ACCESS_KEY: string
  AWS_ENDPOINT: string
  AWS_REGION: string
  AWS_BUCKET_NAME: string
}

const envVarsSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
  })
  .unknown(true)

const { error, value } = envVarsSchema.validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message} QLO`)
}

const envVars: EnvConfig = value

export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
  awsAccessKeyId: envVars.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: envVars.AWS_SECRET_ACCESS_KEY,
  awsEndpoint: envVars.AWS_ENDPOINT,
  awsRegion: envVars.AWS_REGION,
  awsBucketName: envVars.AWS_BUCKET_NAME,
}
