import Joi from "joi";
import { ValidationError } from "../helpers/errors.js";

export const validationMiddleware = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .required(),
    phone: Joi.string().required(),
  });

  const validationData = schema.validate(req.body);

  if (validationData.error) {
    next(
      new ValidationError(
        `missing required ${validationData.error.details[0].path} field`
      )
    );
  }
  next();
};
