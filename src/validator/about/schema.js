import Joi from "joi";

const AboutPayloadSchema = Joi.object({
  aboutDescription: Joi.string().required(),
  // conference_id: Joi.string().length(50).required(),
  where: Joi.string().required(),
  who: Joi.string().required(),
});

export { AboutPayloadSchema };
