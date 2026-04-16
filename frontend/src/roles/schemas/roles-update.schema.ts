import Joi from "joi";

export const rolesUpdateSchema = Joi.object({
  name: Joi.string().required(),
  priority: Joi.number().integer().multiple(100).required(),
});
