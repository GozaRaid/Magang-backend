import Joi from "joi";

const SpeakerPayloadSchema = Joi.object({
  name: Joi.string().required(),
  bio: Joi.string().required(),
});

const SpeakerCoverSchema = Joi.object({
  "content-type": Joi.string()
    .valid("image/jpeg", "image/png", "image/jpg")
    .required(),
}).unknown();

export { SpeakerCoverSchema, SpeakerPayloadSchema };
