import InvariantError from "../../exceptions/InvariantError.js";
import { LocationPayloadSchema } from "./schema.js";

const LocationValidator = {
  validateLocationPayload: (payload) => {
    const validationResult = LocationPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default LocationValidator;
