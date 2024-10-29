import Joi from "joi";

const LocationPayloadSchema = Joi.object({
  map_url: Joi.string().uri().required(),
});

export { LocationPayloadSchema };
