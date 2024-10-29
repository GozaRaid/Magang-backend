import routes from "./routes.js";
import AboutHandler from "./handler.js";

export default {
  name: "about",
  version: "1.0.0",
  register: async (
    server,
    { aboutService, conferenceService, validatorAbout, validatorConference }
  ) => {
    const aboutHandler = new AboutHandler(
      aboutService,
      conferenceService,
      validatorAbout,
      validatorConference
    );
    server.route(routes(aboutHandler));
  },
};
