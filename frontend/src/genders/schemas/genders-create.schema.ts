import Joi from "joi";

export const gendersCreateSchema = Joi.object({
  name: Joi.string().required(),
});
