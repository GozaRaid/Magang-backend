import InvariantError from "../../exceptions/InvariantError.js";
import { SpeakerCoverSchema, SpeakerPayloadSchema } from "./schema.js";

const SpeakerValidator = {
  validateSpeakerPayload: (payload) => {
    const validationResult = SpeakerPayloadSchema.validate(payload, {
      abortEarly: false,
    });

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validateSpeakerCover: (payload) => {
    const validationResult = SpeakerCoverSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default SpeakerValidator;
