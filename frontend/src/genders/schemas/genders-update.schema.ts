import Joi from "joi";

export const gendersUpdateSchema = Joi.object({
  name: Joi.string().required(),
});
