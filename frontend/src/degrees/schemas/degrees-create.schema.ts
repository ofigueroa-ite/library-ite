import Joi from "joi";

export const degreesCreateSchema = Joi.object({
  name: Joi.string().required(),
});
