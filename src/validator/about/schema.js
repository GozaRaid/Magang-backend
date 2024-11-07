import Joi from "joi";

const AboutPayloadSchema = Joi.object({
  aboutDescription: Joi.string().required(),
  where: Joi.string().required(),
  who: Joi.string().required(),
});

export { AboutPayloadSchema };
