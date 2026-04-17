import Joi from "joi";

export const usersCreateSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  email: Joi.string().email().required(),
  roles: Joi.array().items(Joi.string().uuid()).required(),
});
