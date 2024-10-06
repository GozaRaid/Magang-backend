import routes from "./routes.js";
import AuthenticationsHandler from "./handler.js";

export default {
  name: "authentications",
  version: "1.0.0",
  register: async (server, { usersService, tokenManager, validator }) => {
    const authenticationsHandler = new AuthenticationsHandler(
      usersService,
      tokenManager,
      validator
    );
    server.route(routes(authenticationsHandler));
  },
};
