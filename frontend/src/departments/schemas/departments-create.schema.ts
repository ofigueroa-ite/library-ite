import Joi from "joi";

export const departmentsCreateSchema = Joi.object({
  name: Joi.string().required(),
});
