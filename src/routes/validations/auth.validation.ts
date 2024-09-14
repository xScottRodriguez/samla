import Joi from 'joi'

const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/

const RegistrationSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().pattern(phoneNumberRegex).required(),
  identificationType: Joi.string()
    .valid('Dui', 'Pasaporte', 'Licencia de conducir')
    .required(),
  identificationNumber: Joi.string().required(),
  region: Joi.string().required(),
  city: Joi.string().required(),
  address: Joi.string().required(),
  monthlyIncome: Joi.number().positive().required(),
}).required()

export { RegistrationSchema }
