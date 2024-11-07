import routes from "./routes.js";
import PararelSessionHandler from "./handler.js";

export default {
  name: "pararel-sessions",
  version: "1.0.0",
  register: async (server, { pararelSessionService, validator }) => {
    const pararelSessionHandler = new PararelSessionHandler(
      pararelSessionService,
      validator
    );
    server.route(routes(pararelSessionHandler));
  },
};
