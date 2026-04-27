import Joi from "joi";

export const degreesUpdateSchema = Joi.object({
  name: Joi.string().required(),
});
