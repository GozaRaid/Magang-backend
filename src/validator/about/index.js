import InvariantError from "../../exceptions/InvariantError.js";
import { AboutPayloadSchema } from "./schema.js";

const AboutValidator = {
  validateAboutPayload: (payload) => {
    const validationResult = AboutPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default AboutValidator;
