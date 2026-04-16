import Joi from "joi";

export const permissionsCreateSchema = Joi.object({
  action: Joi.string().required(),
  subject: Joi.string().required(),
  inverted: Joi.boolean(),
});
