import Joi from 'joi'

export const queryparams = Joi.object({
  departmentId: Joi.string().required(),
})
