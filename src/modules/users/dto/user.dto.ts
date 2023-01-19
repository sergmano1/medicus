import * as Joi from '@hapi/joi';

export const createUserSchema: Joi.Schema = Joi.object().keys({
  firstName: Joi.string()
    .pattern(/^[a-zA-Z]*$/)
    .required(),
  lastName: Joi.string()
    .pattern(/^[a-zA-Z]*$/)
    .required(),
  email: Joi.string().email().required(),
  role: Joi.number(),
  avatar: Joi.string(),
  password: Joi.string().min(8),
});
