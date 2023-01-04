import Joi from 'joi'

export const postValidationMiddleware = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2
      })
      .required(),
    phone: Joi.string().required()
  })

  const validationData = schema.validate(req.body)

  if (validationData.error) {
    return res.status(400).json({
      message: `missing required ${validationData.error.details[0].path} field`
    })
  }
  next()
}

export const putValidationMiddleware = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    email: Joi.string()
      .email({
        minDomainSegments: 2
      })
      .optional(),
    phone: Joi.string().optional()
  })
  const validationData = schema.validate(req.body)

  if (validationData.error) {
    return res.status(400).json({
      message: validationData.error.details[0].message
    })
  }
  next()
}
