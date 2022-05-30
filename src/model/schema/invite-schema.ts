import Joi from "joi";

export const inviteValidation = {
  create: Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().email().label("Email"),
  }),
};
