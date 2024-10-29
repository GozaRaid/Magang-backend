import routes from "./routes.js";
import SpeakerHandler from "./handler.js";

export default {
  name: "speakers",
  version: "1.0.0",
  register: async (server, { speakerService, storageService, validator }) => {
    const speakersHandler = new SpeakerHandler(
      speakerService,
      storageService,
      validator
    );
    server.route(routes(speakersHandler));
  },
};
