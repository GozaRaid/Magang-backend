import Joi from "joi";

const ConferencePayloadSchema = Joi.array().items(
  Joi.object({
    title: Joi.string().required(),
    conference_url: Joi.string().uri().required(),
  })
);

export { ConferencePayloadSchema };
