import InvariantError from "../../exceptions/InvariantError.js";
import { ConferencePayloadSchema } from "./schema.js";

const ConferenceValidator = {
  validateConferencePayload: (payload) => {
    const validationResult = ConferencePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default ConferenceValidator;
