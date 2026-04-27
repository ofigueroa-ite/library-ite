import Joi from "joi";

export const departmentsUpdateSchema = Joi.object({
  name: Joi.string().required(),
});
