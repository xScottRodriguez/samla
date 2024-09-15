import Joi from 'joi'

const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(10),
  filters: Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.number().integer().min(0).optional(),
    phoneNumber: Joi.string().optional(),
    identificationNumber: Joi.string().optional(),
    city: Joi.string().optional(),
  }).optional(),
}).required()

export { paginationSchema }
