import InvariantError from "../../exceptions/InvariantError.js";
import { SpeakerCoverSchema, SpeakerPayloadSchema } from "./schema.js";

const SpeakerValidator = {
  validateSpeakerPayload: (payload) => {
    // let parsedPayload;

    // // If it's an array (multiple speakers)
    // if (Array.isArray(payload)) {
    //   parsedPayload = payload.map((item) => {
    //     if (typeof item === "string") {
    //       return JSON.parse(item.replace(/'/g, '"'));
    //     }
    //     return item;
    //   });
    // }
    // // If it's a single speaker (object as string)
    // else if (typeof payload === "string") {
    //   parsedPayload = JSON.parse(payload.replace(/'/g, '"'));
    // }
    // // If it's already an object
    // else {
    //   parsedPayload = payload;
    // }

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
